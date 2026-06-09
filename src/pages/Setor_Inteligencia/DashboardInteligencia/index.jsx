import { useEffect, useState } from 'react';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import './styles.css';
import xVermelho from '@/assets/xVermelho.svg';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router';
import HeaderAmvox from '@/components/HeaderAmvox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CustomCard from './components/Cards';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GraficoAbertoCategoria from './components/GraficoAbertoCategoria';
import GraficoDistribuicao from './components/GraficoDistribuicao';
import GraficoSLAChamados from './components/GraficoSLAChamados';
import ChamadosPorColaborador from './components/GraficoChamadosColaborador';
import CachedIcon from '@mui/icons-material/Cached';
import GraficoDesepenhoGeral from './components/GraficoDesepenhoGral';
import TabelaDashChamados from './components/TabelaDashboardChamadosAnual';
import {
  DashboardCardsGet,
  DashboardCategoria,
  DashboardChamadosPorColaborador,
  DashboardDistribuicao,
  DashboardGraficoSLA,
  DashboardGraficoSLAAno,
  GetIndicadores,
  GetDataUr,
} from '@/pages/Setor_Inteligencia/DashboardChamados/dashboardChamados.service';
import TabelaDashChamadosCategoria from './components/TabelaDashChamadosCategoria';
import Loading from '@/components/Loading';
import CardNps from './components/CardNps';

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

