import { createContext, useState } from 'react';
import AdditionalInfo from './components/Cards/AdditionalInfo';
import CurrentWeather from './components/Cards/CurrentWeather';
import DailyForecast from './components/Cards/DailyForecast';
import HourlyForecast from './components/Cards/HourlyForecast';
import Map from './components/Map';
import type { Coords } from './types';

type MapContextType = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
};

export const MapContext = createContext<MapContextType | null>(null);

function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 40, lon: 49 });

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
  };

  return (
    <div className="flex flex-col gap-8">
      <MapContext.Provider value={{ coords, onMapClick }}>
        <Map />
        <CurrentWeather />
        <HourlyForecast />
        <DailyForecast />
        <AdditionalInfo />
      </MapContext.Provider>
    </div>
  );
}

export default App;
