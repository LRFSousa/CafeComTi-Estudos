// src/routes/routes.tsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/Header/MainLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import Questoes from "../pages/Questoes";

function Home() {
  return <div className="p-4">Página Inicial</div>;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Layout com header e sidebar sempre presente */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="questoes" element={<Questoes />} />
      </Route>
    </Routes>
  );
}
