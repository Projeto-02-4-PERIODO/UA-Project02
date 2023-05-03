import { Request, Response } from 'express';
import { Professor } from '../model/professor';
import { pool } from '../db';


class ProfessorController {

  async findAll(req: Request, res: Response){
    const { rows } = await pool.query('SELECT * FROM professores');
    let resultado: Professor[] = rows;
    
    res.json(resultado);
   
}

  async find(req: Request, res: Response): Promise<Response> {
    const { nome, especialidade } = req.body;

    try {
      const { rows } = await pool.query<Professor>(
        'SELECT * FROM professores p WHERE p.nome ILIKE $1 OR p.especialidade ILIKE $2',
        [`%${nome}%`, `%${especialidade}%`]
      );
      return res.status(200).json(rows);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
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
