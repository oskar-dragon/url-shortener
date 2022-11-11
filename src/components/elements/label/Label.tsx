import classnames from 'utils/classNames';

type LabelProps = {
  children: React.ReactNode;
  htmlFor: string;
  isInvalid?: boolean;
  className?: string;
};

const style = 'label label-text';
const invalid = 'text-error';

function Label({ children, htmlFor, isInvalid, className }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={classnames(style, className, isInvalid ? invalid : '')}>
      {children}
    </label>
  );
}

Label.defaultProps = {
  isInvalid: false,
  className: '',
};

export default Label;
