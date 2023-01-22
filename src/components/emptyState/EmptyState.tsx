import { Button, type ButtonProps } from 'components/elements';

type EmptyStateProps = {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

type EmptyStateRootProps = Pick<EmptyStateProps, 'children' | 'className'>;

function EmptyState({ children, variant, className }: EmptyStateRootProps) {
  return <div className="flex flex-col justify-center items-center w-96">{children}</div>;
}

type EmptyStateIconProps = Pick<EmptyStateProps, 'icon'>;

EmptyState.Icon = function EmptyStateIcon({ icon }: EmptyStateIconProps) {
  return (
    <div className="rounded-full p-2 bg-indigo-50 mb-3">
      <div className="rounded-full p-2 text-indigo-500 bg-indigo-100">{icon}</div>
    </div>
  );
};

type EmptyStateTitleProps = Pick<EmptyStateProps, 'children'>;

EmptyState.Title = function EmptyStateTitle({ children }: EmptyStateTitleProps) {
  return <h6 className="font-semibold text-center">{children}</h6>;
};

type EmptyStateBodyProps = Pick<EmptyStateProps, 'children'>;

EmptyState.Body = function EmptyStateBody({ children }: EmptyStateBodyProps) {
  return <p className="text-neutral-500 text-center mt-1">{children}</p>;
};

type EmptyStateButtonGroupProps = Pick<EmptyStateProps, 'children'>;

EmptyState.ButtonGroup = function EmptyStateButtonGroup({ children }: EmptyStateButtonGroupProps) {
  return <div className="flex gap-3 mt-4">{children}</div>;
};

type EmptyStatePrimaryActionProps = ButtonProps;

EmptyState.PrimaryAction = function EmptyStatePrimaryAction({
  children,
  onClick,
  ...restProps
}: EmptyStatePrimaryActionProps) {
  return (
    <Button size="sm" onClick={onClick} {...restProps}>
      {children}
    </Button>
  );
};

type EmptyStateSecondaryActionProps = ButtonProps;

EmptyState.SecondaryAction = function EmptyStateSecondaryAction({
  children,
  onClick,
  ...restProps
}: EmptyStateSecondaryActionProps) {
  return (
    <Button variant="outline" size="sm" onClick={onClick} {...restProps}>
      {children}
    </Button>
  );
};

export default EmptyState;
