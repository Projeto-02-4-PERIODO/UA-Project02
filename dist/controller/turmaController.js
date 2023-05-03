"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const turma_1 = require("../model/turma");
class turmaController {
    getAllTurmas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const turmas = yield turma_1.Turma.findAll();
                res.json(turmas);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    createTurma(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const turma = yield turma_1.Turma.create(req.body);
                res.json(turma);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    updateTurma(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const turma = yield turma_1.Turma.findByPk(req.params.id);
                if (!turma) {
                    return res.status(404).json({ message: 'Turma not found' });
                }
                yield turma.update(req.body);
                res.json(turma);
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    deleteTurma(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const turma = yield turma_1.Turma.findByPk(req.params.id);
                if (!turma) {
                    return res.status(404).json({ message: 'Turma not found' });
                }
                yield turma.destroy();
                res.json({ message: 'Turma deleted successfully' });
            }
            catch (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.default = new turmaController();
