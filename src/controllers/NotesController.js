const { response } = require("express");
const knex = require("../database/knex");

class NotesController{
  async create(req, res){
    const {title, description, rating, tags} = req.body;
    const {user_id} = req.params;

    const [note_id] = await knex("notes").insert({
      title,
      description,
      rating,
      user_id
    })

    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })

    await knex("tags").insert(tagsInsert);
    
    res.json();
  }
  async show(req, res){
    const { id } = req.params;
    const note = await knex("notes").where({id}).first();
    const tags = await knex("tags").where({note_id: id}).orderBy("name");

    return res.json({
      ...note,
      tags
    });
  }
}

module.exports = NotesController;