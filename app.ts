import express from 'express';


const router = express.Router();

import dotenv from 'dotenv';
import AlunoController from './src/controller/AlunoController';
import turmaController from './src/controller/turmaController';
import professorController from './src/controller/professorController';

require('dotenv').config();
dotenv.config();

// PROFESSOR
router.get('/professores', professorController.find);
router.post('/professores', professorController.create);
router.put('/professores/:id', professorController.update);
router.delete('/professores/:id', professorController.delete);

// ALUNOS
router.get('/alunos', AlunoController.findAll);
router.get('/alunos/:nome', AlunoController.findByNome);
router.post('/alunos/create', AlunoController.create);
router.put('/alunos/update/:id', AlunoController.update);
router.delete('/alunos/delete/:id', AlunoController.delete);

// CURSOS


// TURMAS
router.get('/turmas', turmaController.getAllTurmas);
router.post('/turmas', turmaController.createTurma);
router.put('/turmas/:id', turmaController.updateTurma);
router.delete('/turmas/:id', turmaController.deleteTurma);


export default router;
