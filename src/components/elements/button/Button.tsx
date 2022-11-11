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

const buttonDefaultStyles = `btn btn-primary`;

function Button({ className, type, onClick, isDisabled, isLoading, children }: ButtonProps) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      className={classNames(buttonDefaultStyles, className)}
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
