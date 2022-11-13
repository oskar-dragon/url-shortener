/* eslint-disable no-param-reassign */
import { isValidElement, cloneElement } from 'react';
import type { FieldValues, DeepPartial } from 'react-hook-form';
import type { ZodType } from 'zod';
import type { Attributes, ReactNode, ReactElement } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { deepMap } from 'react-children-utilities';

type FormProps<T> = {
  children: ReactNode;
  defaultValues?: DeepPartial<T>;
  onSubmit: (data: T) => void;
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

  const mappedChildren = deepMap(children, (child: ReactNode) => {
    if (!isValidElement(child)) {
      return child;
    }

    const { name } = child.props;
    if (name) {
      const error = errors[name];
      return (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) =>
            cloneElement(
              child as ReactElement,
              {
                ...(child as ReactElement).props,
                onChange,
                onBlur,
                value,
                error: error?.message,
              } as Attributes,
            )
          }
        />
      );
    }

    return cloneElement(child as ReactElement, {
      ...(child as ReactElement).props,
    });
  });

  return <form onSubmit={handleSubmit(onSubmit)}>{mappedChildren}</form>;
}

Form.defaultProps = {
  defaultValues: {},
};

export default Form;
