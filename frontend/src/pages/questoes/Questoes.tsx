import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface Materia {
  _id: number;
  nome: string;
}
interface Assunto {
  _id: number;
  nome: string;
  materiaId: number;
}

function Questoes() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [assuntos, setAssuntos] = useState<Assunto[]>([]);
  const [materiaSelecionada, setMateriaSelecionada] = useState("placeholder");
  const [assuntoSelecionado, setAssuntoSelecionado] = useState("placeholder");

  function getMateriaIdByNome(nome: string): number | null {
    const materia = materias.find((m) => m.nome === nome);
    return materia ? materia._id : null;
  }

  useEffect(() => {
    fetch("/materia.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        setMaterias(data.materia);
      })
      .catch((error) => console.error("Erro ao carregar materias:", error));
  }, []);

  useEffect(() => {
    if (materiaSelecionada !== "placeholder") {
      fetch("/assunto.json")
        .then((res) => res.json())
        .then((data) => {
          const assuntosFiltrados = data.assuntos.filter(
            (assunto: Assunto) =>
              assunto.materiaId === getMateriaIdByNome(materiaSelecionada)
          );
          setAssuntos(assuntosFiltrados);
        })
        .catch((error) => console.error("Erro ao carregar assuntos:", error));
    } else {
      setAssuntos([]);
    }
  }, [materiaSelecionada]);

  return (
    <div className="mt-15 p-4 pt-4 bg-white min-h-screen rounded-lg pb-4 shadow">
      <div className="grid grid-cols-12 gap-4 mt-4">
        <h6>Minhas Questões</h6>
      </div>
      <div>
        <form method="POST" action="#" className="flex items-center w-full">
          <input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter a search keyword"
            className="w-full border border-[rgba(1,41,112,0.2)] text-[#012970] text-sm px-2 py-1.5 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
          />
          <button
            type="submit"
            title="Search"
            className="ml-2 px-3 py-2 border-0 bg-[#012970] rounded-full hover:bg-blue-500 transition"
          >
            <Search className="w-4 h-4 text-white" />
          </button>

          <select
            value={materiaSelecionada}
            onChange={(e) => setMateriaSelecionada(e.target.value)}
            className="ml-4 w-72 px-4 py-2 border rounded-lg border-[rgba(1,41,112,0.2)] text-[#012970] text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
          >
            <option value="placeholder" disabled hidden>
              Matéria
            </option>
            {materias.map((materia) => (
              <option key={materia._id} value={materia.nome}>
                {materia.nome}
              </option>
            ))}
          </select>

          <select
            value={assuntoSelecionado}
            onChange={(e) => setAssuntoSelecionado(e.target.value)}
            className="ml-4 min-w-[200px] px-4 py-2 border border-[rgba(1,41,112,0.2)] text-[#012970] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
          >
            <option value="placeholder" disabled hidden>
              Assuntos
            </option>
            {assuntos.map((assuntos) => (
              <option key={assuntos._id} value={assuntos.nome}>
                {assuntos.nome}
              </option>
            ))}
          </select>
        </form>
      </div>
    </div>
  );
}

export default Questoes;
