import React from 'react';
import { useFormContext } from 'react-hook-form';

type FieldErrorProps = {
  name?: string;
};

function FieldError({ name }: FieldErrorProps) {
  const {
    formState: { errors },
  } = useFormContext();

  if (!name) return null;

  const error = errors[name];

  if (!error) return null;
  if (typeof error.message !== 'string') return null;

  return <span className="text-sm px-2 font-semibold text-error-500">{error.message}</span>;
}

FieldError.defaultProps = {
  name: undefined,
};

export default FieldError;
