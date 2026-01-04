import { useContext } from 'react';
import { MapContext } from '../App';

export function useMapContext() {
  const coordsContext = useContext(MapContext);

  if (!coordsContext) throw new Error('CurrentWeather must be used within MapContext.Provider');

  return coordsContext;
}
