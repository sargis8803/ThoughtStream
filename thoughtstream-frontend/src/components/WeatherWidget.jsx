import React, { useEffect, useState } from "react";
import axios from "axios";

function WeatherWidget({ setLocation }) {  
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityAndWeather = async () => {
      try {
        // Step 1: Get coordinates
        navigator.geolocation.getCurrentPosition(async (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          // Step 2: Get city name from coordinates
          const locationRes = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
          const locationData = await locationRes.json();
          const cityName = locationData.address.city || locationData.address.town || locationData.address.village;
          const countryCode = locationData.address.country_code?.toUpperCase(); // e.g., "CA"
          const fullLocation = countryCode ? `${cityName},${countryCode}` : cityName;

          setCity(cityName); // Set the city state

          // Pass the location back to the Dashboard
          if (setLocation) {
            setLocation(fullLocation);  // Set location in parent component (Dashboard)
            console.log("Location set in WeatherWidget:", fullLocation); // Log the location
          }

          // Step 3: Fetch weather data using OpenWeather API
          const weatherRes = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              q: fullLocation,
              units: "imperial", // Fahrenheit
              appid: import.meta.env.VITE_WEATHER_KEY // OpenWeather API key
            }
          });

          if (weatherRes.status === 200) {
            const data = weatherRes.data;
            setWeatherData({
              location: data.name,
              condition: data.weather[0].description,
              temperature: data.main.temp
            });
          } else {
            setError("Failed to fetch weather data");
            console.error("Weather API error:", weatherRes);
          }
        }, (err) => {
          setError("Geolocation failed or denied");
          console.warn("Geolocation failed or denied", err);
        });
      } catch (error) {
        setError("Error in fetchCityAndWeather: " + error.message);
        console.error("Error in fetchCityAndWeather:", error);
      }
    };

    fetchCityAndWeather();
  }, [setLocation]);  // Only call this effect once when the component mounts

  if (error) {
    return <div className="weather-widget">Error: {error}</div>;
  }

  if (!weatherData) return null;

  const { condition, temperature, location } = weatherData;
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

function getWeatherIconUrl(condition) {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes("cloud")) return "https://openweathermap.org/img/wn/03d.png";
  if (conditionLower.includes("rain")) return "https://openweathermap.org/img/wn/09d.png";
  if (conditionLower.includes("clear")) return "https://openweathermap.org/img/wn/01d.png";
  if (conditionLower.includes("snow")) return "https://openweathermap.org/img/wn/13d.png";
  if (conditionLower.includes("storm")) return "https://openweathermap.org/img/wn/11d.png";
  return null;
}

export default WeatherWidget;