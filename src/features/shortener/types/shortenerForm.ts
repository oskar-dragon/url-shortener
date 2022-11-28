import { z } from 'zod';

export const shortenerValidation = z.object({
  url: z
    .string({
      required_error: 'Please provide a URL',
      invalid_type_error: 'URL must be a string',
    })
    .url({
      message: 'Incorrect url format',
    }),
  slug: z.string().max(7, { message: 'Alias should conntain at most 7 characters(s)' }).optional(),
  email: z.string().email().optional(),
});

export const shortenerUrlOnly = shortenerValidation.pick({ url: true });
export const shortenerUrlAndSlug = shortenerValidation.omit({ email: true });

export type ShortenerUrlOnlyFormType = typeof shortenerUrlOnly;
export type FormSchemaType = typeof shortenerValidation;
export type ShortenerFormFields = z.infer<ShortenerUrlOnlyFormType>;
