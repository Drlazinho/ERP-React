import React, { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import SidebarNovo from '../../../components/LayoutNovo/SidebarNovo';
import Amvoxlogopng from '../../../assets/Amvoxlogopng.png';
import ModalRegistro from './ModalRegistro';
import ModalHistorico from './ModalHistorico';
import xVermelho from '../../../assets/xVermelho.svg';
import TabelaKpi from './TabelaKpi';
import GraficoInventario from './GraficoInventario';
import GraficoRadialBar from './GraficoDonutInventario';
import {
  GetEstoqueInventarioCardsMes,
  GetEstoqueInventarioGraficoBarras,
  GetEstoqueInventarioHistorico,
  GetEstoqueInventarioPrincipal,
} from './KPIinventario.service';
import CardInventarioMes from './CardInventarioMes';
import CardInventarioAno from './CardInventarioAno';
import HeaderAmvox from '@/components/HeaderAmvox';

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

export default function KPIInventario() {
  const baseYear = new Date().getFullYear();
  const years = [baseYear - 1, baseYear];
  const [filtro, setFiltro] = useState({
    ano: baseYear,
    mes: new Date().getMonth() + 1,
  });
  const [selectedMes, setSelectedMes] = useState(null);
  const isMobile = useMediaQuery('(max-width: 715px)');
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dataHistorico, setDataHistorico] = useState([]);
  const [dataCard, setDataCard] = useState([]);
  const [dataGrafico, setDataGrafico] = useState([]);

  const mesAtual = new Date().getMonth() + 1;
  const mesSelecionadoId = filtro.mes === 0 ? mesAtual : filtro.mes;
  const mesSelecionado = meses.find((mes) => mes.id === mesSelecionadoId);

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setFiltro({ ano: year, mes: filtro.mes });
  };

  const handleFetch = () => {
    GetEstoqueInventarioPrincipal(filtro).then((res) => {
      setData(res.data);
    });
    GetEstoqueInventarioHistorico().then((res) => {
      setDataHistorico(res.data);
    });
    GetEstoqueInventarioCardsMes(filtro).then((res) => {
      setDataCard(res.data);
    });
    GetEstoqueInventarioGraficoBarras(filtro).then((res) => {
      setDataGrafico(res.data);
    });
  };

  useEffect(() => {
    handleFetch();
    if (filtro.mes) {
      setSelectedMes(filtro.mes);
    }
  }, [filtro]);

  const handleSelected = (id) => {
    setSelectedMes((prevSelectedMes) => (prevSelectedMes === id ? null : id));
  };

  const handleClear = () => {
    setFiltro({
      ano: baseYear,
      mes: 0,
    });
    handleSelected();
  };

  return (
    <>
      <Box className="Principal">
        <Box position={'relative'} sx={{ backgroundColor: '#f3f4f6' }} gap={2}>
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
              <HeaderAmvox
                title="KPI de Inventário"
                onBack={() => navigate(-1)}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                gap: '16px',
                paddingRight: '10px',
                '@media (max-width: 670px)': {
                  justifyContent: 'center',
                },
              }}
            >
              {/*  */}
              <ModalHistorico dataHistorico={dataHistorico} />
              <ModalRegistro handleFetch={handleFetch} />
            </Box>
          </Box>
          <Box className="boxGeral">
            <Box className="boxFiltro">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                  }}
                ></Box>
              </Box>

              <Box className="boxConsultar">
                <Box className="boxSelects">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      width: '100%',
                      gap: '24px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        width: '300px',
                        height: '32px',
                        '@media (max-width: 600px)': {
                          justifyContent: 'center',
                          width: '100%',
                        },
                      }}
                    >
                      <TextField
                        select
                        fullWidth
                        sx={{
                          display: 'flex',
                          width: '100px',
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
                      {isMobile ? (
                        // Modo Mobile: Select para os meses
                        <TextField
                          select
                          fullWidth
                          value={filtro.mes}
                          onChange={(e) => {
                            const selectedId = parseInt(e.target.value, 10);
                            handleSelected(selectedId);
                            setFiltro((prevFiltro) => ({
                              ...prevFiltro,
                              mes:
                                prevFiltro.mes === selectedId ? 0 : selectedId,
                            }));
                          }}
                          sx={{
                            '& .MuiInputBase-root': {
                              height: '32px',
                              width: '100px',
                              margin: 'auto',
                              padding: '0 12px',
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
                        <Box className="boxMes">
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
                                boxShadow:
                                  '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
                                transition: 'background-color 0.2s ease-in-out',
                                marginRight: '8px',
                                backgroundColor:
                                  selectedMes === item.id ? '#a00' : '#FFF',
                                color:
                                  selectedMes === item.id ? '#fff' : 'black',
                                '&:hover': {
                                  backgroundColor:
                                    selectedMes === item.id
                                      ? '#a00'
                                      : 'lightGray',
                                },
                              }}
                            >
                              {item.nome}
                            </Button>
                          ))}
                        </Box>
                      )}
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                        '@media (max-width: 600px)': {
                          justifyContent: 'center',
                        },
                      }}
                    >
                      <Button
                        onClick={handleClear}
                        variant="outlined"
                        sx={{
                          flexShrink: 0,
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
                        startIcon={<HighlightOffIcon />}
                      >
                        Limpar filtro
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                mt: '16px',
                display: 'flex',
                flexFlow: 'nowrap',
                minHeight: '300px',
                width: '100%',
              }}
            >
              <TabelaKpi dataTabela={data} handleFetch={handleFetch} />
            </Box>

            <Box
              sx={{
                mt: '16px',
                gap: '16px',
                display: 'flex',
                flexFlow: 'wrap',
              }}
            >
              <CardInventarioMes dataCard={dataCard} title={filtro} />
              <CardInventarioAno dataCard={dataCard} title={filtro.ano} />
              <Box className="boxGraficoRadial">
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    justifyContent: 'flex-start',
                    display: 'flex',
                  }}
                >
                  Inventário - Geral{' '}
                  {mesSelecionado ? mesSelecionado.nome : 'Mês inválido'}{' '}
                  {filtro.ano}
                </Typography>
                <GraficoRadialBar dataCard={dataCard} />
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '24px',
                width: '100%',
                mt: '16px',
                borderRadius: '18px',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                bgcolor: '#fff',
              }}
            >
              <Typography>Inventário Armazéns Geral</Typography>
              <GraficoInventario data={dataGrafico} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
