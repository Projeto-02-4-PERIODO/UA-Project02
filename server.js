const express = require('express');
const app = express();

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:meutel8414@localhost:5432/postgres');


//conexão com o banco
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'turma',
    password: 'meutel8414',
    port: 5432
});

client.connect().then(() => { 
    console.log("conectado com sucesso")
}).catch((err) => {
    console.log("erro ao conectar")
})
// ----------------------------------


app.listen(8081, () => {
    console.log("servidor rodando")
})

app.get("/aluno", (req, res) => {
    res.send("Ola");


})
      