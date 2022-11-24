import { z } from 'zod';

export const shortenerValidation = z.object({
  url: z.string().url(),
  slug: z.string().max(7, { message: 'Alias should conntain at most 7 characters(s)' }).optional(),
});

export const shortenerValidationWithUserId = z.object({
  url: z.string().url(),
  slug: z.string().max(7).optional(),
  email: z.string().email().optional(),
});

export type FormSchemaType = typeof shortenerValidation;

export type ShortenerFormFields = z.infer<FormSchemaType>;
