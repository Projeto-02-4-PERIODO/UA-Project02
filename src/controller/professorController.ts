import { Professor } from '../model/professor';

let professores: Professor[] = [
  {
    id: 1,
    nome: 'Jean',
    endereco: 'Uniamérica',
    especialidade: 'BackEnd',
  },
  {
    id: 2,
    nome: 'Maria',
    endereco: 'Uniamérica',
    especialidade: 'Mandar',
  },
];

function getNextId(): number {
  const ids = professores.map((p) => p.id);
  return ids.length > 0 ? Math.max(...ids) + 1 : 1;
}

export function listarProfessores(req, res) {
  res.json(professores);
}

export function buscarProfessor(req, res) {
  const id = parseInt(req.params.id);
  const professor = professores.find((p) => p.id === id);
  if (professor) {
    res.json(professor);
  } else {
    res.status(404).send();
  }
}

export function cadastrarProfessor(req, res) {
  const { nome, endereco, especialidade } = req.body;
  const professor: Professor = {
    id: getNextId(),
    nome,
    endereco,
    especialidade,
  };
  professores.push(professor);
  res.status(201).json(professor);
}

export function editarProfessor(req, res) {
  const id = parseInt(req.params.id);
  const index = professores.findIndex((p) => p.id === id);
  if (index !== -1) {
    const { nome, endereco, especialidade } = req.body;
    professores[index] = { ...professores[index], nome, endereco, especialidade };
    res.json(professores[index]);
  } else {
    res.status(404).send();
  }
}

export function deletarProfessor(req, res) {
  const id = parseInt(req.params.id);
  const index = professores.findIndex((p) => p.id === id);
  if (index !== -1) {
    professores.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
}
