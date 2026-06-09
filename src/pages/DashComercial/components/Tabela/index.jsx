import * as React from 'react';
import { Box, Paper, CircularProgress, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';

const TableHeaderCell = ({ children, align = 'left', sx = {} }) => (
  <TableCell
    align={align}
    sx={{
      fontWeight: 600,
      border: 'none',
      whiteSpace: 'nowrap',
      ...sx,
    }}
  >
    {children}
  </TableCell>
);

const TableBodyCell = ({ children, align = 'left', sx = {} }) => (
  <TableCell
    align={align}
    sx={{
      border: 'none',
      ...sx,
    }}
  >
    {children}
  </TableCell>
);

const formatCurrency = (value) =>
  `R$ ${value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const TabelaDashComercial = ({ data, dataTotal, loading }) => {
  const hasData = data && data.length > 0;

  return (
    <TableContainer
      component={Paper}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: 438,
        overflowY: 'auto',
        position: 'relative',
      }}
    >
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1,
          }}
        >
          <CircularProgress color="error" />
        </Box>
      )}

      {!loading && !hasData && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 0,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Nenhum dado para exibir.
          </Typography>
        </Box>
      )}

      <Table
        sx={{ borderCollapse: 'collapse', opacity: loading ? 0.5 : 1 }}
        aria-label="dash comercial table"
      >
        <TableHead sx={{ backgroundColor: '#FAFAFA', width: '100%' }}>
          <TableRow>
            <TableHeaderCell sx={{ width: '20%' }}>Descrição</TableHeaderCell>
            <TableHeaderCell align="right" sx={{ width: '12%' }}>
              Quantidade
            </TableHeaderCell>
            <TableHeaderCell align="right" sx={{ width: '15%' }}>
              Receita Bruta
            </TableHeaderCell>
            <TableHeaderCell align="right" sx={{ width: '15%' }}>
              Receita Líquida
            </TableHeaderCell>
            <TableHeaderCell align="right" sx={{ width: '15%' }}>
              Devoluções
            </TableHeaderCell>
            <TableHeaderCell align="right" sx={{ width: '12%' }}>
              Média s/IPI
            </TableHeaderCell>
            <TableHeaderCell align="right" sx={{ width: '12%' }}>
              Média c/IPI
            </TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {hasData ? (
            data.map((item, index) => (
              <TableRow key={index}>
                <TableBodyCell component="th" scope="row">
                  {item.descricao}
                </TableBodyCell>
                <TableBodyCell align="right">
                  {item.quantidade.toLocaleString('pt-BR')}
                </TableBodyCell>
                <TableBodyCell align="right">
                  {formatCurrency(item.receitaBruta)}
                </TableBodyCell>
                <TableBodyCell align="right">
                  {formatCurrency(item.receitaLiquida)}
                </TableBodyCell>
                <TableBodyCell align="right">
                  {formatCurrency(item.devolucoes)}
                </TableBodyCell>
                <TableBodyCell align="right">
                  {item.mediaSemIpi.toLocaleString('pt-BR')}
                </TableBodyCell>
                <TableBodyCell align="right">
                  {item.mediaComIpi.toLocaleString('pt-BR')}
                </TableBodyCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                sx={{ border: 'none', height: '100px' }}
              ></TableCell>
            </TableRow>
          )}
        </TableBody>

        {hasData && (
          <TableFooter
            sx={{ position: 'sticky', bottom: 0, backgroundColor: '#FAFAFA' }}
          >
            <TableRow>
              <TableHeaderCell colSpan={1}>Total</TableHeaderCell>
              <TableHeaderCell align="right">
                {dataTotal.totalQuantidade.toLocaleString('pt-BR')}
              </TableHeaderCell>
              <TableHeaderCell align="right">
                {formatCurrency(dataTotal.totalReceitaBruta)}
              </TableHeaderCell>
              <TableHeaderCell align="right">
                {formatCurrency(dataTotal.totalReceitaLiquida)}
              </TableHeaderCell>
              <TableHeaderCell align="right">
                {formatCurrency(dataTotal.totalDevolucoes)}
              </TableHeaderCell>
              <TableHeaderCell align="right">
                {dataTotal.totalMediaSemIpi.toLocaleString('pt-BR')}
              </TableHeaderCell>
              <TableHeaderCell align="right">
                {dataTotal.totalMediaComIpi.toLocaleString('pt-BR')}
              </TableHeaderCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
};

export default TabelaDashComercial;
