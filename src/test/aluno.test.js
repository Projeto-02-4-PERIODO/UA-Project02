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

// describe('AlunoController', () => {
    
  
//     beforeAll(() => {
//         let alunos: Aluno[] = [
//             {
//                 id:1,
//                 nome: 'Maria',
//                 idade: 20,
//                 endereco: 'rua 1'
            
//               }
//         ];
        
//     })
//     test('GET /alunos', async () => {
//         const response = await request(app).get('/alunos');
    
//         expect(response.status).toBe(200);
//         expect(response.body).toHaveLength(3);
//     });
// })


    // const req = {} as Request;
    // const res = {} as Response;
  
    // beforeEach(() => {
    //   jest.clearAllMocks();
    // });
  
    // describe('findByNome', () => {
    //   it('should return all alunos if no name is provided', () => {
    //     const jsonSpy = jest.spyOn(res, 'json');
    //     AlunoController.findByNome(req, res);
    //     expect(jsonSpy).toHaveBeenCalledWith([{
    //       id: 1,
    //       nome: 'João',
    //       idade: 20,
    //       endereco: 'Rua A, 123'
    //     }, {
    //       id: 2,
    //       nome: 'Maria',
    //       idade: 21,
    //       endereco: 'Rua B, 456'
    //     }, {
    //       id: 3,
    //       nome: 'Pedro',
    //       idade: 22,
    //       endereco: 'Rua C, 789'
    //     }]);
    //   });
  
    //   it('should filter alunos by name if a name is provided', () => {
    //     req.query = { nome: 'Maria' };
    //     const jsonSpy = jest.spyOn(res, 'json');
    //     AlunoController.findByNome(req, res);
    //     expect(jsonSpy).toHaveBeenCalledWith([{
    //       id: 2,
    //       nome: 'Maria',
    //       idade: 21,
    //       endereco: 'Rua B, 456'
    //     }]);
    //   });
    // });
  
    
    // beforeEach(() => {
    //   mockReq = {};
    //   mockRes = {
    //     json: jest.fn(),
    //     status: jest.fn().mockReturnThis(),
    //   };
    //   alunos = [      { id: 1, nome: 'João', idade: 20, endereco: 'Rua A, 123' },      { id: 2, nome: 'Maria', idade: 21, endereco: 'Rua B, 456' },      { id: 3, nome: 'Pedro', idade: 22, endereco: 'Rua C, 789' },    ];
    // });
  
    // afterEach(() => {
    //   jest.resetAllMocks();
    // });

    // describe('findAll', () => {
    //   it('should return all students', () => {
    //     AlunoController.findAll(mockReq, mockRes);
    //     expect(mockRes.json).toHaveBeenCalledWith(alunos);
    //   });
    // });
  
    // describe('findByNome', () => {
    //   it('should return all students if no name is provided', () => {
    //     mockReq.query = {};
    //     AlunoController.findByNome(mockReq, mockRes);
    //     expect(mockRes.json).toHaveBeenCalledWith(alunos);
    //   });
  
    //   it('should return students with matching name', () => {
    //     mockReq.query = { nome: 'maria' };
    //     AlunoController.findByNome(mockReq, mockRes);
    //     expect(mockRes.json).toHaveBeenCalledWith([{ id: 2, nome: 'Maria', idade: 21, endereco: 'Rua B, 456' }]);
    //   });
  
    //   it('should return an empty array if no students match the name', () => {
    //     mockReq.query = { nome: 'lucas' };
    //     AlunoController.findByNome(mockReq, mockRes);
    //     expect(mockRes.json).toHaveBeenCalledWith([]);
    //   });
    // });
  
    // describe('findAll', () => {
    //   it('should return all students', () => {
    //     AlunoController.findAll(mockReq, mockRes);
    //     expect(mockRes.json).toHaveBeenCalledWith(alunos);
    //   });
    // });
  
    // describe('create', () => {
    //   it('should create a new student', () => {
    //     const newAluno = { nome: 'Lucas', idade: 23, endereco: 'Rua D, 1010' };
    //     mockReq.body = newAluno;
    //     AlunoController.create(mockReq, mockRes);
    //     expect(mockRes.status).toHaveBeenCalledWith(201);
    //     expect(mockRes.json).toHaveBeenCalledWith({ id: 4, ...newAluno });
    //   });
    // });
  
    // describe('update', () => {
    //   it('should update an existing student', () => {
    //     const updatedAluno = { nome: 'Pedro Silva', idade: 23, endereco: 'Rua C, 789' };
    //     mockReq.params = { id: 3 };
    //     mockReq.body = updatedAluno;
    //     AlunoController.update(mockReq, mockRes);
    //     expect(mockRes.json).toHaveBeenCalledWith({ id: 3, ...updatedAluno });
    //   });
  
    //   it('should return an error if student is not found', () => {
    //     mockReq.params = { id: 4 };
    //     AlunoController.update(mockReq, mockRes);
    //     expect(mockRes.status).toHaveBeenCalledWith(404);
    //     expect(mockRes.json).toHaveBeenCalledWith({ error: 'Aluno not found' });
    //   });
    // });

