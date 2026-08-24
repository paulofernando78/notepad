import { Board } from "@/components/ui/Board";

export const Widget = ({ title, children }) => {
  return (
    <div className="space-y-1">
      <Board className="
        py-1 text-sm
        font-[]
        text-center
        font-['Oswald_Variable']
        uppercase
        border-slate-600
        bg-gray-700">
        {title}
      </Board>
      {children}
    </div>
  );
};
