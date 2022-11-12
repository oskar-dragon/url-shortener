import { Label, Input } from 'components/elements';
import classNames from 'utils/classNames';

type FormValueProps = {
  id: string;
  name: string;
  value?: string;
  label: string;
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
    <div className={classNames('form-control w-full', className)}>
      <Label htmlFor={id} isInvalid={!!error}>
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        isInvalid={!!error}
        isDisabled={isDisabled}
      />
      {!!error && <span className="label label-text-alt text-error">{error}</span>}
    </div>
  );
}

FormInput.defaultProps = {
  value: '',
  isDisabled: false,
  error: '',
  placeholder: '',
  className: '',
  onChange: () => {},
};

export default FormInput;
