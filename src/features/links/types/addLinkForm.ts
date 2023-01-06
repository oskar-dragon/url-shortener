import { z } from 'zod';

export const addDetailedLinkSchema = z.object({
  url: z
    .string({
      required_error: 'Please provide a URL',
      invalid_type_error: 'URL must be a string',
    })
    .url({
      message: 'Incorrect url format',
    }),
  slug: z.string().max(7, { message: 'Alias should conntain at most 7 characters(s)' }).optional(),
  name: z.string({
    required_error: 'Please provide a name',
    invalid_type_error: 'Name must be a string',
  }),
  categories: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
});

export type AddDetailedLinkSchema = z.infer<typeof addDetailedLinkSchema>;

export default addDetailedLinkSchema;
