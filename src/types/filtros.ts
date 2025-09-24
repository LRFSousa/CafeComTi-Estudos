// Representa uma banca organizadora
export interface Banca {
  _id: string;
  nome: string;
}

// Representa uma matéria
export interface Materia {
  _id: string;
  nome: string;
}

// Representa um assunto
export interface Assunto {
  _id: string;
  nome: string;
  materiaId: string; // ligação com a matéria
}

// Representa ano
export interface Ano {
  _id: number;   // ex: 2023
  valor: number; // ex: 2023
}

// Representa instituição/órgão
export interface Instituicao {
  _id: string;
  nome: string;
}
