import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircularProgress from '@mui/material/CircularProgress';
import TablePagination from '@mui/material/TablePagination';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { ModalEditar } from '../ModalEditar';
import ModalEditarParcela from '../ModalEditarParcela';

const columns = [
  { label: 'Contrato Ativo', key: 'contratosAtivos' },
  { label: 'Data da Contratação', key: 'dtContratada' },
  { label: 'Taxa Nominal', key: 'txCaptacao' },
  { label: 'Modelo de Captação', key: 'modelCaptacao' },
  { label: 'Valor do empréstimo', key: 'vlrContratado' },
  { label: 'Saldo a Pagar', key: 'saldo_A_Pagar' },
  { label: 'Saldo Devedor', key: 'saldo_Devedor' },
  { label: 'Garantia', key: 'porcentGarantia' },
  { label: 'Total de Juros', key: 'total' },
  { label: 'Última Parcelas', key: 'dtUltimaParcela' },
  { label: 'Quantidade Total de Parcelas', key: 'qtdTotalParcelas' },
  { label: 'Período de carência', key: 'periodoCarreira' },
  { label: 'Tipo de Amortização', key: 'carenciaEmMeses' },
];

const columnsParcelas = [
  { label: 'Mês/Ano', key: 'mesAno' },
  { label: 'Vencimento', key: 'dtVencimento' },
  { label: 'Data Pagamento', key: 'dataPagamentoEfetuado' },
  { label: 'N° Parcela', key: 'nmrParcela' },
  { label: 'DI', key: 'dias' },
  { label: 'Parcela', key: 'vlrParcela' },
  { label: 'Amortização', key: 'vlrAmortizacao' },
  { label: 'Juros', key: 'vlrJuros' },
  { label: 'Saldo a Pagar', key: 'vlrSaldoApagar' },
  { label: 'Saldo Devedor', key: 'vlrSaldoDevedor' },
  { label: 'Garantia', key: 'vlrGarantia' },
  { label: 'Valor Pago', key: 'pgtoEfetuado' },
  { label: 'Status', key: 'status' },
];

