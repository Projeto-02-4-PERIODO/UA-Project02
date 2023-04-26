//-----------  definindo a model para Aluno  ------------
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
// --------------------------------------------------------
