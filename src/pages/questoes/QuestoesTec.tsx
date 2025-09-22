import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, X } from "lucide-react";

interface Materia {
  _id: number;
  nome: string;
}

interface Assunto {
  _id: number;
  nome: string;
  materiaId: number;
}

interface Banca {
  _id: number;
  nome: string;
}

export default function CollapsibleExample() {
  // Controle de colapsáveis (opcional)
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  // Dados
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [assuntos, setAssuntos] = useState<Assunto[]>([]);
  const [bancas, setBancas] = useState<Banca[]>([]);

  // Estado para controlar o que está selecionado no menu da primeira coluna
  // Pode ser "materia" ou "banca"
  const [menuSelecionado, setMenuSelecionado] = useState<"materia" | "banca">(
    "materia"
  );

  // Estados para seleção da matéria ou banca que será exibida na segunda coluna
  const [materiaSelecionada, setMateriaSelecionada] = useState<number | null>(
    null
  );
  const [bancaSelecionada, setBancaSelecionada] = useState<number | null>(null);

  // Estados para armazenar os assuntos selecionados e bancas selecionadas
  const [assuntosSelecionados, setAssuntosSelecionados] = useState<Assunto[]>(
    []
  );
  const [bancasSelecionadas, setBancasSelecionadas] = useState<Banca[]>([]);

  // Carregar matérias
  useEffect(() => {
    fetch("/materia.json")
      .then((res) => res.json())
      .then((data) => {
        setMaterias(data.materia);
      })
      .catch((error) => console.error("Erro ao carregar materias:", error));
  }, []);

  // Carregar assuntos quando muda matériaSelecionada
  useEffect(() => {
    if (materiaSelecionada !== null) {
      fetch("/assunto.json")
        .then((res) => res.json())
        .then((data) => {
          const assuntosFiltrados = data.assuntos.filter(
            (assunto: Assunto) => assunto.materiaId === materiaSelecionada
          );
          setAssuntos(assuntosFiltrados);
        })
        .catch((error) => console.error("Erro ao carregar assuntos:", error));
    } else {
      setAssuntos([]);
    }
  }, [materiaSelecionada]);

  // Carregar bancas
  useEffect(() => {
    fetch("/banca.json")
      .then((res) => res.json())
      .then((data) => {
        setBancas(data.banca);
      })
      .catch((error) => console.error("Erro ao carregar bancas:", error));
  }, []);

  // Funções para selecionar/remover assuntos e bancas
  const toggleAssuntoSelecionado = (assunto: Assunto) => {
    setAssuntosSelecionados((prev) => {
      if (prev.some((a) => a._id === assunto._id)) {
        return prev.filter((a) => a._id !== assunto._id);
      } else {
        return [...prev, assunto];
      }
    });
  };

  const removerAssunto = (assunto: Assunto) => {
    setAssuntosSelecionados((prev) =>
      prev.filter((a) => a._id !== assunto._id)
    );
  };

  const toggleBancaSelecionada = (banca: Banca) => {
    setBancasSelecionadas((prev) => {
      if (prev.some((b) => b._id === banca._id)) {
        return prev.filter((b) => b._id !== banca._id);
      } else {
        return [...prev, banca];
      }
    });
  };

  const removerBancaSelecionada = (banca: Banca) => {
    setBancasSelecionadas((prev) => prev.filter((b) => b._id !== banca._id));
  };

  return (
    <div className="mt-15 p-4 bg-white min-h-screen rounded-lg shadow">
      <div className="grid grid-cols-[200px_1fr_1fr] gap-4 mt-4 min-h-[200px]">
        {/* Coluna 1: Menu com opções */}
        <div className="border rounded p-4 space-y-4">
          {/* Opção Matéria / Assunto */}
          <button
            className={`block w-full text-left px-2 py-2 rounded hover:bg-blue-100 ${
              menuSelecionado === "materia" ? "bg-blue-200" : ""
            }`}
            onClick={() => {
              setMenuSelecionado("materia");
              // Limpa seleção de banca para evitar conflitos
              setBancaSelecionada(null);
            }}
          >
            Matéria / Assunto
          </button>

          {/* Opção Banca */}
          <button
            className={`block w-full text-left px-2 py-2 rounded hover:bg-blue-100 ${
              menuSelecionado === "banca" ? "bg-blue-200" : ""
            }`}
            onClick={() => {
              setMenuSelecionado("banca");
              // Limpa seleção de matéria para evitar conflitos
              setMateriaSelecionada(null);
            }}
          >
            Banca
          </button>

          {/* Você pode adicionar aqui mais opções como Órgão/Cargo, Ano, etc */}
        </div>

        {/* Coluna 2: Conteúdo dinâmico dependendo da opção selecionada */}

        <div className="border rounded p-2 overflow-auto max-h-[600px]">
          {menuSelecionado === "materia" && (
            <>
              <Collapsible open={open1} onOpenChange={setOpen1}>
                <span>Matérias</span>

                <CollapsibleContent className="mt-2 space-y-1">
                  {materias.map((materia) => (
                    <div key={materia._id}>
                      <button
                        className={`block w-full text-left px-2 py-1 rounded hover:bg-blue-100 ${
                          materiaSelecionada === materia._id
                            ? "bg-blue-200"
                            : ""
                        }`}
                        onClick={() =>
                          setMateriaSelecionada(
                            materiaSelecionada === materia._id
                              ? null
                              : materia._id
                          )
                        }
                      >
                        {materia.nome}
                      </button>

                      {/* Mostrar assuntos só da matéria selecionada */}
                      {materiaSelecionada === materia._id &&
                        assuntos.length > 0 && (
                          <div className="mt-2 pl-4 border-l">
                            {assuntos.map((assunto) => (
                              <button
                                key={assunto._id}
                                onClick={() =>
                                  toggleAssuntoSelecionado(assunto)
                                }
                                className={`block w-full text-left px-2 py-1 rounded text-sm ${
                                  assuntosSelecionados.some(
                                    (a) => a._id === assunto._id
                                  )
                                    ? "bg-green-200"
                                    : "hover:bg-gray-200"
                                }`}
                              >
                                {assunto.nome}
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </>
          )}

          {menuSelecionado === "banca" && (
            <>
              <Collapsible open={open2} onOpenChange={setOpen2}>
                <span>Bancas</span>

                <CollapsibleContent className="mt-2 space-y-1 max-h-[400px] overflow-auto">
                  {bancas.map((banca) => (
                    <button
                      key={banca._id}
                      onClick={() => toggleBancaSelecionada(banca)}
                      className={`block w-full text-left px-2 py-1 rounded text-sm ${
                        bancasSelecionadas.some((b) => b._id === banca._id)
                          ? "bg-green-200"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {banca.nome}
                    </button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            </>
          )}
        </div>

        {/* Coluna 3: Itens selecionados */}
        <div className="border rounded p-2 overflow-auto max-h-[600px]">
          {assuntosSelecionados.length === 0 &&
          bancasSelecionadas.length === 0 ? (
            <p className="text-gray-400 text-sm">Nenhum item selecionado</p>
          ) : (
            <>
              {/* Assuntos selecionados */}
              {assuntosSelecionados.map((assunto) => (
                <div
                  key={assunto._id}
                  className="flex items-center p-1 bg-green-50 rounded mb-1"
                >
                  <X
                    className="w-4 h-4 mr-2 text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => removerAssunto(assunto)}
                  />
                  {assunto.nome}
                </div>
              ))}

              {/* Bancas selecionadas */}
              {bancasSelecionadas.map((banca) => (
                <div
                  key={banca._id}
                  className="flex items-center p-1 bg-green-50 rounded mb-1"
                >
                  <X
                    className="w-4 h-4 mr-2 text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => removerBancaSelecionada(banca)}
                  />
                  {banca.nome}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
