import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "../../Sidebar/SideBar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSideBar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  console.log("Sidebar está", sidebarOpen ? "aberta" : "fechada");

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header onToggleSidebar={handleToggleSideBar} />
      <div className="flex flex-1">
        <SideBar isOpen={sidebarOpen} />
        <main
          className={`transition-all duration-300 flex-1 p-4 ${
            sidebarOpen ? "ml-[300px]" : "ml-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
