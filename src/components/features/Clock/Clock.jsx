import { useState, useEffect } from "react";

import { WidgetBody, WidgetControls } from "@/components/ui/Widget";
import { Icon } from "@/components/ui/Icon";

import { submitOnEnter } from "@/utils/keyboard";

const CLOCK_LOCATION_STORAGE_KEY = "clock-location";

const DEFAULT_CLOCK_LOCATION = {
  location: "São Paulo, São Paulo, Brasil",
  latitude: -23.55052,
  longitude: -46.63331,
  timezone: "America/Sao_Paulo",
};

function getSavedClockLocation() {
  const savedLocation = localStorage.getItem(CLOCK_LOCATION_STORAGE_KEY);

  if (!savedLocation) return DEFAULT_CLOCK_LOCATION;

  try {
    return JSON.parse(savedLocation);
  } catch {
    return DEFAULT_CLOCK_LOCATION;
  }
}

export const Clock = ({ onRemove }) => {
  const savedClockLocation = getSavedClockLocation();

  // Clock
  const [time, setTime] = useState(new Date());

  // Selected weather location
  const [selectedLocation, setSelectedLocation] = useState(
    savedClockLocation.location,
  );
  const [selectedLatitude, setSelectedLatitude] = useState(
    savedClockLocation.latitude,
  );
  const [selectedLongitude, setSelectedLongitude] = useState(
    savedClockLocation.longitude,
  );
  const [selectedTimezone, setSelectedTimezone] = useState(
    savedClockLocation.timezone,
  );

  // Loaded weather data
  const [weather, setWeather] = useState(null);

  // Weather edit state
  const [isEditingWeather, setIsEditingWeather] = useState(false);
  const [editLocation, setEditLocation] = useState("");
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
    timeZone: selectedTimezone,
  });

  const currentDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: selectedTimezone,
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
    setLocationSuggestions([]);
    setIsEditingWeather(true);
  }

  function saveClockLocation(locationData) {
    localStorage.setItem(
      CLOCK_LOCATION_STORAGE_KEY,
      JSON.stringify(locationData),
    );
  }

  async function handleConfirmWeather() {
    const locationName = editLocation.trim();

    if (!locationName) {
      setEditLocation("");
      setLocationSuggestions([]);
      setIsEditingWeather(false);
      return;
    }

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(locationName)}&count=1&language=pt&format=json`,
    );

    const data = await response.json();
    const location = data.results?.[0];

    if (!location) return;

    const selectedLocationData = {
      location: `${location.name}${location.admin1 ? `, ${location.admin1}` : ""}, ${location.country}`,
      latitude: location.latitude,
      longitude: location.longitude,
      timezone: location.timezone ?? "America/Sao_Paulo",
    };

    setSelectedLocation(selectedLocationData.location);
    setSelectedLatitude(selectedLocationData.latitude);
    setSelectedLongitude(selectedLocationData.longitude);
    setSelectedTimezone(selectedLocationData.timezone);
    saveClockLocation(selectedLocationData);
    setIsEditingWeather(false);
    setEditLocation("");
    setLocationSuggestions([]);
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
  }

  function handleSelectLocation(selectedSuggestion) {
    const selectedLocationData = {
      location: `${selectedSuggestion.name}${
        selectedSuggestion.admin1 ? `, ${selectedSuggestion.admin1}` : ""
      }, ${selectedSuggestion.country}`,
      latitude: selectedSuggestion.latitude,
      longitude: selectedSuggestion.longitude,
      timezone: selectedSuggestion.timezone ?? "America/Sao_Paulo",
    };

    setSelectedLocation(selectedLocationData.location);
    setSelectedLatitude(selectedLocationData.latitude);
    setSelectedLongitude(selectedLocationData.longitude);
    setSelectedTimezone(selectedLocationData.timezone);
    saveClockLocation(selectedLocationData);
    setEditLocation("");
    setLocationSuggestions([]);
    setIsEditingWeather(false);
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
              translate-x-[-0.04rem]
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
              {locationSuggestions.length > 0 && (
                <div
                  className="
                  absolute
                  left-0
                  z-10
                  mt-2
                  p-1
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
                        onClick={() => handleSelectLocation(location)}
                        className="
                        w-full
                        p-1
                        text-left
                        truncate
                        cursor-pointer
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
              )}
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
