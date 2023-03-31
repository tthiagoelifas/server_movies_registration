const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require('../database/sqlite');
const usersRoutes = require("../routes/users.routes");

class UsersController{
  async create(req,res){
    const {name, email, password} = req.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)",[email]);

    if(checkUserExists){
      throw new AppError('Esse e=mail já está em uso.')
    }

    const hashedPassword = await hash(password, 8);

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?) ", 
      [name, email, hashedPassword]
    );

    return res.status(201).json();
   
  }

  async update(req,res){
    const {name, email} = req.body;
    const {id} = req.params;

    const database = await sqliteConnection();
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

    if(!user){
      throw new AppError('Usuário não encontrado.')
    }

    const userWithUpdatedEmail = await database.get('SELECT * FROM users WHERE email = (?)',[email]);

    if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
      throw new AppError('Esse email já está em uso.')
    }

    user.name = name;
    user.email = email;

    await database.run(`
    UPDATE users SET
    name = ?,
    email = ?,
    updated_at = ?
    WHERE id = ?`,
    [user.name, user.email, new Date(), id]);

    return res.json();
  }

}

module.exports = UsersController;