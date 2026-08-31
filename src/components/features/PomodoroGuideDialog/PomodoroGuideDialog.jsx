import { useRef } from "react";

import { Icon } from "@/components/ui/Icon";
import { Dialog } from "../../ui/Dialog/Dialog";

const phaseColors = {
  focus:
    "text-green-500 font-['Oswald_Variable'] self-center justify-self-center",
  break:
    "text-yellow-500 font-['Oswald_Variable'] self-center justify-self-center",
  long: "text-blue-500 font-['Oswald_Variable'] self-center justify-self-center",
  done: "text-red-500 font-['Oswald_Variable'] self-center justify-self-center",
};

const PhaseLabel = ({ phase }) => {
  return <span className={`${phaseColors[phase]} uppercase`}>{phase}</span>;
};

const Tomate = ({ className }) => {
  return (
    <img
      width="28"
      height="28"
      src="https://img.icons8.com/emoji/96/tomato-emoji.png"
      alt="tomato-emoji"
      className={className}
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
        <h3 className="font-bold uppercase">What is it?</h3>
        <p>A simple method to balance focus with deliberate breaks.</p>
        {/* 1 Focus */}
        <p>
          The Pomodoro Technique was invented by Francesco Cirillo in the late
          1980s. He created the method as a university student because he
          struggled to focus on his studies and avoid distractions.
        </p>
        <h3 className="font-bold uppercase">How does it works?</h3>
        <ol className="space-y-3">
          <li>
            <span className="font-bold">1. Plan your tasks.</span>
            <p>How many pomodoros might you need?</p>
          </li>
          <li>
            <span className="font-bold">2. Do 1 FOCUS (Pomodoro)</span>
            <p>Time for 25 minutes then take a 5 minute break.</p>
          </li>
          <div
            className="
              grid grid-cols-[1fr_auto_1fr_auto_auto]
              grid-rows-[auto_auto]
              gap-x-1
              px-2
              w-max
              border border-gray-500 bg-gray-600 p-2 rounded-lg
            "
          >
            <PhaseLabel phase="focus" />
            <Icon
              name="arrowRight"
              aria-hidden="true"
              className="self-center"
            />
            <PhaseLabel phase="break" />

            <span className="row-span-2 self-center">=</span>
            <Tomate className="relative top-2 left-1 " />

            <div className="self-center justify-self-center text-sm">
              25mins
            </div>
            <div></div>
            <div className="self-center justify-self-center text-sm">5min</div>
            <div></div>
            <div></div>
          </div>
          <li className="flex gap-2">
            3. Take a long break at the fourth time.
          </li>
        </ol>
        <div className="flex gap-3 overflow-x-scroll">
          <div className="flex items-center gap-3">
            <div
              className="
                  grid grid-cols-[1fr_auto_1fr]
                  grid-rows-[auto_auto]
                  gap-x-1
                  px-2
                  w-max
                  border border-gray-500 bg-gray-600 p-2 rounded-lg
                "
            >
              <Tomate className="col-start-2 row-start-1 justify-self-center mb-1" />
              <div></div>
              <div></div>
              <PhaseLabel phase="focus" />
              <Icon
                name="arrowRight"
                aria-hidden="true"
                className="self-center justify-self-center"
              />
              <PhaseLabel phase="break" />

              <div className="self-center justify-self-center text-sm">
                25mins
              </div>
              <div></div>
              <div className="self-center justify-self-center text-sm">
                5min
              </div>
            </div>
            <Icon name="plus" />
          </div>
          <div className="flex items-center gap-3">
            <div
              className="
                  grid grid-cols-[1fr_auto_1fr]
                  grid-rows-[auto_auto]
                  gap-x-1
                  px-2
                  w-max
                  border border-gray-500 bg-gray-600 p-2 rounded-lg
                "
            >
              <Tomate className="col-start-2 row-start-1 justify-self-center mb-1" />
              <div></div>
              <div></div>
              <PhaseLabel phase="focus" />
              <Icon
                name="arrowRight"
                aria-hidden="true"
                className="self-center justify-self-center"
              />
              <PhaseLabel phase="break" />

              <div className="self-center justify-self-center text-sm">
                25mins
              </div>
              <div></div>
              <div className="self-center justify-self-center text-sm">
                5min
              </div>
            </div>
            <Icon name="plus" />
          </div>
          <div className="flex items-center gap-3">
            <div
              className="
                  grid grid-cols-[1fr_auto_1fr]
                  grid-rows-[auto_auto]
                  gap-x-1
                  px-2
                  w-max
                  border border-gray-500 bg-gray-600 p-2 rounded-lg
                "
            >
              <Tomate className="col-start-2 row-start-1 justify-self-center mb-1" />
              <div></div>
              <div></div>
              <PhaseLabel phase="focus" />
              <Icon
                name="arrowRight"
                aria-hidden="true"
                className="self-center justify-self-center"
              />
              <PhaseLabel phase="break" />

              <div className="self-center justify-self-center text-sm">
                25mins
              </div>
              <div></div>
              <div className="self-center justify-self-center text-sm">
                5min
              </div>
            </div>
            <Icon name="plus" />
          </div>
          <div className="flex items-center gap-3">
            <div
              className="
                  grid grid-cols-[1fr_auto_1fr]
                  grid-rows-[auto_auto]
                  gap-x-1
                  px-2
                  w-max
                  border border-gray-500 bg-gray-600 p-2 rounded-lg
                "
            >
              <Tomate className="col-start-2 row-start-1 justify-self-center mb-1" />
              <div></div>
              <div></div>
              <PhaseLabel phase="focus" />
              <Icon
                name="arrowRight"
                aria-hidden="true"
                className="self-center justify-self-center"
              />
              <PhaseLabel phase="long" />

              <div className="self-center justify-self-center text-sm">
                25mins
              </div>
              <div></div>
              <div className="self-center justify-self-center text-sm">
                5min
              </div>
            </div>
          </div>
        </div>
        <p>One complete cycle has 1:55 (one hour anf fifty minutes).</p>
      </Dialog>
    </>
  );
};
