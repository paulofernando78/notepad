import { useState, useEffect } from "react";

import { Board } from "@/components/ui/Board";
import { Icon } from "@/components/ui/Icon";

const DEFAULT_TIMER_MINUTES = 1;

export const Timer = ({ minutes = DEFAULT_TIMER_MINUTES }) => {
  const initialTime = minutes * 60;

  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("idle");

  useEffect(() => {
    if (!isRunning) return;

    const intervalID = setInterval(() => {
      setTime((current) => {
        if (current > 1) {
          return current - 1;
        }

        setIsRunning(false);
        setMode("done");
        return 0;
      });
    }, 1000);

    return () => clearInterval(intervalID);
  }, [isRunning]);

  const minutesLeft = Math.floor(time / 60);
  const secondsLeft = time % 60;

  const getFormattedTime = `
    ${String(minutesLeft).padStart(2, "0")}
    :
    ${String(secondsLeft).padStart(2, "0")}
    `;

  const activeDoneModeClass =
    "text-red-400 drop-shadow-[0_0_6px_rgba(248,113,113,0.1)]";
  const inactiveModeClass = "text-gray-400";

  function handleReset() {
    setIsRunning(false);
    setMode("idle");
    setTime(initialTime);
  }

  return (
    <Board className="timer-card space-y-2">
      <span className="text-3xl">{getFormattedTime}</span>
      <input
        type="text"
        className="
        w-32
        font-[Arial]
        text-sm
        border-b
        border-gray-700
        placeholder:italic
        "
        placeholder="ex: boiling water"
      />
      <span
        className={` uppercase
          ${mode === "done" ? activeDoneModeClass : inactiveModeClass}`}
      >
        Done
      </span>
      <div className="flex gap-2 mb-1 ">
        <button
          onClick={() => {
            // Start from focus mode and toggle between running and paused.
            setIsRunning((current) => !current);
          }}
        >
          {isRunning ? (
            <Icon name="circlePause" size="25" />
          ) : (
            <Icon name="circlePlay" size="25" />
          )}
        </button>

        <button onClick={handleReset}>
          <Icon name="rotateCcw" size="25" />
        </button>
      </div>
    </Board>
  );
};
