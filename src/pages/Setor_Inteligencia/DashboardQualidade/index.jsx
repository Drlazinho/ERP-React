import React, { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HeaderAmvox from '@/components/HeaderAmvox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CustomCardQualidade from './components/CardCustom';
import GraficoBarSlaMes from './components/GradficoBarSlaMes';
import GraficoBarChamados from './components/GraficoBarChamados';
import GraficoDonutDistribuicao from './components/GraficoDonutDistribuicao/index';
import GraficoPizzaSolSetor from './components/GraficoPizzaSolSetor';
import GraficoBarraColaborador from './components/GraficoBarraColaborador';
import xVermelho from '@/assets/xVermelho.svg';

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

const dataCard = [
  {
    title: 'Parada',
    value: 1,
    color: '#FF5E5E',
    borderColor: '1px solid #FF5E5E',
    background: 'rgba(255, 94, 94, 0.04)',
  },
  {
    title: 'A iniciar',
    value: 2,
    color: '#FF6A00',
    borderColor: '1px solid #FF6A00',
    background: 'rgba(255, 106, 0, 0.04)',
  },
  {
    title: 'Em progresso',
    value: 2,
    color: '#E59700',
    borderColor: '1px solid #E59700',
    background: 'rgba(229, 151, 0, 0.04)',
  },
  {
    title: 'Concluídos',
    value: 53,
    color: '#10A957',
    borderColor: '1px solid #10A957',
    background: 'rgba(16, 169, 87, 0.04)',
  },
];

export default function DashboardQualidade() {
  const baseYear = new Date().getFullYear();
  const years = [baseYear - 1, baseYear];
  const [filtro, setFiltro] = useState({
    ano: baseYear,
    mes: new Date().getMonth() + 1,
  });
  const [selectedMes, setSelectedMes] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  // const [dataCard, setDataCard] = useState([]);

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setFiltro({ ano: year, mes: filtro.mes });
  };

  useEffect(() => {
    if (filtro.mes) {
      setSelectedMes(filtro.mes);
    }
  }, [filtro]);

  const handleSelected = (id) => {
    setSelectedMes((prevSelectedMes) => (prevSelectedMes === id ? null : id));
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const navigate = useNavigate();

  return (
    <>
      <Box className="principal">
        <Box
          position={'relative'}
          sx={{
            backgroundColor: '#FBFBFB',
          }}
          gap={2}
          padding={'24px'}
        >
          <Box
            sx={{
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
                title="Dashboard de Qualidade"
                onBack={() => navigate(-1)}
              />
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                width: '100%',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: '8px',
                    justifyContent: 'flex-end',
                    width: '100%',
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
                          width: '100%',
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
                  <Box>
                    <Box sx={{ display: 'flex' }}>
                      {meses.map((item) => (
                        <Button
                          key={item.id}
                          variant="contained"
                          onClick={() => {
                            handleSelected(item.id);
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
                      ))}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <Button
                      // onClick={handleClear}
                      variant="outlined"
                      sx={{
                        color: '#6E6E6E',
                        border: '2px solid #CCCCCC',
                        height: '32px',
                        borderRadius: '8px',
                        padding: '0 20px',
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
            sx={{
              display: 'flex',
              width: '100%',
              gap: '16px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  mb: '16px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    gap: '16px',
                  }}
                >
                  {dataCard.map((item) => (
                    <CustomCardQualidade key={item.title} {...item} />
                  ))}
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  padding: '16px 24px',
                  gap: '16px',
                  bgcolor: '#fff',
                  borderRadius: '16px',
                  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    indicatorColor="transparent"
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <Tab
                      label="SLA por Mês"
                      sx={{
                        color: '#999',
                        textTransform: 'capitalize',
                        '&.Mui-selected': {
                          color: '#333',
                          fontWeight: '600',
                        },
                        '&.MuiTab-root': {
                          textDecoration: 'none',
                        },
                      }}
                    />
                    <Tab
                      label="Chamados"
                      sx={{
                        textTransform: 'capitalize',
                        color: '#999',
                        '&.Mui-selected': {
                          color: '#333',
                          fontWeight: '600',
                        },
                        '&.MuiTab-root': {
                          textDecoration: 'none',
                        },
                      }}
                    />
                  </Tabs>
                </Box>
                {tabIndex === 0 ? <GraficoBarSlaMes /> : <GraficoBarChamados />}
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '44%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  gap: '16px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px 24px',
                    gap: '8px',
                    bgcolor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <Typography>Distribuição</Typography>
                  <GraficoDonutDistribuicao />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px 24px',
                    gap: '8px',
                    bgcolor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <Typography>Solicitação por setor</Typography>
                  <GraficoPizzaSolSetor />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px 24px',
                    gap: '8px',
                    bgcolor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <Typography>Chamados por colaborador</Typography>
                  <GraficoBarraColaborador />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
