import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Acertos", value: 80 },
  { name: "Erros", value: 20 },
];

// Cores personalizadas para cada parte
const COLORS = ["#4ade80", "#f87171"]; // verde e vermelho

function GraficoMateriasEstudadas() {
  return (
    <div className="col-span-4 bg-white rounded border border-stone-300 shadow p-4">
      <h3 className="font-semibold text-lg mb-4">
        Desempenho: Acertos x Erros
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GraficoMateriasEstudadas;
