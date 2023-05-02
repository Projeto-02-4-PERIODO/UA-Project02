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
const db_1 = require("../../db");
class cursoController {
    findByNome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome } = req.query;
            try {
                const { rows } = yield db_1.pool.query('SELECT * FROM cursos');
                let resultados = rows;
                if (nome) {
                    resultados = resultados.filter((curso) => curso.nome.toLowerCase().includes(nome.toString().toLowerCase()));
                }
                res.json(resultados);
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    findBySigla(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { sigla } = req.query;
            try {
                const { rows } = yield db_1.pool.query('SELECT * FROM tb_cursos');
                let resultados = rows;
                if (sigla) {
                    resultados = resultados.filter((curso) => curso.sigla.toLowerCase().includes(sigla.toString().toLowerCase()));
                }
                res.json(resultados);
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield db_1.pool.query('SELECT * FROM cursos');
            let resultados = rows;
            res.json(resultados);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, sigla } = req.body;
            try {
                const { rows } = yield db_1.pool.query('INSERT INTO tb_cursos (nome, sigla) VALUES ($1, $2) RETURNING *', [nome, sigla]);
                const curso = rows[0];
                res.status(201).json(curso);
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nome, sigla } = req.body;
            try {
                const { rows } = yield db_1.pool.query('UPDATE cursos SET nome=$1, sigla=$2 WHERE id=$3 RETURNING *', [nome, sigla, id]);
                const curso = rows[0];
                if (!curso) {
                    res.status(404).json({ error: 'Curso not found' });
                    return;
                }
                res.json(curso);
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const { rowCount } = yield db_1.pool.query('DELETE FROM cursos WHERE id=$1', [id]);
                if (rowCount === 0) {
                    res.status(404).json({ error: 'Curso not found' });
                    return;
                }
                res.status(204).send();
            }
            catch (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            }
        });
    }
}
exports.default = new cursoController();
