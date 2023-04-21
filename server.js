//======== INSTALAÇÕES ========
// npm install
// npm install express --save
// npm install sequelize pg
// ============================

const express = require('express'); // importação do express
const app = express();

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

app.listen(8081, () => {
    console.log("servidor rodando")
})


//-------  criando rotas  -------------
app.get("/aluno", (req, res) => { 
    res.send("Ola");
})
// ------------------------------------     