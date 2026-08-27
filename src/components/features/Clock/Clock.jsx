import { useState, useEffect } from "react";

import { Board } from "@/components/ui/Board";

export const Clock = ({ city = "São Paulo", latitude, longitude }) => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);

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

  useEffect(() => {
    async function fetchWeather() {
      if (!latitude || !longitude) return;

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`,
      );

      const data = await response.json();

      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        code: data.current.weather_code,
      });
    }

    fetchWeather();
  }, [latitude, longitude]);

  return (
    <Board className="timer-card">
      <span className="timer-font-number">{currentTime}</span>
      <div className="flex flex-col items-center text-lg">
        <span className="">{currentDate}</span>
        <div className="flex gap-1 space-y-2">
          <span className="block">{city}</span>{" "}
          {weather && <span className="block">{weather.temperature}°C</span>}
        </div>
      </div>
    </Board>
  );
};
