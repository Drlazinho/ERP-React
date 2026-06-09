import { MaterialReactTable } from 'material-react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { buscarTotalProducaoProdutos } from '../dashboardProducao.service';

export default function tabelaProducaoProducao({ producao = [] }) {
  const columns = useMemo(
    () => [
      { accessorKey: 'linha', header: 'Linha', size: 2 },
      { accessorKey: 'local', header: 'Local', size: 2 },
      { accessorKey: 'nomeProduto', header: 'Produto', size: 2 },
      { accessorKey: 'quantidade', header: 'Qtd', size: 2 },
      { accessorKey: 'codigo', header: 'Código', size: 2 },
      { accessorKey: 'data', header: 'Data', size: 2 },
    ],
    []
  );

  return (
    <MaterialReactTable
      data={producao}
      columns={columns}
      enableColumnFilters={true}
      enableStickyHeader
      initialState={{ density: 'compact', pagination: { pageSize: 50 } }}
      enableGrouping
      muiTableContainerProps={{ sx: { maxHeight: 600 } }}
      muiTopToolbarProps={{ sx: { bgcolor: '#FFF', color: '#000' } }}
      muiTableHeadCellProps={{
        sx: {
          backgroundColor: '#FFF',
          color: '#000',
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
      renderEmptyRowsFallback={() => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100px',
            width: '100%',
          }}
        >
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Nenhuma informação disponível no momento.
          </Typography>
        </Box>
      )}
    />
  );
}

export const TabelaProducaoProdutos = memo(
  tabelaProducaoProducao,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
