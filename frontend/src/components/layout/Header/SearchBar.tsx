import { Search } from "lucide-react";

function SearchBar() {
  return (
    <div className="hidden lg:flex min-w-[360px] px-5">
      <form method="POST" action="#" className="flex items-center w-full">
        <input
          type="text"
          name="query"
          placeholder="Search"
          title="Enter a search keyword"
          className="w-full border border-[rgba(1,41,112,0.2)] text-[#012970] text-sm px-2 py-1.5 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
        />
        <button
          type="submit"
          title="Search"
          className="p-2 border-0 bg-[#012970] rounded-md hover:bg-blue-500 transition"
        >
          <Search className="w-4 h-4 text-white" />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
