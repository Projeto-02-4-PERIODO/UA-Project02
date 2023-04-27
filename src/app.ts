import express from 'express';
import ProfessorController from '../src/controller/professorController';

const router = express.Router();

// PROFESSOR
router.get('/professores', ProfessorController.find);
router.post('/professores', ProfessorController.create);
router.put('/professores/:id', ProfessorController.update);
router.delete('/professores/:id', ProfessorController.delete);

// ALUNOS


// CURSOS


// TURMAS


export default router;
