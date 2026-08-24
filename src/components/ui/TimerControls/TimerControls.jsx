import { Icon } from "@/components/ui/Icon";

export const TimerControls = ({
  isRunning,
  onToggle,
  onReset,
  onEdit,
  onCancelEdit,
  isEditing = false,
  showEdit = false,
}) => {
  return (
    <div className="flex gap-2 mb-1">
      <button onClick={onToggle}>
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
            <button onClick={onCancelEdit}>
              <Icon name="x" size="23" />
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
