import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva, cx } from 'class-variance-authority';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const wrapper = cva(
  [
    'relative',
    'w-full',
    'rounded-lg',
    'transition-all',
    'transition',
    'duration-200',
    'flex',
    'flex-row',
  ],
  {
    variants: {
      variant: {
        outline: ['bg-neutral-100'],
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  },
);

const inputStyle = cva(
  [
    'w-full',
    'text-black',
    'placeholder:text-neutral-500',
    'disabled:bg-neutral-200',
    'disabled:cursor-not-allowed',
    'disabled:text-neutral-500',
    'transition-all',
    'transition',
    'duration-200',
  ],
  {
    variants: {
      variant: {
        outline: [
          'bg-inherit border-neutral-300 border border-solid focus:outline-none focus:ring focus:ring-primary-300 rounded-lg',
        ],
        filled: ['bg-inherit'],
      },
      size: {
        md: ['py-2.5 px-3'],
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'md',
    },
  },
);

const leftAddonStyle = cva('bg-inherit', {
  variants: {
    variant: {
      outline: ['text-neutral-500 border-neutral-300 border-y border-l border-solid  rounded-l-lg'],
      filled: [],
    },
    size: {
      md: ['py-2.5 px-3.5'],
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
});

const rightAddonStyle = cva('bg-inherit', {
  variants: {
    variant: {
      outline: ['text-neutral-500 border-neutral-300 border-y border-r border-solid rounded-r-lg'],
      filled: [],
    },
    size: {
      md: ['py-2.5 px-3.5'],
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
});

const errorStyle = cva(['text-error-500 border-error-500 focus:ring-red-300']);

type StyleProps = VariantProps<typeof inputStyle> &
  VariantProps<typeof leftAddonStyle> &
  VariantProps<typeof wrapper> &
  VariantProps<typeof rightAddonStyle>;

type InputProps = {
  name: string;
  id: string;
  placeholder?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  leftAddon?: string;
  rightAddon?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [K: string]: unknown;
} & StyleProps;

function Input({
  name,
  id,
  placeholder,
  isDisabled,
  isInvalid,
  onChange,
  variant,
  size,
  className,
  leftAddon,
  rightAddon,
  ...restProps
}: InputProps) {
  const concatClassName = cx(
    className,
    isInvalid ? errorStyle() : '',
    leftAddon ? 'rounded-l-none' : '',
    rightAddon ? 'rounded-r-none' : '',
  );

  return (
    <div className={wrapper({ variant })}>
      {leftAddon ? <span className={leftAddonStyle({ variant, size })}>{leftAddon}</span> : null}
      <input
        type="text"
        name={name}
        id={id}
        disabled={isDisabled}
        onChange={onChange}
        className={inputStyle({ variant, size, className: concatClassName })}
        placeholder={placeholder}
        {...restProps}
      />
      {isInvalid ? (
        <ExclamationCircleIcon className="text-error-500 self-center pr-2 h-5 absolute right-0" />
      ) : null}
    </div>
  );
}

Input.defaultProps = {
  placeholder: '',
  isDisabled: false,
  isInvalid: false,
  leftAddon: '',
  rightAddon: '',
  className: '',
  onChange: () => {},
};

export default Input;
