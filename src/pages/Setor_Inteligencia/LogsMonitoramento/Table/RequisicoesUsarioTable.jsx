import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/system';

const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 660,
  fontFamily: 'Poppins',
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 'normal',
}));

export default function UserTableLog({ data }) {
  return (
    <TableContainer>
      <StyledTable size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Usuário</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="center">Última Requisição</TableCell>
            <TableCell align="center">Load Time</TableCell>
            <TableCell align="center">Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.userName}
                </TableCell>
                <TableCell align="left">{row.userEmail}</TableCell>
                <TableCell align="center">{row.endpointRequest}</TableCell>
                <TableCell align="center">{row.loadTime}</TableCell>
                <TableCell align="center">{row.requestDate}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography variant="body2" color="textSecondary">
                  Nenhum dado disponível
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}