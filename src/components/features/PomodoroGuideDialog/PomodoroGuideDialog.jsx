import { useRef } from "react";

import { Icon } from "@/components/ui/Icon";
import { Dialog } from "../../ui/Dialog/Dialog";

const phaseColors = {
  focus: "text-green-500",
  break: "text-yellow-500",
  long: "text-blue-500",
  done: "text-red-500",
};

const PhaseLabel = ({ phase }) => {
  return (
    <span className={`${phaseColors[phase]} uppercase`}>
      {phase}
    </span>
  );
};

const Tomate = ({ className }) => {
  return (
    <img
      width="28"
      height="28"
      src="https://img.icons8.com/emoji/96/tomato-emoji.png"
      alt="tomato-emoji"
      className={`translate-y-[-0.2rem] ${className}`}
    />
  );
};

export const PomodoroGuideDialog = () => {
  const dialogRef = useRef(null);

  return (
    <>
      <button
        type="button"
        aria-label="How Pomodoro works"
        onClick={() => dialogRef.current?.showModal()}
      >
        <Icon name="info" />
      </button>
      <Dialog dialogRef={dialogRef} className="space-y-2">
        <h3 className="font-bold">What is it?</h3>
        <p>A simple method to balance focus with deliberate breaks.</p>
        {/* 1 Focus */}
        <p>
          The Pomodoro Technique was invented by Francesco Cirillo in the late
          1980s. He created the method as a university student because he
          struggled to focus on his studies and avoid distractions.
        </p>
        <h3 className="font-bold">How does it works?</h3>
        <ol className="space-y-3">
          <li>
            1. Plan your tasks.
            <p>How many pomodoros might you need?</p>
          </li>
          <li>
            2. Do 1 FOCUS (Pomodoro)
            <p>Time for 25 minutes then take a 5 minute break.</p>
          </li>
          <div
            className="
              grid grid-cols-[1fr_auto_1fr_auto_auto]
              grid-rows-[auto_auto]
              gap-x-2
              pl-2
              pr-1
              pt-2
              pb-[0.4rem]
              w-max
              border
              border-red-100
              rounded-lg
            "
          >
            <PhaseLabel phase="focus" />
            <Icon name="arrowRight" aria-hidden="true" />
            <PhaseLabel phase="break" />
            <span className="self-center">=</span>
            <Tomate />
            <div className="self-center justify-self-center text-sm">
              25mins
            </div>
            <div></div>
            <div className="self-center justify-self-center text-sm">5min</div>
            <div></div>
            <div></div>
          </div>
          <li className="flex gap-2">
            3. Repeat{" "}
            <span className="flex">
              4x
              <Tomate className="ml-1" />,
            </span>
            then take a long break.
          </li>
        </ol>
      </Dialog>
    </>
  );
};
