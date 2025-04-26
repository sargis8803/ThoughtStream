import axios from "axios";
//need to provide condition, temp, and location data for weather in the JSON response
export const openWeatherData = async (location) =>{//input location provided by user
 const key = process.env.WEATHER_KEY;
 const link = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${key}`;
 try{
   const res = await axios.get(link);
   return{location: res.data.name, condition: res.data.weather[0].description, temperature: res.data.main.temp};
 }catch(error) {
   console.error("Error with weather data from API, ", error.message);
   return null;
 }
};
