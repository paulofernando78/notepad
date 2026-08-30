import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

export const WidgetPicker = ( { onAdd }) => {
  const [isOpen, setIsOpen] = useState(false)

  function handleClick() {
    setIsOpen((currentIsOpen) => !currentIsOpen)
  }

  return (
    <>
      <button
        type="button"
        aria-label="Add widget"
        onClick={handleClick}
        className="
          grid
          place-items-center
          p-2
          h-[305px]
          border
          border-gray-500
          rounded-lg
          cursor-pointer
        "
      >
        <Icon name="circlePlus" />
      </button>
      {isOpen &&
      <div className="flex flex-col gao-2 border">
        <span>Clock</span>
        <span>Pomodoro</span>
        <span>Time</span>
      </div>
      }
      <div>
        
      </div>
    </>
  );
};