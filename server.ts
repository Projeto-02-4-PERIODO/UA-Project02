//======== INSTALAÇÕES ========
// npm install
// npm nodemon
// npm install express --save
// npm install sequelize pg
// npm install body-parser
// ============================

const express = require('express'); // importação do express
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const { Sequelize } = require('sequelize'); // importação do sequelize
const sequelize = new Sequelize('postgres://postgres:meutel8414@localhost:5432/turma'); // instânciando o sequelize

// -----  definindo a model para Aluno  ------
const Aluno = sequelize.define('tb_alunos', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: false
    },
    endereco: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
// ----------------------------------------------


// Aluno.sync({force: true});

//-------  sincronizando com o banco de dados  --------
sequelize.sync()
  .then(() => {
    console.log('Model sincronizado com o banco de dados!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o model com o banco de dados:', error);
  });

// -----------------------------------------------------

//--------- iniciando o servidor em uma porta específica --------
// app.listen(8081, () => { 
//     console.log("servidor rodando")
// })
//---------------------------------------------------------------

//------------------ listar alunos ------------------------
app.get('/alunos', async (req, res) => {
  try{
    const alunos = await Aluno.findAll();
    res.json(alunos);
    console.log(alunos);
  
  }catch(err){
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }

});

app.post('/alunos/add', async(req, res) => {
  try{
    const { nome, idade, endereco } = req.body;
    const alunos = Aluno.create({nome, idade, endereco});
    res.status(201).json(alunos);
  }catch(err){
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
})
//----------------------------------------------------------

//---------------- buscando aluno por id --------------------
app.get('/alunos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const aluno = await Aluno.findByPk(id);
    if (!aluno) {
      res.status(404).json({ error: 'Aluno not found' });
    } else {
      res.json(aluno);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//-----------------------------------------------------------

//-------------- criando novo aluno -------------------------
// app.post('/alunos/add', (req, res) => {
//   try{
//     const { nome, idade, endereco } = req.body;
//     const alunos = Aluno.create({nome, idade, endereco});
//     res.status(201).json(aluno);
//   }catch(err){
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// })
//----------------------------------------------------------

// async function addAluno(){
//   function askQuestion(question) {
//     return new Promise((resolve) => {
//       readline.question(question, resolve);
//     });
//   }

//   await sequelize.sync();
//   const nome = await askQuestion('Nome: ');
//   const idade = await askQuestion('Idade: ');
//   const endereco = await askQuestion('Endereço: ');
//   const aluno = await Aluno.create({ nome, idade, endereco });
//   console.log(`Aluno ${aluno.nome} criado com sucesso!`);
//   process.exit(0);
// }

//--------------------------------------

// const readline = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// async () => {
//   await sequelize.sync();
//   const nome = await askQuestion('Nome: ');
//   const idade = await askQuestion('Idade: ');
//   const endereco = await askQuestion('Endereço: ');
//   const aluno = await Aluno.create({ nome, idade, endereco });
//   console.log(`Aluno ${aluno.nome} criado com sucesso!`);
//   process.exit(0);
// }; 

// function askQuestion(question) {
//   return new Promise((resolve) => {
//     readline.question(question, resolve);
//   });
// }
//---------------------------------------------------------
// async function askAlunoId() {
//   let alunoId;
//   while (!alunoId) {
//     alunoId = await askQuestion('ID do aluno: ');
//     if (!Number.isInteger(+alunoId)) {
//       console.log('Por favor, digite um número inteiro.');
//       alunoId = null;
//     }
//   }
//   return +alunoId;
// }

// (async  () => {
//   await sequelize.sync();
//   const alunoId = await askAlunoId();
//   const aluno = await Aluno.findByPk(alunoId);
//   if (!aluno) {
//     console.log(`Aluno com ID ${alunoId} não encontrado.`);
//     process.exit(0);
//   }
//   const novoNome = await askQuestion(`Novo nome (${aluno.nome}): `);
//   const novaIdade = await askQuestion(`Nova idade (${aluno.idade}): `);
//   const novoEndereco = await askQuestion(`Novo endereco (${aluno.endereco}): `);
//   await aluno.update({
//     nome: novoNome || aluno.nome,
//     idade: novaIdade ? parseInt(novaIdade) : aluno.idade,
//     nome: novoEndereco || aluno.endereco,
//   });
//   console.log(`Aluno ${aluno.nome} atualizado com sucesso!`);
//   process.exit(0);
// })();

//---------------------------------------------------------

//-------  criando rotas  -------------
app.get("/aluno", (req, res) => { 
    res.send("Ola");
})
// ------------------------------------     