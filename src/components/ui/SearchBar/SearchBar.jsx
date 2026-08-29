import { Icon } from "@/components/ui/Icon";

export const SearchBar = () => {
  return (
    <>
      <label className="relative">
        <Icon
          name="search"
          className="absolute top-[0.04rem] left-2 text-gray-400"
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
          border-gray-700
          rounded-md"
          placeholder="Search..."
        />
      </label>
    </>
  );
};
