// Interface principal de Questão
export interface Questao {
  _id: string; // pode vir do MongoDB ou do banco
  ano: number;
  banca: string;
  instituicao: string;
  materia: string;
  assunto: string;
  enunciado: string;
  alternativas: Alternativa[]; // relação com outra interface
  respostaCorreta: string;
}

// Interface de alternativa
export interface Alternativa {
  letra: string;   // A, B, C, D, E
  texto: string;   // descrição da alternativa
}
