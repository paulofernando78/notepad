import { Icon } from "@/components/ui/Icon";

export const SearchBar = () => {
  return (
    <div className="relative">
      <Icon
        name="search"
        className="absolute top-[0.4rem] left-2 text-gray-400"
      />

      <input
        name=""
        id=""
        className="
          w-full
          min-w-0
          pl-9
          py-1
          border
          border-gray-400
          rounded-md"
        placeholder="Search card..."
      />
    </div>
  );
};
