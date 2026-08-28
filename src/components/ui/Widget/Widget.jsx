import { Board } from "@/components/ui/Board";

export const Widget = ({ title, children }) => {
  return (
    <div
      className="
      w-55
      font-['Oswald_Variable']
      [text-shadow:0_0_6px_rgba(255,255,255,0.3)]"
    >
      <div className="space-y-1">
        <Board
          className="
          py-1
          text-sm
          text-center
          uppercase
          border-slate-600
          bg-gray-700"
        >
          {title}
        </Board>
        <div
          className="
            h-65
            p-2.5
            text-white
            bg-gray-500/20
            rounded
            
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
};
