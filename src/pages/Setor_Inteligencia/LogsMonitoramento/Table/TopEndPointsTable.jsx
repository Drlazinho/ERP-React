import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { endpointsRequest } from '../logMonitoramento.service';

// Estilos personalizados usando a função `styled`
const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: 500,
  fontFamily: 'Poppins',
  fontSize: 12,
  fontWeight: 400,
  lineHeight: 'normal',
}));

const interfacePropsEndpoints = {
  endpoint: '/api/Equipe',
  qtdAcessos: 0,
};

export default function TopEndPointsTable() {
  const [data, setData] = useState([interfacePropsEndpoints]);

  const handleFetchTopEndpoints = () => {
    endpointsRequest({ data })
      .then((response) => {
        setData(response);
      })
      .catch((_err) => {
      });
  };

  useEffect(() => {
    handleFetchTopEndpoints();
  }, []);

  return (
    <TableContainer>
      <StyledTable size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Endpoint</TableCell>
            <TableCell align="center">Requisições</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.endpoint}>
                <TableCell component="th" scope="row">
                  {row.endpoint}
                </TableCell>
                <TableCell align="center">{row.qtdAcessos}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} align="center">
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