import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type Props = {};

export default function Map({}: Props) {
  return (
    <div>
      <div>This is a map</div>
      <p>this is a test paragraph for map!!!</p>
      <p>This is a update paragraph for map!!!!</p>
      <p>This is a second update paragraph for map!!!!</p>
      <p>This is a third update paragraph for map!!!!</p>
    </div>
  );
}
