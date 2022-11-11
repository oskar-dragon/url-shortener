import type { ReactNode } from 'react';

type ButtonProps = {
  type?: 'button' | 'submit';
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  children: ReactNode;
};

/* 

TODO: 
Style behavours:
button:hover
button:active
button:focus
button:focus-visible
button:disabled

*/

const buttonStyles = 'bg-blue-600 text-white py-1 px-2 rounded-md';

function Button({ type, onClick, children }: ButtonProps) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      onClick={onClick}
      className={buttonStyles}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  isDisabled: false,
  isLoading: false,
};

export default Button;
