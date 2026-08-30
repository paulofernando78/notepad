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
          
          h-full
          cursor-pointer
        "
      >
        <Icon name="plus" />
      </button>
      {isOpen && (
        <Border className="flex flex-col gap-2">
          <span>Clock</span>
          <span>Pomodoro</span>
          <span>Time</span>
        </Border>
      )}
    </>
  );
};
