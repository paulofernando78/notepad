import { useEffect, useState } from "react";
import { Board } from "@/components/ui/Board";
import { TimerControls } from "@/components/ui/TimerControls";
import { Icon } from "@/components/ui/Icon";
import { NumberInput } from "@/components/ui/NumberInput";

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
  minutes: initialFocusMinutes = DEFAULT_FOCUS_MINUTES,
  breakMinutes: initialBreakMinutes = DEFAULT_BREAK_MINUTES,
  longBreakMinutes: initialLongBreakMinutes = DEFAULT_LONG_BREAK_MINUTES,
  totalPomodoros: initialPomodoroGoal = 8,
}) => {
  const [focusMinutes, setFocusMinutes] = useState(initialFocusMinutes);
  const [breakMinutes, setBreakMinutes] = useState(initialBreakMinutes);
  const [longBreakMinutes, setLongBreakMinutes] = useState(
    initialLongBreakMinutes,
  );
  const [pomodoroGoal, setPomodoroGoal] = useState(initialPomodoroGoal);

  const focusDuration = focusMinutes * 60;
  const breakDuration = breakMinutes * 60;
  const longBreakDuration = longBreakMinutes * 60;

  const [time, setTime] = useState(focusDuration);

  // Editing
  const [isEditing, setIsEditing] = useState(false);
  const [editFocusMinutes, setEditFocusMinutes] =
    useState(initialFocusMinutes);
  const [editBreakMinutes, setEditBreakMinutes] =
    useState(initialBreakMinutes);
  const [editLongBreakMinutes, setEditLongBreakMinutes] =
    useState(initialLongBreakMinutes);
  const [editPomodoroGoal, setEditPomodoroGoal] =
    useState(initialPomodoroGoal);

  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const minutesLeft = Math.floor(time / 60);
  const secondLeft = time % 60;
  const displayedPomodoro =
    mode === "focus"
      ? Math.min(completedPomodoros + 1, pomodoroGoal)
      : completedPomodoros;

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

        // "Focus" has finihed
        if (mode === "focus") {
          const nextPomodoro = completedPomodoros + 1;

          setCompletedPomodoros(nextPomodoro);

          // Goal is complete, so no further break is needed.
          if (nextPomodoro >= pomodoroGoal) {
            setMode("done");
            setIsRunning(false);
            return 0;
          }

          // Every four Pomodoros, a Long break replaces the short Break.
          // If nextPomodoro is divisible by 4 with no remainder, start a long break.
          if (nextPomodoro % LONG_BREAK_INTERVAL === 0) {
            setMode("long");
            return longBreakDuration;
          }

          // Start a short break before the next "Focus"
          setMode("break");
          return breakDuration;
        }

        // A short or long break finished
        if (mode === "break" || mode === "long") {
          setMode("focus");
          return focusDuration;
        }

        return current;
      });
    }, 1000);

    return () => clearInterval(intervalID);
  }, [
    isRunning,
    mode,
    completedPomodoros,
    pomodoroGoal,
    focusDuration,
    breakDuration,
    longBreakDuration,
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
    "text-blue-400 [text-shadow:0_0_8px_rgba(248,113,113,0.8)]";
  const activePomodoroDoneModeClass =
    "text-red-400 [text-shadow:0_0_8px_rgba(248,113,113,0.8)] animate-pulse";
  const inactiveModeClass = "text-gray-400";

  function handleEdit() {
    setIsRunning(false);
    setEditFocusMinutes(focusMinutes);
    setEditBreakMinutes(breakMinutes);
    setEditLongBreakMinutes(longBreakMinutes);
    setEditPomodoroGoal(pomodoroGoal);
    setIsEditing(true);
  }

  function applyEditSettings(shouldStart) {
    setFocusMinutes(editFocusMinutes);
    setBreakMinutes(editBreakMinutes);
    setLongBreakMinutes(editLongBreakMinutes);
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

    setEditFocusMinutes(focusMinutes);
    setEditBreakMinutes(breakMinutes);
    setEditLongBreakMinutes(longBreakMinutes);
    setEditPomodoroGoal(pomodoroGoal);

    setCompletedPomodoros(0);
    setMode("focus");
    setTime(initialFocusMinutes * 60);
  }

  return (
    <Board className="relative flex flex-col gap-4 px-[0.8rem]! timer-card">

      {/* Timer */}
      <div className={isEditing ? "invisible" : "visible"}>
        {/* Time + Sound Icon */}
        <div className="flex gap-4">
          <span className="timer-font-number"> {getFormattedTime}</span>
          <button
            onClick={handleToggleSound}
            aria-label={isSoundEnabled ? "Mute tick" : "Enable tick"}
            title={isSoundEnabled ? "Mute tick" : "Enable tick"}
          >
            {isSoundEnabled ? <Icon name="volumeX" /> : <Icon name="volume" />}
          </button>
        </div>
      </div>

      {/* FOCUS • BREAK • LONG  + DONE */}
      <div className={`text-sm text-center ${isEditing ? "invisible" : "visible"}`}>
        {/* Focus • Break • Long  */}
        <div className="flex gap-2 items-end text-sm uppercase">
          {/* Numbers + FOCUS */}
          <div className="flex flex-col items-center">
            {displayedPomodoro} • {pomodoroGoal}
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
          {/* BREAK */}
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
          {/* LONG */}
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
        <span
          className={
            mode === "done" ? activePomodoroDoneModeClass : inactiveModeClass
          }
        >
          DONE
        </span>
      </div>

      {/* Inputs */}
      <div
        className={`absolute inset-x-3 top-[0.8rem] grid gap-2 text-[0.97rem] ${isEditing ? "visible" : "invisible"}`}
      >
        <NumberInput
          label="Focus"
          name="focus"
          value={editFocusMinutes}
          onChange={setEditFocusMinutes}
          min={1}
        />
        <NumberInput
          label="Break"
          name="break"
          value={editBreakMinutes}
          onChange={setEditBreakMinutes}
          min={1}
        />
        <NumberInput
          label="Long"
          name="long-break"
          value={editLongBreakMinutes}
          onChange={setEditLongBreakMinutes}
          min={1}
        />
        <NumberInput
          label="Pomodoros"
          name="pomodoro-goal"
          value={editPomodoroGoal}
          onChange={setEditPomodoroGoal}
          min={1}
        />
      </div>

      <TimerControls
        isEditing={isEditing}
        onEdit={handleEdit}
        onConfirmEdit={handleConfirmEdit}
        showEdit
        isRunning={isRunning}
        onToggle={handleToggle}
        toggleDisabled={mode === "done" && !isEditing}
        onReset={handleReset}
      />
    </Board>
  );
};
