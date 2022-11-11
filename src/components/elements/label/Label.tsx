import classnames from 'utils/classNames';

type LabelProps = {
  children: React.ReactNode;
  htmlFor: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  className?: string;
};

const style = 'text-base';
const invalid = 'text-red-500';

function Label({ children, htmlFor, isDisabled, isInvalid, className }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={classnames(style, className, isInvalid ? invalid : '')}>
      {children}
    </label>
  );
}

Label.defaultProps = {
  isDisabled: false,
  isInvalid: true,
  className: '',
};

export default Label;
