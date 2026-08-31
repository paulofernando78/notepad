import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Border } from "@/components/ui/Border";

export const WidgetPicker = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((currentIsOpen) => !currentIsOpen);
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
          px-1
          h-full
          border
          border-gray-500
          rounded-lg
          cursor-pointer
        "
      >
        <Icon name="plus" />
      </button>
      {isOpen && (
        <Border
          className="
            flex
            flex-col 
            gap-2
            font-bold
          "
        >
          <button>Clock</button>
          <button>Pomodoro</button>
          <button>Time</button>
        </Border>
      )}
    </>
  );
};
