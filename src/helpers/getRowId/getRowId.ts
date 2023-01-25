import type { Row } from '@tanstack/react-table';

function getRowId<TData extends any>(row: TData, index: number, parent?: Row<TData>): string {
  return parent ? [parent.id, row?.uniqueId].join('.') : row.uniqueid;
}

export default getRowId;
