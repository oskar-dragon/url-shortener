import { z } from 'zod';

export const updateDetailedLinkSchema = z.object({
  slug: z.string(),
  active: z.boolean(),
  name: z.string(),
  categories: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
});
