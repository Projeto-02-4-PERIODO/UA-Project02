import { Curso } from '../models/cursoModel';
import express from 'express';
import { pool } from '../../db';


class cursoController{

    async findByNome(req: express.Request, res: express.Response){
        const { nome } = req.query;

        try{
          const { rows } = await pool.query('SELECT * FROM cursos');
          let resultados: Curso[] = rows;

          if(nome){
            resultados = resultados.filter((curso) =>
              curso.nome.toLowerCase().includes(nome.toString().toLowerCase())
            );
          }
          res.json(resultados);
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }        
    }

    async findBySigla(req: express.Request, res: express.Response){
      const { sigla } = req.query;

      try{
        const { rows } = await pool.query('SELECT * FROM cursos');
        let resultados: Curso[] = rows;

        if(sigla){
          resultados = resultados.filter((curso) =>
            curso.sigla.toLowerCase().includes(sigla.toString().toLowerCase())
          );
        }
        res.json(resultados);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }        
  }

    async findAll(req: express.Request, res: express.Response){

      const { rows } = await pool.query('SELECT * FROM cursos');
      let resultados: Curso[] = rows;
      res.json(resultados);
       
    }

    async create(req: express.Request, res: express.Response){
        const { nome, sigla } = req.body;

        try {
          const { rows } = await pool.query(
            'INSERT INTO cursos (nome, sigla) VALUES ($1, $2) RETURNING *',
            [nome, sigla]
          );
          const curso: Curso = rows[0];

          res.status(201).json(curso);
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
      }

    async update(req: express.Request, res: express.Response){
        const { id } = req.params;
        const { nome, sigla } = req.body;

        try {
          const { rows } = await pool.query(
            'UPDATE cursos SET nome=$1, sigla=$2 WHERE id=$3 RETURNING *',
            [nome, sigla, id]
          );
    
          const curso: Curso = rows[0];
    
          if (!curso) {
            res.status(404).json({ error: 'Curso not found' });
            return;
          }
    
          res.json(curso);
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
    }    

    async delete(req: express.Request, res: express.Response){
        const { id } = req.params;

        try {
          const { rowCount } = await pool.query(
            'DELETE FROM cursos WHERE id=$1',
            [id]
          );
    
          if (rowCount === 0) {
            res.status(404).json({ error: 'Curso not found' });
            return;
          }
    
          res.status(204).send();
        } catch (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        }
    }
}
  
export default new cursoController();

    