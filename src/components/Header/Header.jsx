import { Board } from "@/components/Board";
import { Icon } from "@/components/Icon";

export const Header = () => {
  return (
    <Board className="flex justify-between items-center gap-2 p-2 bg-gray-800">
      <div className="flex items-center gap-2">
        <Icon name="notepadText" />
        <h1 className="text-lg text-white font-bold">Notepad</h1>
      </div>
    </Board>
  );
};
