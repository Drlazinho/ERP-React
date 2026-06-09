import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
  Tooltip,
  IconButton,
  Typography,
  CircularProgress,
} from '@mui/material';

import formatDataSanduicheira from '../../../../utils/formatDataSanduicheira';

const styleG = {
  width: '156px',
  padding: '4px 8px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '24px',
  border: '1px solid #28A745',
  backgroundColor: '#EEFFF2',
  pointerEvents: 'none',
};

const styleR = {
  width: '156px',
  padding: '4px 8px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '24px',
  border: '1px solid #D88A8A',
  backgroundColor: '#F7E6E6',
  pointerEvents: 'none',
};

function TabelaApontamentoSanduicheira({ data }) {
  return (
    <>
      <div className="tabelaForaLinha">
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '25px',
            overflow: 'hidden',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            maxHeight: 750,
            maxWidth: 'auto',
            overflowY: 'auto',
            overflowX: 'auto',
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  style={{
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Linha
                </TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>
                  Produto
                </TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>
                  Cod. Produto
                </TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>
                  EAN
                </TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>
                  OP
                </TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>
                  Situação
                </TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>
                  Data
                </TableCell>
                <TableCell align="left" style={{ fontWeight: 'bold' }}>
                  Local
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  hover
                >
                  <TableCell align="center">{item.linha}</TableCell>
                  <TableCell align="left">{item.nomeProduto}</TableCell>
                  <TableCell align="left">{item.codigoProduto}</TableCell>
                  <TableCell align="left">{item.ean}</TableCell>
                  <TableCell align="left">{item.op}</TableCell>
                  <TableCell align="left">
                    {item.situacaoSanduicheira}
                  </TableCell>
                  <TableCell align="left">
                    {formatDataSanduicheira(item.dataRegistro)}
                  </TableCell>
                  <TableCell align="left">{item.galpao}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
export default TabelaApontamentoSanduicheira;
