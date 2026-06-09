import React, { useState, useEffect } from 'react';
import '../styles.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
  IconButton,
  TextField,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import Loader from '@/components/Loader';
import '../styles.css';

const columns = [
  { label: 'Modelo', key: 'descricaoProduto' },
  { label: 'Código', key: 'codigo' },
  { label: 'QTD Vendido', key: 'quantidadePecas' },
  { label: 'R$ Peça', key: 'precoUnitario' },
  { label: 'Peso Liquido', key: 'pesoLiquido' },
  { label: 'Peso Bruto', key: 'pesoBruto' },
  { label: 'QTD Volume', key: 'quantidadeVolumes' },
  { label: 'Cubagem', key: 'cubagem' },
  { label: 'R$ Frete', key: 'frete' },
  { label: 'R$ Sem Impostos', key: 'valorSemImpostos' },
  { label: 'R$ Com Impostos', key: 'valorComImpostos' },
];

const Row = ({ data, row, onDelete, updateProduto }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleQtdVendidoChange = (event) => {
    const newQtdVendido = parseInt(event.target.value, 10) || '';
    updateProduto(row.codigo, 'quantidadePecas', newQtdVendido);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const formatDecimal = (value) =>
    value !== null && value !== undefined ? Number(value).toFixed(2) : '';

  const formatCurrencyBRL = (value) =>
    value !== null && value !== undefined
      ? new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value)
      : '';

  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          align="start"
          key={column.key}
          className="table-cell"
          sx={{ whiteSpace: 'nowrap' }}
        >
          {column.key === 'quantidadePecas' ? (
            isEditing ? (
              <TextField
                type="number"
                value={row.quantidadePecas}
                onChange={handleQtdVendidoChange}
                onBlur={() => setIsEditing(false)}
                autoFocus
                variant="outlined"
                size="small"
                style={{ width: '90px' }}
              />
            ) : (
              <>
                {row.quantidadePecas}
                <IconButton onClick={toggleEditMode} size="small">
                  <EditIcon />
                </IconButton>
              </>
            )
          ) : [
              'precoUnitario',
              'frete',
              'valorSemImpostos',
              'valorComImpostos',
            ].includes(column.key) ? (
            formatCurrencyBRL(row[column.key])
          ) : ['pesoLiquido', 'pesoBruto'].includes(column.key) ? (
            formatDecimal(row[column.key])
          ) : (
            row[column.key]
          )}
        </TableCell>
      ))}
      <TableCell align="center">
        <IconButton onClick={() => onDelete(row.codigo)}>
          <DeleteOutlineIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

const TabelaCubagem = ({ data, loading, onUpdateListagem }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listagemProdutos, setListagemProdutos] = useState(data);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowsToShow = Array.isArray(listagemProdutos)
    ? listagemProdutos.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    : [];

  const handleDeleteItem = (codigo) => {
    const updatedList = listagemProdutos.filter(
      (item) => item.codigo !== codigo
    );
    setListagemProdutos(updatedList);

    if (onUpdateListagem) {
      onUpdateListagem(updatedList);
    }
  };
  const updateProduto = (codigo, key, value) => {
    const updatedList = listagemProdutos.map((item) =>
      item.codigo === codigo ? { ...item, [key]: value } : item
    );
    setListagemProdutos(updatedList);
    if (onUpdateListagem) {
      onUpdateListagem(updatedList);
    }
  };

  useEffect(() => {
    setListagemProdutos(data);
  }, [data]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align="center"
                  sx={{
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    borderBottom: '1px solid #000',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                align="center"
                sx={{ fontWeight: 'bold', borderBottom: '1px solid #000' }}
              >
                Ação
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsToShow.map((row) => (
              <Row
                key={row.codigo}
                row={row}
                onDelete={handleDeleteItem}
                updateProduto={updateProduto}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 15, 20]}
                count={listagemProdutos ? listagemProdutos.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default TabelaCubagem;
