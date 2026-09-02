import { Icon } from "@/components/ui/Icon";

export const WidgetContainer = ({ children }) => {
  return <div className="flex gap-2">{children}</div>;
};

export const WidgetCard = ({ title, children, ref }) => {
  return (
    <article
      ref={ref}
      className="
        min-w-62.5
        font-['Oswald_Variable']
        scroll-mr-2
      "
    >
      <>
        <header
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
        </header>
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
      </>
    </article>
  );
};

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
        "
        >
          {middle}
        </div>
      )}

      {bottom && <div className="self-center">{bottom}</div>}
    </div>
  );
};

export const WidgetControls = ({ children }) => {
  return (
    <div
      className="
        bg-gray-700/50
        border
        border-gray-700
        rounded-lg
        shadow-sm
        shadow-black/30
      "
    >
      <div
        className="
          flex
          justify-between
          gap-4
          p-2
          translate-[0.03rem]
        "
      >
        {children}
      </div>
    </div>
  );
};

WidgetControls.Play = ({ isRunning, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Icon name={isRunning ? "circlePause" : "circlePlay"} />
    </button>
  );
};

WidgetControls.Reset = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      <Icon name="rotateCcw" className="translate-y-[0.01rem]" />
    </button>
  );
};

WidgetControls.Edit = ({ isEditing, onEdit, onConfirm }) => {
  return isEditing ? (
    <button onClick={onConfirm}>
      <Icon name="check" className="translate-y-[0.01rem]" />
    </button>
  ) : (
    <button onClick={onEdit}>
      <Icon name="squarePen" className="translate-y-[0.01rem]" />
    </button>
  );
};

WidgetControls.Info = ({ onClick, ...props }) => {
  return (
    <button type="button" onClick={onClick} {...props}>
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
    >
      <Icon name="trash" />
    </button>
  );
};
