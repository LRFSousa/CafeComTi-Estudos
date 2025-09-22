import { useState } from "react";
import {
  ChevronDown,
  LogOut,
  MessageCircleQuestionMark,
  Settings,
} from "lucide-react";
import img3x4 from "../../../../assets/images/3x4.jpg";

function NavAvatar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative w-fit mb-4 mt-4">
      <button
        onClick={toggleDropdown}
        className="flex p-1 hover:bg-stone-200 rounded transition-colors items-center gap-2"
      >
        <img
          src={img3x4}
          alt="3x4"
          className="size-10 rounded-full object-cover shrink-0"
        />
        <span className="font-medium">Luis.Sousa</span>
        <ChevronDown size={18} />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-50 bg-white border border-gray-200 rounded shadow-md z-50">
          <ul className="flex flex-col text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2">
                <Settings size={16} />
                <span>Account Settings</span>
              </div>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2">
                <MessageCircleQuestionMark size={16} />
                <span>Need Help</span>
              </div>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2">
                <LogOut size={16} />
                <span>Sign Out</span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavAvatar;
