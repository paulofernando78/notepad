import { useState, useEffect } from "react";

import { Board } from "@/components/Board";

export const Clock = ({ className }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  const currentTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const currentDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    // year: "numeric",
  });

  return (
    <Board className={`flex flex-col items-center justify-center p-4 w-max font-['Oswald_Variable'] text-2xl text-white bg-gray-800 [text-shadow:0_0_6px_rgba(255,255,255,0.3)] ${className}`}>
      <span>{currentTime}</span>
      <span>{currentDate}</span>
    </Board>
  );
};
