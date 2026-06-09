import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import './styles.css';

export default function TabelaTitulosEmAberto({
  data,
  loading,
  formatCurrencyBRL,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(parseInt(newPage));
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
            <Table sx={{ width: '100%' }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Filial Origem
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Prefixo
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Loja
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Nota Fiscal
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}
                  >
                    Valor
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Moeda
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Parcela
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Tipo
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Data Emissão
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Vencimento
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Vencto Real
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    return (
                      <TableRow hover key={item.id}>
                        <TableCell
                          align="center"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {item.filialOrigemCliente}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {item.prefixo || '-'}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {item.loja || '-'}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {item.numeroNF || '-'}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {formatCurrencyBRL(item.valorTitulo || 0)}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {item.moeda || '-'}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {item.parcela || '-'}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {item.tipo || '-'}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {item.dataEmissao || '-'}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {item.dataVencimento || '-'}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {item.dataVencimendoReal || '-'}
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
        'Não consta titulos em aberto para o cliente'
      )}
    </>
  );
}
