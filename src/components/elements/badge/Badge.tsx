import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import DotIcon from 'assets/icons/dot.svg';
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

const badgeStyles = cva(
  ['inline-flex', 'items-center', 'gap-1', 'rounded-full', 'disabled:pointer-events-none'],
  {
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
  },
);

const iconsMap = {
  dot: <DotIcon />,
  cross: <XMarkIcon className="h-3.5 stroke-2" />,
  arrowRight: <ArrowRightIcon className="h-3.5 stroke-2" />,
};

type IconNames = keyof typeof iconsMap;
export type BadgeColours = VariantProps<typeof badgeStyles>['colour'];

const iconComponentMap = (iconName: IconNames | undefined) => {
  if (iconName !== undefined) {
    return iconsMap[iconName];
  }
  return undefined;
};

type BadgeProps = {
  children: ReactNode;
  iconLeft?: IconNames;
  iconRight?: IconNames;
  isDisabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
} & VariantProps<typeof badgeStyles>;

function Badge({
  children,
  colour,
  size,
  iconLeft,
  iconRight,
  onClick,
  isDisabled,
  className,
}: BadgeProps) {
  return (
    <span className={badgeStyles({ colour, size, className })}>
      {iconLeft ? iconComponentMap(iconLeft) : null}
      {children}
      {iconRight && !onClick ? iconComponentMap(iconRight) : null}
      {iconRight && onClick ? (
        <button type="button" className="appearance-none" onClick={onClick} disabled={isDisabled}>
          {iconComponentMap(iconRight)}
        </button>
      ) : null}
    </span>
  );
}

Badge.defaultProps = {
  iconLeft: '',
  iconRight: '',
  onClick: undefined,
  isDisabled: false,
  className: '',
};

export default Badge;
