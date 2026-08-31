import { Icon } from "@/components/ui/Icon";

export const WidgetControls = ({ children }) => {
  return (
    <div
      className="
        bg-gray-700/50
        border
        border-gray-700
        rounded-3xl
        shadow-md
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

