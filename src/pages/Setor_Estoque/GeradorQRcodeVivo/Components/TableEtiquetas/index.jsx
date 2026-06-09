import React from 'react';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Checkbox,
} from '@mui/material';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { CircularProgress } from '@mui/material';

const columns = [
  { label: 'QRCode', key: 'qrCode' },
  { label: 'Descrição', key: 'apelidoProduto' },
  { label: 'Nota Fiscal', key: 'notaFiscalDeReferencia' },
  { label: 'EAN', key: 'ean' },
  { label: 'SAP', key: 'codigoSap' },
  { label: 'Data Geração', key: 'dataGeracao' },
  { label: 'Expedido', key: 'expedido' },
];

const TableEtiquetas = ({ data, loading, onSelectionChange }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const formatarData = (dataISO) =>
    new Date(dataISO).toLocaleDateString('pt-BR');

  const handleSelectRow = (event, row) => {
    const selectedIndex = selectedRows.findIndex(
      (item) => item.qrCode === row.qrCode
    );
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selectedRows, row];
    } else {
      newSelected = selectedRows.filter((item) => item.qrCode !== row.qrCode);
    }

    setSelectedRows(newSelected);

    if (onSelectionChange) {
      onSelectionChange(newSelected);
    }
  };

  const isSelected = (row) => {
    return selectedRows.some((item) => item.qrCode === row.qrCode);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          fontFamily: 'Poppins',
          maxHeight: 538,
          overflowY: 'auto',
          borderRadius: '10px',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
      >
        <Table
          stickyHeader
          aria-label="collapsible table"
          sx={{ bgcolor: '#F4F4F4' }}
        >
          <TableHead sx={{ bgcolor: '#F4F4F4' }}>
            <TableRow sx={{ bgcolor: '#F4F4F4' }}>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#ccc' }}>
                Selecionar
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align="center"
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: '#ccc',
                    color: '#333',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : Array.isArray(data) && data.length > 0 ? (
              data.map((row) => {
                const isItemSelected = isSelected(row);
                const isDisabled = row.expedido !== 0;
                return (
                  <TableRow key={row.id}>
                    <TableCell align="center">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={(event) => handleSelectRow(event, row)}
                        disabled={isDisabled}
                        sx={{
                          '&.Mui-disabled': {
                            color: 'rgba(0, 0, 0, 0.26)',
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">{row.qrCode}</TableCell>
                    <TableCell align="center">{row.apelidoProduto}</TableCell>
                    <TableCell align="center">
                      {row.notaFiscalDeReferencia}
                    </TableCell>
                    <TableCell align="center">{row.ean}</TableCell>
                    <TableCell align="center">{row.codigoSap}</TableCell>
                    <TableCell align="center">
                      {formatarData(row.dataGeracao)}
                    </TableCell>
                    <TableCell align="center">
                      {row.expedido === 0 ? (
                        <AiFillDislike
                          style={{ color: 'red', fontSize: '20px' }}
                        />
                      ) : (
                        <AiFillLike
                          style={{ color: 'green', fontSize: '20px' }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="body2" color="textSecondary">
                    Nenhum dado encontrado
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableEtiquetas;
