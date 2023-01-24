import { z } from 'zod';

export const editDetailedLinkFormSchema = z.object({
  active: z.boolean(),
  name: z.string({
    required_error: 'Please provide a name',
    invalid_type_error: 'Name must be a string',
  }),
  categories: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
});

export type EditDetailedLinkFormValues = z.infer<typeof editDetailedLinkFormSchema>;
