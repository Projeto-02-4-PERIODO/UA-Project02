import request from 'supertest';
import { Pool } from 'pg';
import app from '../app';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

beforeAll(async () => {
  await pool.query(`
    CREATE TABLE professores (
      id SERIAL PRIMARY KEY,
      nome TEXT NOT NULL,
      endereco TEXT NOT NULL,
      especialidade TEXT NOT NULL
    );
  `);
});

afterAll(async () => {
  //await pool.query(`DROP TABLE professores`);
  //pool.end();
});

describe('Testes para o ProfessorController', () => {
  describe('GET /professores', () => {
    it('deve retornar um array de professores', async () => {
      const response = await request(app).get('/professores');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /professores', () => {
    it('deve criar um novo professor', async () => {
      const professor = {
        nome: 'João da Silva',
        endereco: 'Rua A, 123',
        especialidade: 'Matemática',
      };
      const response = await request(app).post('/professores').send(professor);
      expect(response.status).toBe(201);
      expect(response.body.nome).toBe('João da Silva');
      expect(response.body.endereco).toBe('Rua A, 123');
      expect(response.body.especialidade).toBe('Matemática');
    });
  });

  describe('PUT /professores/:id', () => {
    it('deve atualizar um professor existente', async () => {
      const professor = {
        nome: 'João da Silva',
        endereco: 'Rua B, 456',
        especialidade: 'Física',
      };
      const createdProfessor = (await request(app).post('/professores').send(professor)).body;

      const updatedProfessor = {
        nome: 'João da Silva Pereira',
        endereco: 'Rua C, 789',
        especialidade: 'Química',
      };
      const response = await request(app).put(`/professores/${createdProfessor.id}`).send(updatedProfessor);
      expect(response.status).toBe(200);
      expect(response.body.nome).toBe('João da Silva Pereira');
      expect(response.body.endereco).toBe('Rua C, 789');
      expect(response.body.especialidade).toBe('Química');
    });
  });

  describe('DELETE /professores/:id', () => {
    it('deve excluir um professor existente', async () => {
      const professor = {
        nome: 'João da Silva',
        endereco: 'Rua B, 456',
        especialidade: 'Física',
      };
      const createdProfessor = (await request(app).post('/professores').send(professor)).body;

      const response = await request(app).delete(`/professores/${createdProfessor.id}`);
      expect(response.status).toBe(204);

      const getResponse = await request(app).get('/professores');
      expect(getResponse.body).toEqual([]);
    });

    it('deve retornar um erro 404 se o professor não existe', async () => {
      const response = await request(app).delete('/professores/999');
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Professor not found' });
    });
  });
});
