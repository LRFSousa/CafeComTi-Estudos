import { MessageSquareText } from "lucide-react";
import React, { useState } from "react";

function NavMessage() {
  const [isOpen, setIsOpen] = useState(false);
  const messageCount = 3;

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative w-fit mb-4 mt-4">
      <button
        onClick={toggleDropdown}
        className="relative flex p-1 hover:bg-stone-200 rounded transition-colors items-center gap-2"
      >
        {/* Ícone de mensagem */}
        <MessageSquareText className="w-6 h-6" />

        {/* Badge com contador */}
        {messageCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
            {messageCount}
          </span>
        )}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-md z-50">
          <ul className="flex flex-col text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center gap-2">
                <span>You have {messageCount} new messages</span>
              </div>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <div className="flex flex-col items-start gap-2">
                <h4 className="font-bold">Maria Hudson</h4>
                <p>
                  Velit asperiores et ducimus soluta repudiandae labore officia
                  est ut...
                </p>
                <p>4 hrs. ago</p>
              </div>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <div className="flex flex-col items-start gap-2">
                <h4 className="font-bold">Maria Hudson</h4>
                <p>
                  Velit asperiores et ducimus soluta repudiandae labore officia
                  est ut...
                </p>
                <p>6 hrs. ago</p>
              </div>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              <div className="flex flex-col items-start gap-2">
                <h4 className="font-bold">Maria Hudson</h4>
                <p>
                  Velit asperiores et ducimus soluta repudiandae labore officia
                  est ut...
                </p>
                <p>6 hrs. ago</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavMessage;
