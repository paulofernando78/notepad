import { useState, useEffect } from "react";

import { Board } from "@/components/ui/Board";
import { TimerControls } from "@/components/ui/TimerControls";

function playTone(frequency, startDelay = 0) {
  const audioContext = new AudioContext();

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const delay = audioContext.createDelay();
  const feedback = audioContext.createGain();

  const startTime = audioContext.currentTime + startDelay;
  const toneDuration = 0.16;

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.9, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + toneDuration);

  delay.delayTime.value = 0.18;
  feedback.gain.value = 0.35;

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  gain.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(audioContext.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + toneDuration);
}

function playAlarm() {
  playTone(880);
  playTone(1320, 0.22);
}

export const Timer = () => {
  const initialTime = 0;

  const [duration, setDuration] = useState(initialTime);
  const [time, setTime] = useState(initialTime);

  // Editing
  const [isEditing, setIsEditing] = useState(false);
  const [editHours, setEditHours] = useState(0);
  const [editMinutes, setEditMinutes] = useState(0);
  const [editSeconds, setEditSeconds] = useState(0);

  const [isRunning, setIsRunning] = useState(false);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const [mode, setMode] = useState("idle");

  function handleEdit() {
    setIsRunning(false);
    setIsAlarmPlaying(false);

    setEditHours(Math.floor(time / 3600));
    setEditMinutes(Math.floor((time % 3600) / 60));
    setEditSeconds(time % 60);

    setIsEditing(true);
  }

  function applyEditSettings(shouldStart) {
    const hours = Math.max(0, Number(editHours));
    const minutes = Math.min(59, Math.max(0, Number(editMinutes)));
    const seconds = Math.min(59, Math.max(0, Number(editSeconds)));

    const newTime = hours * 3600 + minutes * 60 + seconds;

    setDuration(newTime);
    setTime(newTime);
    setMode("idle");
    setIsAlarmPlaying(false);
    setIsEditing(false);
    setIsRunning(shouldStart && newTime > 0);
  }

  function handleConfirmEdit() {
    applyEditSettings(false);
  }

  function handleToggle() {
    if (isEditing) {
      applyEditSettings(true);
      return;
    }

    if (time === 0) return;

    setIsRunning((current) => !current);
  }

  function handleReset() {
    setIsRunning(false);
    setIsAlarmPlaying(false);
    setMode("idle");
    setIsEditing(false);
    setTime(duration);
  }

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

  return (
    <Board className="relative w-42.5 space-y-4 timer-card">
      {/* Time */}
      <div
        className={`flex flex-col items-center ${isEditing ? "invisible" : "visible"}`}
      >
        <span className="timer-font-number">{getFormattedTime}</span>
        <div className="flex flex-col items-center gap-2">
          <label>
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
          </label>
          <span
            className={`text-sm uppercase
          ${mode === "done" ? activeTimerDoneModeClass : inactiveModeClass}`}
          >
            Done
          </span>
        </div>
      </div>

      {/* Inputs */}
      <div
        className={`absolute inset-x-2 top-2 flex gap-3 ${isEditing ? "visible" : "invisible"}`}
      >
        {/* Hours */}
        <label className="text-center">
          <span>h</span>
          <input
            type="number"
            name="hours"
            min="0"
            value={editHours}
            onChange={(event) => setEditHours(Number(event.target.value))}
            className="border border-gray-700 rounded show-spinner"
          />
        </label>
        {/* Minutes */}
        <label className="text-center">
          <span>m</span>
          <input
            type="number"
            name="minutes"
            min="0"
            max="59"
            value={editMinutes}
            onChange={(event) => setEditMinutes(Number(event.target.value))}
            className="border border-gray-700 rounded show-spinner"
          />
        </label>
        {/* Seconds */}
        <label className="text-center">
          <span>s</span>
          <input
            type="number"
            name="seconds"
            min="0"
            max="59"
            value={editSeconds}
            onChange={(event) => setEditSeconds(Number(event.target.value))}
            className="border border-gray-700 rounded show-spinner"
          />
        </label>
      </div>
      <TimerControls
        isEditing={isEditing}
        onEdit={handleEdit}
        showEdit
        onConfirmEdit={handleConfirmEdit}
        isRunning={isRunning}
        onToggle={handleToggle}
        toggleDisabled={mode === "done" && !isEditing}
        onReset={handleReset}
      />
    </Board>
  );
};
