import { Search } from "lucide-react";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const [materiaSelecionada, setMateriaSelecionada] = useState("");
  const [assuntoSelecionado, setAssuntoSelecionado] = useState("");

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
        <form
          method="POST"
          action="#"
          className="flex items-center w-full gap-x-2"
        >
          <Input
            type="text"
            name="query"
            placeholder="Search"
            title="Enter a search keyword"
            className="ml-2 w-52 px-4 py-2 border rounded-lg border-[rgba(1,41,112,0.2)] text-[#012970] text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
          />
          <Button
            type="submit"
            title="Search"
            className="px-3 py-2 bg-[#012970] text-white hover:bg-blue-500 transition flex items-center justify-center"
          >
            <Search className="w-4 h-4" />
          </Button>

          <Select
            value={materiaSelecionada}
            onValueChange={(value) => setMateriaSelecionada(value)}
          >
            <SelectTrigger className="ml-4 w-52 px-4 py-2 border rounded-lg border-[rgba(1,41,112,0.2)] text-[#012970] text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all">
              <SelectValue placeholder="Matéria" />
            </SelectTrigger>
            <SelectContent>
              {materias.map((materia) => (
                <SelectItem key={materia._id} value={materia.nome}>
                  {materia.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={assuntoSelecionado}
            onValueChange={(value) => setAssuntoSelecionado(value)}
          >
            <SelectTrigger className="ml-4 w-52 px-4 py-2 border rounded-lg border-[rgba(1,41,112,0.2)] text-[#012970] text-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all">
              <SelectValue placeholder="Assunto" />
            </SelectTrigger>
            <SelectContent>
              {assuntos.map((assunto) => (
                <SelectItem key={assunto._id} value={assunto.nome}>
                  {assunto.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </form>
      </div>
    </div>
  );
}

export default Questoes;
