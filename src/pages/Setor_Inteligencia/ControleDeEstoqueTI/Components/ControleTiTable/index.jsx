import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box } from '@mui/material';

import ModalSaida from '../ModalSaida';
import ModalEditarValor from '../ModalEditarValor';

const ControleEstoqueTiTable = ({ data, cadastrarSaida, listaSetores, handleFetchInsumos}) => {
  const [setorLista, setSetorLista] = useState([]);

  const [setor] = useState([]);

  function setArrayLista(){
    setSetorLista(listaSetores);
  }

  function getArray(){
    setorLista.forEach((item) => (setor.push(item.setor)));
  }

  useEffect(() => {
    setArrayLista();
  }, [listaSetores]);
  
  useEffect(() => {
    getArray();
  }, [setorLista.length > 0]);
  

  const columns = useMemo(
    () => [
      {
        accessorKey: 'tipo',
        header: 'Tipo',
        size: 150,
      },
      {
        accessorKey: 'fornecedor',
        header: 'Fornecedor',
        size: 150,
      },
      {
        accessorKey: 'codProduto',
        header: 'CodProduto',
        size: 150,
      },
      {
        accessorKey: 'nome',
        header: 'Nome',
        size: 150,
      },
      {
        accessorKey: 'custo',
        header: 'Custo',
        size: 150,
      },
      {
        accessorKey: 'qtd_UM',
        header: 'Unidade de Medida',
        size: 150,
      },
      {
        accessorKey: 'um',
        header: 'Quantidade UM',
        size: 150,
      },
      {
        accessorKey: 'saldo',
        header: 'Saldo',
        size: 150,
      },
      {
        accessorKey: 'id',
        header: '',
        size: 150,
        Cell: ({ cell }) => {
          return (
            <Box
              sx={{
                display: 'flex',
                gap: '5%',
              }}
            >
              <ModalSaida
                data={cell.getValue()}
                setorLista={setor}
                cadastrarSaida={cadastrarSaida}
                handleFetchInsumos={handleFetchInsumos}
              />
              <ModalEditarValor data={cell.row.original} handleFetchInsumos={handleFetchInsumos} />
            </Box>
          );
        },
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

export default ControleEstoqueTiTable;
