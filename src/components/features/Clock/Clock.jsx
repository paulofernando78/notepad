import { useState, useEffect } from "react";

import { Board } from "@/components/ui/Board";

export const Clock = () => {
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
    <Board className="timer-card">
      <span>{currentTime}</span>
      <span>{currentDate}</span>
    </Board>
  );
};
