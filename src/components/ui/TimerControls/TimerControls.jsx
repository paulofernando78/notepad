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
}) => {
  return (
    <div className="flex gap-2 mt-2 mb-1">
      <button
        onClick={onToggle}
        disabled={toggleDisabled}
        className="disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isRunning ? (
          <Icon name="circlePause" size="25" />
        ) : (
          <Icon name="circlePlay" size="25" />
        )}
      </button>

      <button onClick={onReset}>
        <Icon name="rotateCcw" size="25" />
      </button>

      {showEdit && (
        <>
          {isEditing ? (
            <button onClick={onConfirmEdit}>
              <Icon name="check" size="23" className="translate-y-[0.04rem]" />
            </button>
          ) : (
            <button onClick={onEdit}>
              <Icon name="pencil" size="23" />
            </button>
          )}
        </>
      )}
    </div>
  );
};
