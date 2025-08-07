import Logo from "./Logo";
import Nav from "./Nav/Nav";
import SearchBar from "./SearchBar";

interface LogoProps {
  onToggleSidebar: () => void;
}

function Header({ onToggleSidebar }: LogoProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-[997] h-[60px] bg-white pl-5 flex items-center shadow-[0px_2px_20px_rgba(1,41,112,0.1)] transition-all duration-500">
      <Logo onToggleSidebar={onToggleSidebar} />
      <SearchBar />
      <Nav />
    </header>
  );
}

export default Header;
