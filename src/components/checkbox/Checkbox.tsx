/* eslint-disable react/require-default-props */
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { CheckIcon, MinusSmallIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const rootStyles = cva('', {
  variants: {
    variant: {
      primary: [
        'bg-shades-50',
        'border',
        'rounded-md',
        'border-neutral-300',
        'hover:bg-indigo-50',
        'hover:border-indigo-600',
        'focus:outline-none',
        'focus:ring',
        'focus:ring-primary-300',
        'data-[disabled]:bg-neutral-100',
        'data-[disabled]:border-neutral-200',
        'data-[state=checked]:border-indigo-600',
        'data-[state=checked]:bg-indigo-50',
        'ease-in-out',
        'transition-all',
        'transition duration-200',
      ],
      secondary: [''],
    },
    size: {
      md: ['w-5 h-5'],
      sm: ['w-4 h-4'],
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

const labeltext = cva('text-md font-medium text-neutral-500', {
  variants: {
    size: {
      sm: ['text-sm'],
      md: ['text-md'],
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const supportText = cva('text-neutral-500', {
  variants: {
    size: {
      sm: ['text-sm'],
      md: ['text-md'],
    },
    defaultVariants: {
      size: 'md',
    },
  },
});

type StyleProps = VariantProps<typeof rootStyles> &
  VariantProps<typeof labeltext> &
  VariantProps<typeof supportText>;

type CheckboxProps = {
  label?: string;
  supportingText?: string;
  className?: string;
  checked: RadixCheckbox.CheckboxProps['checked'];
  onChange?: RadixCheckbox.CheckboxProps['onCheckedChange'];
  isDisabled?: RadixCheckbox.CheckboxProps['disabled'];
  isRequired?: RadixCheckbox.CheckboxProps['required'];
  name?: RadixCheckbox.CheckboxProps['name'];
} & StyleProps;

function Checkbox(props: CheckboxProps) {
  const {
    label,
    supportingText,
    onChange,
    checked,
    variant,
    className,
    size,
    isDisabled,
    isRequired,
    name,
    ...restProps
  } = props;
  const [checkedState, setCheckedState] = useState<RadixCheckbox.CheckboxProps['checked']>(
    checked || false,
  );

  function handleCheck(v: RadixCheckbox.CheckboxProps['checked']) {
    setCheckedState(v);
  }

  return (
    <div className="flex align-top gap-3">
      <RadixCheckbox.Root
        className={rootStyles({ variant, size, className })}
        onCheckedChange={(val) => handleCheck(val)}
        checked={checkedState}
        disabled={isDisabled}
        required={isRequired}
        id={name}
        {...restProps}
      >
        <RadixCheckbox.Indicator className="text-indigo-600 data-[disabled]:text-neutral-200">
          {checkedState === 'indeterminate' && <MinusSmallIcon />}
          {checkedState === true && <CheckIcon />}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>

      <div className="flex flex-col">
        {label && (
          <label htmlFor={name} className={labeltext({ size })}>
            {label}
          </label>
        )}
        {supportingText && <span className={supportText({ size })}>{supportingText}</span>}
      </div>
    </div>
  );
}

export default Checkbox;
