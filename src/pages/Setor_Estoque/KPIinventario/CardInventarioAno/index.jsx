import * as React from 'react';
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

function CardInventarioAno({ dataCard, title }) {
  const rows = [
    { name: 'Meta', value: 90 },
    { name: 'Atual', value: dataCard.inventarioAno },
  ];

  return (
    <Box className="cardInventario">
      <Typography>Inventário - Geral Ano {title}</Typography>
      <Box>
        <TableContainer component={Paper}>
          <Table className="tableInventario" aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      border: '1px solid #CCC',
                    }}
                  >
                    {row.name}
                  </TableCell>
                  {row.name === 'Atual' ? (
                    <TableCell
                      sx={{
                        border: '1px solid #CCC',
                        backgroundColor:
                          row.value >= 90 ? '#BBF7D0' : '#FECACA',
                      }}
                    >
                      {row.value}%
                    </TableCell>
                  ) : (
                    <TableCell
                      sx={{
                        border: '1px solid #CCC',
                      }}
                    >
                      {row.value}%
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default CardInventarioAno;
