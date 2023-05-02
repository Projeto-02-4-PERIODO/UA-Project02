import { Request, Response } from 'express';
import { Turma } from '../model/turma';

class turmaController{
  async getAllTurmas (req: Request, res: Response)  {
    try {
      const turmas = await Turma.findAll();
      res.json(turmas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createTurma(req: Request, res: Response) {
    try {
      const turma = await Turma.create(req.body);
      res.json(turma);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateTurma(req: Request, res: Response){
    try {
      const turma = await Turma.findByPk(req.params.id);
      if (!turma) {
        return res.status(404).json({ message: 'Turma not found' });
      }
      await turma.update(req.body);
      res.json(turma);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteTurma(req: Request, res: Response){
    try {
      const turma = await Turma.findByPk(req.params.id);
      if (!turma) {
        return res.status(404).json({ message: 'Turma not found' });
      }
      await turma.destroy();
      res.json({ message: 'Turma deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
export default new turmaController();