import { cx } from 'class-variance-authority';
import { Label, Input } from 'components/elements';

type FormValueProps = {
  id: string;
  name: string;
  value?: string;
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  error?: string;
  className?: string;
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
  onChange,
}: FormValueProps) {
  return (
    <div className={cx('w-full', className)}>
      {label && (
        <Label className="px-2" htmlFor={id} isInvalid={!!error}>
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
      />
      {!!error && <span className="text-sm px-2 font-semibold text-error-500">{error}</span>}
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
  onChange: () => {},
};

export default FormInput;
