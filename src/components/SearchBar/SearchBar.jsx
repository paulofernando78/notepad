import { Icon } from "@/components/Icon";

export const SearchBar = () => {
  return (
    <div className="relative">
      <Icon
        name="search"
        className="absolute top-2 left-2 text-gray-400"
      />

      <input
        name=""
        id=""
        className="
          w-full
          min-w-0
          px-8
          py-1
          border
          border-gray-400
          rounded-md"
        placeholder="Search card..."
      />
    </div>
  );
};
