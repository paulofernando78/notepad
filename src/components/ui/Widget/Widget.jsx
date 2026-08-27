import { Board } from "@/components/ui/Board";

export const Widget = ({ title, children }) => {
  return (
    <div className="font-['Oswald_Variable'] [text-shadow:0_0_6px_rgba(255,255,255,0.3)]">
      <div className="space-y-1">
        <Board
          className="
          py-1
          text-sm
          text-center
          font-['Oswald_Variable']
          uppercase
          border-slate-600
          bg-gray-700"
        >
          {title}
        </Board>
        <div
          className="
          relative
          flex
          flex-col
          items-center
          justify-center
          min-w-37.5
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
