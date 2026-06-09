import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const TabelaDeFaturamento = ({ data, dataTotal }) => {
  const [expandedRows, setExpandedRows] = useState({});

  function formatarData(dataString) {
    if (!dataString) return '';

    const partes = dataString.split(' ')[0].split('/');

    if (partes.length !== 3) return '';

    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10);
    const ano = parseInt(partes[2], 10);

    return `${dia}/${mes}/${ano}`;
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 600,
        overflowY: 'auto',
      }}
    >
      <Table stickyHeader sx={{ borderCollapse: 'collapse', width: '100%' }}>
        <TableHead sx={{ backgroundColor: '#FAFAFA' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, border: 'none' }}>
              Data Emissão
            </TableCell>
            <TableCell sx={{ fontWeight: 600, border: 'none' }}>UF</TableCell>
            <TableCell sx={{ fontWeight: 600, border: 'none' }}>
              Pedido
            </TableCell>
            <TableCell sx={{ fontWeight: 600, border: 'none' }}>
              Cliente
            </TableCell>
            <TableCell sx={{ fontWeight: 600, border: 'none' }}>
              Vendedor
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 600, border: 'none' }}>
              Valor Faturado
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell sx={{ border: 'none' }}>
                {formatarData(item.dataEmissao)}
              </TableCell>
              <TableCell sx={{ border: 'none' }}>{item.uf}</TableCell>
              <TableCell sx={{ border: 'none' }}>{item.pedido}</TableCell>
              <TableCell>{item.cliente}</TableCell>
              <TableCell>{item.vendedor}</TableCell>
              <TableCell align="right">{item.valorFaturado}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabelaDeFaturamento;
