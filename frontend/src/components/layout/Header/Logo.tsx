import { AlignJustify } from "lucide-react";

function Logo() {
  const handleToggleSideBar = () => {
    document.body.classList.toggle("toggle-sidebar");
  };

  return (
    <div className="flex items-center justify-between w-full xl:w-[280px]">
      <a href="/" className="flex items-center space-x-2">
        <span className="hidden lg:block text-[26px] font-bold text-[#012970] font-nunito pl-4 pr-4">
          Café com TI
        </span>
        <AlignJustify
          className="w-6 h-6 text-[#012970] cursor-pointer"
          onClick={handleToggleSideBar}
        />
      </a>
    </div>
  );
}

export default Logo;
