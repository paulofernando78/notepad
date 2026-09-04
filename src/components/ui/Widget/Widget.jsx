import { Icon } from "@/components/ui/Icon";
import { widgetImages } from "@/assets/widgetImages";

export const WidgetContainer = ({ children }) => {
  return <div className="flex gap-2">{children}</div>;
};

export const WidgetCard = ({
  // title,
  widgetClassName = "bg-gray-500/30",
  widgetStyle,
  imageName,
  children,
  ref,
}) => {
  const widgetImage = widgetImages[imageName];

  return (
    <article
      ref={ref}
      className="
        min-w-54
        font-['Oswald_Variable']
        scroll-mr-2
      "
    >
      <>
        {/* <header
          className="
            p-3
            text-center
            uppercase
            border-b-0
            bg-black/50
            rounded-tl-lg
            rounded-tr-lg
            rounded-br-none
            rounded-bl-none
          "
        >
          <h3>{title}</h3>
        </header> */}
        <div
          style={widgetStyle}
          className={`
            relative
            overflow-hidden
            h-80
            text-white
            rounded-lg
            [text-shadow:0_0_6px_rgba(255,255,255,0.2)]
            ${widgetClassName}
          `}
        >
          <div className="relative z-10 h-full">{children}</div>

          {widgetImage && (
            <img
              width="100"
              height="100"
              src={widgetImage.src}
              alt={widgetImage.alt}
              className="
                pointer-events-none
                absolute
                -bottom-14
                -left-14
                z-0
                size-32
                opacity-[0.5]
              "
            />
          )}
        </div>
      </>
    </article>
  );
};

export const WidgetBody = ({ top, middle, subMiddle, bottom }) => {
  return (
    <div
      className="
        flex
        flex-col
        gap-4
        py-4
        h-full
      "
    >
      {top && (
        <div
          className="
            w-full
            text-center
            text-3xl
            font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]
            font-bold
            leading-none
          "
        >
          {top}
        </div>
      )}

      {middle && (
        <div
          className="
          flex
          flex-col
          items-center
          justify-center
          w-full
          h-full
          min-h-0
        "
        >
          {middle}
        </div>
      )}
      {subMiddle && (
        <div
          className="
          flex
          flex-col
          items-center
        "
        >
          {subMiddle}
        </div>
      )}
      {bottom && <div className="self-center">{bottom}</div>}
    </div>
  );
};

export const WidgetControls = ({ children }) => {
  return (
    <>
      <div
        className="
          flex
          gap-2          
        "
      >
        {children}
      </div>
    </>
  );
};

WidgetControls.Play = ({ isRunning, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="disabled:cursor-not-allowed disabled:opacity-40 clickable"
    >
      <Icon name={isRunning ? "circlePause" : "circlePlay"} />
    </button>
  );
};

WidgetControls.Reset = ({ onClick }) => {
  return (
    <button onClick={onClick} className="clickable">
      <Icon name="rotateCcw" />
    </button>
  );
};

WidgetControls.Edit = ({ isEditing, onEdit, onConfirm }) => {
  return isEditing ? (
    <button onClick={onConfirm} className="clickable">
      <Icon name="check" />
    </button>
  ) : (
    <button onClick={onEdit} className="clickable">
      <Icon name="squarePen" />
    </button>
  );
};

WidgetControls.Info = ({ onClick, ...props }) => {
  return (
    <button type="button" onClick={onClick} {...props} className="clickable">
      <Icon name="info" />
    </button>
  );
};

WidgetControls.Erase = ({ onClick }) => {
  return (
    <button
      type="button"
      title="Delete"
      aria-label="Delete widget"
      onClick={onClick}
      className="clickable"
    >
      <Icon name="trash" />
    </button>
  );
};
