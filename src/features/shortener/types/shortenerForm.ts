import { z } from 'zod';

export const shortenerValidation = z.object({
  url: z.string().url(),
  slug: z.string().optional(),
});

export type FormSchemaType = typeof shortenerValidation;

export type ShortenerFormFields = z.infer<FormSchemaType>;
