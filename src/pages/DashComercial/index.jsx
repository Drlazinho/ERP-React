import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './styles.css';
import {
  Box,
  Button,
  Skeleton,
  Typography,
  TextField,
  IconButton,
  FormLabel,
  useTheme,
  useMediaQuery,
  MenuItem,
  Select,
  Grid2,
  CircularProgress,
} from '@mui/material';
import GraficoBarTopUsers from './components/Charts/graficoBarTopUsers';
import GraficoRoundedReceitaGrupoProdutos from './components/Charts/graficoRoundedReceitaGrupoProdutos';
import {
  buscarRelatFaturamentoDash,
  buscarFaturamentoUltimos3Anos,
} from '../Setor_Fiscal/Faturamento/faturamento.service';
import { useToast } from '../../hooks/toast.hook';
import TabelaDashComercial from './components/Tabela';
import GraficoBarTopUsersPorcentagem from './components/Charts/graficoBarTopUsersPorcentagem';
import ExcelDashboardComercialButton from './components/ExcelDashboardComercialButton';
import SidebarNovo from '../../components/LayoutNovo/SidebarNovo';
import { useNavigate } from 'react-router';
import { TickerTape } from 'react-ts-tradingview-widgets';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HeaderAmvox from '@/components/HeaderAmvox';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import GraficoReceitaAnual from './components/Charts/graficoReceitaAnual';
import InfoCardAmvox from './components/InfoCardAmvox';

const tipoProdutos = [
  { id: null, nome: 'TODOS' },
  { id: 'AUDIO', nome: 'AUDIO' },
  { id: 'AUTOMOTIVA', nome: 'AUTOMOTIVA' },
  { id: 'BELEZA', nome: 'BELEZA' },
  { id: 'CLIMA', nome: 'CLIMA' },
  { id: 'DIGITAL', nome: 'DIGITAL' },
  { id: 'INFORMATICA', nome: 'INFORMÁTICA' },
  { id: 'JARDINAGEM', nome: 'JARDINAGEM' },
  { id: 'LAR', nome: 'LAR' },
  { id: 'VIDEO', nome: 'VÍDEO' },
];

const filiais = [
  { id: '010102', nome: '010102' },
  { id: '010103', nome: '010103' },
];

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

