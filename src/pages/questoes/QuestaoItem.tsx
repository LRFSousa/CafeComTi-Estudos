import { useState } from "react";
import type { Questao } from "../../types/questao";

interface QuestaoItemProps {
  questao: Questao;
}

export default function QuestaoItem({ questao }: QuestaoItemProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [resultado, setResultado] = useState<"certo" | "errado" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(e.target.value);
    setResultado(null); // resetar feedback
  };

  const handleValidar = () => {
    if (!selected) return;
    if (selected === questao.respostaCorreta) {
      setResultado("certo");
    } else {
      setResultado("errado");
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm bg-white">
      {/* Cabeçalho */}
      <div className="flex flex-wrap justify-between items-center text-sm text-gray-600 gap-4 mb-2">
        <div className="flex flex-wrap gap-4">
          <span>
            <strong>Ano:</strong> {questao.ano}
          </span>
          <span>
            <strong>Banca:</strong> {questao.banca}
          </span>
          <span>
            <strong>Instituição:</strong> {questao.instituicao}
          </span>
          <span>
            <strong>Matéria:</strong> {questao.materia}
          </span>
          <span>
            <strong>Assunto:</strong> {questao.assunto}
          </span>
        </div>

        {/* Feedback no canto direito */}
        {resultado && (
          <div
            className={`px-3 py-1 rounded-lg font-semibold border shadow-sm
      ${
        resultado === "certo"
          ? "bg-green-100 text-green-700 border-green-400"
          : "bg-red-100 text-red-700 border-red-400"
      }`}
          >
            {resultado === "certo" ? "✅ Correta" : "❌ Errada"}
          </div>
        )}
      </div>

      {/* Enunciado */}
      <div className="mb-4">
        <p className="text-justify">{questao.enunciado}</p>
      </div>

      {/* Alternativas */}
      <ul className="space-y-3" role="radiogroup" aria-label="Alternativas">
        {questao.alternativas.map((alt) => {
          // lógica para cores
          let alternativaClasse = "";
          if (resultado) {
            if (alt.letra === questao.respostaCorreta) {
              alternativaClasse = "bg-green-100 border-green-500";
            } else if (
              alt.letra === selected &&
              selected !== questao.respostaCorreta
            ) {
              alternativaClasse = "bg-red-100 border-red-500";
            }
          }

          return (
            <li key={alt.letra}>
              <label htmlFor={`${questao._id}-${alt.letra}`} className="block">
                <input
                  id={`${questao._id}-${alt.letra}`}
                  type="radio"
                  name={questao._id}
                  value={alt.letra}
                  onChange={handleChange}
                  checked={selected === alt.letra}
                  className="peer sr-only"
                  disabled={!!resultado} // trava após validar
                />

                <div
                  className={`flex items-start gap-4 p-2 rounded-lg border cursor-pointer transition-colors
                              hover:bg-gray-100 peer-checked:bg-blue-50 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-300
                              ${alternativaClasse}`}
                >
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-gray-400
                               font-semibold text-gray-700
                               peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white"
                  >
                    {alt.letra}
                  </span>
                  <div className="text-gray-700">{alt.texto}</div>
                </div>
              </label>
            </li>
          );
        })}
      </ul>

      {/* Botão */}
      <button
        onClick={handleValidar}
        disabled={!selected || !!resultado}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400"
      >
        Responder
      </button>
    </div>
  );
}
