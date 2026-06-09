import React from 'react';
import { useState } from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
} from '@mui/material';
import { Link, useNavigate } from 'react-router';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const columns = [
  { label: 'Código', key: 'codigo' },
  { label: 'Setor', key: 'nome' },
  { label: 'Orçado Acumulado', key: 'orcadoAcumulado' },
  { label: 'Realizado Acumulado', key: 'realizadoAcumulado' },
  {
    label: 'Realizado(%) ',
    key: 'porcentagemRealizadoAcumulado',
    align: 'center',
  },
  { label: 'Orçado Anual', key: 'orcadoAnual' },
  { label: 'Realizado Anual', key: 'realizadoAnual' },
  { label: 'Realizado Anual(%)', key: 'porcentagemAnual' },
];

const TableAcumulado = ({ data, ano }) => {
  const formatCurrencyBRL = (current) => {
    const parsedValue =
      current === undefined || current === null || current === '' ? 0 : current;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parsedValue);
  };

  const formatPercentage = (value) => {
    if (value === undefined || value === null || value === '') {
      return '0%';
    }
    return `${value.toFixed(2)}%`;
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
              <TableCell sx={{ backgroundColor: '#ccc' }} />
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align="center"
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: '#ccc',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <Link to={`/orcamentoSetor/${row.idCentroCusto}/${ano}`}>
                      <VisibilityIcon
                        color="primary"
                        style={{ cursor: 'pointer' }}
                      />
                    </Link>
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.key} align="center">
                      {[
                        'orcadoAcumulado',
                        'realizadoAcumulado',
                        'orcadoAnual',
                        'realizadoAnual',
                      ].includes(column.key) ? (
                        formatCurrencyBRL(row[column.key])
                      ) : [
                          'porcentagemRealizadoAcumulado',
                          'porcentagemAnual',
                        ].includes(column.key) ? (
                        <Stack
                          direction="column"
                          spacing={1}
                          alignItems="center"
                        >
                          <Chip
                            label={formatPercentage(row[column.key])}
                            size="small"
                            sx={{
                              fontSize: '12px',
                              border:
                                (row[column.key] || 0) > 100
                                  ? '1px solid #FF0000'
                                  : '1px solid #0288D1',
                              borderRadius: '8px',
                              boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.194)',
                              backgroundColor: '#fff',
                              fontWeight: 'bold',
                              color:
                                (row[column.key] || 0) > 100
                                  ? '#FF0000'
                                  : '#0288D1',
                            }}
                          />
                        </Stack>
                      ) : (
                        row[column.key] ?? '0%'
                      )}
                    </TableCell>
                  ))}
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

export default TableAcumulado;
