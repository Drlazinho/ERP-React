import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './styles.css';
import CircularProgress from '@mui/material/CircularProgress';

export default function TabelaFaturamento({
  data,
  loading,
  formatCurrencyBRL,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: '20px',
          }}
        >
          <CircularProgress />
        </div>
      ) : data?.length > 0 ? (
        <Paper sx={{ mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 500 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Filial Origem
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Série
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Docto
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Num. Título
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Data Emissão
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Valor Bruto
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Valor Título
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Valor Frete
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Hora
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Transporte
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    return (
                      <TableRow hover key={item.id}>
                        <TableCell align="center">
                          {item.filialOrigem}
                        </TableCell>
                        <TableCell align="center">{item.serie}</TableCell>
                        <TableCell align="center">{item.docto}</TableCell>
                        <TableCell align="center">
                          {item.numeroTitulo}
                        </TableCell>
                        <TableCell align="center">{item.dataEmissao}</TableCell>
                        <TableCell align="center">
                          {formatCurrencyBRL(item.valorBruto)}
                        </TableCell>
                        <TableCell align="center">
                          {formatCurrencyBRL(item.valorTitulo)}
                        </TableCell>
                        <TableCell align="center">
                          {formatCurrencyBRL(item.valorFrete)}
                        </TableCell>
                        <TableCell align="center">
                          {item.horaFaturamento}
                        </TableCell>
                        <TableCell align="center">
                          {item.transportadora}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[3, 5]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        'Não consta faturamento para o cliente'
      )}
    </>
  );
}
