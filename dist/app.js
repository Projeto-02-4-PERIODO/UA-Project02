"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cursoController_1 = __importDefault(require("./src/controller/cursoController"));
// import ProfessorController from './src/controller/professorController';
const router = express_1.default.Router();
const dotenv_1 = __importDefault(require("dotenv"));
require('dotenv').config();
dotenv_1.default.config();
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
router.get('/cursos', cursoController_1.default.findAll);
router.get('/cursos/:nome', cursoController_1.default.findByNome);
router.get('/cursos/:sigla', cursoController_1.default.findBySigla);
router.post('/cursos/create', cursoController_1.default.create);
router.put('/cursos/update/:id', cursoController_1.default.update);
router.delete('/cursos/delete/:id', cursoController_1.default.delete);
// TURMAS
exports.default = router;
