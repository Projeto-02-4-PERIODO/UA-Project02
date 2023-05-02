import express from 'express';
import cursoController from './src/controller/cursoController';
// import ProfessorController from './src/controller/professorController';

const router = express.Router();

import dotenv from 'dotenv';

require('dotenv').config();
dotenv.config();

// PROFESSOR
// router.get('/professores', ProfessorController.find);
// router.get('/professores/curso/:curso', ProfessorController.listByCourse);
// router.get('/professores/turma/:turma', ProfessorController.listByClass);
// router.post('/professores', ProfessorController.create);
// router.put('/professores/:id', ProfessorController.update);
// router.delete('/professores/:id', ProfessorController.delete);

// ALUNOS
// router.get('/cursos', AlunoController.findAll);
// router.get('/alunos/:nome', AlunoController.findByNome);
// router.post('/alunos/create', AlunoController.create);
// router.put('/alunos/update/:id', AlunoController.update);
// router.delete('/alunos/delete/:id', AlunoController.delete);


// CURSOS

router.get('/cursos', cursoController.findAll);
router.get('/cursos/:nome', cursoController.findByNomeESigla);
router.post('/cursos/create', cursoController.create);
router.put('/cursos/update/:id', cursoController.update);
router.delete('/cursos/delete/:id', cursoController.delete);


// TURMAS


export default router;