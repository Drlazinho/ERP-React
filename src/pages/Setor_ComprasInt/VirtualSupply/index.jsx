import React, { useState, useEffect, useCallback } from 'react';
import { apiFabrica, apiFabrica_operacao } from '../../../services/apis';
import debounce from '../../../utils/debounce';
import {
  IconButton,
  Box,
  MenuItem,
  TextField,
  Button,
  Select,
  Modal as MuiModal,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FormLabel from '@mui/material/FormLabel';
import LoadingButton from '@mui/lab/LoadingButton';

import {
  cadastrarValorDesconsideradoFunc,
  graficoHistorico,
} from './virtualSupply.service';
import SidebarNovo from '../../../components/LayoutNovo/SidebarNovo';
import ExcelVirtualSupplyButton from './components/ExcelVirtualSupllyButton';
import SaveIcon from '@mui/icons-material/Save';
import TabelaVirtualSupply from './components/tabelavirtualsuply';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import './styles.css';
import { useNavigate } from 'react-router';
import CardStatus from './components/CardStatus';
import GraficoDispVend from './components/GraficoDisponivelVendido';
import xVermelho from '../../../assets/xVermelho.png';

import { useToast } from '../../../hooks/toast.hook';
import { useDebounce } from '@/hooks/debounce.hook';
import HeaderAmvox from '@/components/HeaderAmvox';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};

const ListaDeLocais = [
  { label: '30, 33 e 40', value: '303340' },
  { label: '30 e 33', value: '3033' },
  { label: '30 e 40', value: '3040' },
  { label: '30', value: '30' },
  { label: '33', value: '33' },
  { label: '40', value: '40' },
];

const meses = [
  { label: 'Janeiro', value: 1 },
  { label: 'Fevereiro', value: 2 },
  { label: 'Março', value: 3 },
  { label: 'Abril', value: 4 },
  { label: 'Maio', value: 5 },
  { label: 'Junho', value: 6 },
  { label: 'Julho', value: 7 },
  { label: 'Agosto', value: 8 },
  { label: 'Setembro', value: 9 },
  { label: 'Outubro', value: 10 },
  { label: 'Novembro', value: 11 },
  { label: 'Dezembro', value: 12 },
];

const interfaceCadastroValorDesconsiderado = {
  id: 0,
  invoiceValorDesconsiderado: 0,
};

const anoAtual = new Date().getFullYear();
const anos = [
  { value: anoAtual - 1, label: anoAtual - 1 },
  { value: anoAtual, label: anoAtual },
];

const dataFiltro = {
  AnoInicial: anoAtual,
  AnoFinal: anoAtual,
  anoFinal: null,
  mesInicial: 0,
  mesFinal: null,
  codigoProduto: null,
};

