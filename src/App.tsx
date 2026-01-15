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
import Hamburger from '/src/assets/hamburger.svg?react';
import MobileHeader from './components/MobileHeader';

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
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

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
        <MobileHeader setIsSidePanelOpen={setIsSidePanelOpen} />
        <div className="flex flex-col pt-4 gap-8 xs:pt-8 p-8 bg-card lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen 2xl:min-h-[1120px]">
          <div className="flex flex-col gap-4 xs:flex-row xs:gap-8">
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 ">
              <p className="text-2xl font-semibold">Location:</p>
              <LocationDropDown />
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 ">
              <p className="text-2xl font-semibold whitespace-nowrap">Map type:</p>
              <MapTypeDropDown />
            </div>
            <button onClick={() => setIsSidePanelOpen(true)} className="hidden xs:block">
              <Hamburger className="size-6 invert ml-auto lg:hidden" />
            </button>
          </div>
          <div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4">
            <div className="relative h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-4 order-1">
              <Map />
              <MapLegend />
            </div>
            <div className="col-span-1 2xl:row-span-2 order-2">
              <Suspense fallback={<CurrentSkeleton />}>
                <CurrentWeather />
              </Suspense>
            </div>
            <div className="col-span-1 order-3 2xl:row-span-2 2xl:order-4">
              <Suspense fallback={<DailySkeleton />}>
                <DailyForecast />
              </Suspense>
            </div>
            <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3">
              <Suspense fallback={<HourlySkeleton />}>
                <HourlyForecast />
              </Suspense>
            </div>
            <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-5">
              <Suspense fallback={<AdditionalSkeleton />}>
                <AdditionalInfo />
              </Suspense>
            </div>
          </div>
        </div>
        <SidePanel isSidePanelOpen={isSidePanelOpen} setIsSidePanelOpen={setIsSidePanelOpen} />
      </>
    </MapContext.Provider>
  );
}

export default App;
