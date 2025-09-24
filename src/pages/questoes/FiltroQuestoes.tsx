import {
  Check,
  ChevronDown,
  Search,
} from "lucide-react";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
  materiaId: number;
}

interface Instituicao {
  _id: number;
  nome: string;
}

interface Instituicoes_especificas {
  _id: number;
  nome: string;
  instituicaoId: number;
}

interface Anos {
  _id: number;
  valor: number;
}

function Questoes() {
  const [open, setOpen] = useState(false);

  // -------------------- Matérias -------------------------
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [materiasSelecionadas, setMateriasSelecionadas] = useState<number[]>(
    []
  );
  useEffect(() => {
    fetch("/materia.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        setMaterias(data.materia);
      })
      .catch((error) => console.error("Erro ao carregar materias:", error));
  }, []);

  const toggleMateria = (id: number) => {
    setMateriasSelecionadas((prev) => {
      const newMaterias = prev.includes(id)
        ? prev.filter((m) => m !== id)
        : [...prev, id];

      // Atualiza os assuntos selecionados
      if (prev.includes(id)) {
        // matéria foi removida, então remover assuntos relacionados a ela
        setAssuntosSelecionados((prevAssuntos) =>
          prevAssuntos.filter(
            (assuntoId) =>
              !assuntos.some(
                (assunto) =>
                  assunto._id === assuntoId && assunto.materiaId === id
              )
          )
        );
      }
      return newMaterias;
    });
  };

  // -------------------- Assuntos -------------------------
  const [assuntos, setAssuntos] = useState<Assunto[]>([]);
  const [assuntosSelecionados, setAssuntosSelecionados] = useState<number[]>(
    []
  );

  useEffect(() => {
    if (materiasSelecionadas.length > 0) {
      fetch("/assunto.json")
        .then((res) => res.json())
        .then((data) => {
          const assuntosFiltrados = data.assuntos.filter((assunto: Assunto) =>
            materiasSelecionadas.includes(assunto.materiaId)
          );
          setAssuntos(assuntosFiltrados);
        })
        .catch((error) => console.error("Erro ao carregar assuntos:", error));
    } else {
      setAssuntos([]);
    }
  }, [materiasSelecionadas]);

  const toggleAssunto = (id: number) => {
    setAssuntosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // -------------------- Bancas -------------------------
  const [bancas, setBancas] = useState<Banca[]>([]);
  const [bancasSelecionadas, setBancasSelecionadas] = useState<number[]>([]);
  //const [openBanca, setOpenBanca] = useState(false); // controle do popover de anos

  useEffect(() => {
    fetch("/banca.json")
      .then((res) => res.json())
      .then((data) => setBancas(data.banca))
      .catch((err) => console.error("Erro ao carregar bancas:", err));
  }, []);

  const toggleBanca = (id: number) => {
    setBancasSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  // -------------------- Instituições -------------------------
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [instituicoesEspecificas, setInstituicoesEspecificas] = useState<
    Instituicoes_especificas[]
  >([]);
  const [instituicoesSelecionadas, setInstituicoesSelecionadas] = useState<
    number[]
  >([]);
  const [
    instituicoesEspecificasSelecionadas,
    setInstituicoesEspecificasSelecionadas,
  ] = useState<number[]>([]);

  useEffect(() => {
    fetch("/instituicoes.json")
      .then((res) => res.json())
      .then((data) => setInstituicoes(data.instituicoes)) // 🔹 corrigido
      .catch((error) => console.error("Erro ao carregar instituições:", error));
  }, []);

  useEffect(() => {
    if (instituicoesSelecionadas.length > 0) {
      fetch("/instituicoes_especificas.json")
        .then((res) => res.json())
        .then((data) => {
          const filtradas = data.instituicoes_especificas.filter(
            (i: Instituicoes_especificas) =>
              instituicoesSelecionadas.includes(i.instituicaoId)
          );
          setInstituicoesEspecificas(filtradas);
        })
        .catch((error) =>
          console.error("Erro ao carregar instituições específicas:", error)
        );
    } else {
      setInstituicoesEspecificas([]);
    }
  }, [instituicoesSelecionadas]);

  const toggleInstituicao = (id: number) => {
    setInstituicoesSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleInstituicaoEspecifica = (id: number) => {
    setInstituicoesEspecificasSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // -------------------- Anos -------------------------
  const [anos, setAnos] = useState<Anos[]>([]);
  const [anosSelecionados, setAnosSelecionados] = useState<number[]>([]);
  const [openAno, setOpenAno] = useState(false); // controle do popover de anos

  useEffect(() => {
    fetch("/anos.json")
      .then((res) => res.json())
      .then((data) => setAnos(data.anos))
      .catch((err) => console.error("Erro ao carregar anos:", err));
  }, []);

  const toggleAno = (id: number) => {
    setAnosSelecionados((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <div className="mt-15 p-4 pt-4">
      <div className="mt-4">
        <h6>Minhas Questões</h6>
      </div>
      <div className="mt-2 pl-4  border-b-gray-400 rounded-lg pb-4 shadow">
        <div className="flex-wrap gap-4">
          <form
            method="POST"
            action="#"
            className="flex flex-wrap items-center w-full gap-x-2"
          >
            <div className="flex">
              <Input
                type="text"
                name="query"
                placeholder="Palavra chave"
                title="Digite uma palavra chave"
                className="w-52 px-4 py-2 mt-4 border border-[rgba(1,41,112,0.2)] 
               text-[#012970] text-sm 
               focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all
               rounded-l-lg rounded-r-none" // ⬅️ arredonda só à esquerda
              />
              <Button
                type="submit"
                title="Buscar"
                className="px-3 py-2 mt-4 bg-[#012970] text-white hover:bg-blue-500 transition 
               flex items-center justify-center
               rounded-r-lg rounded-l-none" // ⬅️ arredonda só à direita
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full sm:w-52 px-4 py-2 mt-4 border rounded-lg border-gray-300 text-[#012970] text-sm flex justify-between items-center">
                  {materiasSelecionadas.length > 0
                    ? `Mat. Selecionadas (${materiasSelecionadas.length})`
                    : "Matérias"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-52 p-2">
                <div className="flex flex-col gap-2">
                  {materias.map((materia) => (
                    <button
                      key={materia._id}
                      onClick={() => toggleMateria(materia._id)}
                      className="flex items-center gap-2 text-sm hover:bg-gray-100 p-1 rounded"
                    >
                      <span className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center">
                        {materiasSelecionadas.includes(materia._id) && (
                          <Check className="h-3 w-3 text-gray-700" />
                        )}
                      </span>
                      {materia.nome}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full sm:w-52 px-4 py-2 mt-4 border rounded-lg border-gray-300 text-[#012970] text-sm flex justify-between items-center">
                  {assuntosSelecionados.length > 0
                    ? `Selecionados ${assuntosSelecionados.length}`
                    : "Assuntos"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-52 p-2">
                <div className="flex flex-col gap-2">
                  {assuntos.map((assunto) => (
                    <button
                      key={assunto._id}
                      onClick={() => toggleAssunto(assunto._id)}
                      className="flex items-center gap-2 text-sm hover:bg-gray-100 p-1 rounded"
                    >
                      <span className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center">
                        {assuntosSelecionados.includes(assunto._id) && (
                          <Check className="h-3 w-3 text-gray-700" />
                        )}
                      </span>
                      {assunto.nome}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button className="w-full sm:w-52 px-4 py-2 mt-4 border rounded-lg border-gray-300 text-[#012970] text-sm font normal flex justify-between items-center">
                  {bancasSelecionadas.length > 0
                    ? `Selecionadas (${bancasSelecionadas.length})`
                    : "Banca"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-52 p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {bancas.map((banca) => (
                        <CommandItem
                          key={banca._id}
                          onSelect={() => toggleBanca(banca._id)}
                          className="flex items-center gap-2"
                        >
                          <div className="h-5 w-5 flex items-center justify-center border border-gray-400 rounded-sm">
                            {bancasSelecionadas.includes(banca._id) && (
                              <Check className="h-4 w-4 text-gray-700" />
                            )}
                          </div>
                          {banca.nome}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <Popover open={openAno} onOpenChange={setOpenAno}>
              <PopoverTrigger asChild>
                <button className="w-full sm:w-52 px-4 py-2 mt-4 border rounded-lg border-gray-300 text-[#012970] text-sm flex justify-between items-center">
                  {anosSelecionados.length > 0
                    ? `Selecionados (${anosSelecionados.length})`
                    : "Ano"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-52 p-0">
                <Command>
                  <CommandList>
                    <CommandGroup>
                      {anos.map((ano) => (
                        <CommandItem
                          key={ano._id}
                          onSelect={() => toggleAno(ano._id)}
                          className="flex items-center gap-2"
                        >
                          <div className="h-5 w-5 flex items-center justify-center border border-gray-400 rounded-sm">
                            {anosSelecionados.includes(ano._id) && (
                              <Check className="h-4 w-4 text-gray-700" />
                            )}
                          </div>
                          {ano.valor}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Popover de Instituições em cascata */}

            <Popover>
              <PopoverTrigger asChild>
                <button className="w-full sm:w-52 px-4 py-2 mt-4 border rounded-lg border-gray-300 text-[#012970] text-sm flex justify-between items-center">
                  {instituicoesSelecionadas.length > 0
                    ? `Selecionadas (${instituicoesSelecionadas.length})`
                    : "Instituições"}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-64 p-2">
                <div className="flex flex-col gap-2">
                  {instituicoes.map((inst) => (
                    <div key={inst._id} className="flex flex-col">
                      {/* Botão da instituição */}
                      <button
                        onClick={() => toggleInstituicao(inst._id)}
                        className="flex items-center gap-2 text-sm hover:bg-gray-100 p-1 rounded"
                      >
                        <span className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center">
                          {instituicoesSelecionadas.includes(inst._id) && (
                            <Check className="h-3 w-3 text-gray-700" />
                          )}
                        </span>
                        {inst.nome}
                      </button>

                      {/* Mostrar automaticamente as instituições específicas */}
                      {instituicoesSelecionadas.includes(inst._id) &&
                        instituicoesEspecificas
                          .filter((esp) => esp.instituicaoId === inst._id)
                          .map((esp) => (
                            <button
                              key={esp._id}
                              onClick={() =>
                                toggleInstituicaoEspecifica(esp._id)
                              }
                              className="ml-6 flex items-center gap-2 text-sm hover:bg-gray-100 p-1 rounded"
                            >
                              <span className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center">
                                {instituicoesEspecificasSelecionadas.includes(
                                  esp._id
                                ) && (
                                  <Check className="h-3 w-3 text-gray-700" />
                                )}
                              </span>
                              {esp.nome}
                            </button>
                          ))}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </form>
        </div>

        {/* Filtros de Matéria */}
        <div className="mt-4 space-y-2">
          {materiasSelecionadas.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium">Matérias:</span>
              {materiasSelecionadas.map((id) => {
                const materia = materias.find((m) => m._id === id);
                if (!materia) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center bg-gray-100 rounded px-2 py-1 text-sm"
                  >
                    <span>{materia.nome}</span>
                    <button
                      type="button"
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => toggleMateria(id)}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Filtros de Assunto */}
          {assuntosSelecionados.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium">Assuntos:</span>
              {assuntosSelecionados.map((id) => {
                const assunto = assuntos.find((a) => a._id === id);
                if (!assunto) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center bg-gray-100 rounded px-2 py-1 text-sm"
                  >
                    <span>{assunto.nome}</span>
                    <button
                      type="button"
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => toggleAssunto(id)}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Filtros de Banca */}
          {bancasSelecionadas.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium">Bancas:</span>
              {bancasSelecionadas.map((id) => {
                const banca = bancas.find((b) => b._id === id);
                if (!banca) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center bg-gray-100 rounded px-2 py-1 text-sm"
                  >
                    <span>{banca.nome}</span>
                    <button
                      type="button"
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => toggleBanca(id)}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Filtros de Instituições */}
          {instituicoesSelecionadas.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium">Instituições:</span>
              {instituicoesSelecionadas.map((id) => {
                const inst = instituicoes.find((i) => i._id === id);
                if (!inst) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center bg-gray-100 rounded px-2 py-1 text-sm"
                  >
                    <span>{inst.nome}</span>
                    <button
                      type="button"
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => toggleInstituicao(id)}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Filtros de Instituições Específicas */}
          {instituicoesEspecificasSelecionadas.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium">Instituições Específicas:</span>
              {instituicoesEspecificasSelecionadas.map((id) => {
                const instEsp = instituicoesEspecificas.find(
                  (i) => i._id === id
                );
                if (!instEsp) return null;
                return (
                  <div
                    key={id}
                    className="flex items-center bg-gray-100 rounded px-2 py-1 text-sm"
                  >
                    <span>{instEsp.nome}</span>
                    <button
                      type="button"
                      className="ml-1 text-gray-500 hover:text-gray-700"
                      onClick={() => toggleInstituicaoEspecifica(id)}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Questoes;
