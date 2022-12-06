import type { ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const buttonStyles = cva(
  'flex gap-1 rounded-md text-sm font-semibold disabled:cursor-default cursor-pointer disabled:pointer-events-none select-none ease-in-out transition-all transition duration-200 uppercase border-solid border disabled:opacity-50',
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
        sm: ['py-2', 'px-4'],
        md: ['py-3', 'px-6'],
        lg: ['py-4', 'px-8'],
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
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & VariantProps<typeof buttonStyles>;

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
      {leftIcon && <span className="w-4 self-center">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="w-4 self-center">{leftIcon}</span>}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  type: 'button',
  isDisabled: false,
  isLoading: false,
  leftIcon: null,
  rightIcon: null,
  onClick: () => {},
};

export default Button;
