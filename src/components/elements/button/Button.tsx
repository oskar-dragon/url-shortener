import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const buttonStyles = cva(
  'leading-6 flex gap-1 rounded-md text-sm font-semibold cursor-pointer disabled:pointer-events-none select-none ease-in-out transition-all transition duration-200 border-solid border border-transparent disabled:opacity-50',
  {
    variants: {
      variant: {
        dark: [
          'bg-neutral-800',
          'text-white',
          'hover:bg-neutral-700',
          'active:bg-neutral-900',
          'disabled:bg-meutral-300',
        ],
        light: ['bg-white', 'text-black', 'border-neutral-300', 'hover:bg-neutral-100'],
        blue: [
          'bg-royal-700',
          'text-white',
          'hover:bg-royal-500',
          'active:bg-royal-800',
          'disabled:bg-meutral-300',
        ],
      },
      size: {
        sm: ['py-2', 'px-3.5'],
        md: ['py-2.5', 'px-4'],
        lg: ['py-2.5', 'px-4'],
        xl: ['py-3', 'px-5'],
        fullWidth: ['py-3', 'w-full'],
      },
    },
    defaultVariants: {
      variant: 'dark',
      size: 'md',
    },
  },
);

type ButtonProps = {
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & VariantProps<typeof buttonStyles> &
  ButtonHTMLAttributes<HTMLButtonElement>;

function Button({
  className,
  type,
  onClick,
  isDisabled,
  isLoading,
  children,
  variant,
  size,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      className={buttonStyles({ variant, size, className })}
      disabled={isDisabled || isLoading}
    >
      {leftIcon && <span className="w-4 self-center text-current">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="w-4 self-center text-current">{leftIcon}</span>}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  isDisabled: false,
  isLoading: false,
  leftIcon: null,
  rightIcon: null,
};

export default Button;
