
const express = require('express');
const server = express();
server.use(express.json());


const cursos = [];
const siglas = [];


// CURSOS

//retorna curso
server.get('/cursos/:index', (req, res) => {
  const {index} = req.params;

  return res.json(cursos[index]);
});

//retornar todos os cursos
server.get('/cursos', (req,res) => {
  return res.json(cursos);
});

//criar um novo curso
server.post('/cursos', (req, res) => {
  const { name } = req.body;
  cursos.push(name);

  return res.json(cursos);
});

//atualizar um curso
server.put('/cursos/:index', (req, res) => {
  const {index} = req.params;
  const {name} = req.body;

  cursos[index] = name;

  return res.json(cursos);
});

//deletar um curso
server.delete('/cursos/:index', (req, res) => {
  const {index} = req.params;
  
  cursos.splice(index, 1);
  return res.json({ message: "O curso foi deletado com sucesso"});
 })


//SIGLAS

//retorna siglas
server.get('/siglas/:index', (req, res) => {
  const {index} = req.params;

  return res.json(siglas[index]);
});
  
//retornar todos as siglas
server.get('/siglas', (req,res) => {
  return res.json(siglas);
});

//criar uma nova sigla
server.post('/siglas', (req, res) => {
  const { name } = req.body;
  siglas.push(name);

  return res.json(siglas);
});

//atualizar um curso
server.put('/siglas/:index', (req, res) => {
  const {index} = req.params;
  const {name} = req.body;

  siglas[index] = name;

  return res.json(siglas);
});

//deletar siglas
server.delete('/siglas/:index', (req, res) => {
  const {index} = req.params;
  
  siglas.splice(index, 1);
  return res.json({ message: "A sigla foi deletada com sucesso"});
 })

server.listen(3000);