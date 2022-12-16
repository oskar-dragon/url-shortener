import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Switch as HeadlessUISwitch } from '@headlessui/react';

const root = cva(
  'relative inline-flex shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
  {
    variants: {
      variant: {
        dark: ['bg-neutral-100', 'hover:bg-neutral-200', 'focus:bg-neutral-50'],
        light: ['bg-neutral-50', 'hover:bg-royal-100', 'focus:-bg-neutral-50'],
      },
      size: {
        sm: ['h-5', 'w-9'],
        md: ['h-6', 'w-11'],
      },
      enabled: {
        true: ['bg-royal-600', 'hover:bg-royal-600', 'focus:bg-royal-600'],
      },
    },

    compoundVariants: [
      {
        variant: 'light',
        enabled: true,
        className: ['bg-royal-200', 'hover:bg-royal-200', 'focus:bg-royal-200'],
      },
    ],
    defaultVariants: {
      variant: 'dark',
      size: 'md',
    },
  },
);
type RootProps = Omit<VariantProps<typeof root>, 'enabled'>;

const thumb = cva(
  'pointer-events-none inline-block transform rounded-full shadow ring-0 custom-transition ease-in-out',
  {
    variants: {
      variant: {
        dark: ['bg-white'],
        light: ['bg-white'],
      },
      size: {
        sm: ['h-4', 'w-4'],
        md: ['h-5', 'w-5'],
      },
      enabled: {
        true: ['translate-x-5'],
      },
    },
    compoundVariants: [
      {
        size: 'sm',
        enabled: true,
        className: 'translate-x-4',
      },
    ],
    defaultVariants: {
      variant: 'dark',
      size: 'md',
    },
  },
);
type ThumbProps = Omit<VariantProps<typeof thumb>, 'enabled'>;

const labeltext = cva('text-md font-medium text-neutral-500', {
  variants: {
    size: {
      sm: ['text-sm'],
      md: ['text-md'],
    },
  },
});

type LabeltextProps = VariantProps<typeof labeltext>;

const supportText = cva('text-neutral-500', {
  variants: {
    size: {
      sm: ['text-sm'],
      md: ['text-md'],
    },
  },
});

type SupportTextProps = VariantProps<typeof supportText>;

type StylingProps = LabeltextProps & ThumbProps & RootProps & SupportTextProps;

type SwitchProps = {
  label?: string;
} & StylingProps;

function Switch({ label, variant, size }: SwitchProps) {
  const [enabled, setEnabled] = React.useState(false);

  function toggleSwitch() {
    setEnabled((prevValue) => !prevValue);
  }

  return (
    <div className="flex align-top gap-3">
      <HeadlessUISwitch
        checked={enabled}
        onChange={() => toggleSwitch()}
        className={root({ variant, size, enabled })}
      >
        <span
          aria-hidden="true"
          className={thumb({
            variant,
            size,
            enabled,
          })}
        />
      </HeadlessUISwitch>

      <div className="flex flex-col">
        <span className={labeltext({ size })}>{label}</span>
        <span className={supportText({ size })}>{label}</span>
      </div>
    </div>
  );
}

Switch.defaultProps = {
  label: '',
};
export default Switch;
