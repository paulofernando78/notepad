import { Board } from "@/components/ui/Board";
import { Icon } from "@/components/ui/Icon";

export const Header = () => {
  return (
    <Board className="flex justify-between items-center gap-2 mb-6 p-2">
      <div className="flex items-center gap-2">
        <Icon name="notepadText" />
        <h1 className="text-lg text-white font-bold">Notepad</h1>
      </div>
    </Board>
  );
};
