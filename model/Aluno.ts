//-----------  definindo a model para Aluno  ------------
export interface Aluno{

  id: number;
  nome: string;
  idade: number;
  endereco: string;
  // turmaId: Turma[];
}
export let alunos: Aluno[] = [
  {
    id:1,
    nome: 'Maria',
    idade: 20,
    endereco: 'rua 1'

  },
  {
    id:2,
    nome: 'Eduardo',
    idade: 18,
    endereco: 'rua 2'

  }
];
//-------------------------------------------------------