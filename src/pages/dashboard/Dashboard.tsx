import GraficoHorasEstudadas from "./GraficoHorasEstudadas";
import GraficoRendimentoQuestoes from "./GraficoRendimentoQuestoes";
import { TopBar } from "./TopBar";

// src/pages/Dashboard.tsx
export default function Dashboard() {
  return (
    <div className="mt-15 p-4 pt-4 bg-white min-h-screen rounded-lg pb-4 shadow ">
      <TopBar />
      <div className="grid grid-cols-12 gap-4 mt-4">
        <GraficoHorasEstudadas />
        <GraficoRendimentoQuestoes />
      </div>
    </div>
  );
}
