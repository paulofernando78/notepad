import { useEffect, useState } from "react";
import { WidgetBody } from "@/components/ui/WidgetBody";
import { NumberInput } from "@/components/ui/NumberInput";
import { WidgetControls } from "@/components/ui/WidgetControls";
import { Icon } from "@/components/ui/Icon";

const DEFAULT_FOCUS_MINUTES = 25;
const DEFAULT_BREAK_MINUTES = 5;
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
  onRemove,
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
  const [editFocusMinutes, setEditFocusMinutes] = useState(initialFocusMinutes);
  const [editBreakMinutes, setEditBreakMinutes] = useState(initialBreakMinutes);
  const [editLongBreakMinutes, setEditLongBreakMinutes] = useState(
    initialLongBreakMinutes,
  );
  const [editPomodoroGoal, setEditPomodoroGoal] = useState(initialPomodoroGoal);

  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("focus");
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

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

  const activeFocusModeClass =
    "text-green-400 [text-shadow:0_0_8px_rgba(0,225,0,0.8)]";

  const activeBreakModeClass =
    "text-yellow-400 [text-shadow:0_0_8px_rgba(255,255,0,0.8)]";
  const activeLongModeClass =
    "text-blue-400 [text-shadow:0_0_12px_rgba(96,165,250,1)]";
  const activePomodoroDoneModeClass =
    "text-red-400 [text-shadow:0_0_8px_rgba(248,113,113,0.8)] animate-pulse";
  const inactiveModeClass = "text-gray-400";

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function formatTotalTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function calculateTotalSeconds() {
    if (mode === "done") {
      return 0;
    }

    let total = time;

    return total;
  }

  const totalTime = formatTotalTime(calculateTotalSeconds());

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
    <WidgetBody
      top={
        <div
          className="
            flex
            gap-4
            justify-center
          "
        >
          <span>{totalTime}</span>
          <button
            onClick={handleToggleSound}
            aria-label={isSoundEnabled ? "Mute tick" : "Enable tick"}
            title={isSoundEnabled ? "Mute tick" : "Enable tick"}
          >
            {isSoundEnabled ? <Icon name="volumeX" /> : <Icon name="volume" />}
          </button>
        </div>
      }
      middle={
        <div
          className="
            text-center
            uppercase
          "
        >
          {/* Focus • Break • Long  */}
          <div className="space-y-2">
            <div
              className="
                grid
                grid-cols-[50px_auto_50px_auto_50px]
                items-center
                justify-center
                
                "
            >
              {/* FOCUS */}
              <div className="flex flex-col">
                <>
                  <span
                    className={`${
                      mode === "focus" && isRunning
                        ? activeFocusModeClass
                        : inactiveModeClass
                    } text-[1rem]`}
                  >
                    Focus
                  </span>
                  {isEditing ? (
                    <div
                      className="
                        h-[30.8px]
                      ">
                      <NumberInput
                        label=""
                        name="focus"
                        value={editFocusMinutes}
                        onChange={setEditFocusMinutes}
                        min={1}
                        wrapperClassName="text-center"
                      />
                    </div>
                  ) : (
                    <span
                      className="
                        h-[30.8px]
                        translate-y-1
                        pomo-middle-time
                      "
                    >
                      {formatTime(mode === "focus" ? time : focusDuration)}
                    </span>
                  )}
                </>
              </div>

              {/* <Icon name="dot" size={20} /> */}
              <div aria-hidden="true" className="mx-2 w-px h-12 bg-gray-400" />

              {/* BREAK */}
              <div className="flex flex-col">
                <span
                  className={`${
                    mode === "break" && isRunning
                      ? activeBreakModeClass
                      : inactiveModeClass
                  } text-[1rem]`}
                >
                  Break
                </span>
                {isEditing ? (
                  <div className="h-[30.8px]">
                    <NumberInput
                      label=""
                      name="break"
                      value={editBreakMinutes}
                      onChange={setEditBreakMinutes}
                      min={1}
                    />
                  </div>
                ) : (
                  <span
                    className="
                      h-[30.8px]
                      translate-y-1
                      pomo-middle-time
                    "
                  >
                  {formatTime(mode === "break" ? time : breakDuration)}
                </span>
                )}
              </div>

              {/* <Icon name="dot" size={20} /> */}
              <div aria-hidden="true" className="mx-2 w-px h-12 bg-gray-400" />

              {/* LONG */}
              <div
                className="
                  flex
                  flex-col
                "
              >
                <span
                  className={`${
                    mode === "long" && isRunning
                      ? activeLongModeClass
                      : inactiveModeClass
                  } text-[1rem]`}
                >
                  Long
                </span>
                {isEditing ? (
                  <div className="h-[30.8px]">
                    <NumberInput
                      label=""
                      name="long-break"
                      value={editLongBreakMinutes}
                      onChange={setEditLongBreakMinutes}
                      min={1}
                    />
                  </div>
                ) : (
                  <span
                    className="
                      h-[30.8px]
                      translate-y-1
                      pomo-middle-time
                    "
                  >
                    {formatTime(mode === "long" ? time : longBreakDuration)}
                  </span>
                  )
                }
              </div>
            </div>

            {/* OUT OF */}
            <div className="flex gap-2">
              <div
                className="
                    flex
                    items-center
                    translate-x-[0.1rem]
                    "
              >
                <span className="space-x-2">
                  <span>{displayedPomodoro}</span>
                  <span>out of</span>
                  <span>{pomodoroGoal}</span>
                  <p> </p>{" "}
                </span>
              </div>
            </div>

            {/* DONE */}
            <span
              className={`block ${
                mode === "done"
                  ? activePomodoroDoneModeClass
                  : inactiveModeClass
              }
                `}
            >
              DONE
            </span>
          </div>
        </div>
      }
      bottom={
        <WidgetControls>
          <WidgetControls.Play
            isRunning={isRunning}
            onClick={handleToggle}
            disabled={mode === "done" && !isEditing}
          />
          <WidgetControls.Reset onClick={handleReset} />
          <WidgetControls.Edit
            isEditing={isEditing}
            onEdit={handleEdit}
            onConfirm={handleConfirmEdit}
          />
          <WidgetControls.Erase onClick={onRemove} />
        </WidgetControls>
      }
    />
  );
};
