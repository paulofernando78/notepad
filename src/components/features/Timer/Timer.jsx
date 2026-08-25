import { useState, useEffect } from "react";

import { Board } from "@/components/ui/Board";
import { TimerControls } from "@/components/ui/TimerControls";

const DEFAULT_TIMER_MINUTES = 0;
const DEFAULT_TIMER_SECONDS = 2;

export const Timer = ({
  minutes = DEFAULT_TIMER_MINUTES,
  seconds = DEFAULT_TIMER_SECONDS,
}) => {
  const initialTime = minutes * 60 + seconds;

  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("idle");
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const intervalID = setInterval(() => {
      setTime((current) => {
        if (current > 1) {
          return current - 1;
        }

        setIsRunning(false);
        setMode("done");
        setIsAlarmPlaying(true);
        return 0;
      });
    }, 1000);

    return () => clearInterval(intervalID);
  }, [isRunning]);

  function playTone(frequency, startDelay = 0) {
    const audioContext = new AudioContext();

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const delay = audioContext.createDelay();
    const feedback = audioContext.createGain();

    const startTime = audioContext.currentTime + startDelay;
    const duration = 0.16;

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.9, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    delay.delayTime.value = 0.18;
    feedback.gain.value = 0.35;

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    gain.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(audioContext.destination);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }

  function playAlarm() {
    playTone(880);
    playTone(1320, 0.22);
  }

  useEffect(() => {
    if (!isAlarmPlaying) return;

    playAlarm();

    const alarmIntervalID = setInterval(() => {
      playAlarm();
    }, 1500);

    return () => clearInterval(alarmIntervalID);
  }, [isAlarmPlaying]);

  const hoursLeft = Math.floor(time / 3600);
  const minutesLeft = Math.floor((time % 3600) / 60);
  const secondsLeft = time % 60;

  const getFormattedTime = `
    ${String(hoursLeft).padStart(2, "0")}:${String(minutesLeft).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}
    `;

   const activeTimerDoneModeClass =
    "text-red-400 [text-shadow:0_0_8px_rgba(248,113,113,0.8)] animate-pulse";
  const inactiveModeClass = "text-gray-400";

  function handleReset() {
    setIsRunning(false);
    setIsAlarmPlaying(false);
    setMode("idle");
    setTime(initialTime);
  }

  return (
    <Board className="timer-card space-y-2">
      <span className="timer-font-number">{getFormattedTime}</span>
      <input
        type="text"
        className="
          w-32
          px-1
          font-[Arial]
          text-sm
          border-b
          border-gray-700
          placeholder:italic
        "
        placeholder="ex: boiling water"
      />
      <span
        className={`text-sm uppercase
          ${mode === "done" ? activeTimerDoneModeClass : inactiveModeClass}`}
      >
        Done
      </span>
      <TimerControls
        isRunning={isRunning}
        onToggle={() => setIsRunning((current) => !current)}
        onReset={handleReset}
        onEdit={() => setIsEditing(true)}
        showEdit
      />
    </Board>
  );
};
