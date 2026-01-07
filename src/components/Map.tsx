import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapContext } from '../hooks/useMapContext';

type Props = {};

const API_KEY = import.meta.env.VITE_API_KEY;

export default function Map({}: Props) {
  const { coords, mapType } = useMapContext();
  const { lat, lon } = coords;

  return (
    <MapContainer center={[lat, lon]} zoom={5} style={{ width: '1000px', height: '500px' }}>
      <MapClick />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <TileLayer url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`} />
      <Marker position={[lat, lon]} />
    </MapContainer>
  );
}

function MapClick() {
  const { coords, onMapClick } = useMapContext();
  const map = useMap();
  map.panTo([coords.lat, coords.lon]);

  map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    onMapClick(lat, lng);
  });

  return null;
}
