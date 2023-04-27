import { request } from "express";
import { beforeEach } from "node:test";
import app from "../app";
import { Professor } from "../model/professor";

let professores: Professor[] = [
    {
      id: 1,
      nome: 'Jean',
      endereco: 'Uniamérica',
      especialidade: 'BackEnd',
    },
    {
      id: 2,
      nome: 'Maria',
      endereco: 'Uniamérica',
      especialidade: 'Mandar',
    },
  ];

beforeEach(() => {
  // Reinicializa o array de professores antes de cada teste
  professores = [    {      id: 1,      nome: 'João',      endereco: 'Rua A, 123',      especialidade: 'Matemática',    },    {      id: 2,      nome: 'Maria',      endereco: 'Rua B, 456',      especialidade: 'História',    },  ];
});

describe('GET /professores', () => {
  it('Deve retornar todos os professores', async () => {
    const response = await request(app).get('/professores');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(professores);
  });
});

describe('GET /professores/:id', () => {
  it('Deve retornar o professor com o ID especificado', async () => {
    const response = await request(app).get('/professores/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(professores[0]);
  });

  it('Deve retornar status 404 se o ID não existir', async () => {
    const response = await request(app).get('/professores/999');
    expect(response.status).toBe(404);
  });
});

describe('POST /professores', () => {
  it('Deve cadastrar um novo professor', async () => {
    const novoProfessor = {
      nome: 'Igor',
      endereco: 'Uniamérica',
      especialidade: 'FrontEnd',
    };
    const response = await request(app).post('/professores').send(novoProfessor);
    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.nome).toBe(novoProfessor.nome);
    expect(response.body.endereco).toBe(novoProfessor.endereco);
    expect(response.body.especialidade).toBe(novoProfessor.especialidade);
    expect(professores).toContainEqual(response.body);
  });
});

describe('PUT /professores/:id', () => {
  it('Deve atualizar um professor existente', async () => {
    const professorAtualizado = {
      nome: 'Maria',
      endereco: 'Uniamérica',
      especialidade: 'FullStack',
    };
    const response = await request(app).put('/professores/2').send(professorAtualizado);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(2);
    expect(response.body.nome).toBe(professorAtualizado.nome);
    expect(response.body.endereco).toBe(professorAtualizado.endereco);
    expect(response.body.especialidade).toBe(professorAtualizado.especialidade);
    expect(professores).toContainEqual(response.body);
  });

  it('Deve retornar status 404 se o ID não existir', async () => {
    const professorAtualizado = {
        nome: 'Maria',
        endereco: 'Uniamérica',
        especialidade: 'Teste',
    };
    const response = await request(app).put('/professores/999').send(professorAtualizado);
    expect(response.status).toBe(404);
    });
    });

    describe('DELETE /professores/:id', () => {
        it('Deve excluir um professor existente', async () => {
        const response = await request(app).delete('/professores/1');
        expect(response.status).toBe(204);
        expect(professores).not.toContainEqual({ id: 1 });
    });

    it('Deve retornar status 404 se o ID não existir', async () => {
        const response = await request(app).delete('/professores/999');
        expect(response.status).toBe(404);
        });
    });