export default function VirtualSupply() {
  const [virtalSupplyLista, setVirtualSupplyLista] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cadastroValorDesconsiderado, setCadastroValorDesconsiderado] =
    useState(interfaceCadastroValorDesconsiderado);
  const [isLoading, setIsLoading] = useState(false);
  const [filtro, setFiltro] = useState({
    descricao: '',
    codigo: '',
    local: '303340',
    nomeProduto: '',
    pageNumber: 1,
    pageSize: 3000,
  });

  const [filtroGrafico, setFiltroGrafico] = useState(dataFiltro);

  const [listaHistorico, setListaHistorico] = useState({});
  const debouncedFiltro = useDebounce(filtro, 1700);
  const debouncedFiltroGrafico = useDebounce(filtroGrafico, 1700);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleChange = (e) => {
    const value = e.target.value;
    debounce(() => {
      setFiltro((prevFiltro) => ({ ...prevFiltro, local: value }));
      setFiltro((prevFiltro) => ({ ...prevFiltro, codigo: value }));
    });
  };

  const handleChangeMes = (e) => {
    const value = e.target.value;
    debounce(() => {
      setFiltroGrafico((prevFiltro) => ({ ...prevFiltro, mesInicial: value }));
    });
  };

  const handleChangeAno = (e) => {
    const value = e.target.value;
    debounce(() => {
      setFiltroGrafico((prevFiltro) => ({
        ...prevFiltro,
        AnoInicial: value,
        AnoFinal: value,
      }));
    });
  };

  const handleFetch = async () => {
    try {
      const response = await apiFabrica_operacao.get('/Estoque/3040', {
        params: filtro,
      });
      setVirtualSupplyLista(response.data);
    } catch (err) {
      addToast({
        type: 'danger',
        title: 'Erro ao listar estoque!',
        description:
          'Erro ao listar Estoque, por favor tente novamente dentre de instantes!',
      });
    } finally {
      setRemoveLoading(true);
    }
  };

  const handleFetchGrafico = () => {
    graficoHistorico(filtroGrafico).then((res) => {
      setListaHistorico(res.value);
    });
  };

  useEffect(() => {
    handleFetch();
  }, [debouncedFiltro]);

  useEffect(() => {
    handleFetch();
    handleFetchGrafico();
  }, []);

  useEffect(() => {
    handleFetchGrafico();
  }, [debouncedFiltroGrafico]);

  const cadastrarValor = useCallback(() => {
    setIsLoading(true);
    cadastrarValorDesconsideradoFunc(cadastroValorDesconsiderado)
      .then((res) => {
        if (res) {
          setTimeout(handleFetch, 1500);
          setIsLoading(false);
          handleClose();
          addToast({ type: 'success', title: 'Sucesso ao cadastrar valor!' });
        }
      })
      .catch((_err) => {
        setIsLoading(false);
        addToast({ type: 'warning', title: 'Erro ao cadastrar valor!' });
      });
  }, [cadastroValorDesconsiderado, addToast]);

  const handleClear = () => {
    setFiltro({
      descricao: '',
      codigo: '',
      local: '303340',
      pageNumber: 1,
      nomeProduto: '',
      pageSize: 3000,
    });
    setFiltroGrafico({
      codigo: '',
      AnoInicial: anoAtual,
      anoFinal: null,
      mesInicial: 0,
      mesFinal: null,
      codigoProduto: null,
      nomeProduto: null,
    });
  };

  const handleClose = () => {
    setShowModal(!showModal);
    setCadastroValorDesconsiderado(interfaceCadastroValorDesconsiderado);
  };

  const setDadosFromTable = (item) => {
    setCadastroValorDesconsiderado({
      id: item.id,
      invoiceValorDesconsiderado: item.invoiceValorDesconsiderado,
    });
  };

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setCadastroValorDesconsiderado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <MuiModal open={showModal} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Cadastro de Valor
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              gap: '15px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <FormLabel style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Valor Desconsiderado
              </FormLabel>
              <TextField
                type="number"
                id="invoiceValorDesconsiderado"
                name="invoiceValorDesconsiderado"
                value={cadastroValorDesconsiderado.invoiceValorDesconsiderado}
                onChange={inputTextHandler}
              />
            </div>
          </Box>
          <div style={{ margin: 'auto', textAlign: 'center' }}>
            <LoadingButton
              loading={isLoading}
              style={{
                backgroundColor: 'green',
                color: 'white',
                width: '200px',
                marginTop: '20px',
                marginBottom: '20px',
              }}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={cadastrarValor}
            >
              <span>Cadastrar</span>
            </LoadingButton>
          </div>
        </Box>
      </MuiModal>

      <Box>
        <Box
          position={'relative'}
          sx={{ backgroundColor: '#f3f4f6', padding: '50px' }}
          gap={2}
        >
          <Box
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              display: 'flex',
              gap: '20px',
              '@media (max-width: 670px)': {
                flexDirection: 'column',
                alignItems: 'flex-start',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 2,
              }}
            >
              <HeaderAmvox title="Virtual Supply" onBack={() => navigate(-1)} />
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: '24px',
              bgcolor: '#FFF',
              padding: '16px 24px',
              borderRadius: '16px',
              boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
              mb: '24px',
              [theme.breakpoints.down(1600)]: {
                flexWrap: 'wrap',
              },
            })}
          >
            <Box
              sx={{
                width: '100%',
              }}
            >
              <FormLabel
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  fontWeight: '300',
                  lineHeight: 'normal',
                  fontStyle: 'normal',
                  color: '#333',
                }}
              >
                Descrição
              </FormLabel>
              <TextField
                sx={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  '& .MuiInputBase-root': {
                    height: '40px',
                    borderRadius: '8px',
                    '&:focus-within': {
                      border: '1px solid lightgray',
                    },
                  },
                }}
                inputProps={{ style: { height: '40px' } }}
                value={filtro.descricao}
                placeholder="Descrição"
                onChange={(e) => {
                  setFiltro({ ...filtro, descricao: e.target.value });
                  setFiltroGrafico({
                    ...filtroGrafico,
                    nomeProduto: e.target.value,
                  });
                }}
              />
            </Box>
            <Box>
              <FormLabel
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  fontWeight: '300',
                  lineHeight: 'normal',
                  fontStyle: 'normal',
                  color: '#333',
                }}
              >
                Código
              </FormLabel>
              <TextField
                sx={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  width: '220px',
                  '& .MuiInputBase-root': {
                    height: '40px',
                    borderRadius: '8px',
                    '&:focus-within': {
                      border: '1px solid lightgray',
                    },
                  },
                }}
                inputProps={{ style: { height: '40px' } }}
                value={filtroGrafico.codigo}
                placeholder="Código"
                onChange={(e) => {
                  setFiltro({ ...filtro, codigo: e.target.value });
                  setFiltroGrafico({
                    ...filtroGrafico,
                    codigoProduto: e.target.value,
                  });
                }}
              />
            </Box>
            <Box>
              <FormLabel
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  fontWeight: '300',
                  lineHeight: 'normal',
                  fontStyle: 'normal',
                  color: '#333',
                }}
              >
                Armazém
              </FormLabel>
              <TextField
                select
                sx={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  width: '200px',
                  '& .MuiInputBase-root': {
                    height: '40px',
                    borderRadius: '8px',
                    '&:focus-within': {
                      border: '1px solid lightgray',
                    },
                  },
                }}
                inputProps={{ style: { height: '40px' } }}
                name="local"
                value={filtro.local}
                onChange={handleChange}
              >
                {ListaDeLocais.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box>
              <FormLabel
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  fontWeight: '300',
                  lineHeight: 'normal',
                  fontStyle: 'normal',
                  color: '#333',
                }}
              >
                Mês
              </FormLabel>
              <TextField
                select
                sx={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  width: '150px',
                  '& .MuiInputBase-root': {
                    height: '40px',
                    borderRadius: '8px',
                    '&:focus-within': {
                      border: '1px solid lightgray',
                    },
                  },
                }}
                inputProps={{ style: { height: '40px' } }}
                value={filtroGrafico.mesInicial}
                onChange={handleChangeMes}
              >
                {meses.map((data, index) => (
                  <MenuItem key={index} value={data.value}>
                    {data.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box>
              <FormLabel
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '16px',
                  fontWeight: '300',
                  lineHeight: 'normal',
                  fontStyle: 'normal',
                  color: '#333',
                }}
              >
                Ano
              </FormLabel>
              <Select
                sx={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  width: '100px',
                  height: '40px',
                  borderRadius: '8px',
                  border: '1px solid lightgray',
                }}
                inputProps={{ style: { height: '40px' } }}
                value={filtroGrafico.AnoInicial}
                onChange={handleChangeAno}
              >
                {anos.map((data, index) => (
                  <MenuItem key={index} value={data.value}>
                    {data.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'end' }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleClear}
                startIcon={
                  <HighlightOffOutlinedIcon
                    sx={{
                      width: '24px',
                      height: '24px',
                      color: '#777777',
                    }}
                  />
                }
                sx={{
                  display: 'flex',
                  width: '160px',
                  height: '40px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '8px',
                  border: '1px solid #D6D6D6',
                  boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
                  '&:hover': {
                    backgroundColor: 'lightgray',
                    border: 'lightgray',
                  },
                }}
              >
                <Box sx={{ color: '#333' }}>Limpar Filtro</Box>
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'end',
                width: '100%',
              }}
            >
              <Box sx={{ width: '100%' }}>
                <ExcelVirtualSupplyButton
                  dadosApi={virtalSupplyLista.resposta}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              display: 'flex',
              gap: '24px',
              mb: '24px',
              [theme.breakpoints.down(1490)]: {
                flexWrap: 'wrap-reverse',
              },
            })}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                maxWidth: '1200px',
                height: '312px',
                padding: '16px',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '8px',
                bgcolor: '#fff',
                borderRadius: '16px',
                boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                <Box>Disponível/Vendido</Box>
                <Box sx={{ flexDirection: 'row', display: 'flex', gap: '8px' }}>
                  <Box sx={{ display: 'flex', gap: '4px' }}>
                    <Box>
                      {/* <img src={IconeVerde} /> */}{' '}
                      <Brightness1Icon sx={{ color: '#6FD195' }} />
                    </Box>
                    <Box>Disponível</Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: '4px' }}>
                    <Box>
                      {/* <img src={IconeRoxo} /> */}{' '}
                      <Brightness1Icon sx={{ color: '#7086FD' }} />
                    </Box>
                    <Box>Vendido</Box>
                  </Box>
                </Box>
              </Box>
              <GraficoDispVend data={listaHistorico} />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: '24px',
                '@media (max-width: 300px)': {
                  display: 'flex',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px',
                  '@media (max-width: 800px)': {
                    gap: '12px',
                  },
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <CardStatus
                    titulo={'Total em Real Custo Inventario'}
                    simbolo={''}
                    quantidade={virtalSupplyLista.totalReal}
                  />
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <CardStatus
                    titulo={'Total Produtos'}
                    simbolo={'QTD '}
                    quantidade={formatNumber(virtalSupplyLista.totalProdutos)}
                  />
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <CardStatus
                    titulo={'Total Produtos Disponíveis'}
                    simbolo={'QTD '}
                    quantidade={formatNumber(
                      virtalSupplyLista.totalProdutosDisponiveis
                    )}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: '24px',
                  '@media (max-width: 800px)': {
                    gap: '12px',
                  },
                }}
              >
                <Box sx={{ display: 'flex' }}>
                  <CardStatus
                    titulo={'Total em Dolar Custo Inventario'}
                    simbolo={'U'}
                    quantidade={virtalSupplyLista.totalDolar}
                  />
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <CardStatus
                    titulo={'Total de Invoices'}
                    simbolo={'QTD '}
                    quantidade={formatNumber(
                      virtalSupplyLista.totalProdutosPedidos
                    )}
                  />
                </Box>
                <Box sx={{ display: 'flex' }}>
                  <CardStatus
                    titulo={'Total Produtos Reservas'}
                    simbolo={'QTD '}
                    quantidade={formatNumber(
                      virtalSupplyLista.totalProdutosReservados
                    )}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              bgcolor: '#F3F3F3',
            }}
          >
            <Box sx={{ width: '100%', bgcolor: 'transparent' }}>
              <TabelaVirtualSupply
                data={virtalSupplyLista.resposta}
                loading={!removeLoading}
                setShowModal={setShowModal}
                setDadosFromTable={setDadosFromTable}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
