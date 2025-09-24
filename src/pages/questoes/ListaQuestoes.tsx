import type { Questao } from "../../types/questao";
import QuestaoItem from "./QuestaoItem";

interface ListaQuestoesProps {
  questoes: Questao[];
}

export default function ListaQuestoes({ questoes }: ListaQuestoesProps) {
  if (questoes.length === 0) {
    return <p>Nenhuma questão encontrada</p>;
  }

  return (
    <div className="p-4 space-y-2">
      {questoes.map((q) => (
        <QuestaoItem key={q._id} questao={q} />
      ))}
    </div>
  );
}
