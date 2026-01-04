import { useSuspenseQuery } from '@tanstack/react-query';
import Card from './Card';
import { getWeather } from '../../api';
import Sunrise from '/src/assets/sunrise.svg?react';
import Sunset from '/src/assets/sunset.svg?react';
import Cloud from '/src/assets/cloud.svg?react';
import Uv from '/src/assets/uv.svg?react';
import Wind from '/src/assets/Wind.svg?react';
import Pressure from '/src/assets/pressure.svg?react';
import FormatComponentForAdditionalInfo from '../../utils/FormatComponentForAdditionalInfo';
import { useMapContext } from '../../hooks/useMapContext';

export default function AdditionalInfo() {
  const { coords } = useMapContext(); //coords via context
  const { lat, lon } = coords;

  const { data } = useSuspenseQuery({
    queryKey: ['weather', coords],
    queryFn: () => getWeather({ lat, lon, units: 'metric' }),
  });

  return (
    <Card title="Additional Weather Info" childrenClassName="flex flex-col gap-8">
      {rows.map(({ label, value, Icon }) => (
        <div key={value} className="flex justify-between">
          <div className="flex items-center gap-4">
            <span className="text-gray-300">{label}</span>
            <Icon className="size-8 invert" />
          </div>
          <span className="text-gray-400">
            <FormatComponentForAdditionalInfo value={value} number={data.current[value]} />
          </span>
        </div>
      ))}
    </Card>
  );
}

const rows = [
  {
    label: 'Cloudiness (%)',
    value: 'clouds',
    Icon: Cloud,
  },
  {
    label: 'UV Index',
    value: 'uvi',
    Icon: Uv,
  },
  {
    label: 'Wind Direction',
    value: 'wind_deg',
    Icon: Wind,
  },
  {
    label: 'Pressure (hPa)',
    value: 'pressure',
    Icon: Pressure,
  },
  {
    label: 'Sunrise',
    value: 'sunrise',
    Icon: Sunrise,
  },
  {
    label: 'Sunset',
    value: 'sunset',
    Icon: Sunset,
  },
] as const;