function Row({ row, showModalEditarEmprestimo, handleGetEmprestimos }) {
  const [open, setOpen] = useState(false);
  const [loadingParcelas, setLoadingParcelas] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpenParcelas, setModalOpenParcelas] = useState(false);
  const [dataEdicao, setDataEdicao] = useState(null);
  const [parcelas, setParcelas] = useState(null);

  const handleOpenModal = (rowData) => {
    setDataEdicao(rowData);
    setModalOpen(true);
  };

  const handleOpenModalParcelas = (rowData) => {
    setDataEdicao(rowData);
    setModalOpenParcelas(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDataEdicao(null);
  };

  const handleCloseModalParcelas = () => {
    setModalOpenParcelas(false);
    setDataEdicao(null);
  };

  const formatCurrencyBRLnocifr = (current) => {
    if (current === undefined || current === null || isNaN(current)) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(current);
  };

  const formatarData = (data) => {
    const partesData = data.split('T')[0].split('-');
    return `${partesData[2]}/${partesData[1]}/${partesData[0]}`;
  };
  useEffect(() => {
    const sortedParcelas = [...row.detalhes].sort(
      (a, b) => a.nmrParcela - b.nmrParcela
    );
    setParcelas(sortedParcelas);
  }, [row.detalhes]);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            size="small"
            onClick={() => {
              setOpen(!open);
              if (!open && parcelas) {
                setLoadingParcelas(true);

                setTimeout(() => {
                  setLoadingParcelas(false);
                }, 2000);
              }
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.contratosAtivos}</TableCell>
        <TableCell>{formatarData(row.dtContratada)}</TableCell>
        <TableCell>{`${row.txCaptacao}%`}</TableCell>
        <TableCell align="left">{row.modelCaptacao}</TableCell>
        <TableCell align="left">
          {formatCurrencyBRLnocifr(row.vlrContratado)}
        </TableCell>
        <TableCell align="left">
          {formatCurrencyBRLnocifr(row.saldo_A_Pagar)}
        </TableCell>
        <TableCell align="left">
          {formatCurrencyBRLnocifr(row.saldo_Devedor)}
        </TableCell>
        <TableCell align="left">{`${row.porcentGarantia}%`}</TableCell>
        <TableCell align="left">{formatCurrencyBRLnocifr(row.total)}</TableCell>
        <TableCell align="left">{formatarData(row.dtUltimaParcela)}</TableCell>
        <TableCell align="center">{row.qtdTotalParcelas}</TableCell>
        <TableCell align="center">
          {row.periodoCarencia || (
            <span
              style={{
                color: '#8A8A8A',
                fontWeight: 'bold',
                fontSize: '0.875rem',
              }}
            >
              Sem período de carência
            </span>
          )}
        </TableCell>
        <TableCell align="left">{row.carenciaEmMeses}</TableCell>
        <TableCell align="left">
          <IconButton size="small">
            <ModeEditIcon onClick={() => handleOpenModal(row)} />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ padding: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#ededed' }}>
                    {columnsParcelas.map((column) => (
                      <TableCell
                        key={column.key}
                        align={column.align}
                        style={{
                          fontWeight: 'bold',
                          position: 'sticky',
                          top: 0,
                          zIndex: 2,
                          backgroundColor: '#ededed',
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                    <TableCell
                      align="left"
                      style={{
                        fontWeight: 'bold',
                        position: 'sticky',
                        top: 0,
                        zIndex: 2,
                        backgroundColor: '#ededed',
                      }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loadingParcelas ? (
                    <TableRow>
                      <TableCell
                        colSpan={columnsParcelas.length}
                        align="center"
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <CircularProgress size={24} />
                          <Typography variant="body1" sx={{ marginLeft: 2 }}>
                            Carregando parcelas...
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : parcelas && parcelas.length > 0 ? (
                    parcelas.map((historyRow) => (
                      <TableRow key={historyRow.id}>
                        <TableCell component="th" scope="row">
                          {historyRow.mesAno}
                        </TableCell>

                        <TableCell>
                          {formatarData(historyRow.dtVencimento)}
                        </TableCell>
                        <TableCell align="center">
                          {historyRow.dataPagamentoEfetuado ===
                          '0001-01-01T00:00:00'
                            ? '-'
                            : formatarData(
                                historyRow.dataPagamentoEfetuado || '_'
                              )}
                        </TableCell>

                        <TableCell align="center">
                          {`${historyRow.nmrParcela} / ${row.qtdTotalParcelas}`}
                        </TableCell>
                        <TableCell>{historyRow.dias}</TableCell>
                        <TableCell>
                          {formatCurrencyBRLnocifr(historyRow.vlrParcela)}
                        </TableCell>
                        <TableCell>
                          {formatCurrencyBRLnocifr(historyRow.vlrAmortizacao)}
                        </TableCell>
                        <TableCell>
                          {formatCurrencyBRLnocifr(historyRow.vlrJuros)}
                        </TableCell>
                        <TableCell>
                          {formatCurrencyBRLnocifr(historyRow.vlrSaldoApagar)}
                        </TableCell>
                        <TableCell>
                          {formatCurrencyBRLnocifr(historyRow.vlrSaldoDevedor)}
                        </TableCell>
                        <TableCell>
                          {formatCurrencyBRLnocifr(historyRow.vlrGarantia)}
                        </TableCell>
                        <TableCell align="center">
                          {formatCurrencyBRLnocifr(
                            historyRow.valorPagamentoEfetuado
                          )}
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Chip
                              label={
                                historyRow.pgtoEfetuado === 0
                                  ? 'A Vencer'
                                  : historyRow.pgtoEfetuado === 1
                                  ? 'Liquidada'
                                  : historyRow.pgtoEfetuado === 2
                                  ? 'Vencido'
                                  : 'Desconhecida'
                              }
                              variant="outlined"
                              sx={{
                                fontWeight: '700',
                                color:
                                  historyRow.pgtoEfetuado === 0
                                    ? '#FA7800'
                                    : historyRow.pgtoEfetuado === 1
                                    ? 'green'
                                    : historyRow.pgtoEfetuado === 2
                                    ? 'red'
                                    : 'inherit',
                                border: `2px solid ${
                                  historyRow.pgtoEfetuado === 0
                                    ? '#FA7800'
                                    : historyRow.pgtoEfetuado === 1
                                    ? 'green'
                                    : historyRow.pgtoEfetuado === 2
                                    ? 'red'
                                    : 'transparent'
                                }`,
                              }}
                            />
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          <IconButton size="small">
                            <ModeEditIcon
                              onClick={() =>
                                handleOpenModalParcelas(historyRow)
                              }
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        Nenhuma parcela disponível.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>

        {isModalOpen && dataEdicao && (
          <ModalEditar
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            rowData={dataEdicao}
            handleGetEmprestimos={handleGetEmprestimos}
            showModalEditarEmprestimo={showModalEditarEmprestimo}
          />
        )}

        {isModalOpenParcelas && dataEdicao && (
          <ModalEditarParcela
            isOpen={isModalOpenParcelas}
            onClose={handleCloseModalParcelas}
            rowData={dataEdicao}
            handleGetEmprestimos={handleGetEmprestimos}
            showModalEditarEmprestimo={showModalEditarEmprestimo}
          />
        )}
      </TableRow>
    </>
  );
}

const TableControleEmprestimo = ({
  data,
  handleGetEmprestimos,
  showModalEditarEmprestimo,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 538,
          overflowY: 'auto',
          borderRadius: '1rem',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
      >
        <Table aria-label="collapsible table" sx={{ bgcolor: '#F4F4F4' }}>
          <TableHead sx={{ bgcolor: '#F4F4F4' }}>
            <TableRow
              sx={{ bgcolor: '#F4F4F4', borderBottom: '0.125rem solid #000' }}
            >
              <TableCell />
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) &&
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <Row
                    key={row.id}
                    row={row}
                    showModalEditarEmprestimo={showModalEditarEmprestimo}
                    handleGetEmprestimos={handleGetEmprestimos}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default TableControleEmprestimo;
