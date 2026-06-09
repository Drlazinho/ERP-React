import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Estilos personalizados usando a função `styled`
const StyledTable = styled(Table)(({ theme }) => ({
  fontFamily: 'Poppins',
  fontSize: 12,
  fontStyle: 'normal',
  lineHeight: 'normal',
}));

function createData(name, calories) {
  return { name, calories };
}

const rows = [
  createData('dashboard', '0'),
  createData('dashComercial', '0'),
  createData('entradaprotocolonotas', '0'),
  createData('coletaeentrega', '0'),
];

export default function PagesTable() {
  return (
    <TableContainer>
      <StyledTable size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography className="fontCardTitle">Página</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography className="fontCardTitle">Carregamento</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}