export const WidgetBody = ({ top, middle, bottom }) => {
  return (
    <div className="min-w-43 space-y-6">
      {/* Timer */}
      <div className="
        flex justify-center
        font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]
        text-3xl
        font-bold
        ">
        {top}
      </div>
      {/* Middle */}
      <div className="h-18 flex flex-col justify-center">{middle}</div>
      {/* Bottom */}
      <div>{bottom}</div>
    </div>
  );
};
