import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export const WidgetPicker = ({ onAdd, ref }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  function handleClick() {
    setIsOpen((currentIsOpen) => {
      const nextIsOpen = !currentIsOpen;

      if (nextIsOpen) {
        requestAnimationFrame(() => {
          pickerRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "end",
          });
        });
      }

      return nextIsOpen;
    });
  }

  function handleAdd(type) {
    onAdd(type);
    setIsOpen(false);
  }

  return (
    <div ref={ref} className="flex gap-2 scroll-mr-2">
      <button
        type="button"
        aria-label="Add widget"
        onClick={handleClick}
        className="
          grid
          place-items-center
          h-full
        "
      >
        {isOpen ? <Icon name="minus" /> : <Icon name="plus" />}
      </button>
      {isOpen && (
        <div
          ref={pickerRef}
          className="
            font-['Oswald_Variable']
            uppercase
            scroll-mr-2
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
            <button onClick={() => handleAdd("clock")}>Clock</button>
            <button onClick={() => handleAdd("pomodoro")}>Pomodoro</button>
            <button onClick={() => handleAdd("timer")}>Timer</button>
            <button onClick={() => handleAdd("water-intake")}>Water Intake</button>
            <hr />
            <button onClick={() => handleAdd("calculator")}>Calculator</button>
            <button onClick={() => handleAdd("currency")}>Currency</button>
          </div>
        </div>
      )}
    </div>
  );
};
