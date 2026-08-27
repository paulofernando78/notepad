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
    <div
      className={`
      bg-gray-700/50
      border
      border-gray-700
      rounded-3xl
      shadow-md
      shadow-black/30
      ${className}`}
    >
      <div className="flex gap-4 translate-y-[0.03rem]
      p-2">

        {/* Play */}
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

        {/* Reset */}
        <button onClick={onReset}>
          <Icon name="rotateCcw" size="27" />
        </button>

        {/* Edit */}
        {showEdit && (
          <>
            {isEditing ? (
              <button onClick={onConfirmEdit}>
                <Icon
                  name="check"
                  size="23"
                  className="translate-y-[0.04rem]"
                />
              </button>
            ) : (
              <button onClick={onEdit}>
                <Icon name="pencil" size="23" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
