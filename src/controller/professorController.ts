import { Request, Response } from 'express';
import { Professor, professores } from '../model/professor';

class ProfessorController {
  find(req: Request, res: Response): void {
    const { nome, especialidade } = req.query;
    let results: Professor[] = professores;

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
  }

  async listByCourse(req: Request, res: Response) {
    const { curso } = req.params;
  
    const professores = await Professor.find({
      cursos: curso,
    });
  
    return res.json(professores);
  }
  
  async listByClass(req: Request, res: Response) {
    const { turma } = req.params;
  
    const professores = await Professor.find({
      turmas: turma,
    });
  
    return res.json(professores);
  }
  

  create(req: Request, res: Response): void {
    const { nome, endereco, especialidade } = req.body;

    const professor: Professor = {
      id: professores.length + 1,
      nome,
      endereco,
      especialidade,
    };

    professores.push(professor);

    res.status(201).json(professor);
  }

  update(req: Request, res: Response): void {
    const { id } = req.params;
    const { nome, endereco, especialidade } = req.body;

    const professorIndex = professores.findIndex(
      (professor) => professor.id === parseInt(id)
    );

    if (professorIndex === -1) {
      res.status(404).json({ error: 'Professor not found' });
    }

    professores[professorIndex].nome = nome;
    professores[professorIndex].endereco = endereco;
    professores[professorIndex].especialidade = especialidade;

    res.json(professores[professorIndex]);
  }

  delete(req: Request, res: Response): void {
    const { id } = req.params;

    const professorIndex = professores.findIndex(
      (professor) => professor.id === parseInt(id)
    );

    if (professorIndex === -1) {
      res.status(404).json({ error: 'Professor not found' });
    }

    professores.splice(professorIndex, 1);

    res.status(204).send();
  }
}

export default new ProfessorController();
