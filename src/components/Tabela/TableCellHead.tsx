import React from 'react';
import { TableCell, TableSortLabel } from '@mui/material';

interface TableCellHeadProps<T> {
  children: React.ReactNode;
  sortKey: keyof T;
  sortConfig?: { key: keyof T; direction: 'asc' | 'desc' } | null;
  requestSort: (field: keyof T) => void;
}

function TableCellHead<T>({
  children,
  sortKey,
  sortConfig,
  requestSort,
}: TableCellHeadProps<T>) {
  return (
    <TableCell sx={{ backgroundColor: 'inherit', color: '#fff' }}>
      <TableSortLabel
        active={sortConfig?.key === sortKey}
        direction={sortConfig?.key === sortKey ? sortConfig.direction : 'asc'}
        onClick={() => requestSort(sortKey)}
        sx={{
          color: '#fff',
          '&:hover': {
            color: 'goldenrod',
            '& .MuiTableSortLabel-icon': {
              color: 'goldenrod',
            },
          },
          '&.Mui-active': {
            color: 'goldenrod',
            '& .MuiTableSortLabel-icon': {
              color: 'goldenrod',
            },
          },
          '& .MuiTableSortLabel-icon': {
            color: 'inherit',
          },
        }}
      >
        {children}
      </TableSortLabel>
    </TableCell>
  );
}

export default TableCellHead;
