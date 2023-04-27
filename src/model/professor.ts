export interface Professor {
  id: number;
  nome: string;
  endereco: string;
  especialidade: string;
}

export let professores: Professor[] = [
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