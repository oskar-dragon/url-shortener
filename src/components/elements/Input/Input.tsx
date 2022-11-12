import React from 'react';
import classNames from 'utils/classNames';

type InputProps = {
  value?: string;
  name: string;
  id: string;
  placeholder?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const defaultStyle = 'input input-bordered w-full';
const errorStyle = 'input-error';

function Input({ value, name, id, placeholder, isDisabled, isInvalid, onChange }: InputProps) {
  return (
    <input
      type="text"
      name={name}
      id={id}
      disabled={isDisabled}
      value={value}
      onChange={onChange}
      className={classNames(defaultStyle, isInvalid ? errorStyle : '')}
      placeholder={placeholder}
    />
  );
}

Input.defaultProps = {
  value: '',
  placeholder: '',
  isDisabled: false,
  isInvalid: false,
  onChange: () => {},
};

export default Input;
