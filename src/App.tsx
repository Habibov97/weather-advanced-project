import { useQuery } from '@tanstack/react-query';
import { getWeather } from './api';
import DailyForecast from './components/Cards/DailyForecast';
import HourlyForecast from './components/Cards/HourlyForecast';
import CurrentWeather from './components/Cards/CurrentWeather';
import AdditionalInfo from './components/Cards/AdditionalInfo';
import Map from './components/Map';

function App() {
  const { data } = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 38, lon: 97, units: 'metric' }),
  });

  return (
    <div className="flex flex-col gap-8">
      <Map />
      <CurrentWeather />
      <HourlyForecast />
      <DailyForecast />
      <AdditionalInfo />
    </div>
  );
}

export default App;
