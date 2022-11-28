import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva, cx } from 'class-variance-authority';

const inputStyle = cva(
  'w-full text-sm rounded border-solid border disabled:bg-neutral-200 disabled:cursor-default transition-all transition duration-200',
  {
    variants: {
      variant: {
        outline: ['border-neutral-200'],
        filled: ['bg-neutral-50', 'border-neutral-200'],
      },
      size: {
        md: ['py-3 px-2'],
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'md',
    },
  },
);

type InputProps = {
  value?: string;
  name: string;
  id: string;
  placeholder?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & VariantProps<typeof inputStyle>;

const errorStyle = 'text-error border-error';

function Input({
  value,
  name,
  id,
  placeholder,
  isDisabled,
  isInvalid,
  onChange,
  variant,
  size,
  className,
}: InputProps) {
  const concatClassName = cx(className, isInvalid ? errorStyle : '');

  return (
    <input
      type="text"
      name={name}
      id={id}
      disabled={isDisabled}
      value={value}
      onChange={onChange}
      className={inputStyle({ variant, size, className: concatClassName })}
      placeholder={placeholder}
    />
  );
}

Input.defaultProps = {
  value: '',
  placeholder: '',
  isDisabled: false,
  isInvalid: false,
  className: '',
  onChange: () => {},
};

export default Input;
