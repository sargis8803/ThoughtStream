import React from "react";

function WeatherWidget({ city, weatherData }) {
  if (!weatherData) return null;

  const { condition, temperature, location } = weatherData;

  // Use OpenWeatherMap icons (assumes condition => icon mapping is handled separately or simplified here)
  const iconUrl = getWeatherIconUrl(condition);

  return (
    <div className="weather-widget">
      <h3>Weather in {location || city}</h3>
      <p>{condition}</p>
      <p>{temperature}°F</p>
      {iconUrl && <img src={iconUrl} alt={condition} style={{ width: "50px" }} />}
    </div>
  );
}

// Simplified mapping from condition to icon URL
function getWeatherIconUrl(condition) {
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes("cloud")) return "https://openweathermap.org/img/wn/03d.png";
  if (conditionLower.includes("rain")) return "https://openweathermap.org/img/wn/09d.png";
  if (conditionLower.includes("clear")) return "https://openweathermap.org/img/wn/01d.png";
  if (conditionLower.includes("snow")) return "https://openweathermap.org/img/wn/13d.png";
  if (conditionLower.includes("storm")) return "https://openweathermap.org/img/wn/11d.png";

  return null; // fallback
}

export default WeatherWidget;