import { useEffect, useState } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";
import { NumberInput } from "@/components/ui/NumberInput";
import { Icon } from "@/components/ui/Icon";

import { PomodoroGuideDialog } from "@/components/features/PomodoroGuideDialog";

const DEFAULT_FOCUS_MINUTES = 25;
const DEFAULT_BREAK_MINUTES = 5;
const DEFAULT_LONG_BREAK_MINUTES = 15;
const LONG_BREAK_INTERVAL = 4;

function calculateSessionDuration({
  pomodoroGoal,
  focusDuration,
  breakDuration,
  longBreakDuration,
}) {
  const totalBreaks = Math.max(pomodoroGoal - 1, 0);

  const totalLongBreaks = Math.floor(totalBreaks / LONG_BREAK_INTERVAL);

  const totalShortBreaks = totalBreaks - totalLongBreaks;

  const totalFocusTime = pomodoroGoal * focusDuration;

  const totalShortBreakTime = totalShortBreaks * breakDuration;

  const totalLongBreakTime = totalLongBreaks * longBreakDuration;

  return totalFocusTime + totalShortBreakTime + totalLongBreakTime;
}

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

const durationTitle = `
  flex
  flex-col
  pt-3
  px-2
  pb-[0.7rem]
  bg-gray-500/50
  rounded-xl
  justify-self-center
`;

const durationDisplay = `
  pt-2
  font-['Segoe_UI',sans-serif]
  font-bold
`;

export const Pomodoro = ({
  focusMinutes: initialFocusMinutes = DEFAULT_FOCUS_MINUTES,
  breakMinutes: initialBreakMinutes = DEFAULT_BREAK_MINUTES,
  longBreakMinutes: initialLongBreakMinutes = DEFAULT_LONG_BREAK_MINUTES,
  pomodoroGoal: initialPomodoroGoal = 4,
  onConfigChange,
  // onRemove,
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

  const sessionDuration = calculateSessionDuration({
    pomodoroGoal,
    focusDuration,
    breakDuration,
    longBreakDuration,
  });

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

  const editingSessionDuration = calculateSessionDuration({
    pomodoroGoal: editPomodoroGoal,
    focusDuration: editFocusMinutes * 60,
    breakDuration: editBreakMinutes * 60,
    longBreakDuration: editLongBreakMinutes * 60,
  });

  const totalTime = formatTotalTime(
    isEditing ? editingSessionDuration : sessionDuration,
  );

  function handleEdit() {
    setIsRunning(false);
    setEditFocusMinutes(focusMinutes);
    setEditBreakMinutes(breakMinutes);
    setEditLongBreakMinutes(longBreakMinutes);
    setEditPomodoroGoal(pomodoroGoal);
    setIsEditing(true);
  }

  function applyEditSettings(shouldStart) {
    const nextConfig = {
      focusMinutes: editFocusMinutes,
      breakMinutes: editBreakMinutes,
      longBreakMinutes: editLongBreakMinutes,
      pomodoroGoal: editPomodoroGoal,
    };

    setFocusMinutes(nextConfig.focusMinutes);
    setBreakMinutes(nextConfig.breakMinutes);
    setLongBreakMinutes(nextConfig.longBreakMinutes);
    setPomodoroGoal(nextConfig.pomodoroGoal);
    setTime(nextConfig.focusMinutes * 60);
    setCompletedPomodoros(0);
    setMode("focus");
    setIsRunning(shouldStart);
    setIsEditing(false);
    onConfigChange?.(nextConfig);
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
    setTime(focusMinutes * 60);
  }

  const inputAlign = `
    translate-y-[-0.08rem]
  `;

  return (
    <>
      <WidgetBody
        top={
          <div
            className="
              flex
              flex-col
              gap-4
              items-center
              justify-center
            "
          >
            <span>{totalTime}</span>
            {!isEditing && (
                <button
                  onClick={handleToggleSound}
                  aria-label={isSoundEnabled ? "Mute tick" : "Enable tick"}
                  title={isSoundEnabled ? "Mute tick" : "Enable tick"}
                  className="w-max clickable"
                >
                  {isSoundEnabled ? (
                    <Icon name="volumeX" />
                  ) : (
                    <Icon name="volume" />
                  )}
                </button>
              )}
          </div>
        }
        middle={
          <div
            className="
              text-center
              uppercase
            "
          >
            {isEditing ? (
              <div className="grid grid-cols-2 gap-1">
                <span className="self-center">focus</span>
                <NumberInput
                  hideLabel
                  label="Pomodoro Goal"
                  name="pomodoro-goal"
                  value={editPomodoroGoal}
                  onChange={setEditPomodoroGoal}
                  min={1}
                  className={inputAlign}
                />
                <span className="self-center">minutes</span>
                <NumberInput
                  hideLabel
                  label="focus"
                  name="focus"
                  value={editFocusMinutes}
                  onChange={setEditFocusMinutes}
                  min={1}
                  className={inputAlign}
                />
                <span className="self-center">break</span>
                <NumberInput
                  hideLabel
                  label="break"
                  name="break"
                  value={editBreakMinutes}
                  onChange={setEditBreakMinutes}
                  min={0}
                  className={inputAlign}
                />
                <span className="self-center">long</span>
                <NumberInput
                  hideLabel
                  label="long break"
                  name="long-break"
                  value={editLongBreakMinutes}
                  onChange={setEditLongBreakMinutes}
                  min={0}
                  className={inputAlign}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {/* 1 OF 4 */}
                <div
                  className="
                    flex
                    items-center
                    pl-1.5
                    w-max
                    gap-2
                  "
                >
                  <div className="space-x-2">
                    <span>{displayedPomodoro}</span>
                    <span>of</span>
                  </div>
                  <span>{pomodoroGoal}</span>
                </div>
                {/* Focus • Break • Long  */}
                <div
                  className="
                  grid
                  grid-cols-[62px_62px_62px]
                  gap-2
                "
                >
                  {/* FOCUS */}
                  <div className={`w-15.5 ${durationTitle}`}>
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

                      <span className={durationDisplay}>
                        {formatTime(mode === "focus" ? time : focusDuration)}
                      </span>
                    </>
                  </div>

                  {/* BREAK */}
                  <div className={`w-15.5 ${durationTitle}`}>
                    <span
                      className={`${
                        mode === "break" && isRunning
                          ? activeBreakModeClass
                          : inactiveModeClass
                      } text-[1rem]`}
                    >
                      Break
                    </span>
                    <span className={durationDisplay}>
                      {formatTime(mode === "break" ? time : breakDuration)}
                    </span>
                  </div>

                  {/* LONG */}
                  <div className={`w-15.5 ${durationTitle}`}>
                    <span
                      className={`${
                        mode === "long" && isRunning
                          ? activeLongModeClass
                          : inactiveModeClass
                      } text-[1rem]`}
                    >
                      Long
                    </span>
                    <span className={durationDisplay}>
                      {formatTime(mode === "long" ? time : longBreakDuration)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        }
        subMiddle={
          !isEditing && (
            <span
              className={`block uppercase ${
                mode === "done"
                  ? activePomodoroDoneModeClass
                  : inactiveModeClass
              }
                  `}
            >
              done
            </span>
          )
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
            <PomodoroGuideDialog />
            {/* <WidgetControls.Erase onClick={onRemove} /> */}
          </WidgetControls>
        }
      />
    </>
  );
};
