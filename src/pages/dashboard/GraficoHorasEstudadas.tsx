import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { dia: "Seg", horas: 2, questoes: 10 },
  { dia: "Ter", horas: 3, questoes: 15 },
  { dia: "Qua", horas: 1, questoes: 5 },
  { dia: "Qui", horas: 4, questoes: 20 },
  { dia: "Sex", horas: 2, questoes: 12 },
  { dia: "Sáb", horas: 5, questoes: 25 },
  { dia: "Dom", horas: 0, questoes: 0 },
];

export default function GraficoHorasEstudadas() {
  return (
    <div className="col-span-8 bg-white rounded border border-stone-300 shadow p-4">
      <h3 className="font-semibold text-lg mb-4">
        Horas Estudadas e Questões Resolvidas
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="horas"
            stroke="#8884d8"
            strokeWidth={2}
            name="Horas Estudadas"
          />
          <Line
            type="monotone"
            dataKey="questoes"
            stroke="#82ca9d"
            strokeWidth={2}
            name="Questões Resolvidas"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
