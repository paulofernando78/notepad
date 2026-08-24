import { useEffect, useState } from "react";
import { Board } from "@/components/ui/Board";
import { Icon } from "@/components/ui/Icon";

const DEFAULT_FOCUS_MINUTES = 25;
const DEFAULT_BREAK_MINUTES = 5;

export const Pomodoro = ({
  minutes = DEFAULT_FOCUS_MINUTES,
  breakMinutes = DEFAULT_BREAK_MINUTES,
  totalCycles = 4,
}) => {
  // Store durations in seconds so the countdown math stays simple.
  const focusTime = minutes * 60;
  const breakTime = breakMinutes * 60;

  // time is the current countdown value, mode controls focus/break state.
  const [time, setTime] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [currentCycle, setCurrentCycle] = useState(0);

  useEffect(() => {
    // Do not create an interval while the timer is paused.
    if (!isRunning) return;

    const intervalID = setInterval(() => {
      setTime((current) => {
        // Keep counting down while there is more than one second left.
        if (current > 1) {
          return current - 1;
        }

        // When focus time ends, switch to break time.
        if (mode === "focus") {
          setMode("break");
          return breakTime;
        }

        // When break time ends, switch back to focus time.
        setCurrentCycle((current) => current + 1);
        setMode("focus");
        return focusTime;
      });
    }, 1000);

    return () => clearInterval(intervalID);
  }, [isRunning, mode, focusTime, breakTime]);

  // Convert raw seconds into MM:SS for display.
  const minutesLeft = Math.floor(time / 60);
  const secondLeft = time % 60;

  const getFormattedTime = `
    ${String(minutesLeft).padStart(2, "0")}
    :
    ${String(secondLeft,).padStart(2, "0")}
    `;

  const activeFocusModeClass =
    "text-yellow-300 [text-shadow:0_0_8px_rgba(253,224,71,0.8)]";

  const activeBreakModeClass =
    "text-red-400 [text-shadow:0_0_8px_rgba(248,113,113,0.8)]";

  const inactiveModeClass = "text-gray-400";

  function handleReset() {
    setIsRunning(false);
    setMode("focus");
    setTime(focusTime);
  }

  return (
    <Board className="timer-card space-y-2">
      <span className="text-3xl">{getFormattedTime}</span>
      <span className="text-sm">
        Cycles: {currentCycle} : {totalCycles}
      </span>
      <div className="flex gap-2 text-sm uppercase">
        <span
          className={
            mode === "focus" && isRunning
              ? activeFocusModeClass
              : inactiveModeClass
          }
        >
          Focus •
        </span>
        <span
          className={
            mode === "break" && isRunning
              ? activeBreakModeClass
              : inactiveModeClass
          }
        >
          Break
        </span>
      </div>
      <div className="flex gap-2 mb-1">
        <button
          onClick={() => {
            // Start from focus mode and toggle between running and paused.
            setMode("focus");
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
