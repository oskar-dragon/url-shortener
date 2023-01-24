import { DevTool } from '@hookform/devtools';
import type { Attributes, ComponentProps, ReactElement, ReactNode } from 'react';
import { cloneElement, isValidElement } from 'react';
import { deepMap } from 'react-children-utilities';
import type { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Controller, FormProvider } from 'react-hook-form';

interface FormProps<T extends FieldValues = any> extends Omit<ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
}

function Form<T extends FieldValues>({ form, onSubmit, children, ...restProps }: FormProps<T>) {
  const mappedChildren = deepMap(children, (child: ReactNode) => {
    if (!isValidElement(child)) {
      return child;
    }

    const { name } = child.props;
    if (name) {
      const error = form.formState.errors[name];

      return (
        <Controller
          control={form.control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) =>
            cloneElement(
              child as ReactElement,
              {
                ...(child as ReactElement).props,
                onChange,
                onBlur,
                checked: value,
                value,
                error,
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
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...restProps}>
        <fieldset disabled={form.formState.isSubmitting}>{mappedChildren}</fieldset>
      </form>
      <DevTool control={form.control} />
    </FormProvider>
  );
}

export default Form;
