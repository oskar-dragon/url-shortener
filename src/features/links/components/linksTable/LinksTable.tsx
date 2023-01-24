/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unstable-nested-components */
import { Badge, Table, IconButton } from 'components/elements';
import { useMemo, useState } from 'react';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Checkbox, Pagination } from 'components';
import parseCategories from 'features/links/helpers/parseCategories/parseCategories';
import { capitalize, formatDate } from 'utils';
import { trpc } from 'client';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import { cx } from 'class-variance-authority';
import type { TableWithLinks } from 'features/links/types';
import LinksTableEmptyState from '../linksTableEmptyState/LinksTableEmptyState';

type LinskTableProps = {
  className?: string;
};

function LinksTable({ className }: LinskTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { data, isLoading } = trpc.shortLink.getAllForUser.useQuery(undefined, {
    select: (urls) =>
      urls.map(({ active, ...rest }) => ({ ...rest, status: active ? 'active' : 'inactive' })),
  });

  const columns = useMemo<ColumnDef<TableWithLinks>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected()
            }
            onChange={(value) =>
              value !== 'indeterminate' ? table.toggleAllPageRowsSelected(value) : () => {}
            }
          />
        ),
        cell: ({ row }) => (
          <Checkbox checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
        ),
      },
      {
        header: 'Link',
        accessorKey: 'urlName',
        cell: (info) => {
          const { name, shortUrl } = info.row.original;

          return (
            <div className="flex flex-col">
              <span className="text-shades-900 font-medium">{name}</span>
              <span>/{shortUrl}</span>
            </div>
          );
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (info) => {
          const value = info.getValue();
          const badgeColour = value === 'inactive' ? 'grey' : 'success';

          return (
            typeof value === 'string' && (
              <Badge size="sm" iconLeft="dot" colour={badgeColour}>
                {capitalize(value)}
              </Badge>
            )
          );
        },
      },
      {
        header: 'Number of visits',
        accessorKey: 'numberOfVisits',
        cell: (info) => info.getValue(),
      },
      {
        header: 'Date created',
        accessorKey: 'dateCreated',
        enableSorting: false,
        cell: (info) => formatDate(info.getValue() as Date, { dateStyle: 'medium' }),
      },
      {
        header: 'Date updated',
        accessorKey: 'dateUpdated',
        enableSorting: false,
        cell: (info) => formatDate(info.getValue() as Date, { dateStyle: 'medium' }),
      },
      {
        header: 'Category',
        accessorKey: 'categories',
        enableSorting: false,
        cell: (info) =>
          parseCategories(info.getValue() as Array<string>, 3).map((category, index) => (
            <Badge colour={index >= 3 ? 'grey' : 'indigo'} className="mr-1">
              {capitalize(category)}
            </Badge>
          )),
      },
      {
        id: 'delete or edit',
        header: '',
        accessorKey: 'id',
        cell: (info) => (
          <div className="flex gap-4">
            <IconButton icon="trash" onClick={() => console.log(info.getValue())} />
            <IconButton icon="pencil" onClick={() => console.log(info.getValue())} />
          </div>
        ),
      },
    ],

    [],
  );

  const table = useReactTable({
    columns,
    data: data ?? [],
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  if (isLoading) {
    return (
      <div className="border border-neutral-300 rounded-md overflow-hidden">
        <div>Loading...</div>
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div className="border border-neutral-300 rounded-md overflow-hidden">
        <LinksTableEmptyState className="mx-auto my-5" />
      </div>
    );
  }

  return (
    <div className="border border-neutral-300 rounded-md overflow-hidden">
      <Table className={className}>
        <Table.Wrapper>
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Th key={header.id}>
                    <button
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                      className={cx(
                        header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                        'flex flex-row gap-1 justify-center items-center',
                      )}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <ArrowDownIcon className="h-3 w-3" />,
                        desc: <ArrowUpIcon className="h-3 w-3" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </button>
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>

          <Table.Tbody>
            {table.getRowModel().rows.map((row) => (
              <Table.Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Table.Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table.Wrapper>
      </Table>
      <Pagination
        resultsCount={data?.length ?? 0}
        currentPage={table.getState().pagination.pageIndex + 1}
        totalPages={table.getPageCount()}
        onPageChange={(page) => table.setPageIndex(page - 1)}
        onNextPage={() => table.nextPage()}
        onPreviousPage={() => table.previousPage()}
        canNextPage={table.getCanNextPage()}
        canPreviousPage={table.getCanPreviousPage()}
      />
    </div>
  );
}

export default LinksTable;
