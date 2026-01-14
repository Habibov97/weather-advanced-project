import { AirPollutionSchema } from './schemes/airPollutionSchema';
import { GeocodeSchema } from './schemes/geocodeScheme';
import { weatherScheme } from './schemes/weatherScheme';

const API_KEY = import.meta.env.VITE_API_KEY; // import env variable by this way

export async function getWeather({ lat, lon, units }: { lat: number; lon: number; units: string }) {
  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=${units}&appid=${API_KEY}`
  );

  const data = await res.json();
  return weatherScheme.parse(data);
}

export async function getGeoCode(location: string) {
  const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`);

  const data = await res.json();
  return GeocodeSchema.parse(data);
}

export async function getAirPollution({ lat, lon }: { lat: number; lon: number }) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  const data = await res.json();
  return AirPollutionSchema.parse(data);
}
