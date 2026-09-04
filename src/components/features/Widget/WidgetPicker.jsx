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
    <div
      ref={ref}
      className="
      flex
      gap-2
      uppercase
      scroll-mr-2
      "
    >
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
            scroll-mr-2
          "
        >
          <div
            className={`
              flex
              flex-col
              gap-2
              pt-2
              pr-[0.3rem]
              rb-2
              pl-2
              bg-gray-500/30
              rounded-lg
              overflow-y-auto
              widget-body-height
              `
            }
          >
            <button
              onClick={() => handleAdd("clock")}
              className="uppercase clickable"
            >
              clock
            </button>
            <button
              onClick={() => handleAdd("quickNotes")}
              className="uppercase clickable"
            >
              quick notes
            </button>
            {/* --- */}
            <hr />
            <button
              onClick={() => handleAdd("pomodoro")}
              className="uppercase clickable"
            >
              pomodoro
            </button>
            <button
              onClick={() => handleAdd("timer")}
              className="uppercase clickable"
            >
              timer
            </button>
            <button
              onClick={() => handleAdd("calculator")}
              className="uppercase clickable"
            >
              calculator
            </button>
            <button
              onClick={() => handleAdd("markets")}
              className="uppercase clickable"
            >
              markets
            </button>
            <button
              onClick={() => handleAdd("waterIntake")}
              className="uppercase clickable"
            >
              water Intake
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
