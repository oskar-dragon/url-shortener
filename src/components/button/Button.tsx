import type { ReactNode } from 'react';
import classNames from 'utils/classNames';

type ButtonProps = {
  className?: string;
  type?: 'button' | 'submit';
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  children: ReactNode;
};

const buttonStyles = `font-semibold text-white text-base py-1 px-2 rounded-md bg-blue-600 hover:bg-blue-500 active:bg-blue-700 
  focus:bg-blue-500 disabled:bg-gray-300 cursor-not-allowed transition-colors`;

function Button({ className, type, onClick, isDisabled, isLoading, children }: ButtonProps) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      className={classNames(buttonStyles, className)}
      disabled={isDisabled || isLoading}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  className: '',
  type: 'button',
  isDisabled: false,
  isLoading: false,
};

export default Button;
