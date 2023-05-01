import express from 'express';
import router from './app';
import { pool } from '../UA-Project02/db';


const app = express();

app.use(express.json());
app.use(router);

app.listen(7000, () => {
  console.log('Server started on http://localhost:7000');
});

// pool.query(`
// CREATE TABLE tb_alunos (
//   id SERIAL PRIMARY KEY,
//   nome TEXT NOT NULL,
//   endereco TEXT NOT NULL,
//   idade INTEGER NOT NULL
// );
// `, (err, res) => {
//   console.log(err, res);
//   pool.end(); // encerra a conexão após a consulta
// });

// export default pool;
