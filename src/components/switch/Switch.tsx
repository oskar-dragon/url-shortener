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
      isEnabled: {
        true: ['bg-royal-600', 'hover:bg-royal-600', 'focus:bg-royal-600'],
      },
    },

    compoundVariants: [
      {
        variant: 'light',
        isEnabled: true,
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
      isEnabled: {
        true: ['translate-x-5'],
      },
    },
    compoundVariants: [
      {
        size: 'sm',
        isEnabled: true,
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
  name?: string;
  value?: boolean;
  onChange?: (checked: boolean) => void;
} & StylingProps;

function Switch({ label, variant, size, name, value, onChange, ...restProps }: SwitchProps) {
  const [isEnabled, setIsEnabled] = React.useState(() => value);

  function toggleSwitch() {
    setIsEnabled((prevValue) => {
      if (onChange) {
        onChange(!prevValue);
      }
      return !prevValue;
    });
  }

  return (
    <HeadlessUISwitch.Group>
      <div className="flex align-top gap-3">
        <HeadlessUISwitch
          checked={isEnabled}
          onChange={() => toggleSwitch()}
          name={name}
          className={root({ variant, size, isEnabled })}
          {...restProps}
        >
          <span
            aria-hidden="true"
            className={thumb({
              variant,
              size,
              isEnabled,
            })}
          />
        </HeadlessUISwitch>

        <div className="flex flex-col">
          <HeadlessUISwitch.Label passive className={labeltext({ size })}>
            {label}
          </HeadlessUISwitch.Label>
          <span className={supportText({ size })}>{label}</span>
        </div>
      </div>
    </HeadlessUISwitch.Group>
  );
}

Switch.defaultProps = {
  label: '',
  name: '',
  value: false,
  onChange: () => {},
};
export default Switch;
