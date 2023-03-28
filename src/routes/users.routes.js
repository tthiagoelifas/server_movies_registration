const { Router } = require('express');

const usersRoutes = Router();

usersRoutes.get("/", (req, res) => {
  res.send('Novo Projeto deu certo!')
});


module.exports = usersRoutes;