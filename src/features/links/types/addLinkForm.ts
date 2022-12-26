import { z } from 'zod';

const addLinkSchema = z.object({
  url: z
    .string({
      required_error: 'Please provide a URL',
      invalid_type_error: 'URL must be a string',
    })
    .url({
      message: 'Incorrect url format',
    }),
  slug: z
    .string({
      required_error: 'Please provide an alias',
      invalid_type_error: 'Alias must be a string',
    })
    .max(7, { message: 'Alias should conntain at most 7 characters(s)' }),
  name: z.string({
    required_error: 'Please provide a name',
    invalid_type_error: 'Name must be a string',
  }),
});

export type AddLinkSchemaType = z.infer<typeof addLinkSchema>;

export default addLinkSchema;
