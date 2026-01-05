import { z } from 'zod';

export const GeocodeItemSchema = z.object({
  name: z.string(),
  local_names: z.record(z.string(), z.string()),
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
  state: z.string().optional(),
});

export const GeocodeSchema = z.array(GeocodeItemSchema);
