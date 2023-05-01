import { Aluno } from '../model/Aluno';
import express, { Request, Response } from 'express';
import { pool } from '../db';

// pool.query(`
// CREATE TABLE sua_tabela (
//   id SERIAL PRIMARY KEY,
//   nome VARCHAR(255),
//   idade INTEGER
// );
// `, (err, res) => {
// console.log(err, res);
// pool.end(); // encerra a conexão após a consulta
// });

// // MySQL
// connection.query(`
// CREATE TABLE sua_tabela (
//   id INT PRIMARY KEY AUTO_INCREMENT,
//   nome VARCHAR(255),
//   idade INTEGER
// );
// `, (err, res) => {
// console.log(err, res);
// connection.end(); // encerra a conexão após a consulta
// });


class AlunoController{
    
    async findByNome(req: express.Request, res: express.Response){
        const { nome } = req.query;
        
        try{
            const { rows } = await pool.query('SELECT * FROM tb_alunos WHERE nome=$1',
            [nome]);
            let resultado: Aluno[] = rows;
            console.log("aqui  1")

            
            // if(1+1 == 2){
            //     resultado = resultado.filter((alunos) => {
            //         alunos.nome.toLowerCase().includes(nome.toString().toLowerCase());
            //     })
            // }

            
            // if (nome){
            //         console.log("aqui 2 ")
            //         resultado = resultado.filter((alunos) => {
            //             alunos.nome.toLowerCase().includes(nome.toString().toLowerCase());
            // });
            
            // }
            res.json(resultado);
            console.log("aqui 3")
            
        }catch (error){
            console.log(error);
            res.status(500).send('Internal Server Error');
        }

    }

    async findAll(req: express.Request, res: express.Response){
        const { rows } = await pool.query('SELECT * FROM tb_alunos');
        let resultado: Aluno[] = rows;
        
        res.json(resultado);
       
    }

    async create(req: express.Request, res: express.Response){
        const { nome, idade, endereco } = req.body;

        try{
            const { rows } = await pool.query(
                'INSERT INTO tb_alunos (nome, endereco, idade) VALUES ($1, $2, $3) RETURNING *', 
                [nome, endereco, idade]
                );

                const aluno: Aluno = rows[0];
                res.status(201).json(aluno);

        }catch(error){
            console.log(error);
            res.status(500).send('Internal Server Error');
        }

        // let aluno: Aluno = {
        //     id: alunos.length +1,
        //     nome,
        //     idade,
        //     endereco
        // };

        // alunos.push(aluno);
        // res.status(201).json(aluno);
    }

    async update(req: express.Request, res: express.Response){
        const { id } = req.params;
        const { nome, idade, endereco } = req.body;

        try{
            const { rows } = await pool.query( //  ? rows ?
                'UPDATE tb_alunos SET nome=$1, endereco=$2, idade$3 WHERE id=$4 RETURNING *',
                [nome, endereco, idade, id]
            );
            const aluno: Aluno = rows[0]; //?

            if(!aluno){
                res.status(404).json({error: 'Aluno not found'});
                return;
            }

            res.json(aluno);

        }catch(error){
            console.log(error);
            res.status(500).send('Internal Server Error');
        }

        // const alunoIndex = alunos.findIndex(
        //     (aluno) => aluno.id === parseInt(id)
        // );

        // if(alunoIndex === -1){
        //     res.status(404).json({error: 'Aluno not found'});
        // }

        // alunos[alunoIndex].nome = nome;
        // alunos[alunoIndex].idade = idade;
        // alunos[alunoIndex].endereco = endereco;

        // res.json(alunos[alunoIndex]);
    }    

    async delete(req: express.Request, res: express.Response){
        const { id } = req.params;

        try{
            const { rowCount } = await pool.query(
                'DELETE FROM tb_alunos WHERE id=$1', 
                [id]
            );

            if(rowCount === 0){
                res.status(404).json({error: 'Aluno not found'})
                return;
            }

            res.status(204).send();

        }catch(error){
            console.log(error);
            res.status(500).send('Internal Server Error')
        }

        // const alunoIndex = alunos.findIndex(
        //     (aluno) => aluno.id === parseInt(id)
        // );

        // if(alunoIndex === -1){
        //     res.status(404).json({error: 'Aluno not found'});
        // }
        // alunos.splice(alunoIndex, 1);
        // res.status(204).send();
        // res.json()
        // res.json(alunos[alunoIndex]);

    }
    // listarPorTurma(req, res){

    // }
}  
       
export default new AlunoController();

    
