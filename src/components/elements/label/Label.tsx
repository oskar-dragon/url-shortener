import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import type { LabelHTMLAttributes } from 'react';

const labelStyles = cva('text-sm font-semibold', {
  variants: {
    variant: {
      default: ['text-black'],
      error: ['text-error'],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type LabelProps = {
  isInvalid?: boolean;
} & VariantProps<typeof labelStyles> &
  LabelHTMLAttributes<HTMLLabelElement>;

function Label({ children, htmlFor, isInvalid, className, variant }: LabelProps) {
  const correctVariant: typeof variant = isInvalid ? 'error' : 'default';

  return (
    <label htmlFor={htmlFor} className={labelStyles({ variant: correctVariant, className })}>
      {children}
    </label>
  );
}

Label.defaultProps = {
  isInvalid: false,
};

export default Label;
