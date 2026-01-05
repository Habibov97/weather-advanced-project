import { createContext, useState } from 'react';
import AdditionalInfo from './components/Cards/AdditionalInfo';
import CurrentWeather from './components/Cards/CurrentWeather';
import DailyForecast from './components/Cards/DailyForecast';
import HourlyForecast from './components/Cards/HourlyForecast';
import Map from './components/Map';
import type { Coords } from './types';
import LocationDropDown from './components/dropdowns/LocationDropDown';
import { useQuery } from '@tanstack/react-query';
import { getGeoCode } from './api';

type MapContextType = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
};

export const MapContext = createContext<MapContextType | null>(null);

function App() {
  const [coordinates, setCoordinates] = useState<Coords>({ lat: 40, lon: 49 });
  const [location, setLocation] = useState('Baku');

  const { data: geoCodeData } = useQuery({
    queryKey: ['geocode', location],
    queryFn: () => getGeoCode(location),
  });

  const onMapClick = (lat: number, lon: number) => {
    setCoordinates({ lat, lon });
    setLocation('custom');
  };

  const coords =
    location === 'custom' ? coordinates : { lat: geoCodeData?.[0].lat ?? 0, lon: geoCodeData?.[0].lon ?? 0 };

  return (
    <div className="flex flex-col gap-8 bg-card">
      <MapContext.Provider value={{ coords, onMapClick, location, setLocation }}>
        <LocationDropDown />
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
