import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeStyles = cva('rounded-full', {
  variants: {
    colour: {
      grey: ['bg-neutral-100', 'text-neutral-700'],
      error: ['bg-error-50', 'text-error-700'],
      warning: ['bg-warning-50', 'text-warning-700'],
      success: ['bg-success-50', 'text-success-700'],
      royal: ['bg-royal-50', 'text-royal-700'],
      indigo: ['bg-indigo-50', 'text-indigo-700'],
    },
    size: {
      sm: ['py-0.5', 'px-2', 'text-xs'],
      md: ['py-0.5', 'px-2.5', 'text-sm'],
      lg: ['py-1', 'px-3', 'text-sm'],
    },
  },
  defaultVariants: {
    colour: 'grey',
    size: 'md',
  },
});

type BadgeProps = {
  children: ReactNode;
} & VariantProps<typeof badgeStyles>;

function Badge({ children, colour, size }: BadgeProps) {
  return <span className={badgeStyles({ colour, size })}>{children}</span>;
}

export default Badge;
