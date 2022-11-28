import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

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
  children: React.ReactNode;
  htmlFor: string;
  isInvalid?: boolean;
  className?: string;
} & VariantProps<typeof labelStyles>;

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
  className: '',
};

export default Label;
