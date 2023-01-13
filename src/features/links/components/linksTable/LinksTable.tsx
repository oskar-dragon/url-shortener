/* eslint-disable react/no-unstable-nested-components */
import { Badge, Table } from 'components/elements';
import createTableDummyData, { type UrlData } from 'features/links/helpers/createTableDummyData';
import { useMemo, useState } from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Checkbox } from 'components';
import parseCategories from 'features/links/helpers/parseCategories/parseCategories';
import { capitalize } from 'utils';

function LinksTable() {
  const [dummyData] = useState(() => createTableDummyData(10));
  // const { data } = trpc.shortLink.getAllForUser.useQuery();

  console.log();

  const columns = useMemo<ColumnDef<UrlData>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsSomeRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected()
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
          const { urlName, slug } = info.row.original;

          return (
            <div className="flex flex-col">
              <span className="text-shades-900 font-medium">{urlName}</span>
              <span>/{slug}</span>
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
        cell: (info) => info.getValue(),
      },
      {
        header: 'Date updated',
        accessorKey: 'dateUpdated',
        cell: (info) => info.getValue(),
      },

      {
        header: 'Category',
        accessorKey: 'categories',
        cell: (info) =>
          parseCategories(info.getValue() as Array<string>, 3).map((category, index) => (
            <Badge colour={index >= 3 ? 'grey' : 'indigo'} className="mr-1">
              {capitalize(category)}
            </Badge>
          )),
      },
    ],

    [],
  );

  const table = useReactTable({
    columns,
    data: dummyData,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  return (
    <Table>
      <Table.Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.Th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
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

      <Table.Tfoot>
        <Table.Tr>
          <Table.Th>Th</Table.Th>
          <Table.Th>Th</Table.Th>
          <Table.Th>Th</Table.Th>
        </Table.Tr>
      </Table.Tfoot>
    </Table>
  );
}

export default LinksTable;
