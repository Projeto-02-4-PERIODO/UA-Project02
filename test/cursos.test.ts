import request from 'supertest';
import { Pool } from 'pg';
import app from '../../app';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

beforeAll(async () => {
  await pool.query(`
    CREATE TABLE cursos (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      sigla TEXT NOT NULL,
    );
  `);
});

afterAll(async () => {
  await pool.query(`DROP TABLE cursos`);
  pool.end();
});

describe('Testes para o cursoController', () => {
  describe('GET /cursos', () => {
    it('deve retornar um array de cursos', async () => {
      const response = await request(app).get('/cursos');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /cursos/create', () => {
    it('deve criar um novo curso', async () => {
      const curso = {
        nome: 'Direito',
        sigla: 'DR'
      };
      const response = await request(app).post('/cursos/create').send(curso);
      expect(response.status).toBe(201);
      expect(response.body.nome).toBe('Direito');
      expect(response.body.sigla).toBe('DR');
    });
  });

  describe('PUT /cursos/:id', () => {
    it('deve atualizar um curso anteriormente criado', async () => {
      const curso = {
        nome: 'Direito',
        sigla: 'DR'
      };
      const createdCurso = (await request(app).post('/cursos/create').send(curso)).body;

      const updatedCurso = {
        nome: 'Administracao',
        sigla: 'ADM'
      };
      const response = await request(app).put(`/cursos,create/${createdCurso.id}`).send(updatedCurso);
      expect(response.status).toBe(200);
      expect(response.body.nome).toBe('Administracao');
      expect(response.body.sigla).toBe('ADM');
    });
  });

  describe('DELETE /cursos/delete/:id', () => {
    it('deve excluir um curso existente', async () => {
      const curso = {
        nome: 'Administracao',
        sigla: 'ADM'
      };
      const createdCurso = (await request(app).post('/cursos/create').send(curso)).body;

      const response = await request(app).delete(`/cursos/delete${createdCurso.id}`);
      expect(response.status).toBe(204);

      const getResponse = await request(app).get('/cursos');
      expect(getResponse.body).toEqual([]);
    });

    it('deve retornar um erro 404 se o curso não existe', async () => {
      const response = await request(app).delete('/cursos/delete/999');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Curso not found' });
    });
  });
});