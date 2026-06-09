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
import './styles.css';

function TabelaIndicadoresNps({ data }) {
  return (
    <>
      <div className="tabelaNPS">
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '25px',
            overflow: 'hiautoden',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            maxWidth: '100%',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Atualizado Em
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Usuario
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  NPS
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  CSAT %
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  CSAT Média
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {item.dataRegistro}
                  </TableCell>
                  <TableCell align="center">{item.usuario}</TableCell>
                  <TableCell align="center">{item.nps}</TableCell>
                  <TableCell align="center">{item.csat}</TableCell>
                  <TableCell align="center">{item.mediaCSAT}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
export default TabelaIndicadoresNps;
