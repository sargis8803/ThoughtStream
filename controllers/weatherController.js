import axios from "axios";
// need to provide condition, temp, and location data for weather in the JSON response
export const fetchWeather = async (location) =>{
 const key = process.env.WEATHER_KEY;
 const link = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${key}`;
 try{
   const response = await axios.get(link);
   return{
     condition: response.data.weather[0].description,
     temperature: response.data.main.temp,
     location: response.data.name,};
 } catch(error) {
   console.error("Error with weather data from API, ", error.message);
   return null;
 }
};