export default function DashboardInteligencia() {
  const { setor } = useUsuarioLocal();
  const baseYear = new Date().getFullYear();
  const years = [baseYear - 1, baseYear];
  const [filtro, setFiltro] = useState({
    ano: baseYear,
    mes: new Date().getMonth() + 1,
    idSetor: setor,
  });
  const [dataCard, setDataCard] = useState([]);
  const [dataCard2, setDataCard2] = useState([]);
  const [cardNAtribuido, setCardNAtribuido] = useState([]);
  const [dataGraficoCategoria, setDataGraficoCategoria] = useState([]);
  const [dataGraficoDistribuicao, setDataGraficoDistribuicao] = useState([]);
  const [dataGraficoColaborador, setDataGraficoColaborador] = useState([]);
  const [dataGraficoSLA, setDataGraficoSLA] = useState([]);
  const [dataGraficoSLAAno, setDataGraficoSLAAno] = useState([]);

  const [selectedMes, setSelectedMes] = useState(null);
  const [mostrarDesempenhoGeral, setMostrarDesempenhoGeral] = useState(true);
  const [indicadores, setIndicadores] = useState([]);
  const [dataUr, setDataUr] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoading, setIsLoading] = useState(false);
  const alternarGrafico = () => {
    setMostrarDesempenhoGeral(!mostrarDesempenhoGeral);
  };
  const navigate = useNavigate();

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setFiltro({ ano: year, mes: filtro.mes });
  };

  const handleSelected = (id) => {
    setSelectedMes((prevSelectedMes) => (prevSelectedMes === id ? null : id));
  };

  const handleClear = () => {
    setFiltro({
      ano: baseYear,
      mes: null,
      idSetor: setor,
    });
    handleSelected();
  };

  const handleFetch = () => {
    DashboardCardsGet(filtro)
      .then((res) => {
        if (res) {
          const {
            totalAbertos,
            emDia,
            atrasados,
            totalDeChamados,
            fechados,
            chamadosNaoAtribuidos,
          } = res;

          setDataCard([
            { title: 'Abertos', value: totalAbertos || 0, color: '#333' },
            { title: 'Em dia', value: emDia || 0, color: 'green' },
            { title: 'Atrasado', value: atrasados || 0, color: 'red' },
          ]);

          setDataCard2([
            { title: 'Total', value: totalDeChamados || 0, color: '#333' },
            { title: 'Fechados', value: fechados || 0, color: 'green' },
          ]);

          setCardNAtribuido(chamadosNaoAtribuidos);
        } else {
          console.error('A resposta da API está vazia:', res);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados da API:', error);
      });

    DashboardCategoria(filtro)
      .then((res) => {
        setDataGraficoCategoria(res);
      })
      .catch((error) => {
        console.error('Erro ao buscar categorias:', error);
      });

    DashboardDistribuicao(filtro).then((res) => {
      setDataGraficoDistribuicao(res);
    });

    DashboardChamadosPorColaborador(filtro).then((res) => {
      setDataGraficoColaborador(res);
    });

    DashboardGraficoSLA(filtro).then((res) => {
      setDataGraficoSLA(res);
    });
    DashboardGraficoSLAAno(filtro).then((res) => {
      setDataGraficoSLAAno(res);
    });
  };

  useEffect(() => {
    handleFetch();

    const interval = setInterval(() => {
      handleFetch();
    }, 60000);

    return () => clearInterval(interval);
  }, [filtro]);

  useEffect(() => {
    if (filtro.mes) {
      setSelectedMes(filtro.mes);
    }
  }, [filtro.mes]);

  const handleIndicadores = () => {
    setIsLoading(true);
    GetIndicadores(filtro).then((res) => {
      setIndicadores(res.value || []);
    });
    GetDataUr(filtro).then((res) => {
      setDataUr(res.value);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    handleIndicadores();
  }, [filtro]);

  return (
    <>
      <Box className="Principal">
        <Box
          position={'relative'}
          sx={{
            backgroundColor: '#FBFBFB',
            width: '97%',
            margin: '0 auto',
          }}
          gap={2}
          padding={'24px'}
        >
          <Box
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
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
              <HeaderAmvox
                title="Dashboard da Inteligência"
                onBack={() => navigate(-1)}
              />
            </Box>
            <Box
              sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                display: 'inline-flex',
                width: '100%',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Box className="boxSelects">
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    gap: '16px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      height: '32px',
                    }}
                  >
                    <TextField
                      select
                      fullWidth
                      sx={{
                        display: 'flex',
                        width: '100%',
                        height: '32px',
                        '& .MuiInputBase-root': {
                          height: '32px',
                          borderRadius: '8px',
                          '&:focus-within': {
                            border: '1px solid rgba(0, 0, 0, 0.10)',
                          },
                        },
                      }}
                      defaultValue={filtro.ano}
                      inputProps={{
                        style: {
                          height: '32px',
                        },
                      }}
                      value={filtro.ano}
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
                      flexDirection: isSmallScreen ? 'column' : 'row',
                      [theme.breakpoints.down(1510)]: {
                        flexWrap: 'wrap',
                        gap: '8px',
                      },
                    })}
                  >
                    {isSmallScreen ? (
                      <TextField
                        select
                        fullWidth
                        value={filtro.mes || ''}
                        onChange={(e) => {
                          const selectedMes = parseInt(e.target.value, 10);
                          setFiltro((prevFiltro) => ({
                            ...prevFiltro,
                            mes:
                              prevFiltro.mes === selectedMes ? 0 : selectedMes,
                          }));
                        }}
                        sx={{
                          height: '32px',
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
                      meses.map((item) => (
                        <Button
                          key={item.id}
                          variant="contained"
                          onClick={() => {
                            handleSelected(item.id || '');
                            setFiltro((prevFiltro) => ({
                              ...prevFiltro,
                              mes: prevFiltro.mes === item.id ? 0 : item.id,
                            }));
                          }}
                          sx={{
                            display: 'flex',
                            height: '32px',
                            fontFamily: 'Poppins, Poppins Bold, sans-serif',
                            textTransform: 'capitalize',
                            borderRadius: '8px',
                            border: '1px solid rgba(0, 0, 0, 0.10)',
                            boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
                            transition: 'background-color 0.2s ease-in-out',
                            marginRight: '8px',
                            backgroundColor:
                              selectedMes === item.id ? '#a00' : '#FFF',
                            color: selectedMes === item.id ? '#fff' : 'black',
                            '&:hover': {
                              backgroundColor:
                                selectedMes === item.id ? '#a00' : 'lightGray',
                            },
                          }}
                        >
                          {item.nome}
                        </Button>
                      ))
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <Button
                      onClick={handleClear}
                      variant="outlined"
                      sx={{
                        color: '#6E6E6E',
                        border: '2px solid #CCCCCC',
                        height: '32px',
                        borderRadius: '8px',
                        textTransform: 'capitalize',
                        transition:
                          'background-color 0.5s ease, transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          transition:
                            'background-color 0.5s ease, transform 0.3s ease-in-out',
                          border: '2px solid #CCCCCC',
                        },
                      }}
                    >
                      <HighlightOffIcon />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            className="boxCards"
            sx={{ flexDirection: { xs: 'column', md: 'row' } }}
          >
            <Box
              sx={{
                padding: '16px',
                gap: '8px',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                borderRadius: '8px',
                bgcolor: '#fff',
                width: '100%',
              }}
            >
              <Typography
                sx={{
                  mb: '8px',
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                }}
              >
                Chamados em aberto
              </Typography>
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  gap: '24px',
                  [theme.breakpoints.down('sm')]: {
                    flexDirection: 'column',
                  },
                })}
              >
                {dataCard.map((item) => (
                  <CustomCard key={item.title} {...item} />
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                padding: '16px',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                borderRadius: '8px',
                bgcolor: '#fff',
                width: '100%',
              }}
            >
              <Typography
                sx={{
                  mb: '8px',
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1rem',
                }}
              >
                Total de chamados
              </Typography>
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  gap: '24px',
                  [theme.breakpoints.down('sm')]: {
                    flexDirection: 'column',
                  },
                })}
              >
                {dataCard2.map((item) => (
                  <CustomCard key={item.title} {...item} />
                ))}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              gap: '16px',
              mt: '16px',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                bgcolor: '#fff',
                width: {
                  xs: '100%',
                  md: '60%',
                },
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  sx={{
                    mb: '8px',
                    fontWeight: 600,
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Chamados em aberto por categoria
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '7px' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '8px',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: '12px',
                        height: '12px',
                        bgcolor: '#FF4560',
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      Atrasado
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '8px',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{ width: '12px', height: '12px', bgcolor: '#00D28B' }}
                    />

                    <Typography
                      sx={{
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      Em dia
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <GraficoAbertoCategoria data={dataGraficoCategoria} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                bgcolor: '#fff',
                width: {
                  xs: '100%',
                  md: '40%',
                },
                flexDirection: 'column',
              }}
            >
              <Typography
                sx={{
                  mb: '8px',
                  fontWeight: 600,
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Distribuição
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <GraficoDistribuicao data={dataGraficoDistribuicao} />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              gap: '16px',
              mt: '16px',
              flexDirection: { xs: 'column', md: 'row' },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                padding: '16px',
                borderRadius: '8px',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                bgcolor: '#fff',
                width: {
                  xs: '100%',
                  md: '60%',
                },
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'baseline',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Button
                  sx={{
                    display: 'flex',
                    fontFamily: 'Poppins, Poppins Bold, sans-serif',
                    textTransform: 'capitalize',
                    borderRadius: '8px',
                    border: '1px solid rgba(0, 0, 0, 0.10)',
                    boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
                    transition: 'background-color 0.2s ease-in-out',
                    color: '#333',
                    mr: '8px',
                  }}
                  onClick={alternarGrafico}
                >
                  <CachedIcon />
                  {mostrarDesempenhoGeral ? '' : ''}
                </Button>
                <Box
                  sx={{
                    mb: '8px',
                    fontWeight: 600,
                    fontFamily: 'Poppins, sans-serif',
                    display: 'flex',
                    width: '100%',
                    flexDirection: { xs: 'column', md: 'row' },
                  }}
                >
                  {mostrarDesempenhoGeral ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        flexDirection: { xs: 'column', sm: 'row' },
                      }}
                    >
                      <Box sx={{ display: 'flex' }}>
                        Desempenho por categoria SLA
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '16px',
                          flexDirection: { xs: 'column', md: 'row' },
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '8px',
                            alignItems: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              width: '14px',
                              height: '14px',
                              borderRadius: '100%',
                              bgcolor: '#4BACC6',
                            }}
                          />
                          <Typography
                            sx={{
                              fontFamily: 'Poppins, sans-serif',
                            }}
                          >
                            Média de SLA de Atendimento
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '8px',
                            alignItems: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              width: '14px',
                              height: '14px',
                              bgcolor: '#2C4D75',
                              borderRadius: '100%',
                            }}
                          />

                          <Typography
                            sx={{
                              fontFamily: 'Poppins, sans-serif',
                            }}
                          >
                            SLA de Atendimento
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        flexDirection: { xs: 'column', sm: 'row' },
                      }}
                    >
                      <Box sx={{ display: 'flex' }}>
                        Desempenho Geral SLA {baseYear}
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '16px',
                          flexDirection: { xs: 'column', sm: 'row' },
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '8px',
                            alignItems: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              width: '14px',
                              height: '14px',
                              borderRadius: '100%',
                              bgcolor: '#FFC000',
                            }}
                          />
                          <Typography
                            sx={{
                              fontFamily: 'Poppins, sans-serif',
                            }}
                          >
                            Média de SLA de Atendimento
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '8px',
                            alignItems: 'center',
                          }}
                        >
                          <Box
                            sx={{
                              width: '14px',
                              height: '14px',
                              bgcolor: '#00B050',
                              borderRadius: '100%',
                            }}
                          />

                          <Typography
                            sx={{
                              fontFamily: 'Poppins, sans-serif',
                            }}
                          >
                            SLA de Atendimento
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
              {mostrarDesempenhoGeral ? (
                <>
                  <GraficoSLAChamados data={dataGraficoSLA} />
                  <TabelaDashChamadosCategoria data={dataGraficoSLA} />
                </>
              ) : (
                <>
                  <GraficoDesepenhoGeral data={dataGraficoSLAAno} />
                  <TabelaDashChamados data={dataGraficoSLAAno} />
                </>
              )}
            </Box>
            <Box
              sx={{
                width: {
                  xs: '100%',
                  md: '40%',
                },
              }}
            >
              <CardNps
                indicadores={indicadores}
                dataUr={dataUr}
                isLoading={isLoading}
                filtro={filtro}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