export default function DashComercial() {
  const [graficoFatDash, setGraficoFatDash] = useState([]);
  const [tabelaComercial, setTabelaComercial] = useState([]);
  const [removeLoader, setRemoveLoader] = useState(false);
  const [produtosInformacao, setProdutosInformacao] = useState({
    totalQuantidade: 0,
    totalReceitaLiquida: 0,
    totalReceitaBruta: 0,
    totalDevolucoes: 0,
    totalMediaSemIpi: 0,
    totalMediaComIpi: 0,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [faturamentoUltimos3Anos, setFaturamentoUltimos3Anos] = useState([]);

  const cancelSourceRef = useRef(null);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();

  const anoVigente = new Date().getFullYear();
  const mesAtual = new Date().getMonth() + 1;
  const diaAtual = new Date().getDate();

  const formatarNumero = (num) => String(num).padStart(2, '0');

  const dataAtual = parseInt(
    `${anoVigente}${formatarNumero(mesAtual)}${formatarNumero(diaAtual)}`,
    10
  );

  const dataPrimeiroDiaMes = parseInt(
    `${anoVigente}${formatarNumero(mesAtual)}01`,
    10
  );

  const [filtro, setFiltro] = useState({
    ano: anoVigente,
    mes: mesAtual ? [mesAtual] : [],
    dataInicial: null,
    dataFinal: null,
    codigoCliente: null,
    grupoProduto: null,
    filial: '010102',
  });
  const { addToast } = useToast();

  const handClientClick = (codigo) => {
    if (codigo) {
      setFiltro({ ...filtro, codigoCliente: codigo });
    }
  };

  useEffect(() => {
    if (
      Array.isArray(filtro.mes) &&
      filtro.mes.filter((mes) => mes).length > 0
    ) {
      setRemoveLoader(true);

      if (cancelSourceRef.current) {
        cancelSourceRef.current.cancel(
          'Nova requisição de faturamento iniciada.'
        );
      }

      cancelSourceRef.current = axios.CancelToken.source();

      const mesesValidos = filtro.mes.filter((mes) => mes);
      const filtroModificado = {
        ano: filtro.ano,
        mes: mesesValidos.join(','),
        dataInicial: filtro.dataInicial,
        dataFinal: filtro.dataFinal,
        codigoCliente: filtro.codigoCliente,
        grupoProduto: filtro.grupoProduto,
        filial: filtro.filial,
      };

      buscarRelatFaturamentoDash(filtroModificado, cancelSourceRef.current)
        .then((res) => {
          setGraficoFatDash(res);
          setTabelaComercial(res.produtosInformacao.produtos);
          setProdutosInformacao(res.produtosInformacao);
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            addToast({
              type: 'danger',
              title: 'Erro ao carregar os dados de faturamento',
            });
          }
        })
        .finally(() => {
          setRemoveLoader(false);
        });
    } else if (
      Array.isArray(filtro.mes) &&
      filtro.mes.filter((mes) => mes).length === 0
    ) {
      setGraficoFatDash([]);
      setTabelaComercial([]);
      setProdutosInformacao({
        totalQuantidade: 0,
        totalReceitaLiquida: 0,
        totalReceitaBruta: 0,
        totalDevolucoes: 0,
        totalMediaSemIpi: 0,
        totalMediaComIpi: 0,
      });
      setRemoveLoader(false);
    }

    return () => {
      if (cancelSourceRef.current) {
        cancelSourceRef.current.cancel('Componente DashComercial desmontado.');
      }
    };
  }, [filtro, addToast]);

  useEffect(() => {
    setRemoveLoader(true);
    buscarFaturamentoUltimos3Anos(filtro.ano)
      .then((res) => {
        setFaturamentoUltimos3Anos(res);
      })
      .catch(() =>
        addToast({
          type: 'danger',
          title: 'Erro ao carregar os dados',
        })
      )
      .finally(() => {
        setRemoveLoader(false);
      });
  }, [filtro.ano, addToast]);

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    const valorConvertido = value
      ? parseInt(value.replace(/-/g, ''), 10)
      : null;

    setFiltro((prevFiltro) => {
      const novoFiltro = { ...prevFiltro, [name]: valorConvertido };
      if (name === 'dataInicial' || name === 'dataFinal') {
        novoFiltro.mes = [];
      }
      return novoFiltro;
    });
  };
  const handleLimparFiltros = () => {
    const mesAtual = new Date().getMonth() + 1;

    setFiltro({
      ano: anoVigente,
      mes: [mesAtual],
      dataInicial: null,
      dataFinal: null,
      codigoCliente: null,
      grupoProduto: null,
      filial: '010102',
    });

    setGraficoFatDash([]);
    setTabelaComercial([]);
    setProdutosInformacao({
      totalQuantidade: 0,
      totalReceitaLiquida: 0,
      totalReceitaBruta: 0,
      totalDevolucoes: 0,
      totalMediaSemIpi: 0,
      totalMediaComIpi: 0,
    });

    setRemoveLoader(false);
  };

  const togglemesSelecionado = (mesId) => {
    if (Array.isArray(filtro.mes)) {
      setFiltro((prevFiltro) => {
        const { mes } = prevFiltro;
        const novoMes = mes.includes(mesId)
          ? mes.filter((m) => m !== mesId)
          : [...mes, mesId];
        return { ...prevFiltro, mes: novoMes };
      });
    }
  };

  const symbolsTrade = [
    {
      title: 'USD/BRL',
      proName: 'FX_IDC:USDBRL',
    },
    {
      title: 'EUR/BRL',
      proName: 'FX_IDC:EURBRL',
    },
    {
      title: 'BTC/BRL',
      proName: 'OKX:BTCBRL',
    },
    {
      title: 'CNY/BRL',
      proName: 'FX_IDC:CNYBRL',
    },
    {
      title: 'BTC/USD',
      proName: 'BITSTAMP:BTCUSD',
    },
  ];

  const digitarData = filtro.dataInicial || filtro.dataFinal;

  return (
    <>
      <Box className="principal">
        <Box position={'relative'}>
          <HeaderAmvox title="Dashboard Comercial" />

          {/* Filtros */}
          <Box
            sx={(theme) => ({
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              width: '100%',
              [theme.breakpoints.down(1740)]: {
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              },
            })}
          >
            <Box
              sx={{
                flex: '0 1 auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <FormLabel>Data Início</FormLabel>
              <TextField
                type="date"
                name="dataInicial"
                value={
                  filtro.dataInicial
                    ? `${String(filtro.dataInicial).slice(0, 4)}-${String(
                        filtro.dataInicial
                      ).slice(4, 6)}-${String(filtro.dataInicial).slice(6, 8)}`
                    : ''
                }
                onChange={handleDataChange}
                sx={{
                  backgroundColor: '#fff',
                  '& .MuiInputBase-root': {
                    height: '32px',
                    borderRadius: '4px',
                    '&:focus-within': {
                      border: '1px solid #CCC',
                    },
                  },
                }}
              />
            </Box>

            <Box
              sx={{
                flex: '0 1 auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <FormLabel>Data Final</FormLabel>
              <TextField
                type="date"
                name="dataFinal"
                value={
                  filtro.dataFinal
                    ? `${String(filtro.dataFinal).slice(0, 4)}-${String(
                        filtro.dataFinal
                      ).slice(4, 6)}-${String(filtro.dataFinal).slice(6, 8)}`
                    : ''
                }
                onChange={handleDataChange}
                sx={{
                  backgroundColor: '#fff',
                  '& .MuiInputBase-root': {
                    height: '32px',
                    borderRadius: '4px',
                    '&:focus-within': {
                      border: '1px solid #CCC',
                    },
                  },
                }}
              />
            </Box>

            {/* Box para o Ano */}
            <Box sx={{ display: 'flex', alignSelf: 'end', gap: '8px' }}>
              {isSmallScreen ? (
                <Select
                  value={filtro.ano}
                  onChange={(e) =>
                    setFiltro((prevFiltro) => ({
                      ...prevFiltro,
                      ano: e.target.value,
                    }))
                  }
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    borderRadius: '8px',
                    boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
                    backgroundColor: '#FFF',
                    height: '32px',
                    flexShrink: 0,
                  }}
                >
                  {[new Date().getFullYear() - 1, new Date().getFullYear()].map(
                    (ano) => (
                      <MenuItem key={ano} value={ano}>
                        {ano}
                      </MenuItem>
                    )
                  )}
                </Select>
              ) : (
                <>
                  <select
                    value={filtro.ano || ''}
                    onChange={(e) =>
                      setFiltro((prevFiltro) => ({
                        ...prevFiltro,
                        ano: Number(e.target.value),
                      }))
                    }
                    style={{
                      height: '32px',
                      fontFamily: 'Poppins, sans-serif',
                      borderRadius: '8px',
                      border: '1px solid rgba(0, 0, 0, 0.10)',
                      boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
                      padding: '0 8px',
                    }}
                  >
                    <option value="" disabled>
                      Selecione o ano
                    </option>
                    {Array.from({
                      length: new Date().getFullYear() - 2022 + 1,
                    })
                      .map((_, index) => new Date().getFullYear() - index)
                      .map((ano) => (
                        <option key={ano} value={ano}>
                          {ano}
                        </option>
                      ))}
                  </select>
                </>
              )}
            </Box>

            {/* Box para o Mês */}
            <Box sx={{ display: 'flex', alignSelf: 'end', gap: '4px' }}>
              {isSmallScreen ? (
                <Select
                  value={filtro.mes}
                  onChange={(e) =>
                    setFiltro((prevFiltro) => ({
                      ...prevFiltro,
                      mes: e.target.value,
                    }))
                  }
                  multiple
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    borderRadius: '8px',
                    boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
                    backgroundColor: '#FFF',
                    height: '32px',
                  }}
                >
                  {meses.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nome}
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <>
                  {meses.map((item) => (
                    <Button
                      key={item.id}
                      variant="contained"
                      onClick={() =>
                        !digitarData && togglemesSelecionado(item.id)
                      }
                      disabled={digitarData}
                      sx={{
                        height: '32px',
                        fontFamily: 'Poppins, sans-serif',
                        textTransform: 'capitalize',
                        borderRadius: '8px',
                        border: '1px solid rgba(0, 0, 0, 0.10)',
                        boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
                        transition: 'background-color 0.2s ease-in-out',
                        backgroundColor: filtro.mes.includes(item.id)
                          ? '#a00'
                          : '#FFF',
                        color: filtro.mes.includes(item.id) ? '#FFF' : 'black',
                        '&:hover': {
                          backgroundColor: filtro.mes.includes(item.id)
                            ? '#d32f2f'
                            : 'lightGray',
                        },
                      }}
                    >
                      {item.nome}
                    </Button>
                  ))}
                </>
              )}
            </Box>

            <Button
              startIcon={<DeleteOutlineIcon />}
              onClick={handleLimparFiltros}
              sx={{
                color: '#6E6E6E',
                padding: '14px',
                height: '32px',
                mt: '20px',
                borderRadius: '8px',
                textTransform: 'capitalize',
                border: '1px solid rgba(0, 0, 0, 0.10)',
                boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
                width: isSmallScreen ? '40px' : '150px',
                justifyContent: isSmallScreen ? 'center' : 'center',
                transition:
                  'background-color 0.5s ease, transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition:
                    'background-color 0.5s ease, transform 0.3s ease-in-out',
                },
              }}
            >
              {!isSmallScreen && 'Limpar Filtro'}
            </Button>

            {/* Box para o Botão Excel */}
            <ExcelDashboardComercialButton
              dadosApi={tabelaComercial}
              dataTotal={produtosInformacao}
            />
          </Box>
          {/* Fim dos Filtros */}

          <Box>
            {/* {graficoFatDash.length === 0 ? (
              <Skeleton variant="rectangular" width="100%" height={300} />
            ) : ( */}
              <>
                {/*  Container */}
                <Box
                  sx={(theme) => ({
                    display: 'flex',
                    width: '100%',
                    mt: '20px',
                    gap: 2,
                    [theme.breakpoints.down('lg')]: {
                      flexDirection: 'column',
                    },
                  })}
                >
                  {/* Container1 */}
                  <Box
                    sx={(theme) => ({
                      width: '50%',
                      display: 'flex',
                      gap: 2,
                      [theme.breakpoints.down(1420)]: {
                        width: '100%',
                        flexDirection: 'column',
                      },
                    })}
                  >
                    {/* Container1.1 */}
                    <Box
                      sx={(theme) => ({
                        width: '50%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        [theme.breakpoints.down(1420)]: {
                          width: '100%',
                        },
                        [theme.breakpoints.down('lg')]: {
                          flexDirection: 'row',
                          width: '100%',
                          flexWrap: 'wrap',
                        },
                      })}
                    >
                      <Box
                        sx={(theme) => ({
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 2,
                          border: '1px solid rgba(0, 0, 0, 0.10)',
                          borderRadius: '8px',
                          padding: '16px',
                          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.288)',
                          backgroundColor: '#FFFFFF',
                          [theme.breakpoints.down('lg')]: {
                            width: '100%',
                            height: '100px',
                          },
                        })}
                      >
                        <Typography
                          sx={{ fontSize: '12px' }}
                          color="text.secondary"
                        >
                          Tipo de Produtos
                        </Typography>
                        <Select
                          sx={{
                            width: '100%',
                            borderRadius: '4px',
                            boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
                            backgroundColor: '#FFFFFF',
                            height: '32px',
                          }}
                          value={filtro.grupoProduto}
                          displayEmpty
                          renderValue={(selected) => {
                            if (selected === null) {
                              return 'Todos';
                            }
                            return selected;
                          }}
                          onChange={(e) =>
                            setFiltro((prevFiltro) => ({
                              ...prevFiltro,
                              grupoProduto: e.target.value,
                            }))
                          }
                        >
                          {tipoProdutos.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.nome}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>
                      <Box
                        sx={(theme) => ({
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 2,
                          border: '1px solid rgba(0, 0, 0, 0.10)',
                          borderRadius: '8px',
                          padding: '16px',
                          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.288)',
                          backgroundColor: '#FFFFFF',
                          [theme.breakpoints.down('lg')]: {
                            width: '100%',
                            height: '100px',
                          },
                        })}
                      >
                        <Typography
                          sx={{ fontSize: '12px' }}
                          color="text.secondary"
                        >
                          Código filial
                        </Typography>
                        <Select
                          sx={{
                            width: '100%',
                            borderRadius: '4px',
                            boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
                            backgroundColor: '#FFFFFF',
                            height: '32px',
                          }}
                          value={filtro.filial}
                          onChange={(e) =>
                            setFiltro((prevFiltro) => ({
                              ...prevFiltro,
                              filial: e.target.value,
                            }))
                          }
                        >
                          {filiais.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                              {item.nome}
                            </MenuItem>
                          ))}
                        </Select>
                      </Box>

                      <InfoCardAmvox
                        loader={removeLoader}
                        title="Receita Total"
                        type="money"
                        amount={produtosInformacao.totalReceitaBruta}
                      />
                      <InfoCardAmvox
                        loader={removeLoader}
                        title="Receita Líquida"
                        type="money"
                        amount={produtosInformacao.totalReceitaLiquida}
                      />
                      <InfoCardAmvox
                        loader={removeLoader}
                        title="% Devoluções"
                        type="quantity"
                        isPercentage={true}
                        amount={produtosInformacao.porcentagemDevolucoes}
                      />
                      <InfoCardAmvox
                        loader={removeLoader}
                        title="Devoluções Geral"
                        type="money"
                        amount={produtosInformacao.totalDevolucoes}
                      />
                      <InfoCardAmvox
                        loader={removeLoader}
                        title="Valor Médio Com IPI"
                        type="money"
                        amount={produtosInformacao.totalMediaComIpi}
                      />
                      <InfoCardAmvox
                        loader={removeLoader}
                        title="Valor Médio Sem IPI"
                        type="money"
                        amount={produtosInformacao.totalMediaSemIpi}
                      />
                    </Box>

                    {/* Container1.2 */}
                    <Box sx={{ width: '100%', height: '100%' }}>
                      {/*grafico topuserbar*/}
                      <Box
                        sx={(theme) => ({
                          display: 'flex',
                          flexDirection: 'column',
                          borderRadius: '16px',
                          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                          padding: '24px',
                          overflowX: 'auto',
                          width: '100%',
                          overflowY: 'auto',
                          backgroundColor: '#FFFFFF',
                        })}
                      >
                        <Typography
                          sx={{
                            mb: '16px',
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#333',
                          }}
                        >
                          Top Clientes R$
                        </Typography>
                        {removeLoader ? (
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <CircularProgress color="error" />
                          </Box>
                        ) : (
                          <GraficoBarTopUsers
                            data={graficoFatDash?.clientes || []}
                            onClienteClick={handClientClick}
                          />
                        )}
                      </Box>
                    </Box>
                  </Box>

                  {/* Container2 */}
                  <Box
                    sx={(theme) => ({
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      height: '100%',
                    })}
                  >
                    {/* Container2.1 */}
                    <Box
                      sx={(theme) => ({
                        width: '100%',
                        overflowY: 'auto',
                        [theme.breakpoints.down(1420)]: {},
                      })}
                    >
                      <TabelaDashComercial
                        data={tabelaComercial}
                        rowCount={tabelaComercial.length}
                        dataTotal={produtosInformacao}
                        loading={removeLoader}
                      />
                    </Box>

                    {/* Linha2 */}
                    <Box
                      sx={(theme) => ({
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        mt: 2,
                        [theme.breakpoints.down(1420)]: {
                          flexWrap: 'wrap',
                        },
                      })}
                    >
                      {/* Container2.2 */}
                      <Box sx={{ width: '100%', height: '100%' }}>
                        {/* Grafico Clientes Porcentagem */}
                        <Box
                          sx={{
                            position: isExpanded ? 'fixed' : 'relative',
                            top: isExpanded ? '50%' : 'initial',
                            left: isExpanded ? '50%' : 'initial',
                            transform: isExpanded
                              ? 'translate(-50%, -50%)'
                              : 'none',
                            width: isExpanded ? '30vw' : '100%',
                            height: isExpanded ? '80vh' : '460px',
                            borderRadius: '16px',
                            boxShadow: isExpanded
                              ? '0px 4px 20px rgba(0, 0, 0, 0.3)'
                              : '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                            padding: '24px',
                            overflowY: 'auto',
                            transition: 'all 0.4s ease-in-out',
                            backgroundColor: 'white',
                            zIndex: isExpanded ? 10 : 'initial',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              mb: '16px',
                            }}
                          >
                            <Typography
                              sx={{
                                fontFamily: 'Poppins, sans-serif',
                                mb: '16px',
                                fontWeight: 600,
                                fontSize: '12px',
                                color: '#333',
                              }}
                            >
                              Top Clientes %
                            </Typography>
                            <Button
                              variant="contained"
                              onClick={handleToggleExpand}
                              sx={{
                                bgcolor: '#A00',
                                '&:hover': {
                                  transform: 'scale(1.1)',
                                  bgcolor: 'black',
                                  transition:
                                    'background-color 0.5s ease, transform 0.3s ease-in-out',
                                },
                              }}
                            >
                              {isExpanded ? (
                                <CloseFullscreenIcon />
                              ) : (
                                <OpenInFullIcon />
                              )}
                            </Button>
                          </Box>
                          <Box sx={{ width: '100%', height: '100%' }}>
                            {removeLoader ? (
                              <Box
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                <CircularProgress color="error" />
                              </Box>
                            ) : (
                              <GraficoBarTopUsersPorcentagem
                                data={graficoFatDash?.clientes}
                              />
                            )}
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        sx={(theme) => ({
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          gap: 2,
                          [theme.breakpoints.down('md')]: {
                            flexDirection: 'column',
                          },
                        })}
                      >
                        {/* Container2.3 */}
                        <Box
                          sx={{
                            height: '460px',
                            borderRadius: '16px',
                            boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                            padding: '32px',
                            width: '100%',
                            justifyContent: 'center',
                            backgroundColor: '#FFFFFF',
                          }}
                        >
                          {removeLoader ? (
                            <Box
                              sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <CircularProgress color="error" />
                            </Box>
                          ) : (
                            <GraficoReceitaAnual
                              data={faturamentoUltimos3Anos}
                            />
                          )}
                        </Box>
                        {/* Container2.4 */}
                        <Box
                          sx={{
                            height: '460px',
                            borderRadius: '16px',
                            boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                            padding: '32px',
                            width: '100%',
                            justifyContent: 'center',
                            backgroundColor: '#FFFFFF',
                          }}
                        >
                          {removeLoader ? (
                            <Box
                              sx={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                            >
                              <CircularProgress color="error" />
                            </Box>
                          ) : (
                            <>
                              {graficoFatDash?.gruposProdutos ? (
                                <GraficoRoundedReceitaGrupoProdutos
                                  data={graficoFatDash.gruposProdutos}
                                />
                              ) : (
                                <Typography variant="body1">
                                  Nenhum dado disponível para o gráfico.
                                </Typography>
                              )}
                            </>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
