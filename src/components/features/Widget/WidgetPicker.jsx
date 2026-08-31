import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

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
        {isOpen ? <Icon name="minus" /> : <Icon name="plus" />}
      </button>
      {isOpen && (
        <div
          className="
            font-['Oswald_Variable']
            uppercase
          "
        >
          <header
            className="
            p-3
            text-center
            bg-black/50
            rounded-tl-lg
            rounded-tr-lg
            rounded-br-none
            rounded-bl-none
          "
          >
            select
          </header>
          <div
            className="
              flex
              flex-col
              gap-2
              p-3
              bg-gray-500/30
              rounded-br-lg
              rounded-bl-lg
            "
          >
            <button onClick={() => onAdd("clock")}>Clock</button>
            <button onClick={() => onAdd("pomodoro")}>Pomodoro</button>
            <button onClick={() => onAdd("timer")}>Timer</button>
          </div>
        </div>
      )}
    </>
  );
};
