import { useCallback, useEffect, useState } from 'react';
import { formatDatetoHtmlDay } from '@/utils/formatDate';
import {
  Box,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
  CircularProgress,
  MenuItem,
  Button,
  useTheme,
  useMediaQuery,
  Select,
} from '@mui/material';
import Amvoxlogopng from '@/assets/Amvoxlogopng.png';
import HeaderAmvox from '@/components/HeaderAmvox';
import xVermelho from '@/assets/xVermelho.png';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link, useNavigate } from 'react-router';
import './styles.css';
import {
  buscarTotalProducaoLinhas,
  buscarMetaProducao,
} from './dashboardProducao.service';
import { useToast } from '@/hooks/toast.hook';
import { TabelaProducaoProdutos } from './componentsOld/tabelaProducaoProdutos';
import GraficoLinhasProduto from './components/Graficos/GraficoLinhaProdutos';
import GraficoProduto from './components/Graficos/GraficoProduto';
import ModalCadastro from './components/ModalCadastro';
import RelatorioMensalTable from './components/Table/TableRelatorioMensal';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EditNoteIcon from '@mui/icons-material/EditNote';

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

export default function DashProducao() {
  const [horario, setHorario] = useState(() => {
    const horarioDoDia = new Date();
    const hora = String(horarioDoDia.getHours()).padStart(2, '0');
    const minutos = String(horarioDoDia.getMinutes()).padStart(2, '0');
    return `${hora} : ${minutos}`;
  });
  const [countdown, setCountdown] = useState(180);
  const baseYear = new Date().getFullYear();
  const years = [baseYear - 1, baseYear];
  const mesAtual = new Date().getMonth() + 1;

  const [filtro, setFiltro] = useState({
    dataProducaoInicial: formatDatetoHtmlDay(),
    dataProducaoFinal: formatDatetoHtmlDay(),
  });

  const [filtro2, setFiltro2] = useState({
    ano: baseYear,
    mes: [mesAtual],
  });

  const [selectedMes, setSelectedMes] = useState(mesAtual);

  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState({});

  const [meta, setMeta] = useState({});

  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const { addToast } = useToast();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const routes = [
      '/producao/dashProducao',
      '/producao/paradaLinha',
      '/producao/producoes',
    ];
    navigate(routes[newValue]);
  };

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setFiltro2({ ano: year, mes: filtro2.mes });
  };

  const handleSelected = (id) => {
    const novoMesSelecionado = selectedMes === id ? null : id;
    setSelectedMes(novoMesSelecionado);
    setFiltro2((prevFiltro2) => ({
      ...prevFiltro2,
      mes: novoMesSelecionado ? [novoMesSelecionado] : [],
    }));
  };

  const handleUpdate = () => {
    handleMeta();
  };

  const handleFetch = useCallback(() => {
    buscarTotalProducaoLinhas(filtro)
      .then((res) => {
        setData(res);
      })
      .catch((error) => {
        let errorMessage = 'Erro ao editar meta';

        if (error.response && error.response.data) {
          if (typeof error.response.data === 'object') {
            errorMessage =
              JSON.stringify(error.response.data) ||
              error.message ||
              error.response.data.title;
          } else {
            errorMessage = error.response.data;
          }
        }

        addToast({
          type: 'danger',
          title: 'Erro',
          description: errorMessage,
        });
      });
  }, [filtro]);

  useEffect(() => {
    setIsLoading(true);
    handleFetch();

    const interval = setInterval(() => {
      const horarioDoDia = new Date();
      const hora = String(horarioDoDia.getHours()).padStart(2, '0');
      const minutos = String(horarioDoDia.getMinutes()).padStart(2, '0');
      setHorario(`${hora} : ${minutos}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [filtro]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (filtro2.mes.length > 0 || filtro2.ano) {
      setSelectedMes(filtro2.mes[0]);
      handleMeta();
    }
  }, [filtro2]);

  const handleMeta = useCallback(async () => {
    const params = {
      Mes: filtro2.mes[0],
      Ano: filtro2.ano,
    };
    await buscarMetaProducao(params)
      .then((res) => {
        setMeta(res);
      })
      .catch((error) => {
        let errorMessage = 'Erro ao editar meta';

        if (error.response && error.response.data) {
          if (typeof error.response.data === 'object') {
            errorMessage =
              error.response.data.detail ||
              error.message ||
              error.response.data.title;
          } else {
            errorMessage = error.response.data;
          }
        }

        addToast({
          type: 'danger',
          title: 'Erro',
          description: errorMessage,
        });
      });
  }, [filtro2]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
          clearInterval(countdownInterval);
          handleFetch();
          handleMeta();
          return 180;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [handleFetch, handleMeta, countdown]);

  return (
    <div
      style={{ width: '100%', backgroundColor: '#f3f4f6', overflowX: 'hidden' }}
    >
      <>
        <Box
          position={'relative'}
          sx={{ backgroundColor: '#f3f4f6', padding: '10px' }}
          gap={2}
        >
          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 2,
              width: '100%',

              [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
              },
            })}
          >
            <HeaderAmvox
              title="Dashboard Produção"
              onBack={() => navigate(-1)}
            />

            <Box
              sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',

                [theme.breakpoints.down(1320)]: {
                  width: '100%',
                },
              })}
            >
              <Box
                sx={{
                  width: '230px',
                  padding: '8px 16px',
                  gap: '7px',
                  borderRadius: '0px 0px 0px 16px',
                  border: '1px solid rgba(0, 0, 0, 0.50)',
                  bgcolor: 'rgba(0, 0, 0, 0.72)',
                  color: '#FFF',
                }}
              >
                <Typography>{new Date().toLocaleDateString()}</Typography>
                <AccessTimeIcon fontSize="14" sx={{ mr: '4px' }} />
                {horario}
                <Typography sx={{ ml: '8px' }}>
                  Atualização em: {formatTime(countdown)}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                '& .MuiTab-root': {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '8px',
                  minHeight: 'auto',
                  padding: '8px 16px',
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  color: '#666',
                  '&.Mui-selected': {
                    color: '#aa0000',
                    fontWeight: 'bold',
                  },
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#aa0000',
                },
                '& .MuiTab-iconWrapper': {
                  margin: 0,
                  fontSize: '1.5rem',
                  '&.Mui-selected': {
                    color: '#aa0000',
                  },
                },
              })}
            >
              <Tab
                label="Dashboard Produção"
                icon={<PrecisionManufacturingIcon />}
              />
              <Tab label="Parada de Linha" icon={<PendingActionsIcon />} />
              <Tab label="Produções" icon={<EditNoteIcon />} />
            </Tabs>
          </Box>

          <Box
            sx={{
              maxWidth: '100%',
              padding: '12px 24px 12px 16px',
            }}
          >
            <Box
              className="filtrosCards"
              sx={{
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Box className="cardFiltro">
                <Typography>Selecione o período:</Typography>
                <Box
                  sx={(theme) => ({
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '16px',
                    [theme.breakpoints.down('sm')]: {
                      flexDirection: 'column',
                    },
                  })}
                >
                  <TextField
                    type="date"
                    label="Data de início"
                    InputLabelProps={{ shrink: true }}
                    value={filtro.dataProducaoInicial}
                    onChange={(e) => {
                      setFiltro({
                        ...filtro,
                        dataProducaoInicial: e.target.value,
                      });
                    }}
                  />
                  <TextField
                    type="date"
                    label="Data Final"
                    InputLabelProps={{ shrink: true }}
                    value={filtro.dataProducaoFinal}
                    onChange={(e) => {
                      setFiltro({
                        ...filtro,
                        dataProducaoFinal: e.target.value,
                      });
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: '16px',
                  flexWrap: 'wrap',
                  width: '100%',
                }}
              >
                <Box
                  className="cards"
                  sx={{
                    flex: 1,
                    minWidth: { xs: '100%', md: '703px' },
                    maxWidth: '500px',
                  }}
                >
                  {isLoading ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <svg width={0} height={0}>
                        <defs>
                          <linearGradient
                            id="my_gradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#e01cd5" />
                            <stop offset="100%" stopColor="#1CB5E0" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <CircularProgress
                        sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
                      />
                    </Box>
                  ) : (
                    <Box>
                      {data?.producaoAno !== undefined &&
                      data.producaoAno !== null ? (
                        <>
                          <Typography variant="h4">
                            {Number(data.producaoAno).toLocaleString()}
                          </Typography>
                          <Typography variant="subtitle2">
                            Produção Acumulada no Ano
                          </Typography>
                        </>
                      ) : (
                        <Typography
                          variant="body1"
                          sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                          }}
                        >
                          Nenhuma informação disponível no momento.
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>

                <Box
                  className="cards"
                  sx={{
                    flex: 1,
                    minWidth: { xs: '100%', md: '633px' },
                    maxWidth: '500px',
                  }}
                >
                  {isLoading ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <svg width={0} height={0}>
                        <defs>
                          <linearGradient
                            id="my_gradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#e01cd5" />
                            <stop offset="100%" stopColor="#1CB5E0" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <CircularProgress
                        sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
                      />
                    </Box>
                  ) : (
                    <Box>
                      {data?.producaoPeriodo !== undefined &&
                      data.producaoPeriodo !== null ? (
                        <>
                          <Typography variant="h4">
                            {Number(data.producaoPeriodo).toLocaleString()}
                          </Typography>
                          <Typography variant="subtitle2">
                            Produção no Intervalo
                          </Typography>
                        </>
                      ) : (
                        <Typography
                          variant="body1"
                          sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                          }}
                        >
                          Nenhuma informação disponível no momento.
                        </Typography>
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            <Box className="graficoBox">
              <GraficoLinhasProduto
                data={data?.producaoLinha}
                isLoading={isLoading}
              />
            </Box>
            <Box className="graficoBox">
              <GraficoProduto
                data={data?.producaoProdutos}
                isLoading={isLoading}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                // flexDirection: { xs: 'column', sm: 'row' },
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '8px',
                padding: '12px 24px 12px 16px',
              }}
            >
              <Box sx={{ display: 'flex' }}>
                <Box
                  sx={{
                    height: '32px',
                    mr: '16px',
                  }}
                >
                  <TextField
                    select
                    fullWidth
                    sx={{
                      display: 'flex',
                      height: '32px',
                      bgcolor: '#F6FBFF',
                      '& .MuiInputBase-root': {
                        height: '32px',
                        borderRadius: '8px',
                        '&:focus-within': {
                          border: '1px solid rgba(0, 0, 0, 0.10)',
                        },
                      },
                    }}
                    defaultValue={filtro2.ano}
                    inputProps={{
                      style: {
                        height: '32px',
                        width: '100%',
                      },
                    }}
                    value={filtro2.ano}
                    onChange={handleYearChange}
                  >
                    {years.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
                <Box
                  sx={(theme) => ({
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    [theme.breakpoints.down('md')]: {
                      flexDirection: 'column',
                      gap: '16px',
                    },
                  })}
                >
                  <Box
                    sx={() => ({
                      display: 'flex',
                      gap: '8px',
                      flexWrap: 'wrap',
                    })}
                  >
                    {isSmallScreen ? (
                      <TextField
                        select
                        fullWidth
                        value={filtro2.mes.length > 0 ? filtro2.mes[0] : ''}
                        onChange={(e) => {
                          const selectedMes = e.target.value;
                          setFiltro2((prevFiltro2) => ({
                            ...prevFiltro2,
                            mes: [selectedMes],
                          }));
                          setSelectedMes(selectedMes);
                        }}
                        sx={{
                          fontFamily: 'Poppins, sans-serif',
                          boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
                          backgroundColor: '#FFF',
                          width: '100px',
                          '& .MuiInputBase-root': {
                            height: '32px',
                            borderRadius: '8px',
                            '&:focus-within': {
                              border: '1px solid rgba(0, 0, 0, 0.10)',
                            },
                          },
                        }}
                      >
                        {meses.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nome}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      <>
                        {meses.map((item) => (
                          <Button
                            key={item.id}
                            variant="contained"
                            onClick={() => handleSelected(item.id)}
                            sx={{
                              display: 'flex',
                              height: '32px',
                              fontFamily: 'Poppins, Poppins Bold, sans-serif',
                              textTransform: 'capitalize',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              backgroundColor: '#F6FBFF',
                              color: 'black',
                              boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.25)',
                              transition: 'background-color 0.2s ease-in-out',
                              marginRight: '8px',
                              border:
                                selectedMes === item.id
                                  ? '2px solid #a00'
                                  : 'none',

                              '&:hover': {
                                border:
                                  selectedMes === item.id
                                    ? '2px solid #a00'
                                    : '2px solid #a00',
                              },
                            }}
                          >
                            {item.nome}
                          </Button>
                        ))}
                      </>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '16px',
                    }}
                  >
                    <ModalCadastro onUpdate={handleUpdate} />
                  </Box>
                </Box>
              </Box>
              <Box sx={{ mt: '16px' }}>
                <Box
                  sx={{
                    width: '100%',
                    bgcolor: '#FFF',
                    borderRadius: '8px 8px 0px 0px',
                    height: '40px',
                    padding: '8px 24px',
                    alignItems: 'center',
                    fontWeight: 600,
                  }}
                >
                  Relatório Mensal
                </Box>
                <RelatorioMensalTable data={meta} onUpdate={handleUpdate} />
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    </div>
  );
}
