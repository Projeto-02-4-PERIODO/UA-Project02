"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const professor_1 = require("../model/professor");
class ProfessorController {
    find(req, res) {
        const { nome, especialidade } = req.query;
        let results = professor_1.professores;
        if (nome) {
            results = results.filter((professor) => professor.nome.toLowerCase().includes(nome.toString().toLowerCase()));
        }
        if (especialidade) {
            results = results.filter((professor) => professor.especialidade
                .toLowerCase()
                .includes(especialidade.toString().toLowerCase()));
        }
        res.json(results);
    }
    create(req, res) {
        const { nome, endereco, especialidade } = req.body;
        const professor = {
            id: professor_1.professores.length + 1,
            nome,
            endereco,
            especialidade,
        };
        professor_1.professores.push(professor);
        res.status(201).json(professor);
    }
    update(req, res) {
        const { id } = req.params;
        const { nome, endereco, especialidade } = req.body;
        const professorIndex = professor_1.professores.findIndex((professor) => professor.id === parseInt(id));
        if (professorIndex === -1) {
            res.status(404).json({ error: 'Professor not found' });
        }
        professor_1.professores[professorIndex].nome = nome;
        professor_1.professores[professorIndex].endereco = endereco;
        professor_1.professores[professorIndex].especialidade = especialidade;
        res.json(professor_1.professores[professorIndex]);
    }
    delete(req, res) {
        const { id } = req.params;
        const professorIndex = professor_1.professores.findIndex((professor) => professor.id === parseInt(id));
        if (professorIndex === -1) {
            res.status(404).json({ error: 'Professor not found' });
        }
        professor_1.professores.splice(professorIndex, 1);
        res.status(204).send();
    }
}
exports.default = new ProfessorController();
