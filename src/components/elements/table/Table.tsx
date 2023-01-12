import { createContext, useContext, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const tableStyle = cva('block whitespace-nowrap overflow-x-auto overflow-y-hidden', {
  variants: {
    variant: {
      primary: ['border', 'border-neutral-300', 'rounded-md'],
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type TableProps = ComponentPropsWithoutRef<'table'> & VariantProps<typeof tableStyle>;

const TableContext = createContext<VariantProps<typeof tableStyle>>({ variant: 'primary' });

function useTableContext() {
  const context = useContext(TableContext);

  if (context === undefined) {
    throw new Error('useTableContext must be used within TableContext');
  }

  return context;
}

function Table({ children, variant, className, ...restProps }: TableProps) {
  const value = useMemo(
    () => ({
      variant,
    }),
    [variant],
  );

  return (
    <TableContext.Provider value={value}>
      <div className={tableStyle({ variant, className })}>
        <table className="border-collapse w-full" {...restProps}>
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

const theadStyle = cva('', {
  variants: {
    variant: {
      primary: [
        'bg-neutral-50',
        'border-b',
        'border-neutral-200',
        'text-xs',
        'font-medium',
        'text-neutral-500',
      ],
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type TheadProps = ComponentPropsWithoutRef<'thead'> &
  Omit<VariantProps<typeof theadStyle>, 'variant'>;

Table.Thead = function Thead({ children, className, ...restProps }: TheadProps) {
  const { variant } = useTableContext();

  return (
    <thead className={theadStyle({ variant, className })} {...restProps}>
      {children}
    </thead>
  );
};

const tbodyStyle = cva('', {
  variants: {
    variant: {
      primary: [],
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type TbodyProps = ComponentPropsWithoutRef<'tbody'> &
  Omit<VariantProps<typeof tbodyStyle>, 'variant'>;

Table.Tbody = function Tbody({ children, className, ...restProps }: TbodyProps) {
  const { variant } = useTableContext();

  return (
    <tbody className={tbodyStyle({ variant, className })} {...restProps}>
      {children}
    </tbody>
  );
};

const tfootStyle = cva('', {
  variants: {
    variant: {
      primary: ['border-t', 'border-neutral-200', 'text-sm', 'font-medium', 'text-neutral-500'],
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type TfootProps = ComponentPropsWithoutRef<'tfoot'> &
  Omit<VariantProps<typeof tfootStyle>, 'variant'>;

Table.Tfoot = function Tfoot({ children, className, ...restProps }: TfootProps) {
  const { variant } = useTableContext();

  return (
    <tfoot className={tfootStyle({ variant, className })} {...restProps}>
      {children}
    </tfoot>
  );
};

const trStyle = cva('', {
  variants: {
    variant: {
      primary: ['border-solid', 'border-b', 'border-neutra-200', 'last:border-b-0'],
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type TrProps = ComponentPropsWithoutRef<'tr'> & Omit<VariantProps<typeof trStyle>, 'variant'>;

Table.Tr = function Tr({ children, className, ...restProps }: TrProps) {
  const { variant } = useTableContext();

  return (
    <tr className={trStyle({ variant, className })} {...restProps}>
      {children}
    </tr>
  );
};

const thStyle = cva('text-start', {
  variants: {
    variant: {
      primary: ['px-6', 'py-2'],
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type ThProps = ComponentPropsWithoutRef<'th'> & Omit<VariantProps<typeof thStyle>, 'variant'>;

Table.Th = function Th({ children, className, ...restProps }: ThProps) {
  const { variant } = useTableContext();

  return (
    <th className={thStyle({ variant, className })} {...restProps}>
      {children}
    </th>
  );
};

const tdStyle = cva('', {
  variants: {
    variant: {
      primary: ['px-6', 'py-4', 'text-neutral-500', 'text-sm'],
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type TdProps = ComponentPropsWithoutRef<'td'> & Omit<VariantProps<typeof tdStyle>, 'variant'>;

Table.Td = function Td({ children, className, ...restProps }: TdProps) {
  const { variant } = useTableContext();

  return (
    <td className={tdStyle({ variant, className })} {...restProps}>
      {children}
    </td>
  );
};

export default Table;
