/*const siglaModel = require("/model/siglasModels");

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

  module.exports = siglasController; 

 */