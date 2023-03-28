const express = require('express')

const app =  express();

app.use(express.json());


const PORT = 5555;
app.listen(PORT, () => console.log(`Sever is running on Port: ${PORT}.`));


app.get("/users", (req, res) => {
  res.send('Novo Projeto deu certo!')
})

