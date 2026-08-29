import { Board } from "@/components/ui/Board";

export const Widget = ({
  title,
  children,
}) => {
  return (
    <article
      className="
      min-w-58.25
      font-['Oswald_Variable']
      "
    >
      <div className="">
        <Board
          className="
            py-1
            text-center
            uppercase
            border-b-0
            rounded-br-none
            rounded-bl-none
          "
        >
          {title}
          
        </Board>
        <div
          className="
          h-68
          pt-4 pb-5.25
        text-white
        bg-gray-500/30
          rounded-tr-none
          rounded-tl-none
          rounded-br-lg
          rounded-bl-lg
          [text-shadow:0_0_6px_rgba(255,255,255,0.3)]
          "
        >
          {children}
        </div>
      </div>
    </article>
  );
};
