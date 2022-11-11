import { Label, Input } from 'components/elements';

type FormValueProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  placeholder?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function FormInput({
  id,
  name,
  value,
  label,
  placeholder,
  isDisabled,
  isInvalid,
  onChange,
}: FormValueProps) {
  return (
    <div className="form-control w-full max-w-xs">
      <Label htmlFor={id} isInvalid={isInvalid}>
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
      />
      {isInvalid && <span className="label label-text-alt text-error">Alt label</span>}
    </div>
  );
}

FormInput.defaultProps = {
  isDisabled: false,
  isInvalid: true,
  placeholder: '',
};

export default FormInput;
