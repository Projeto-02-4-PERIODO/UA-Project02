// import request from 'supertest';
// import { Pool } from 'pg';

const router = await import ("../app");
const request = await import ("supertest");
const { Pool } = await import ("pg")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

beforeAll(async () => {
  await pool.query(`
    CREATE TABLE tb_alunos (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      endereco TEXT NOT NULL,
      idade INTEGER NOT NULL
    );
  `);
});

afterAll(async () => {
  await pool.query(`DROP TABLE tb_alunos`);
  pool.end();
});

describe('Testes para o AlunoController', () => {
  describe('GET /alunos', () => {
    it('deve retornar um array de alunos', async () => {
      const response = await request(router).get('/alunos');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /alunos/create/:id', () => {
    it('deve criar um novo aluno', async () => {
      const aluno = {
        nome: 'João da Silva',
        endereco: 'Rua A, 123',
        idade: 20,
      };
      const response = await request(router).post('/alunos/create').send(aluno);
      expect(response.status).toBe(201);
      expect(response.body.nome).toBe('João da Silva');
      expect(response.body.endereco).toBe('Rua A, 123');
      expect(response.body.idade).toBe(20);
    });
  });

  describe('PUT /alunos/update/:id', () => {
    it('deve atualizar um aluno existente', async () => {
      const aluno = {
        nome: 'João da Silva',
        endereco: 'Rua B, 456',
        idade: 22,
      };
      const createdAluno = (await request(router).post('/alunos/update').send(aluno)).body;

      const updatedAluno = {
        nome: 'João da Silva Pereira',
        endereco: 'Rua C, 789',
        idade: 21,
      };
      const response = await request(router).put(`/alunos/update/${createdAluno.id}`).send(updatedAluno);
      expect(response.status).toBe(200);
      expect(response.body.nome).toBe('João da Silva Pereira');
      expect(response.body.endereco).toBe('Rua C, 789');
      expect(response.body.idade).toBe(21);
    });
  });

  describe('DELETE /alunos/delete/:id', () => {
    it('deve excluir um aluno existente', async () => {
      const aluno = {
        nome: 'João da Silva',
        endereco: 'Rua B, 456',
        idade: 22,
      };
      const createdAluno = (await request(router).post('/alunos/delete').send(aluno)).body;

      const response = await request(router).delete(`/alunos/delete/${createdAluno.id}`);
      expect(response.status).toBe(204);

      const getResponse = await request(router).get('/alunos');
      expect(getResponse.body).toEqual([]);
    });

    it('deve retornar um erro 404 se o aluno não existe', async () => {
      const response = await request(router).delete('/alunos/999');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Aluno not found' });
    });
  });
});
