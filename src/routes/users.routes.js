const { Router } = require('express');

const usersRoutes = Router();

usersRoutes.get("/", (req,res) =>{
  res.send('O projeto deu certo!!!')
});


module.exports = usersRoutes;