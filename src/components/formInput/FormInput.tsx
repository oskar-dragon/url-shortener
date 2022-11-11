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
    <div className="space-y-0.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
      />
    </div>
  );
}

FormInput.defaultProps = {
  isDisabled: false,
  isInvalid: false,
  placeholder: '',
};

export default FormInput;
