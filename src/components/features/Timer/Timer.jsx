import { useState, useEffect } from "react";

import { WidgetBody } from "@/components/ui/WidgetBody";
import { NumberInput } from "@/components/ui/NumberInput";
import { WidgetControls } from "@/components/ui/WidgetControls";

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
  /*
    Flow do componente:

    1. O React chama Timer() e cria os valores iniciais.
       initialTime e zero, entao o Timer comeca zerado.

    2. Depois o React cria os useState.
       Cada useState guarda uma parte da tela:
       - time: tempo real do contador, em segundos.
       - isEditing: decide se mostra os inputs ou o timer.
       - editHours/editMinutes/editSeconds: valores temporarios dos inputs.
       - isRunning: decide se o useEffect deve contar.
       - isAlarmPlaying: decide se o useEffect deve tocar o alarme.
       - mode: controla o texto/estado visual, como "idle" ou "done".

    3. As functions nao rodam sozinhas.
       Elas rodam quando algum botao as chama:
       - handleEdit: copia time para os inputs edit...
       - applyEditSettings: copia os inputs edit... de volta para time.
       - handleToggle: da play/pause ou confirma a edicao e inicia.
       - handleReset: volta tudo para o default.

    4. Quando uma function chama setTime, setIsRunning, etc.,
       o React salva o novo state e chama Timer() de novo.
       Essa nova chamada redesenha a tela com os valores atualizados.

    5. Os useEffect ficam observando states especificos.
       O primeiro observa isRunning e diminui time a cada segundo.
       O segundo observa isAlarmPlaying e toca o alarme quando fica true.
  */

  const initialTime = 0;

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

    setTime(initialTime);

    setEditHours(0);
    setEditMinutes(0);
    setEditSeconds(0);

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

  return (
    <WidgetBody
      top={<span>{getFormattedTime}</span>}
      middle={
        !isEditing ? (
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
        ) : (
          <div className="
            flex
            gap-3
            text-[0.97rem]
            -translate-y-[0.7rem]
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
        </WidgetControls>
      }
    />
  );
};
