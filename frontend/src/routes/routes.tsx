// src/AppRoutes.tsx
import { Route, Routes } from "react-router-dom";
import Header from "../components/layout/Header/Header";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Header />} />
    </Routes>
  );
}
