import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton, Tooltip, Button } from '@mui/material';
import { formatDateTime } from '../../../../utils/formatDateInput';
import { BsEye } from 'react-icons/bs';

const TabelaChamadosSetor = ({ showModal, handleCloseChamado }) => {
  const [status, setStatus] = useState(true);

  const data = [
    {
      name: {
        firstName: 'John',
        lastName: 'Doe',
      },
      address: '261 Erdman Ford',
      city: 'East Daphne',
      state: 'Kentucky',
    },
    {
      name: {
        firstName: 'John',
        lastName: 'Doe',
      },
      address: '261 Erdman Ford',
      city: 'East Daphne',
      state: 'Kentucky',
    },
  ];

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'ID',
        size: 10,
      },
      {
        accessorKey: 'titulo',
        header: 'TÍTULO',
        size: 50,
      },
      {
        accessorKey: 'detalhes',
        header: 'Nº OCORRÊNCIAS',
        Cell: ({ cell }) => {
          return (
            <Box
              component={'span'}
              sx={{
                color: '#000',
                background: cell.getValue() === 1 ? '#fff' : '#add8e6',
                borderRadius: '0.25rem',
                p: '0.25rem',
              }}
            >
              {cell.getValue()}
            </Box>
          );
        },
        size: 10,
      },
      {
        accessorKey: 'status', //normal accessorKey
        header: 'STATUS',
        Cell: ({ cell, row }) => {
          return (
            <Box>
              <Box
                component={'span'}
                sx={{
                  color: '#000',
                  background:
                    cell.getValue() === 'ABERTO'
                      ? '#F00'
                      : cell.getValue() === 'FECHADO'
                      ? '#0f0'
                      : cell.getValue() === 'EM ANÁLISE'
                      ? '#ff0'
                      : '#fff',
                  borderRadius: '0.25rem',
                  p: '0.25rem',
                }}
              >
                {cell.getValue()}
              </Box>
              <Box>
                {cell.getValue() !== 'FECHADO' && (
                  <ModalFecharChamado
                    handleCloseChamado={handleCloseChamado}
                    id={row.original.id}
                  />
                )}
              </Box>
            </Box>
          );
        },
        size: 10,
      },
      {
        accessorKey: 'descricao',
        header: 'DESCRIÇÃO',
        size: 300,
      },
      {
        accessorKey: 'atualizacao',
        header: (
          <p>
            ULTIMA <br /> ATUALIZACAO
          </p>
        ),
        Cell: ({ cell }) => {
          return (
            <Box component={'span'}>{formatDateTime(cell.getValue())}</Box>
          );
        },
        size: 50,
      },
      {
        accessorKey: 'abertura',
        header: (
          <p>
            DATA DE <br /> ABERTURA
          </p>
        ),
        Cell: ({ cell }) => {
          return (
            <Box component={'span'}>{formatDateTime(cell.getValue())}</Box>
          );
        },
        size: 100,
      },
      {
        accessorKey: 'urgencia',
        header: (
          <p>
            NÍVEL DE
            <br /> URGÊNCIA
          </p>
        ),
        Cell: ({ cell }) => {
          return (
            <Box
              component={'span'}
              sx={{
                color: '#000',
                background:
                  cell.getValue() === 'BAIXA'
                    ? '#ffff8d'
                    : cell.getValue() === 'ALTA'
                    ? '#F00'
                    : cell.getValue() === 'MÉDIA'
                    ? '#ffab40'
                    : '#fff',
                borderRadius: '0.25rem',
                p: '0.25rem',
              }}
            >
              {cell.getValue()}
            </Box>
          );
        },
        size: 50,
      },
      {
        accessorKey: 'solicitante',
        header: 'SOLICITANTE',
        size: 100,
      },
      {
        accessorKey: 'responsavel',
        header: 'RESPONSÁVEL',
        size: 150,
      },
      {
        accessorKey: 'categoria',
        header: 'CATEGORIA',
        size: 150,
      },
      {
        accessorKey: 'setor',
        header: 'SETOR',
        size: 100,
      },
      {
        accessorKey: 'situacao',
        header: 'SITUAÇÃO',
        Cell: ({ cell }) => {
          if (cell.getValue() === 'FINALIZADO') {
            return (
              <Box
                component={'span'}
                sx={{
                  color: '#000',
                  background: '#0f0',
                  borderRadius: '0.25rem',
                  p: '0.25rem',
                }}
              >
                {cell.getValue()}
              </Box>
            );
          }
          if (cell.getValue() === 'REPROVADO') {
            return (
              <Box
                component={'span'}
                sx={{
                  color: '#000',
                  background: '#F00',
                  borderRadius: '0.25rem',
                  p: '0.25rem',
                }}
              >
                {cell.getValue()}
              </Box>
            );
          }
          if (cell.getValue() === 'EM ANÁLISE') {
            return (
              <Box
                component={'span'}
                sx={{
                  color: '#000',
                  background: '#ff0',
                  borderRadius: '0.25rem',
                  p: '0.25rem',
                }}
              >
                {cell.getValue()}
              </Box>
            );
          } else {
            return (
              <Box
                component={'span'}
                sx={{ color: '#000', borderRadius: '0.25rem', p: '0.25rem' }}
              >
                {cell.getValue()}
              </Box>
            );
          }
        },
        size: 50,
      },
      {
        accessorKey: 'descricao',
        header: 'DESCRIÇÃO',
        size: 300,
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      muiTopToolbarProps={{ sx: { bgcolor: '#0275bc', color: '#fff' } }}
      muiTableHeadCellProps={{ sx: { bgcolor: '#3498db', color: '#fff' } }}
      muiTableHeadCellFilterTextFieldProps={{
        sx: { bgcolor: '#fff', color: '#fff', borderRadius: 1 },
      }}
      initialState={{
        density: 'comfortable',
        sorting: [{ id: 'status', asc: true }],
      }}
      enableRowActions
      renderRowActions={({ row }) => (
        <Box>
          <Tooltip arrow placement="left" title="Visualizar">
            <IconButton
              onClick={() => {
                showModal(row.original);
              }}
            >
              <BsEye sx={{ color: 'black' }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    />
  );
};

export default TabelaChamadosSetor;
