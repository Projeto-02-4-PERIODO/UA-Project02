import express from 'express';
import AlunoController from './controller/AlunoController';
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
router.get('/alunos', AlunoController.findAll);
router.get('/alunos/:nome', AlunoController.findByNome);
router.post('/alunos/create', AlunoController.create);
router.put('/alunos/update/:id', AlunoController.update);
router.delete('/alunos/delete/:id', AlunoController.delete);


// CURSOS


// TURMAS


export default router;