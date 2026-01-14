import { createContext, Suspense, useState } from 'react';
import AdditionalInfo from './components/Cards/AdditionalInfo';
import CurrentWeather from './components/Cards/CurrentWeather';
import DailyForecast from './components/Cards/DailyForecast';
import HourlyForecast from './components/Cards/HourlyForecast';
import Map from './components/Map';
import type { Coords } from './types';
import LocationDropDown from './components/dropdowns/LocationDropDown';
import { useQuery } from '@tanstack/react-query';
import { getGeoCode } from './api';
import MapTypeDropDown from './components/dropdowns/MapTypeDropdown';
import MapLegend from './components/MapLegend';
import CurrentSkeleton from './components/skeletons/CurrentSkeleton';
import HourlySkeleton from './components/skeletons/HourlySkeleton';
import DailySkeleton from './components/skeletons/DailySkeleton';
import AdditionalSkeleton from './components/skeletons/AdditionalSkeleton';
import SidePanel from './components/SidePanel';

type MapContextType = {
  coords: Coords;
  onMapClick: (lat: number, lon: number) => void;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  mapType: string;
  setMapType: React.Dispatch<React.SetStateAction<string>>;
};

export const MapContext = createContext<MapContextType | null>(null);

function App() {
  const [coordinates, setCoordinates] = useState<Coords>({ lat: 40, lon: 49 });
  const [location, setLocation] = useState('Baku');
  const [mapType, setMapType] = useState('clouds_new');

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
    <MapContext.Provider value={{ coords, onMapClick, location, setLocation, mapType, setMapType }}>
      <>
        <div className="flex flex-col gap-8 bg-card">
          <div className="flex gap-8 mt-10">
            <div className="flex gap-4 items-center">
              <p className="text-2xl font-semibold">Location:</p>
              <LocationDropDown />
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-2xl font-semibold">Map type:</p>
              <MapTypeDropDown />
            </div>
          </div>
          <div className="relative">
            <Map />
            <MapLegend />
          </div>
          <Suspense fallback={<CurrentSkeleton />}>
            <CurrentWeather />
          </Suspense>
          <Suspense fallback={<HourlySkeleton />}>
            <HourlyForecast />
          </Suspense>
          <Suspense fallback={<DailySkeleton />}>
            <DailyForecast />
          </Suspense>
          <Suspense fallback={<AdditionalSkeleton />}>
            <AdditionalInfo />
          </Suspense>
        </div>
        <SidePanel />
      </>
    </MapContext.Provider>
  );
}

export default App;
