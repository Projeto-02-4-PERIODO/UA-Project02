import { Aluno, alunos } from '../model/Aluno';
import express from 'express';


class AlunoController{

    findByNome(req: express.Request, res: express.Response){
        const { nome } = req.query;
        let resultado: Aluno[] = alunos;

        if (nome){
            resultado = resultado.filter((alunos) => {
                alunos.nome.toLowerCase().includes(nome.toString().toLowerCase());
            });
        
        }
        res.json(resultado);
    }

    findAll(req: express.Request, res: express.Response){
        let resultado: Aluno[] = alunos;
        res.json(resultado);
       
    }

    create(req: express.Request, res: express.Response){
        const { nome, idade, endereco } = req.body;

        let aluno: Aluno = {
            id: alunos.length +1,
            nome,
            idade,
            endereco
        };

        alunos.push(aluno);
        res.status(201).json(aluno);
    }

    update(req: express.Request, res: express.Response){
        const { id } = req.params;
        const { nome, idade, endereco } = req.body;

        const alunoIndex = alunos.findIndex(
            (aluno) => aluno.id === parseInt(id)
        );

        if(alunoIndex === -1){
            res.status(404).json({error: 'Aluno not found'});
        }

        alunos[alunoIndex].nome = nome;
        alunos[alunoIndex].idade = idade;
        alunos[alunoIndex].endereco = endereco;

        res.json(alunos[alunoIndex]);
    }    

    delete(req: express.Request, res: express.Response){
        const { id } = req.params;

        const alunoIndex = alunos.findIndex(
            (aluno) => aluno.id === parseInt(id)
        );

        if(alunoIndex === -1){
            res.status(404).json({error: 'Aluno not found'});
        }
        alunos.splice(alunoIndex, 1);
        res.status(204).send();
        res.json()
        // res.json(alunos[alunoIndex]);

    }
    // listarPorTurma(req, res){

    // }
}  
       
export default new AlunoController();

    
