//======== INSTALAÇÕES ========
// npm install
// npm install nodemon
// npm install express --save
// npm install sequelize pg
// npm install body-parser
// ============================























// const express = require('express'); // importação do express
// const app = express();
// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

// const { Sequelize } = require('sequelize'); // importação do sequelize
// const sequelize = new Sequelize('postgres://postgres:meutel8414@localhost:5432/turma'); // instânciando o sequelize


// Aluno.sync({force: true});

//-------  sincronizando com o banco de dados  -------------
// sequelize.sync()
//   .then(() => {
//     console.log('Model sincronizado com o banco de dados!');
//   })
//   .catch((error) => {
//     console.error('Erro ao sincronizar o model com o banco de dados:', error);
//   });

// ---------------------------------------------------------

//------ iniciando o servidor em uma porta específica ------
// app.listen(8081, () => { 
//     console.log("servidor rodando")
// })
//----------------------------------------------------------

//------------------ listar alunos -------------------------
// app.get('/alunos', async (req, res) => {
//   try{
//     const alunos = await Aluno.findAll();
//     res.json(alunos);
//     console.log(alunos);
  
//   }catch(err){
//     console.log(err);
//     res.status(500).json({error: 'Internal Server Error'});
//   }

// });
//-----------------------------------------------------------

//----------------- adicionando aluno -----------------------
// app.post('/alunos/add', async(req, res) => {
//   try{
//     const { nome, idade, endereco } = req.body;
//     const alunos = Aluno.create({nome, idade, endereco});
//     res.status(201).json(alunos);
//   }catch(err){
//     console.error(err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// })
//-----------------------------------------------------------

//---------------- buscando aluno por id --------------------
// app.get('/alunos/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const aluno = await Aluno.findByPk(id);
//     if (!aluno) {
//       res.status(404).json({ error: 'Aluno not found' });
//     } else {
//       res.json(aluno);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
//-----------------------------------------------------------

//----------------- editando aluno --------------------------
// app.put('/alunos/editar/:id_aluno', async (req, res) => {
//   try{
//     const { id_aluno } = req.params;
//     const aluno = await Aluno.findByPk(id_aluno);
//     if (!aluno) {
//       res.status(404).json({ error: 'Aluno not found' });
//     } else {
//       Object.assign(aluno, req.body); 
//       const alunoAtualizado = await aluno.save();
//       res.status(201).json(alunoAtualizado); 
//     }
//   }catch (error){
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// })
//-----------------------------------------------------------

//----------------- deletando aluno -------------------------
// app.delete('alunos/deletar/:id_aluno',async (req, res) => {
//   try{
//     const { id_aluno } = req.params;
//     const aluno = await Aluno.findByPk(id_aluno);
//     if(!aluno){
//       res.status(404).json({ error: 'Aluno not found' });
//     }else{
//       await aluno.destroy();
//       res.status(204).send();
//     }
//   }catch(error){
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }

// })

