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
  { label: 'Descrição', key: 'prodApelido' },
  { label: 'Código do Produto', key: 'codigoProduto' },
  { label: 'Código SAP', key: 'codSapVivo' },
  { label: 'EAN', key: 'ean' },
];

const TableProdutos = ({ data, loading }) => {
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
                    backgroundColor: '#F3F4F6',
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
                  <TableCell align="center">{row.prodApelido || '-'}</TableCell>
                  <TableCell align="center">
                    {row.codigoProduto || '-'}
                  </TableCell>
                  <TableCell align="center">{row.codSapVivo || '-'}</TableCell>
                  <TableCell align="center">{row.ean || '-'}</TableCell>
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

export default TableProdutos;
