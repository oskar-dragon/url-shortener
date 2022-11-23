import { z } from 'zod';

export const shortenerValidation = z.object({
  url: z.string().url(),
  slug: z.string().optional(),
});

export const shortenerValidationWithUserId = z.object({
  url: z.string().url(),
  slug: z.string().optional(),
  email: z.string().email().optional(),
});

export type FormSchemaType = typeof shortenerValidation;

export type ShortenerFormFields = z.infer<FormSchemaType>;
