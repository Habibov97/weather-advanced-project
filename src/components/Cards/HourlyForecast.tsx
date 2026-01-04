import { useSuspenseQuery } from '@tanstack/react-query';
import Card from './Card';
import { getWeather } from '../../api';
import WeatherIcon from '../WeatherIcon';
import { useMapContext } from '../../hooks/useMapContext';

export default function HourlyForecast() {
  const { coords } = useMapContext(); //coords via context
  const { lat, lon } = coords;

  const { data } = useSuspenseQuery({
    queryKey: ['weather', coords],
    queryFn: () => getWeather({ lat, lon, units: 'metric' }),
  });

  return (
    <Card title="Hourly Forecast (48 Hours)" childrenClassName="flex gap-6 overflow-x-scroll">
      {data?.hourly.map((hour) => (
        <div key={hour.dt} className="flex flex-col gap-2 items-center p-2">
          <p className="whitespace-nowrap text-gray-300">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </p>
          <WeatherIcon src={hour.weather[0].icon} />
          <p className="text-gray-500">{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </Card>
  );
}
