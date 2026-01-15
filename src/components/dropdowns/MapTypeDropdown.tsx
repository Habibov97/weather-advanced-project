import { useMapContext } from '@/hooks/useMapContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type Props = {};

export default function MapTypeDropDown({}: Props) {
  const { mapType, setMapType } = useMapContext();

  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-full xs:w-[180px]">
        <SelectValue placeholder={`Choose the may type`} />
      </SelectTrigger>
      <SelectContent className="z-1001">
        {layerTypes.map((layerType) => {
          return (
            <SelectItem key={layerType} value={layerType} className="capitalize">
              {layerType.split('_')[0]}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

const layerTypes = ['clouds_new', 'precipitation_new', 'pressure_new', 'wind_new', 'temp_new'];
