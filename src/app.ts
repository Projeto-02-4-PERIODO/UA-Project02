import express from 'express';
import ProfessorController from './controller/professorController';
import AlunoController from './controller/AlunoController';
import  turmaController  from './controller/turmaController';
import cursoController from './controller/cursoController';

const router = express.Router();

// PROFESSOR
router.get('/professores', ProfessorController.find);
router.post('/professores', ProfessorController.create);
router.put('/professores/:id', ProfessorController.update);
router.delete('/professores/:id', ProfessorController.delete);

// ALUNOS
router.get('/alunos', AlunoController.findAll);
router.get('/alunos/:nome', AlunoController.findByNome);
router.post('/alunos/create', AlunoController.create);
router.put('/alunos/update/:id', AlunoController.update);
router.delete('/alunos/delete/:id', AlunoController.delete);

// CURSOS

router.get('/cursos', cursoController.findAll);
router.get('/cursos/:nome', cursoController.findByNomeESigla);
router.post('/cursos/create', cursoController.create);
router.put('/cursos/update/:id', cursoController.update);
router.delete('/cursos/delete/:id', cursoController.delete);

// TURMAS
router.get('/turmas', turmaController.getAllTurmas);
router.post('/turmas', turmaController.createTurma);
router.put('/turmas/:id', turmaController.updateTurma);
router.delete('/turmas/:id', turmaController.deleteTurma);
router.get('/turmas/buscarPorAno/:ano', turmaController.getTurmaByAno);
router.get('/turmas/buscarPorSemestre/:semestre', turmaController.getTurmaBySemestre);


export default router;
