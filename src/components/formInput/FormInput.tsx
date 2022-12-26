import { cx } from 'class-variance-authority';
import { Label, Input } from 'components/elements';
import FieldError from 'components/fieldError/FieldError';

type FormValueProps = {
  id: string;
  name: string;
  value?: string;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  error?: string;
  className?: string;
  leftAddon?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormInput({
  id,
  name,
  value,
  label,
  placeholder,
  isDisabled,
  error,
  className,
  leftAddon,
  onChange,
}: FormValueProps) {
  return (
    <div className={cx('w-full', className)}>
      {label && (
        <Label htmlFor={id} isInvalid={!!error}>
          {label}
        </Label>
      )}
      <Input
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        isInvalid={!!error}
        isDisabled={isDisabled}
        leftAddon={leftAddon}
      />
      <FieldError name={name} />
    </div>
  );
}

FormInput.defaultProps = {
  value: '',
  label: '',
  isDisabled: false,
  error: '',
  placeholder: '',
  className: '',
  leftAddon: '',
  onChange: () => {},
};

export default FormInput;
