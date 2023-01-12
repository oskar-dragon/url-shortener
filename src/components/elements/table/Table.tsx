import { type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const tableStyle = cva('', {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

type TableProps = ComponentPropsWithoutRef<'table'> & VariantProps<typeof tableStyle>;

function Table({ children, variant, className, ...restProps }: TableProps) {
  return (
    <table className={tableStyle({ variant, className })} {...restProps}>
      {children}
    </table>
  );
}

const theadStyle = cva('', {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

type TheadProps = ComponentPropsWithoutRef<'thead'> & VariantProps<typeof theadStyle>;

Table.Thead = function Thead({ children, variant, className, ...restProps }: TheadProps) {
  return (
    <thead className={theadStyle({ variant, className })} {...restProps}>
      {children}
    </thead>
  );
};

const tbodyStyle = cva('', {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

type TbodyProps = ComponentPropsWithoutRef<'tbody'> & VariantProps<typeof tbodyStyle>;

Table.Tbody = function Tbody({ children, className, variant, ...restProps }: TbodyProps) {
  return (
    <tbody className={tbodyStyle({ variant, className })} {...restProps}>
      {children}
    </tbody>
  );
};

const tfootStyle = cva('', {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

type TfootProps = ComponentPropsWithoutRef<'tfoot'> & VariantProps<typeof tfootStyle>;

Table.Tfoot = function Tfoot({ children, className, variant, ...restProps }: TfootProps) {
  return (
    <tfoot className={tfootStyle({ variant, className })} {...restProps}>
      {children}
    </tfoot>
  );
};

const trStyle = cva('', {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

type TrProps = ComponentPropsWithoutRef<'tr'> & VariantProps<typeof trStyle>;

Table.Tr = function Tr({ children, className, variant, ...restProps }: TrProps) {
  return (
    <tr className={trStyle({ variant, className })} {...restProps}>
      {children}
    </tr>
  );
};

const thStyle = cva('', {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

type ThProps = ComponentPropsWithoutRef<'th'> & VariantProps<typeof thStyle>;

Table.Th = function Th({ children, className, variant, ...restProps }: ThProps) {
  return (
    <th className={thStyle({ variant, className })} {...restProps}>
      {children}
    </th>
  );
};

const tdStyle = cva('', {
  variants: {
    variant: {},
  },
  defaultVariants: {},
});

type TdProps = ComponentPropsWithoutRef<'td'> & VariantProps<typeof tdStyle>;

Table.Td = function Td({ children, className, variant, ...restProps }: TdProps) {
  return (
    <td className={tdStyle({ variant, className })} {...restProps}>
      {children}
    </td>
  );
};

export default Table;
