"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const professorController_1 = __importDefault(require("./controller/professorController"));
const turmaController_1 = __importDefault(require("./controller/turmaController"));
const router = express_1.default.Router();
// PROFESSOR
router.get('/professores', professorController_1.default.find);
router.post('/professores', professorController_1.default.create);
router.put('/professores/:id', professorController_1.default.update);
router.delete('/professores/:id', professorController_1.default.delete);
// ALUNOS
// CURSOS
// TURMAS
router.get('/turmas', turmaController_1.default.getAllTurmas);
router.post('/turmas', turmaController_1.default.createTurma);
router.put('/turmas/:id', turmaController_1.default.updateTurma);
router.delete('/turmas/:id', turmaController_1.default.deleteTurma);
exports.default = router;
