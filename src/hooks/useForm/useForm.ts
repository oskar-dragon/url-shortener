import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useHookForm } from 'react-hook-form';
import type { UseFormProps as UseHookFormProps } from 'react-hook-form';
import type { ZodSchema, TypeOf } from 'zod';

type UseFormProps<T extends ZodSchema<any>> = {
  schema: T;
} & UseHookFormProps<TypeOf<T>>;

function useForm<T extends ZodSchema<any>>({ schema, ...formConfig }: UseFormProps<T>) {
  return useHookForm({
    ...formConfig,
    resolver: zodResolver(schema),
  });
}
export default useForm;
