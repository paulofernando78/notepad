import { NotepadText } from "lucide-react";

export const Header = () => {
  return (
    <div className="p-2 flex items-center gap-2">
      <NotepadText size={18} className="text-white"/>
      <h1 className="text-lg text-white font-bold">Dev Notes</h1>
    </div>
  );
};
