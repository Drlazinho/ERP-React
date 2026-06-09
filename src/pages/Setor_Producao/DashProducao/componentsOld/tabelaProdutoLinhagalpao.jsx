import MaterialReactTable from 'material-react-table';
import React, { memo, useEffect, useMemo, useState } from 'react';

export default function tabelaProdutoLinhaGalpao({ linhaGalpao = [] }) {
  const columns = useMemo(
    () => [
      { accessorKey: 'linha', header: 'Linha', size: 2 },
      { accessorKey: 'galpao', header: 'Galpão', size: 2 },
      { accessorKey: 'descricao', header: 'Produto', size: 2 },
      { accessorKey: 'quantidade', header: 'Qtd', size: 2 },
      { accessorKey: 'codigo', header: 'Código', size: 2 },
    ],
    []
  );

  return (
    <MaterialReactTable
      data={linhaGalpao}
      columns={columns}
      enableColumnFilters={true}
      enableStickyHeader
      initialState={{ density: 'compact', pagination: { pageSize: 50 } }}
      enableGrouping
      //   state={{ isLoading: loading }}
      muiTableContainerProps={{ sx: { maxHeight: 600 } }}
      muiTopToolbarProps={{ sx: { bgcolor: '#e99369', color: '#fff' } }}
      muiTableHeadCellProps={{
        sx: {
          backgroundColor: '#e8641d',
          color: 'white',
        },
      }}
      muiTableBodyProps={{
        sx: {
          '& tr:nth-of-type(odd)': {
            backgroundColor: 'white',
          },
          '& tr:nth-of-type(even)': {
            backgroundColor: '#ECECEC',
          },
        },
      }}
    />
  );
}

export const TabelaProdutosLinhasGalpoes = memo(
  tabelaProdutoLinhaGalpao,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
