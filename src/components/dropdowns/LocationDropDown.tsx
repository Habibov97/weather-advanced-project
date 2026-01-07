import { useMapContext } from '@/hooks/useMapContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Props = {};

export default function LocationDropDown({}: Props) {
  const { location, setLocation } = useMapContext();

  return (
    <Select value={location} onValueChange={(value) => setLocation(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Choose the location`} />
      </SelectTrigger>
      <SelectContent className="z-1001">
        {location === 'custom' && <SelectItem value="custom">Custom</SelectItem>}
        {locations.map((city) => {
          return (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

const locations = [
  'Baku',
  'London',
  'New York',
  'Paris',
  'Tokyo',
  'Dubai',
  'Istanbul',
  'Berlin',
  'Rome',
  'Los Angeles',
  'Moscow',
  'Singapore',
];
