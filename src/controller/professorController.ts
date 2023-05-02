import { Request, Response } from 'express';
import { Professor } from '../model/professor';
import { pool } from '../db';


class ProfessorController {
  async find(req: Request, res: Response): Promise<void> {
    const { nome, especialidade } = req.query;

    try {
      const { rows } = await pool.query('SELECT * FROM professores');

      let results: Professor[] = rows;

      if (nome) {
        results = results.filter((professor) =>
          professor.nome.toLowerCase().includes(nome.toString().toLowerCase())
        );
      }

      if (especialidade) {
        results = results.filter((professor) =>
          professor.especialidade
            .toLowerCase()
            .includes(especialidade.toString().toLowerCase())
        );
      }

      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const { nome, endereco, especialidade } = req.body;

    try {
      const { rows } = await pool.query(
        'INSERT INTO professores (nome, endereco, especialidade) VALUES ($1, $2, $3) RETURNING *',
        [nome, endereco, especialidade]
      );

      const professor: Professor = rows[0];

      res.status(201).json(professor);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { nome, endereco, especialidade } = req.body;

    try {
      const { rows } = await pool.query(
        'UPDATE professores SET nome=$1, endereco=$2, especialidade=$3 WHERE id=$4 RETURNING *',
        [nome, endereco, especialidade, id]
      );

      const professor: Professor = rows[0];

      if (!professor) {
        res.status(404).json({ error: 'Professor not found' });
        return;
      }

      res.json(professor);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const { rowCount } = await pool.query(
        'DELETE FROM professores WHERE id=$1',
        [id]
      );

      if (rowCount === 0) {
        res.status(404).json({ error: 'Professor not found' });
        return;
      }

      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
}

export default new ProfessorController();
