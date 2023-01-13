/* eslint-disable jsx-a11y/anchor-is-valid */
import { createContext, useContext, useMemo, type ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

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

type TableProps = ComponentPropsWithoutRef<'div'> & VariantProps<typeof tableStyle>;

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
      <div className={tableStyle({ variant, className })} {...restProps}>
        {children}
      </div>
    </TableContext.Provider>
  );
}

type TableWrapperProps = ComponentPropsWithoutRef<'table'>;

Table.Wrapper = function TableWrapper({ children, ...restProps }: TableWrapperProps) {
  return (
    <table className="border-collapse w-full" {...restProps}>
      {children}
    </table>
  );
};

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
      primary: ['px-5', 'py-2'],
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
      primary: ['px-5', 'py-4', 'text-neutral-500', 'text-sm'],
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

type PaginationProps = {} & ComponentPropsWithoutRef<'div'>;

Table.Pagination = function Pagination({ ...restProps }: PaginationProps) {
  return (
    <div
      {...restProps}
      className="flex items-center justify-between border-t border-gray-200 bg-white px-2 py-3 sm:px-6"
    >
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">10</span> of <span className="font-medium">97</span>{' '}
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
              ...
            </span>
            <a
              href="#"
              className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Table;
