import { Box, IconButton, Tooltip } from '@mui/material';
import { formatDateTime } from '../../../utils/formatDateInput';
import { MaterialReactTable } from 'material-react-table';
import { useMemo, useState } from 'react';
import {
  Edit,
  ThreeDRotation,
  ThreeSixty,
  Visibility,
} from '@mui/icons-material';

const InvEquipamentoTabela = ({ data, showModal, openModal }) => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(() => data);
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'ID',
        size: 10,
      },
      {
        accessorKey: 'tipo',
        header: 'TIPO',
        size: 100,
      },
      {
        accessorKey: 'marca', //normal accessorKey
        header: 'MARCA',
        size: 100,
      },
      {
        accessorKey: 'patrimonio', //normal accessorKey
        header: 'PATRIMONIO',
        size: 100,
      },
      {
        accessorKey: 'colaborador', //normal accessorKey
        header: 'COLABORADOR',
        size: 100,
      },
      {
        accessorKey: 'dataLiberadoColaborador', //normal accessorKey
        header: 'DATA DE ENTREGA',
        Cell: ({ cell }) => {
          return (
            <Box component={'span'}>
              {cell.getValue() === '0001-01-01T00:00:00'
                ? null
                : formatDateTime(cell.getValue())}
            </Box>
          );
        },
        size: 100,
      },
      {
        accessorKey: 'status',
        header: 'STATUS',
        Cell: ({ cell }) => {
          if (cell.getValue() === 1) {
            return (
              <Box
                component={'span'}
                sx={{ color: '#000', background: '#0F0' }}
              >
                DISPONÍVEL
              </Box>
            );
          }
          if (cell.getValue() === 2) {
            return (
              <Box
                component={'span'}
                sx={{ color: '#000', background: '#FF0' }}
              >
                EM USO
              </Box>
            );
          }
          if (cell.getValue() === 3) {
            return (
              <Box
                component={'span'}
                sx={{ color: '#000', background: '#F00' }}
              >
                SUCATA
              </Box>
            );
          } else {
            return (
              <Box
                component={'span'}
                sx={{ color: '#000', background: '#fff' }}
              >
                {cell.getValue()}
              </Box>
            );
          }
        },
        size: 50,
      },
      {
        accessorKey: 'descricao', //normal accessorKey
        header: 'DESCRIÇÃO',
        size: 100,
      },
      {
        accessorKey: 'dataRegistro',
        header: 'DATA REGISTRO',
        Cell: ({ cell }) => {
          return (
            <Box component={'span'}>{formatDateTime(cell.getValue())}</Box>
          );
        },
        size: 100,
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
      enableRowActions
      renderRowActions={({ row }) => (
        <Box>
          <Tooltip arrow placement="left" title="Movimentar">
            <IconButton
              onClick={() => {
                showModal(row.original);
              }}
            >
              <ThreeSixty sx={{ color: 'black' }} />
            </IconButton>
          </Tooltip>

          <Tooltip arrow placement="left">
            <IconButton
              onClick={() => {
                openModal(row.original);
              }}
            >
              <Edit sx={{ color: 'grey' }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    />
  );
};

export default InvEquipamentoTabela;
