import { weatherScheme } from './schemes/weatherScheme';

const API_KEY = import.meta.env.VITE_API_KEY; // import env variable by this way

export async function getWeather({ lat, lon, units }: { lat: number; lon: number; units: string }) {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=${units}&appid=${API_KEY}`
  );

  const data = await res.json();
  return weatherScheme.parse(data);
}
