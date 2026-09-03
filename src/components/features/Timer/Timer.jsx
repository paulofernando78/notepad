import { useState, useEffect } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";
import { Icon } from "@/components/ui/Icon";

import { NumberInput } from "@/components/ui/NumberInput";

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

export const Timer = ({
  hours = 0,
  minutes = 0,
  seconds = 0,
  onConfigChange,
  onRemove,
}) => {
  const initialTime = hours * 3600 + minutes * 60 + seconds;

  const [configuredTime, setConfiguredTime] = useState(initialTime);
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
    const nextHours = Math.max(0, Number(editHours));
    const nextMinutes = Math.min(59, Math.max(0, Number(editMinutes)));
    const nextSeconds = Math.min(59, Math.max(0, Number(editSeconds)));

    const newTime = nextHours * 3600 + nextMinutes * 60 + nextSeconds;

    setConfiguredTime(newTime);
    setTime(newTime);
    setMode("idle");
    setIsAlarmPlaying(false);
    setIsEditing(false);
    setIsRunning(shouldStart && newTime > 0);

    onConfigChange?.({
      hours: nextHours,
      minutes: nextMinutes,
      seconds: nextSeconds,
    });
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

  function addMinutes(minutesToAdd) {
    const secondsToAdd = minutesToAdd * 60;
    const nextTime = time + secondsToAdd;

    // const nextHours = Math.floor(nextTime / 3600);
    // const nextMinutes = Math.floor((nextTime % 3600) / 60);
    // const nextSeconds = nextTime % 60;

    setConfiguredTime(nextTime);
    setTime(nextTime);

    onConfigChange?.({
      // hours: nextHours,
      // minutes: nextMinutes,
      // seconds: nextSeconds,
    });
  }

  function handleReset() {
    setIsRunning(false);
    setIsAlarmPlaying(false);

    setTime(configuredTime);

    setEditHours(Math.floor(configuredTime / 3600));
    setEditMinutes(Math.floor((configuredTime % 3600) / 60));
    setEditSeconds(configuredTime % 60);

    setMode("idle");
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

  const shortCuts = [1, 5];

  return (
    <WidgetBody
      top={<span>{getFormattedTime}</span>}
      middle={
        !isEditing ? (
          <div
            className="
            flex
            flex-col
            items-center
            gap-2
            "
          >
            <div className="flex flex-col gap-2">
              {shortCuts.map((minutes) => (
                <div
                  key={minutes}
                  className="
                    flex
                    items-center
                    gap-2
                    
                  "
                >
                  <button
                    type="button"
                    onClick={() => addMinutes(-minutes)}
                    className="clickable"
                  >
                    <Icon name="minus" />
                  </button>
                  <span>{minutes}:00</span>
                  <button
                    type="button"
                    onClick={() => addMinutes(minutes)}
                    className="clickable"
                  >
                    <Icon name="plus" />
                  </button>
                </div>
              ))}
            </div>
            {/* <label>
              <input
                type="text"
                className="
                    w-45
                    px-[0.6rem] py-[0.4rem]
                    font-[Arial]
                    border
                    border-gray-500
                    rounded-lg
                    placeholder:italic
                  "
                placeholder="ex: boiling water..."
              />
            </label> */}
            <span
              className={`uppercase pt-2
            ${mode === "done" ? activeTimerDoneModeClass : inactiveModeClass}`}
            >
              done
            </span>
          </div>
        ) : (
          <div
            className="
            flex
            gap-3
            translate-y-[-0.1rem]
            "
          >
            <NumberInput
              label="h"
              name="hours"
              value={editHours}
              onChange={setEditHours}
            />
            <NumberInput
              label="m"
              name="minutes"
              value={editMinutes}
              onChange={setEditMinutes}
              max={59}
            />
            <NumberInput
              label="s"
              name="seconds"
              value={editSeconds}
              onChange={setEditSeconds}
              max={59}
            />
          </div>
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
          <WidgetControls.Erase onClick={onRemove} />
        </WidgetControls>
      }
    />
  );
};
