import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
} from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import { logsRequest } from '../logMonitoramento.service';

interface LogType {
  id: number;
  message: string;
  level: string;
  userId: number;
  method: string;
  endpointRequest: string;
  requestDate: string;
}

export default function LogsTable() {
  const [data, setData] = useState<LogType[]>([]);

  const handleFetchLogs = async () => {
    try {
      const response = await logsRequest();
      setData(response);
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
    }
  };

  useEffect(() => {
    handleFetchLogs();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="Tabela de Logs">
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell align="left"><strong>Mensagem</strong></TableCell>
            <TableCell align="center"><strong>Nível</strong></TableCell>
            <TableCell align="center"><strong>User ID</strong></TableCell>
            <TableCell align="center"><strong>Método</strong></TableCell>
            <TableCell align="center"><strong>Endpoint</strong></TableCell>
            <TableCell align="center"><strong>Data</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell align="left">{row.message}</TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1,
                    borderRadius: 2,
                    bgcolor: '#E8F1FF',
                  }}
                >
                  <ErrorOutlineOutlinedIcon sx={{ fontSize: 20 }} />
                  {row.level}
                </Box>
              </TableCell>
              <TableCell align="center">{row.userId}</TableCell>
              <TableCell align="center">{row.method}</TableCell>
              <TableCell align="center">{row.endpointRequest}</TableCell>
              <TableCell align="center">{new Date(row.requestDate).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
