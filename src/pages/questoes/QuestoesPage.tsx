import { useState } from "react";
import FiltroQuestoes from "./FiltroQuestoes";
import ListaQuestoes from "./ListaQuestoes";
import type { Questao } from "../../types/questao";

// MOCK de exemplo (até conectar no backend)
const mockQuestoes: Questao[] = [
  {
    _id: "1",
    ano: 2023,
    banca: "FCC",
    instituicao: "DPE-AM",
    materia: "Direito Administrativo",
    assunto: "Princípios",
    enunciado:
      "O princípio da Administração Pública conhecido coma impessoalidade é aquele que",
    alternativas: [
      {
        letra: "A",
        texto: "exige a previsão legal anteriormente à sua prática.",
      },
      {
        letra: "B",
        texto: "defende que os atos sejam realizados com pessoa jurídica.",
      },
      { letra: "C", 
        texto: "defende que todos os atos sejam publicizados." },
      {
        letra: "D",
        texto: "exige postura neutra, justificada pelo interesse público.",
      },
      { letra: "E", 
        texto: "se realiza em prol de um grupo de pessoas." },
    ],
    respostaCorreta: "D",
  },
  {
    _id: "2",
    ano: 2022,
    banca: "FCC",
    instituicao: "TCE-GO",
    materia: "Direito Administrativo",
    assunto: "Princípios",
    enunciado:
      "Dentre os princípios que regem as atividades da Administração pública, o princípio da",
    alternativas: [
      {
        letra: "A",
        texto: "moralidade sobrepõe-se aos demais, porque tem caráter transversal e pode fundamentar medidas judiciais em função de seu descumprimento.",
      },
      {
        letra: "B",
        texto: "eficiência não encontra expresso amparo constitucional, mas é deduzido pela interpretação sistemática e finalística dos demais princípios de status supra legais.",
      },
      { letra: "C", 
        texto: "impessoalidade informa todos os órgãos e pessoas que compõem a estrutura administrativa, impedindo a prévia identificação dos agentes públicos, para evitar constrangimentos e revelação de conflitos de interesses." },
      {
        letra: "D",
        texto: "publicidade foi alçado à categoria de único princípio absoluto após a edição da Lei de Acesso à Informação. ",
      },
      { letra: "E", 
        texto: "legalidade apresenta diferentes acepções, dentre elas a circunscrição de matérias reservadas à expressa disciplina por lei formal." },
    ],
    respostaCorreta: "E",
  }
];

export default function QuestoesPage() {
  const [questoes, setQuestoes] = useState<Questao[]>(mockQuestoes);

  // quando tiver backend, o setQuestoes vai receber o retorno da API com os filtros
  return (
    <div className="p-4 pt-4 bg-white rounded-lg pb-4 shadow">
      <div className="mt-4 bg-white rounded-lg pb-4 shadow">
        <FiltroQuestoes onFiltrar={(params) => console.log(params)} />
        <ListaQuestoes questoes={questoes} />
      </div>
    </div>
  );
}
