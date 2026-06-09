import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, IconButton, MenuItem, Tooltip } from '@mui/material';
import { formatDateTime } from '@/utils/formatDateInput';
import { Delete, Edit } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const TabelaChamados = ({ data, showModal }) => {
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
        size: 100,
      },
      {
        accessorKey: 'status', //normal accessorKey
        header: 'STATUS',
        Cell: ({ cell }) => {
          return (
            <Box
              component={'span'}
              sx={{
                  color: '#000', background:
                      cell.getValue() === 'ABERTO' ? '#0f0' :
                          cell.getValue() === 'FECHADO' ? '#f00' :
                              cell.getValue() === 'EM ANÁLISE' ? '#ff0' : '#fff',
                  borderRadius: '0.25rem', p: '0.25rem'
              }}
            >
              {cell.getValue()}
            </Box>
          );
        },
        getAutoSortDir: 'STATUS',
        size: 100,
      },
      {
        accessorKey: 'dias',
        header: <p>Dias</p>,
        // Cell: ({ cell }) => {
        //   return (
        //     <Box component={'span'}>{formatDateTime(cell.getValue())}</Box>
        //   );
        // },
        size: 100,
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
        size: 100,
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
                    : cell.getValue() === 'ALTO'
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
        header: (
          <p>
            SETOR
            <br /> SOLICITANTE
          </p>
        ),
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
    ],
    []
  );
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      enableStickyHeader
      muiTopToolbarProps={{ sx: { bgcolor: '#2d769d', color: '#fff' } }}
      muiTableHeadCellProps={{ sx: { bgcolor: '#001E3F', color: '#fff' } }}
      muiTableHeadCellFilterTextFieldProps={{
        sx: { bgcolor: '#f5bac4', color: '#fff', borderRadius: 3 },
      }}
      initialState={{
        density: 'compact',
        pagination: { pageSize: 50 },
        sorting: [
          { id: 'status', asc: false },
          { id: 'id', desc: true },
        ],
      }}
      enableRowActions
      renderRowActions={({ row }) => (
        <Box>
          <Tooltip arrow placement="left" title="Detalhes">
            <IconButton
              onClick={() => {
                showModal(
                  row.original.id,
                  row.original.emailSolicitante,
                  row.original.solicitante
                );
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    />
  );
};

export default TabelaChamados;
