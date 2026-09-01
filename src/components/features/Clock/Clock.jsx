import { useState, useEffect } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";
import { Icon } from "@/components/ui/Icon";

import { submitOnEnter } from "@/utils/keyboard";

export const Clock = ({
  location = "São Paulo",
  latitude,
  longitude,
  onRemove,
}) => {
  // Clock
  const [time, setTime] = useState(new Date());

  // Selected weather location
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [selectedLatitude, setSelectedLatitude] = useState(latitude);
  const [selectedLongitude, setSelectedLongitude] = useState(longitude);

  // Loaded weather data
  const [weather, setWeather] = useState(null);

  // Weather edit state
  const [isEditingWeather, setIsEditingWeather] = useState(false);
  const [editLocation, setEditLocation] = useState(location);
  const [locationSuggestions, setLocationSuggestions] = useState([]);

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
    year: "numeric",
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
    setEditLocation("");
    setEditLocation([]);
    setIsEditingWeather(true);
  }

  async function handleConfirmWeather() {
    const locationName = editLocation.trim();

    if (!locationName) return;

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1&language=pt&format=json`,
    );

    const data = await response.json();
    const location = data.results?.[0];

    if (!location) return;

    setSelectedLocation(location.name);
    setSelectedLatitude(location.latitude);
    setSelectedLongitude(location.longitude);
    setIsEditingWeather(false);
  }

  async function handleLocationChange(event) {
    const value = event.target.value;

    setEditLocation(value);

    if (value.trim().length < 2) {
      setLocationSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        value,
      )}&count=5&language=pt&format=json`,
    );

    const data = await response.json();

    setLocationSuggestions(data.results ?? []);
    console.log(data.results);
  }

  return (
    <WidgetBody
      top={
        <>
          <span className="block">{currentTime}</span>
          <span className="text-lg">{currentDate}</span>
        </>
      }
      middle={
        !isEditingWeather ? (
          <div
            className="
            flex
            flex-col
            gap-2
            "
          >
            <div
              className="
              flex
              items-center
              gap-2
              "
            >
              <Icon name="mapPin" />
              <span className="block">{selectedLocation}</span>
            </div>
            <div className="flex items-center gap-2">
              {weather && (
                <>
                  <Icon name="thermometer" />
                  <span className="block">{weather.temperature}°C</span>
                </>
              )}
            </div>
          </div>
        ) : (
          <div
            className="
            relative
              flex
              gap-2
              h-25
              translate-x-[-0.02rem]
              translate-y-[0.15rem]
            "
          >
            {/* <Icon name="mapPin" size={25} /> */}
            <div className="">
              <label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={handleLocationChange}
                  onKeyDown={(event) =>
                    submitOnEnter(event, handleConfirmWeather)
                  }
                  placeholder="Type location"
                  className="  
                    w-53
                    border
                    rounded
                    px-2
                    pt-1
                    pb-1
                  "
                />
              </label>
              <div
                className="
                  absolute
                  left-0
                  z-10
                  mt-2
                  p-2
                  w-53
                  h-14.25
                  bg-gray-700
                  rounded
                  shadow-lg
                  overflow-y-auto
                "
              >
                {locationSuggestions.map((location) => {
                  return (
                    <button
                      type="button"
                      key={location.id}
                      className="
                        w-full
                        p-1
                        text-left
                        truncate
                        hover:bg-gray-600
                      "
                    >
                      <span>{location.name}</span>,{" "}
                      <span>
                        {location.admin1 ? `${location.admin1}, ` : ""}
                        {location.country}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )
      }
      bottom={
        <div className="translate-y-[0.1rem]">
          <WidgetControls>
            <WidgetControls.Edit
              isEditing={isEditingWeather}
              onEdit={handleEditWeather}
              onConfirm={handleConfirmWeather}
            />
            <WidgetControls.Erase onClick={onRemove} />
          </WidgetControls>
        </div>
      }
    />
  );
};
