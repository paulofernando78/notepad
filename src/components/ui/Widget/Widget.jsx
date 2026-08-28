import { Board } from "@/components/ui/Board";

export const Widget = ({ title, children }) => {
  return (
    <div
      className="
      min-w-55
      font-['Oswald_Variable']
      [text-shadow:0_0_6px_rgba(255,255,255,0.3)]"
    >
      <div className="">
        <Board
          className="
          py-3
          text-sm
          text-center
          uppercase
          border-b-0
          border-slate-600
          bg-gray-700
          rounded-br-none
          rounded-bl-none
          "
        >
          {title}
        </Board>
        <div
          className="
            h-65
            pt-2.5 pb-4
            text-white
            bg-gray-500/20
            rounded-tr-none
            rounded-tl-none
         
            
          "
        >
          {children}
        </div>
      </div>
    </div>
  );
};
