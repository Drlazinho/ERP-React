import { Box } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { useMemo } from 'react';
import { formatDateTime } from '../../../utils/formatDateInput';

const LogServicosTabela = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'servico',
        header: 'SERVIÇO',
        size: 10,
      },
      {
        accessorKey: 'status',
        header: 'STATUS',
        size: 10,
        Cell: ({ cell }) => {
          return (
            <Box
              component={'span'}
              sx={{
                color: '#fff',
                background: cell.getValue() === '200' ? '#004236' : '#5E1224',
                borderRadius: '0.25rem',
                p: '0.25rem',
              }}
            >
              {cell.getValue()}
            </Box>
          );
        },
      },
      {
        accessorKey: 'data',
        header: 'DATA',
        Cell: ({ cell }) => {
          return (
            <Box component={'span'}>{formatDateTime(cell.getValue())}</Box>
          );
        },
        size: 10,
      },
      {
        accessorKey: 'descricao',
        header: 'DESCRIÇÃO',
        size: 10,
      },
    ],
    []
  );
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableStickyHeader
      muiTopToolbarProps={{ sx: { bgcolor: '#fff', color: '#fff' } }}
      muiTableHeadCellProps={{ sx: { bgcolor: '#000', color: '#fff' } }}
      muiTableHeadCellFilterTextFieldProps={{
        sx: { bgcolor: '#f008', color: '#fff', borderRadius: 3 },
      }}
      initialState={{
        density: 'comfortable',
        sorting: [{ id: 'status', asc: false }],
      }}
    />
  );
};

export default LogServicosTabela;
