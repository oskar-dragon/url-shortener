import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { type ComponentPropsWithoutRef } from 'react';

const iconStyles = cva('', {
  variants: {
    size: {
      md: ['w-5', 'h-5'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const ComponentsMap = {
  trash: <TrashIcon />,
  pencil: <PencilIcon />,
} as const;

type IconButtonProps = { icon: keyof typeof ComponentsMap } & ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof iconStyles>;

function IconButton({ icon, className, size, ...restProps }: IconButtonProps) {
  return (
    <button {...restProps} type="button">
      {React.cloneElement(ComponentsMap[icon], { className: iconStyles({ size, className }) })}
    </button>
  );
}

export default IconButton;
