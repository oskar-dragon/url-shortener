import { isValidElement, Children, cloneElement } from 'react';
import type { FieldValues, DeepPartial } from 'react-hook-form';
import type { ZodType } from 'zod';
import type { Attributes, ReactNode } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type FormProps<T> = {
  children: ReactNode;
  defaultValues: DeepPartial<T>;
  onSubmit: () => void;
  schema: ZodType<any, any, any>;
};

function Form<T extends FieldValues>({
  children,
  defaultValues,
  onSubmit,
  schema,
}: FormProps<T>): JSX.Element {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<T>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      const { name } = child.props;

      if (name) {
        const error = errors[name];
        return (
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) =>
              cloneElement(child, { onChange, onBlur, value, error } as Attributes)
            }
          />
        );
      }
    }
    return child;
  });

  return <form onSubmit={handleSubmit(onSubmit)}>{childrenWithProps}</form>;
}

export default Form;
