import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';

const MovTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'produto',
        header: 'Produto',
        size: 150,
      },
      {
        accessorKey: 'tipoMovimentacao',
        header: 'Movimentação',
        size: 150,
      },
      {
        accessorKey: 'dataMov',
        header: 'Dt.Movimentação',
        size: 200,
      },
      {
        accessorKey: 'qtdMov',
        header: 'Qtd.Movi.',
        size: 150,
      },
      {
        accessorKey: 'saldoNovo',
        header: 'Saldo Novo',
        size: 150,
      },
      {
        accessorKey: 'saldoAnterior',
        header: 'Saldo Anterior',
        size: 150,
      },
      {
        accessorKey: 'setor',
        header: 'Setor',
        size: 150,
      },
      {
        accessorKey: 'descricao',
        header: 'Destino',
        size: 150,
      },
      {
        accessorKey: 'usuario',
        header: 'Usuario',
        size: 150,
      },
      {
        accessorKey: 'usuarioSistema',
        header: 'Usuario Sistema',
        size: 150,
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
    />
  );
};

export default MovTable;
