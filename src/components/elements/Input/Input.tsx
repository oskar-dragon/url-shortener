import React from 'react';
import classNames from 'utils/classNames';

type InputProps = {
  value?: string;
  name: string;
  id: string;
  placeholder?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const defaultStyle =
  'block w-full rounded-md text-base border-solid border-2 px-2 py-1 text-md border-slate-200 focus:border-sky-500 focus:ring-sky-500';
const errorStyle = 'border-red-300 text-red-500 focus:border-red-500 focus:ring-red-500';
const disabledStyle = 'disabled:border-slate-200 disabled:bg-gray-100 cursor-not-allowed';

function Input({ value, name, id, placeholder, isDisabled, isInvalid, onChange }: InputProps) {
  return (
    <input
      type="text"
      name={name}
      id={id}
      disabled={isDisabled}
      value={value}
      onChange={onChange}
      className={classNames(defaultStyle, isInvalid ? errorStyle : defaultStyle, disabledStyle)}
      placeholder={placeholder}
    />
  );
}

Input.defaultProps = {
  value: '',
  placeholder: '',
  isDisabled: false,
  isInvalid: true,
};

export default Input;