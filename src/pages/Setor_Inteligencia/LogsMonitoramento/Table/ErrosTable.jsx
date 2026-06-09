import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { errosRequest } from '../logMonitoramento.service';

export default function ErrosTable() {
  const [data, setData] = useState([]);

  const handleFetchLogsErro = async () => {
    try {
      const response = await errosRequest({ logType: 'Error' });
      setData(response);
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
    }
  };

  useEffect(() => {
    handleFetchLogsErro();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="Tabela de Erros">
        <TableHead>
          <TableRow>
            <TableCell align="left">Mensagem</TableCell>
            <TableCell align="left">Exceção</TableCell>
            <TableCell align="left">UserID</TableCell>
            <TableCell align="left">Endpoint</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left">{row.message}</TableCell>
                <TableCell align="left">{row.exception}</TableCell>
                <TableCell align="left">{row.userId}</TableCell>
                <TableCell align="left">
                  {row.method} {row.endpointRequest}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Nenhum erro encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
