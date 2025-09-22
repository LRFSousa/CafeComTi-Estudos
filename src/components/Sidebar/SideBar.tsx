import { Link } from "react-router-dom";

interface SideBarProps {
  isOpen: boolean;
}

export default function SideBar({ isOpen }: SideBarProps) {
  return (
    <aside
      className={`fixed top-[60px] bottom-0 w-[300px] bg-white shadow-lg transition-all duration-300 ${
        isOpen ? "left-0" : "-left-[300px]"
      }`}
    >
      {/* Conteúdo Sidebar */}
      <div className="flex items-center justify-center h-20 shadow-md">
        <h1 className="text-2xl font-bold text-indigo-500">Logo</h1>
      </div>

      <ul className="flex flex-col py-4">
        <Link
          to="/dashboard"
          className="flex flex-row items-center h-12 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-150"
        >
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
            <i className="bx bx-home"></i>
          </span>
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
        {/* Outros itens */}
        <Link
          to="/questoes"
          className="flex flex-row items-center h-12 px-4 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition duration-150"
        >
          <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
            <i className="bx bx-home"></i>
          </span>
          <span className="text-sm font-medium">Questões</span>
        </Link>
      </ul>
    </aside>
  );
}
