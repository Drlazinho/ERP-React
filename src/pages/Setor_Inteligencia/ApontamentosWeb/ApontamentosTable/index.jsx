import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import ModalFechar from '../ModalCadastrarFim';
import { Box } from '@mui/material';
import Loader from '@/components/Loader';

const TableApontamentos = ({
  nome,
  data,
  handleFetchApontamentos,
  loading,
}) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Atualizar',
        size: 50,
        Cell: ({ cell }) => (
          <Box>
            <ModalFechar
              data={cell.row.original || {}}
              nome={nome}
              handleFetchApontamentos={handleFetchApontamentos}
            />
          </Box>
        ),
        muiTableHeadCellProps: { align: 'left' },
        muiTableBodyCellProps: { align: 'left' },
      },
      {
        accessorKey: 'colaboradorNome',
        header: 'Colaborador',
        size: 120,
        muiTableHeadCellProps: { align: 'left' },
        muiTableBodyCellProps: { align: 'left' },
      },
      {
        accessorKey: 'dataApont',
        header: 'Data',
        size: 100,
        muiTableHeadCellProps: { align: 'left' },
        muiTableBodyCellProps: { align: 'left' },
        Cell: ({ cell }) => {
          const dateString = cell.getValue();
          const [year, month, day] = dateString.split('-');
          const date = new Date(Date.UTC(year, month - 1, day));
          return `${String(date.getUTCDate()).padStart(2, '0')}/${String(
            date.getUTCMonth() + 1
          ).padStart(2, '0')}/${date.getUTCFullYear()}`;
        },
      },
      {
        accessorKey: 'hr_Inicio',
        header: 'Hora Inicio',
        size: 90,
        muiTableHeadCellProps: { align: 'left' },
        muiTableBodyCellProps: { align: 'left' },
      },
      {
        accessorKey: 'hr_Final',
        header: 'Hora Fim',
        size: 90,
        muiTableHeadCellProps: { align: 'left' },
        muiTableBodyCellProps: { align: 'left' },
      },
      {
        accessorKey: 'numChamado',
        header: 'N° Chamado',
        size: 100,
        muiTableHeadCellProps: { align: 'left' },
        muiTableBodyCellProps: { align: 'left' },
      },
      {
        accessorKey: 'tarefa_Demanda',
        header: 'Tarefa',
        size: 150,
        muiTableHeadCellProps: { align: 'left' },
        muiTableBodyCellProps: { align: 'left' },
      },
      {
        accessorKey: 'numProjeto',
        header: 'N° Projeto',
        size: 100,
        muiTableHeadCellProps: { align: 'left' },
        muiTableBodyCellProps: { align: 'left' },
      },
      {
        accessorKey: 'numTask',
        header: 'N° Task',
        size: 90,
        muiTableHeadCellProps: { align: 'left' },
        muiTableBodyCellProps: { align: 'left' },
      },
      {
        accessorKey: 'tempo_Min',
        header: 'Tempo (Min)',
        size: 90,
        muiTableHeadCellProps: { align: 'left' },
        muiTableBodyCellProps: { align: 'left' },
      },
      {
        accessorKey: 'observacao',
        header: 'Observação',
        size: 150,
        muiTableHeadCellProps: { align: 'left' },
        muiTableBodyCellProps: { align: 'left' },
      },
    ],
    [nome, handleFetchApontamentos]
  );

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <Loader />
        </div>
      )}
      <MaterialReactTable
        columns={columns}
        data={data}
        localization={MRT_Localization_PT_BR}
        initialState={{ density: 'compact' }}
        state={{ isLoading: loading }}
        muiTablePaperProps={{
          sx: {
            boxShadow: 'none',
            borderRadius: '4px',
            border: '1px solid #e0e0e0',
          },
        }}
        muiTableContainerProps={{
          sx: {
            maxHeight: 'calc(100vh - 200px)',
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            padding: '6px 8px',
            fontSize: '0.75rem',
            fontWeight: 600,
            backgroundColor: '#f5f5f5',
          },
        }}
        muiTableHeadRowProps={{
          sx: {
            height: '36px',
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            padding: '6px 8px',
            fontSize: '0.75rem',
          },
        }}
        muiTopToolbarProps={{
          sx: {
            bgcolor: '#D7D7D7',
            color: 'white',
            minHeight: '40px',
            padding: '4px',
          },
        }}
        muiBottomToolbarProps={{
          sx: {
            minHeight: '40px',
          },
        }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            size: 50,
          },
        }}
      />
    </div>
  );
};

export default TableApontamentos;
