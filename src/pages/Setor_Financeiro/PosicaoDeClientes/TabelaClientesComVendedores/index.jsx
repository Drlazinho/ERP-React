import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import './styles.css';
import {
  buscarContato,
  buscarFaturamentosEmAberto,
  buscarInformacoesGerais,
  buscarTitulosEmAberto,
} from '../PosicaoDeClientes.service';
import ModalVisualizacao from '../ModalVisualizacao';
import { TextField } from '@mui/material';
import { a } from 'react-spring';
import { useDebounce } from '@/hooks/debounce.hook';

export default function TabelaClientesComVendedores({ data }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [openModal, setOpenModal] = React.useState(false);
  const [dadosVisualizacao, setDadosVisualizacao] = React.useState();
  const [dataFaturamento, setDataFaturamento] = React.useState();
  const [dataTitulosEmAberto, setDataTitulosEmAberto] = React.useState();
  const [dataContato, setDataContato] = React.useState();
  const [dataGeral, setDataGeral] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

  const [filtroFaturamento, setFiltroFaturamento] = React.useState({
    pagina: 1,
    codigoCliente: null,
    numeroTitulo: null,
    dataEmissao: null,
  });

  const debounceFiltroFaturamento = useDebounce(filtroFaturamento, 1000);

  const [filtroTitulosEmAberto, setFiltroTitulosEmAberto] = React.useState({
    codigoCliente: null,
    numeroNF: null,
    dataEmissao: null,
    dataVencimento: null,
  });

  const debounceFiltroTitulosEmAberto = useDebounce(
    filtroTitulosEmAberto,
    1000
  );

  const handleClear = () => {
    setFiltroTitulosEmAberto({
      codigoCliente: dadosVisualizacao?.codigo,
      numeroNF: '',
      dataEmissao: null,
      dataVencimento: null,
    });
  };

  const formatCurrencyBRL = (value) => {
    if (!value) return 'R$ 0,00';

    const numericValue =
      typeof value === 'string'
        ? Number(value.replace(/\./g, '').replace(',', '.'))
        : Number(value);

    if (isNaN(numericValue)) return 'R$ 0,00';

    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericValue);

    if (formattedValue.includes('-')) {
      return formattedValue.replace('-', '').replace('R$', 'R$ -');
    }

    return formattedValue;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const handleChargeData = async (contato) => {
    setLoading(true);

    try {
      await buscarTitulosEmAberto({ CodigoCliente: contato }).then(
        (retorno) => {
          setDataTitulosEmAberto(retorno);
        }
      );
    } catch (error) {
      console.error('Erro ao buscar titulos em aberto:', error.response.data);
    }

    setLoading(false);

    try {
      await buscarContato({ CodigoCliente: contato }).then((retorno) => {
        setDataContato(retorno);
      });
    } catch (error) {
      console.error('Erro ao buscar contato:', error.response.data);
    }

    try {
      await buscarInformacoesGerais({ CodigoCliente: contato }).then(
        (retorno) => {
          setDataGeral(retorno);
        }
      );
    } catch (error) {
      console.error('Erro ao buscar informacoes gerais:', error.response.data);
    }

    setLoading2(true);
    try {
      await buscarFaturamentosEmAberto({
        Pagina: 1,
        CodigoCliente: contato,
      }).then((retorno) => {
        setDataFaturamento(retorno);
      });
    } catch (error) {
      console.error('Erro ao buscar faturamentos:', error.response.data);
    }

    setLoading2(false);
  };

  React.useEffect(() => {
    buscarTitulosEmAberto(debounceFiltroTitulosEmAberto).then((retorno) => {
      setDataTitulosEmAberto(retorno);
    });
  }, [debounceFiltroTitulosEmAberto]);

  React.useEffect(() => {
    buscarFaturamentosEmAberto(debounceFiltroFaturamento).then((retorno) => {
      setDataFaturamento(retorno);
    });
  }, [debounceFiltroFaturamento]);

  const closeModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <ModalVisualizacao
        open={openModal}
        onClose={closeModal}
        dataVisualizacao={dadosVisualizacao}
        dataFaturamento={dataFaturamento}
        dataTitulosEmAberto={dataTitulosEmAberto}
        dataContato={dataContato}
        dataGeral={dataGeral}
        setFiltroTitulosEmAberto={setFiltroTitulosEmAberto}
        setFiltroFaturamento={setFiltroFaturamento}
        filtroTitulosEmAberto={filtroTitulosEmAberto}
        filtroFaturamento={filtroFaturamento}
        handleClear={handleClear}
        loading={loading}
        loading2={loading2}
        formatCurrencyBRL={formatCurrencyBRL}
      />
      <Paper sx={{ mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 500 }}>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Código
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Cliente
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Loja
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Nome Reduzido
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  CNPJ/CPF
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Situação
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Títulos em aberto
                </TableCell>
                <TableCell
                  align="center"
                  style={{ fontWeight: 'bold' }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  return (
                    <TableRow hover key={item.id}>
                      <TableCell align="center">{item.codigo}</TableCell>
                      <TableCell align="center">{item.nome}</TableCell>
                      <TableCell align="center">{item.loja}</TableCell>
                      <TableCell align="center">{item.nomeReduzido}</TableCell>
                      <TableCell align="center">{item.cnpj}</TableCell>
                      <TableCell align="center">
                        <TextField
                          variant="outlined"
                          margin="normal"
                          size="small"
                          inputProps={{
                            style: {
                              fontSize: 16,
                              padding: 0,
                              justifyContent: 'center',
                              justifySelf: 'center',
                              textAlign: 'center',
                              color:
                                item.situacao == 'Adimplente'
                                  ? '#2BA8EF'
                                  : '#FF5E5E',
                            },
                          }}
                          InputLabelProps={{ style: { fontSize: 12 } }}
                          sx={{
                            border:
                              item.situacao == 'Adimplente'
                                ? '2px solid #2BA8EF'
                                : '2px solid #FF5E5E',
                            '& fieldset': { border: 'none' },
                            '& .MuiInputBase-input.Mui-disabled': {
                              WebkitTextFillColor:
                                item.situacao == 'Adimplente'
                                  ? '#2BA8EF'
                                  : '#FF5E5E',
                            },
                            justifyContent: 'center',
                            backgroundColor:
                              item.situacao == 'Adimplente'
                                ? '#F2FAFF'
                                : '#FFF0F0',
                            borderRadius: '10px',
                            fontWeight: 'bold',
                          }}
                          disabled
                          value={item.situacao}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {formatCurrencyBRL(item.valorTitulosAbertos)}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="delete"
                          size="large"
                          onClick={() => {
                            setDadosVisualizacao(item);
                            handleChargeData(item.codigo);
                            setOpenModal(!openModal);
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        Visualizar
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[15]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
