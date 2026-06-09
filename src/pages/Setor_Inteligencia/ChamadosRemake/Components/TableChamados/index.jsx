import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { Button, TableHead } from '@mui/material';
import ModalDetalhes from '../ModalDetalhes';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function TableChamados({ dadosTabela = [], handleGetData }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const dados = Array.isArray(dadosTabela) ? [...dadosTabela] : [];

  const dadosOrdenados = dados.sort((a, b) => new Date(b.id) - new Date(a.id));

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - dadosOrdenados.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ borderBottom: 'none' }}>Ações</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>Nº</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>Título</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>Categoria</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>Status</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>Dias</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>Atendimento</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>Atualizado em</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>Aberto em</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>Prioridade</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>Situação</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>Solicitante</TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>
              Setor Solicitante
            </TableCell>
            <TableCell sx={{ borderBottom: 'none' }}>Responsável</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? dadosOrdenados.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : dadosOrdenados
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={{ borderBottom: 'none' }}>
                <ModalDetalhes data={row} handleGetData={handleGetData} />
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>{row.id}</TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>{row.titulo}</TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                {row.categoria}
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                <Box
                  sx={{
                    display: 'flex',
                    borderRadius: '32px',
                    padding: '1px 8px',
                    justifyContent: 'center',
                    color: '#FFF',
                    gap: '10px',
                    boxShadow: ' 0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                    bgcolor:
                      row.status === 'ABERTO'
                        ? '#2BA8EF'
                        : row.status === 'FECHADO'
                        ? '#10A957'
                        : row.status === 'EM ANÁLISE'
                        ? '#F9801C'
                        : row.status === 'EM COTAÇÃO'
                        ? '#9747FF'
                        : row.status === 'AGUARDANDO APROVAÇÃO'
                        ? '#225BED'
                        : row.status === 'PAUSADO'
                        ? '#A1A1A1'
                        : '#fff',
                  }}
                >
                  {row.status}
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 'none',
                  color:
                    (row.categoria === 'APOIO AO USUARIO' && row.dias > 2) ||
                    (row.categoria === 'MANUTENÇÃO' && row.dias > 2) ||
                    (row.categoria === 'INFRAESTRUTURA' && row.dias > 2) ||
                    (row.categoria === 'COMPRAS' && row.dias > 20) ||
                    (row.categoria === 'SISTEMAS' && row.dias > 5) ||
                    (row.categoria === 'DESENVOLVIMENTO' && row.dias > 20)
                      ? 'red'
                      : 'black',
                }}
              >
                {row.dias}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 'none',
                  color:
                    row.dias >
                    ({
                      'APOIO AO USUARIO': 2,
                      MANUTENÇÃO: 2,
                      INFRAESTRUTURA: 2,
                      COMPRAS: 20,
                      SISTEMAS: 5,
                      DESENVOLVIMENTO: 20,
                    }[row.categoria] ?? Infinity)
                      ? 'red'
                      : 'black',
                }}
              >
                {row.atendimento}
              </TableCell>

              <TableCell sx={{ borderBottom: 'none' }}>
                {new Date(row.dataAtualizacao).toLocaleDateString()}
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                {new Date(row.dataAbertura).toLocaleDateString()}
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                <Box
                  sx={{
                    display: 'flex',
                    borderRadius: '32px',
                    padding: '1px 8px',
                    justifyContent: 'center',
                    color: '#FFF',
                    gap: '10px',
                    boxShadow: ' 0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                    bgcolor:
                      row.urgencia === 'ALTA'
                        ? '#FF5E5E'
                        : row.urgencia === 'BAIXA'
                        ? '#A1A1A1'
                        : row.urgencia === 'MÉDIA'
                        ? '#F9801C'
                        : '#fff',
                  }}
                >
                  {row.urgencia}
                </Box>
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                {row.situacao}
              </TableCell>

              <TableCell sx={{ borderBottom: 'none' }}>
                {row.responsavelDemandante}
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                {row.setorDemandante}
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }}>
                {row.responsavelDemandado}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2,
        }}
      >
        <TablePagination
          sx={{ borderBottom: 'none' }}
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          count={dadosOrdenados.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Box>
    </TableContainer>
  );
}
