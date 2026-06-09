import * as React from 'react';
import '../styles.css';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';

const meses = [
  { id: 1, nome: 'Jan' },
  { id: 2, nome: 'Fev' },
  { id: 3, nome: 'Mar' },
  { id: 4, nome: 'Abr' },
  { id: 5, nome: 'Mai' },
  { id: 6, nome: 'Jun' },
  { id: 7, nome: 'Jul' },
  { id: 8, nome: 'Ago' },
  { id: 9, nome: 'Set' },
  { id: 10, nome: 'Out' },
  { id: 11, nome: 'Nov' },
  { id: 12, nome: 'Dez' },
];

function CardInventarioMes({ dataCard, title }) {
  const mesAtual = new Date().getMonth() + 1;
  const mesSelecionadoId = title.mes === 0 ? mesAtual : title.mes;
  const mesSelecionado = meses.find((mes) => mes.id === mesSelecionadoId);

  const rows = [
    { name: 'Meta', value: 90 },
    { name: 'Atual', value: dataCard.inventarioMes },
  ];

  return (
    <Box className="cardInventario">
      <Typography>
        Inventário - Geral{' '}
        {mesSelecionado ? mesSelecionado.nome : 'Mês inválido'} {title.ano}
      </Typography>
      <Box>
        <TableContainer component={Paper}>
          <Table className="tableInventario" aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ border: '1px solid #CCC' }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      border: '1px solid #CCC',
                      backgroundColor:
                        row.name === 'Atual'
                          ? row.value >= 90
                            ? '#BBF7D0'
                            : '#FECACA'
                          : 'transparent',
                    }}
                  >
                    {row.value}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default CardInventarioMes;
