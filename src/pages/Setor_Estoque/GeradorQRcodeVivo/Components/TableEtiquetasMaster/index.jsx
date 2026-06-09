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
} from '@mui/material';

import { CircularProgress } from '@mui/material';

const columns = [
  { label: 'SAP', key: 'codigoSap' },
  { label: 'EAN', key: 'ean' },
  { label: 'Número de Série Inicial', key: 'numeroDeSerieInicial' },
  { label: 'Número de Série Final', key: 'numeroDeSerieFinal' },
];

const TableEtiquetasMaster = ({ data, loading }) => {
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
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">{row.codigoSap}</TableCell>
                  <TableCell align="center">{row.ean || '-'}</TableCell>
                  <TableCell align="center">
                    {row.numeroDeSerieInicial}
                  </TableCell>
                  <TableCell align="center">{row.numeroDeSerieFinal}</TableCell>
                </TableRow>
              ))
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

export default TableEtiquetasMaster;
