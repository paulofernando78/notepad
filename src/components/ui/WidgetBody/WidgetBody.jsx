export const WidgetBody = ({ top, middle, bottom }) => {
  return (
    <div className="
      grid
      grid-rows-[auto_130px_auto]
       "
    >
        
      {/* Top */}
      <div
        className="
        text-center
        w-full
        font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]
        text-3xl
        font-bold
        "
      >
        {top}
      </div>

      {/* Middle */}
      <div className="
        flex
        flex-col
        items-center
        justify-center
        "
      >
        {middle}
      </div>

      {/* Bottom */}
      <div className="justify-self-center mt-2 mb-2">{bottom}</div>
    </div>
  );
};
