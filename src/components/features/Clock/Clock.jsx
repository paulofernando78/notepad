import { useState, useEffect } from "react";

import { WidgetBody } from "@/components/ui/WidgetBody";
import { WidgetControls } from "@/components/ui/WidgetControls";

export const Clock = ({ city = "São Paulo", latitude, longitude }) => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);

  const [selectedCity, setSelectedCity] = useState(city);
  const [selectedLatitude, setSelectedLatitude] = useState(latitude);
  const [selectedLongitude, setSelectedLongitude] = useState(longitude);

  const [editCity, setEditCity] = useState(city);
  const [isEditingWeather, setIsEditingWeather] = useState(false);

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
      if (selectedLatitude == null || selectedLongitude == null) return;

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedLatitude}&longitude=${selectedLongitude}&current=temperature_2m,weather_code&timezone=auto`,
      );

      const data = await response.json();

      setWeather({
        temperature: Math.round(data.current.temperature_2m),
        code: data.current.weather_code,
      });
    }

    fetchWeather();
  }, [selectedLatitude, selectedLongitude]);

  function handleEditWeather() {
    setEditCity(selectedCity);
    setIsEditingWeather(true);
  }

  async function handleConfirmWeather() {
    const cityName = editCity.trim();

    if (!cityName) return;

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=pt&format=json`,
    );

    const data = await response.json();
    const location = data.results?.[0];

    if (!location) return;

    setSelectedCity(location.name);
    setSelectedLatitude(location.latitude);
    setSelectedLongitude(location.longitude);
    setIsEditingWeather(false);
  }

  return (
    <WidgetBody
      top={<span>{currentTime}</span>}
      middle={
        !isEditingWeather ? (
          <div className="text-xl text-center">
            <span>{currentDate}</span>
            <div className="flex gap-2">
              <span className="block">{selectedCity}</span>{" "}
              {weather && (
                <span className="block">{weather.temperature}°C</span>
              )}
            </div>
          </div>
        ) : (
          <label>
            <input
              type="text"
              value={editCity}
              onChange={(e) => setEditCity(e.target.value)}
              placeholder="Type city"
              className="w- border rounded px-2"
            />
          </label>
        )
      }
      bottom={
        <WidgetControls>
          <WidgetControls.Edit
            isEditing={isEditingWeather}
            onEdit={handleEditWeather}
            onConfirm={handleConfirmWeather}
          />
        </WidgetControls>
      }
    />
  );
};
