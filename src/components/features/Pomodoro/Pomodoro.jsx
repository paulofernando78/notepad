import { useEffect, useState } from "react";
import { Board } from "@/components/ui/Board";
import { TimerControls } from "@/components/ui/TimerControls";
import { Icon } from "@/components/ui/Icon";

const DEFAULT_FOCUS_MINUTES = 25;
const DEFAULT_BREAK_MINUTES = 1;
const DEFAULT_LONG_BREAK_MINUTES = 15;
const LONG_BREAK_INTERVAL = 4;

function playTick() {
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.frequency.value = 800;

  gain.gain.setValueAtTime(0.9, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.03,
  );

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.03);

  oscillator.addEventListener("ended", () => {
    audioContext.close();
  });
}

export const Pomodoro = ({
  minutes = DEFAULT_FOCUS_MINUTES,
  breakMinutes = DEFAULT_BREAK_MINUTES,
  longBreakMinutes = DEFAULT_LONG_BREAK_MINUTES,
  totalPomodoros = 4,
}) => {
  const [focusMinutes, setFocusMinutes] = useState(minutes);
  const [restMinutes, setRestMinutes] = useState(breakMinutes);
  const [longMinutes, setLongMinutes] = useState(longBreakMinutes);
  const [pomodoroGoal, setPomodoroGoal] = useState(totalPomodoros);

  const focusTime = focusMinutes * 60;
  const breakTime = restMinutes * 60;
  const longBreakTime = longMinutes * 60;

  const [time, setTime] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editFocusMinutes, setEditFocusMinutes] = useState(minutes);
  const [editBreakMinutes, setEditBreakMinutes] = useState(breakMinutes);
  const [editLongMinutes, setEditLongMinutes] = useState(longBreakMinutes);
  const [editPomodoroGoal, setEditPomodoroGoal] = useState(totalPomodoros);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const minutesLeft = Math.floor(time / 60);
  const secondLeft = time % 60;

  useEffect(() => {
    if (!isRunning) return;

    const intervalID = setInterval(() => {
      if (mode === "focus" && isSoundEnabled) {
        playTick();
      }

      setTime((current) => {
        if (current > 1) {
          return current - 1;
        }

        if (mode === "focus") {
          const nextPomodoro = completedPomodoros + 1;

          setCompletedPomodoros(nextPomodoro);

          if (
            nextPomodoro % LONG_BREAK_INTERVAL === 0 &&
            nextPomodoro < pomodoroGoal
          ) {
            setMode("long");
            return longBreakTime;
          }

          setMode("break");
          return breakTime;
        }

        if (mode === "break") {
          if (completedPomodoros >= pomodoroGoal) {
            setMode("done");
            setIsRunning(false);
            return 0;
          }

          setMode("focus");
          return focusTime;
        }

        if (mode === "long") {
          setMode("focus");
          return focusTime;
        }

        return focusTime;
      });
    }, 1000);

    return () => clearInterval(intervalID);
  }, [
    isRunning,
    mode,
    completedPomodoros,
    pomodoroGoal,
    focusTime,
    breakTime,
    longBreakTime,
    isSoundEnabled,
  ]);

  const getFormattedTime = `
    ${String(minutesLeft).padStart(2, "0")}:${String(secondLeft).padStart(2, "0")}
    `;

  const activeFocusModeClass =
    "text-green-300 [text-shadow:0_0_8px_rgba(253,224,71,0.8)]";

  const activeBreakModeClass =
    "text-yellow-400 [text-shadow:0_0_8px_rgba(248,113,113,0.8)]";
  const activeLongModeClass =
    "text-orange-400 [text-shadow:0_0_8px_rgba(248,113,113,0.8)]";
  const activeDoneModeClass =
    "text-red-400 [text-shadow:0_0_8px_rgba(248,113,113,0.8)]";
  const inactiveModeClass = "text-gray-400";

  function handleEditFocusMinutesChange(event) {
    setEditFocusMinutes(Number(event.target.value));
  }

  function handleEditBreakMinutesChange(event) {
    setEditBreakMinutes(Number(event.target.value));
  }

  function handleEditLongMinutesChange(event) {
    setEditLongMinutes(Number(event.target.value));
  }

  function handleEditPomodoroGoalChange(event) {
    setEditPomodoroGoal(Number(event.target.value));
  }

  function handleEdit() {
    setIsRunning(false);
    setEditFocusMinutes(focusMinutes);
    setEditBreakMinutes(restMinutes);
    setEditLongMinutes(longMinutes);
    setEditPomodoroGoal(pomodoroGoal);
    setIsEditing(true);
  }

  function applyEditSettings(shouldStart) {
    setFocusMinutes(editFocusMinutes);
    setRestMinutes(editBreakMinutes);
    setLongMinutes(editLongMinutes);
    setPomodoroGoal(editPomodoroGoal);
    setTime(editFocusMinutes * 60);
    setCompletedPomodoros(0);
    setMode("focus");
    setIsRunning(shouldStart);
    setIsEditing(false);
  }

  function handleConfirmEdit() {
    applyEditSettings(false);
  }

  function handleToggle() {
    if (isEditing) {
      applyEditSettings(true);
      return;
    }

    if (mode === "done") return;

    setIsRunning((current) => !current);
  }

  function handleToggleSound() {
    setIsSoundEnabled((current) => !current);
  }

  function handleReset() {
    setIsRunning(false);
    setCompletedPomodoros(0);
    setMode("focus");
    setTime(focusTime);
  }

  return (
    <Board className="timer-card space-y-2">
      {isEditing ? (
        <Board className="grid gap-1 px-2 p-1">
          <label>
            Focus{" "}
            <input
              type="number"
              value={editFocusMinutes}
              onChange={handleEditFocusMinutesChange}
              className="w-11 pl-1 border border-gray-700 rounded show-spinner"
            />
          </label>
          <label>
            Break{" "}
            <input
              type="number"
              value={editBreakMinutes}
              onChange={handleEditBreakMinutesChange}
              className="w-8"
            />
          </label>
          <label>
            Long{" "}
            <input
              type="number"
              value={editLongMinutes}
              onChange={handleEditLongMinutesChange}
              className="w-8"
            />
          </label>
          <label>
            Pomodoros{" "}
            <input
              type="number"
              min="1"
              value={editPomodoroGoal}
              onChange={handleEditPomodoroGoalChange}
              className="w-8"
            />
          </label>
        </Board>
      ) : (
        <div className="flex gap-4">
          <span className="timer-font-number"> {getFormattedTime}</span>
          <button onClick={handleToggleSound}>
            {isSoundEnabled ? <Icon name="volumeX" /> : <Icon name="volume" />}
          </button>
        </div>
      )}
      <div className="flex gap-2 items-end text-sm uppercase">
        <div className="flex flex-col items-center">
          {completedPomodoros} • {pomodoroGoal}
          <span
            className={
              mode === "focus" && isRunning
                ? activeFocusModeClass
                : inactiveModeClass
            }
          >
            Focus
          </span>
        </div>
        <span>•</span>
        <span
          className={
            mode === "break" && isRunning
              ? activeBreakModeClass
              : inactiveModeClass
          }
        >
          Break
        </span>
        <span>•</span>
        <span
          className={
            mode === "long" && isRunning
              ? activeLongModeClass
              : inactiveModeClass
          }
        >
          Long
        </span>
      </div>
      <div className="text-sm">
        <span
          className={mode === "done" ? activeDoneModeClass : inactiveModeClass}
        >
          DONE
        </span>
      </div>
      <TimerControls
        isRunning={isRunning}
        onToggle={handleToggle}
        toggleDisabled={mode === "done" && !isEditing}
        onReset={handleReset}
        onEdit={handleEdit}
        onConfirmEdit={handleConfirmEdit}
        isEditing={isEditing}
        showEdit
      />
    </Board>
  );
};
