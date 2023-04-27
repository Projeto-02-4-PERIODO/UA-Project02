import express from 'express';
import { listarProfessores, buscarProfessor, cadastrarProfessor, editarProfessor, deletarProfessor } from '../src/controller/professorController';

const router = express.Router();

router.get('/professores', listarProfessores);
router.get('/professores/:id', buscarProfessor);
router.post('/professores', cadastrarProfessor);
router.put('/professores/:id', editarProfessor);
router.delete('/professores/:id', deletarProfessor);

export default router;
