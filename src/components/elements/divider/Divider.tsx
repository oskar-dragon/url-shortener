/* eslint-disable react/require-default-props */
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const dividerStyle = cva('m-0', {
  variants: {
    orientation: {
      horizontal: ['w-full'],
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
  },
});

type DivierProps = { className?: string } & VariantProps<typeof dividerStyle>;

function Divider({ orientation, className }: DivierProps) {
  return (
    <div className={dividerStyle({ orientation, className })}>
      <hr
        aria-orientation={orientation ?? undefined}
        className={dividerStyle({ orientation, className })}
      />
    </div>
  );
}

export default Divider;
