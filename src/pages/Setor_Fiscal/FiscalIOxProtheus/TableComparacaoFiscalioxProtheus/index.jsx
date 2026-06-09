import React, { useState } from 'react';
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
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const columns = [
  { label: 'N° NF', key: 'numero' },
  { label: 'N° Chave', key: 'chaveNotaFiscal' },
  { label: 'Data Emissão', key: 'dataEmissao' },
  { label: 'Fiscal IO', key: 'fiscalIo' },
  { label: 'Protheus', key: 'existeNoProtheus' },
];

const formatarData = (data) => {
  if (!data) return '';
  const dataObj = new Date(data);
  const dia = String(dataObj.getDate()).padStart(2, '0');
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
  const ano = dataObj.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

const Row = ({ row, headers }) => {
  return (
    <TableRow>
      {headers.map((column) => (
        <TableCell key={column.key} align="center">
          {column.key === 'fiscalIo' ? (
            <CheckCircleOutlineIcon sx={{ color: 'green', fontSize: 30 }} />
          ) : column.key === 'existeNoProtheus' ? (
            String(row[column.key]).trim().toLowerCase() === 'true' ? (
              <CheckCircleOutlineIcon sx={{ color: 'green', fontSize: 30 }} />
            ) : (
              <HighlightOffIcon sx={{ color: 'red', fontSize: 30 }} />
            )
          ) : column.key === 'numero' ? (
            `000${row[column.key]}`
          ) : column.key === 'dataEmissao' ? (
            formatarData(row[column.key])
          ) : (
            row[column.key]
          )}
        </TableCell>
      ))}
    </TableRow>
  );
};

const TableComparacaoFiscalioxProtheus = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: '70vh',
        overflowX: 'auto',
        margin: '0 auto',
        width: '100%',
      }}
    >
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
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) &&
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <Row key={item.id} row={item} headers={columns} />
              ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              count={data.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Linhas por página"
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableComparacaoFiscalioxProtheus;
