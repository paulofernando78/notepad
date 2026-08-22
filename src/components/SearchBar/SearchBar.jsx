import { Search } from "lucide-react";

export const SearchBar = () => {
  return (
    <div className="relative">
      <Search className="absolute top-[0.3rem] left-1 text-gray-400" size={16}/>
      <input
        name=""
        id=""
        className="
          w-full
          min-w-0
          mb-1
          px-6
          border
          border-gray-400
          rounded-md"
        placeholder="Search"
      />
    </div>
  );
};
