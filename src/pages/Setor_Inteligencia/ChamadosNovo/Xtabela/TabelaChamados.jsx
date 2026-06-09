import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import { formatDateTime } from '@/utils/formatDateInput';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useToast } from '@/hooks/toast.hook';
import { apiInteligencia } from '@/services/apis';

const XTabelaChamados = ({
  data,
  showModal,
  setDadosTabela,
  setListaChamadosDetalhes,
  setFormData,
}) => {
  const { addToast } = useToast();

  const loaderDataChamadosDetalhe = (id) => {
    apiInteligencia
      .get(`/ChamadoDetalheX/${id}`)
      .then((res) => {
        setListaChamadosDetalhes(res.data.value.chamadosDetalhes);
      })
      .catch((error) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar Detalhes do Chamado !' + error,
        });
      });
    apiInteligencia
      .get(`/ChamadosX/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((error) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar Detalhes do Chamado !' + error,
        });
      });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 10,
      },
      {
        accessorKey: 'titulo',
        header: 'TÍTULO',
        size: 100,
      },
      {
        accessorKey: 'status',
        header: 'STATUS',
        Cell: ({ cell }) => {
          return (
            <Box
              component={'span'}
              sx={{
                color: '#000',
                background:
                  cell.getValue() === 'ABERTO'
                    ? '#0f0'
                    : cell.getValue() === 'FECHADO'
                    ? '#f00'
                    : cell.getValue() === 'EM ANÁLISE'
                    ? '#ff0'
                    : '#fff',
                borderRadius: '0.25rem',
                p: '0.25rem',
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
        Cell: ({ cell, row }) => {
          const categoria = row.original.categoria;
          const dias = cell.getValue();

          let color;
          if (categoria === 'APOIO AO USUARIO' && dias > 1) {
            color = 'red';
          } else if (categoria === 'MANUTENÇÃO' && dias > 2) {
            color = 'red';
          } else if (categoria === 'INFRAESTRUTURA' && dias > 2) {
            color = 'red';
          } else if (categoria === 'COMPRAS' && dias > 20) {
            color = 'red';
          } else if (categoria === 'SISTEMAS' && dias > 4) {
            color = 'red';
          } else if (categoria === 'DESENVOLVIMENTO' && dias > 20) {
            color = 'red';
          } else {
            color = 'black';
          }

          return (
            <Box
              component={'span'}
              sx={{
                color: color,
                borderRadius: '0.25rem',
                p: '0.25rem',
              }}
            >
              {dias}
            </Box>
          );
        },
        size: 100,
      },
      {
        id: 'statusDias',
        header: <p>Atrasado/Em Dia</p>,
        accessorFn: (row) => {
          const limites = {
            'APOIO AO USUARIO': 1,
            MANUTENÇÃO: 2,
            INFRAESTRUTURA: 2,
            COMPRAS: 20,
            SISTEMAS: 4,
            DESENVOLVIMENTO: 20,
          };
          const dias = Number(row.dias);
          const categoria = row.categoria;
          return dias > (limites[categoria] ?? Infinity)
            ? 'ATRASADO'
            : 'EM DIA';
        },
        enableColumnFilter: true,
        filterVariant: 'text',
        Cell: ({ cell }) => {
          const status = cell.getValue();
          const color = status === 'ATRASADO' ? 'red' : 'black';
          return (
            <Box
              component="span"
              sx={{
                color: color,
                borderRadius: '0.25rem',
                p: '0.25rem',
              }}
            >
              {status}
            </Box>
          );
        },
        size: 100,
        filterFn: (row, _columnId, filterValue) => {
          const status = row.getValue('statusDias');
          return status.toLowerCase().includes(filterValue.toLowerCase());
        },
      },
      {
        accessorKey: 'dataAtualizacao',
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
        accessorKey: 'dataAbertura',
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
        accessorKey: 'responsavelDemandante',
        header: 'SOLICITANTE',
        size: 100,
      },
      {
        accessorKey: 'responsavelDemandado',
        header: 'RESPONSÁVEL',
        size: 150,
      },
      {
        accessorKey: 'categoria',
        header: 'CATEGORIA',
        size: 150,
      },
      {
        accessorKey: 'setorDemandante',
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
                sx={{
                  color: '#000',
                  background: '#1a9cb8',
                  borderRadius: '0.25rem',
                  p: '0.25rem',
                }}
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
      muiFilterTextFieldProps={{
        sx: {
          bgcolor: '#f5bac4',
          color: '#fff',
          borderRadius: 3,
        },
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
                showModal(true);
                setDadosTabela(row.original);
                loaderDataChamadosDetalhe(row.original.id);
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

export default XTabelaChamados;
