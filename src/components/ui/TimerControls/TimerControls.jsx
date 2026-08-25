import { Icon } from "@/components/ui/Icon";

export const TimerControls = ({
  isRunning,
  onToggle,
  toggleDisabled = false,
  onReset,
  onEdit,
  onConfirmEdit,
  isEditing = false,
  showEdit = false,
  className,
}) => {
  return (
    <div className={`flex gap-4 mt-2 mb-1 ${className}`}>
      <button
        onClick={onToggle}
        disabled={toggleDisabled}
        className="disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isRunning ? (
          <Icon name="circlePause" size="27" />
        ) : (
          <Icon name="circlePlay" size="27" />
        )}
      </button>

      <button onClick={onReset}>
        <Icon name="rotateCcw" size="27" />
      </button>

      {showEdit && (
        <>
          {isEditing ? (
            <button onClick={onConfirmEdit}>
              <Icon name="check" size="25" className="translate-y-[0.04rem]" />
            </button>
          ) : (
            <button onClick={onEdit}>
              <Icon name="pencil" size="25" />
            </button>
          )}
        </>
      )}
    </div>
  );
};
