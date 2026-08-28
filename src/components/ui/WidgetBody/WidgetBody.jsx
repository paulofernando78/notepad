export const WidgetBody = ({ top, middle, bottom }) => {
  return (
    <div
      className="
      flex
      flex-col
      justify-between
      h-full
      "
    >
      {/* Top */}
      <div
        className="
        w-full
        text-center
        text-3xl
        font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]
        font-bold
        "
      >
        {top}
      </div>

      {/* Middle */}
      <div
        className="
        flex
        flex-col
        items-center
        justify-center
        "
      >
        {middle}
      </div>

      {/* Bottom */}
      <div className="self-center">{bottom}</div>
    </div>
  );
};
