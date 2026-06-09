import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  useMediaQuery,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import HeaderAmvox from '@/components/HeaderAmvox';
import { FormLabel as MuiFormLabel } from '@mui/material';
import { IconButton } from '@mui/material';
import './styles.css';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import xVermelho from '@/assets/xVermelho.svg';
import { People } from '@mui/icons-material';
import {
  GetNps,
  GetIndicadores,
  GetDataUr,
  GetRelatorioAnual,
} from '@/pages/Setor_PosVenda/KpisPosVenda/KpisPosVenda.service';
import AddIcon from '@mui/icons-material/Add';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ModalRegistroNps from './ModalRegistroNps';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router';
import CircleIcon from '@mui/icons-material/Circle';
import GraficoUltimosMesesCsat from './Graficos/GraficoUltimosMesesCsat';
import GroupIcon from '@mui/icons-material/Group';
import GraficoCsat from './Graficos/GraficoCsat';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TabelaIndicadoresNps from './TabelaIndicadoresNps/TabelaIndicadoresNps';
import GraficoUltimosMesesNps from './Graficos/GraficoUltimosMesesNps';
import HandymanIcon from '@mui/icons-material/Handyman';
import CircularProgressWithColorX from '@/components/CircularProgressWithColorX';
import ExcelIcon from '@/assets/excelimg.png';

const interfaceObj = [
  {
    csat: null,
    dataRegistro: null,
    mediaCSAT: null,
    nps: null,
    usuario: null,
  },
];

const interfaceUR = {
  promotores: 0,
  porcentagemPromotores: '',
  detratores: 0,
  porcentagemDetratores: '',
  passivos: 0,
  porcentagemPassivos: '',
  valorNPS: '',
};

const interfaceIndicadores = {
  indicadorNPS: null,
  mediaIndicadorCSAT: null,
  porcentagemIndicadorCSAT: null,
  mediaCanalAtendimento: null,
  porcentagemCanalAtendimento: null,
  mediaAtendimento: null,
  porcentagemAtendimento: null,
  mediaColetaEntrega: null,
  porcentagemColetaEntrega: null,
  mediaAssistenciaTecnica: null,
  porcentagemAssistenciaTecnica: null,
  mediaSatisfacaoProduto: null,
  porcentagemSatisfacaoProduto: null,
};

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

export default function KpisPosVenda() {
  const [dataObj, setDataObj] = useState(interfaceObj);
  const [dataUr, setDataUr] = useState(interfaceUR);
  const [indicadores, setIndicadores] = useState(interfaceIndicadores);
  const baseYear = new Date().getFullYear();
  const years = [baseYear - 1, baseYear];
  const [filtro, setFiltro] = useState({
    ano: baseYear,
    mes: new Date().getMonth() + 1,
  });
  const navigate = useNavigate();
  const [modalShow, setShowModal] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const [selectedMes, setSelectedMes] = useState(null);

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setFiltro({ ano: year, mes: filtro.mes });
  };

  const handleShow = () => {
    setShowModal(!modalShow);
  };

  const openHist = () => {
    setOpenHistory(!openHistory);
  };

  const handleFetch = () => {
    GetNps().then((res) => {
      setDataObj(res);
    });
    GetIndicadores(filtro).then((res) => {
      setIndicadores(res);
    });
    GetDataUr(filtro).then((res) => {
      setDataUr(res);
    });
  };

  const handleGetRelatorio = async () => {
    try {
      const res = await GetRelatorioAnual(filtro.ano);
      const url = window.URL.createObjectURL(new Blob([res]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `Relatorio-Indicadores-NPS-CSAT-${filtro.ano}.xlsx`
      );

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error(error, 'ocorreu um erro');
    }
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

  function ConverterStringParaFloat(numeroString) {
    const converterStringParaFloat = (numeroString) => {
      const numeroSemPontos = numeroString.replace(/\./g, '');
      const numeroComPonto = numeroSemPontos.replace(',', '.');
      const numeroFloat = parseFloat(numeroComPonto);
      return numeroFloat;
    };

    const numeroFloat = converterStringParaFloat(numeroString);
    return numeroFloat;
  }

  const formatarPorcentagem = (valor) => {
    const numero =
      typeof valor === 'string'
        ? parseFloat(valor.replace(',', '.'))
        : Number(valor) || 0;

    if (Number.isInteger(numero)) {
      return `${numero}`;
    }

    return `${numero.toFixed(1)}`;
  };

  const isMobile = useMediaQuery('(max-width:600px)');

  const {
    promotores = 0,
    porcentagemPromotores = 0,
    passivos: neutros = 0,
    porcentagemPassivos: porcentagemNeutros = 0,
    detratores = 0,
    porcentagemDetratores = 0,
    totalRespondentes = 0,
  } = dataUr || {};

  const data = [
    {
      label: 'Promotores',
      value: promotores,
      percentage: `${formatarPorcentagem(porcentagemPromotores)}%`,
      icon: <People style={{ color: '#00C853' }} />,
    },
    {
      label: 'Neutros',
      value: neutros,
      percentage: `${formatarPorcentagem(porcentagemNeutros)}%`,
      icon: <People style={{ color: '#FFAB00' }} />,
    },
    {
      label: 'Detratores',
      value: detratores,
      percentage: `${formatarPorcentagem(porcentagemDetratores)}%`,
      icon: <People style={{ color: '#D50000' }} />,
    },
    {
      label: 'Total de Respondentes',
      value: totalRespondentes,
      percentage: '',
      icon: <People style={{ color: '#616161' }} />,
    },
  ];

  return (
    <>
      <ModalRegistroNps
        open={modalShow}
        onClose={handleShow}
        handleAtualizarLista={handleFetch}
      />
      <Box
        position={'relative'}
        sx={{ backgroundColor: '#F2F2F2', width: '100%', margin: '0 auto' }}
        gap={2}
      >
        <Box
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Box className="header">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 2,
              }}
            >
              <HeaderAmvox title="KPIs PósVenda" onBack={() => navigate(-1)} />
            </Box>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'flex-end',
                paddingRight: '40px',
              }}
            >
              <label
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Última atualização
              </label>
              <label
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                {dataObj[0].dataRegistro}
              </label>
            </div>
          </Box>
        </Box>

        <div className="divGeralKPI">
          <div className="divConsultarKPI">
            <div className="divSelects">
              {/* ano */}
              <Box
                sx={{
                  display: 'flex',
                  width: '100px',
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
              {/* meses */}
              <Box sx={{ display: 'flex', width: '100%' }}>
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
                        mes: prevFiltro.mes === selectedId ? 0 : selectedId,
                      }));
                    }}
                    sx={{
                      '& .MuiInputBase-root': {
                        height: '32px',
                        width: 'auto',
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
                  // Modo Desktop: Botões para os meses
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
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
                          marginRight: '16px',
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
                )}
              </Box>
              {/* Botões excel e registrar */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '16px',
                  flexDirection: { xs: 'column', md: 'row', lg: 'row' },
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<img src={ExcelIcon} alt="Excel logo"></img>}
                  onClick={handleGetRelatorio}
                  sx={{
                    display: 'flex',
                    width: '220px',
                    height: '35px',
                    color: 'black',
                    padding: '8px',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '8px',
                    border: '1px solid var(--Neutro-N90, #9D9D9D)',
                    boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  Relatório Anual
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddIcon />}
                  sx={{
                    backgroundColor: '#AA0000',
                    minWidth: '60px',
                    height: '35px',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#F77B7B',
                    },
                    fontFamily: 'Poppins, sans-serif',
                  }}
                  onClick={handleShow}
                >
                  Registrar
                </Button>
              </Box>
            </div>
          </div>
        </div>

        <div className="divMetricas ">
          {/* Card 01 */}
          <div className="item01">
            <div className="indicadorNps ">
              <div className="LabelSuperiorNps">
                <span
                  style={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '28px',
                  }}
                >
                  NPS
                </span>
              </div>
              {/* <GraficoNPS filtroData={filtro} />
                    <span
                      style={{
                        fontWeight: 'bold',
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: '24px',
                      }}
                    >
                      Total: {dataUr.valorNPS}%
                    </span> */}
              {dataUr.valorNPS ? (
                <CircularProgressWithColorX
                  value={ConverterStringParaFloat(dataUr.valorNPS)}
                  cor={'#01AE3B'}
                  noDecimal
                />
              ) : (
                <Typography sx={{ fontWeight: 'bold', color: '#333' }}>
                  Não foi encontrado registro de indicadores para esse
                  intervalo.
                </Typography>
              )}
            </div>
          </div>
          {/* Card 02 */}
          <div className="item02">
            <div className="cardIndicadorCsat">
              <>
                <MuiFormLabel
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '28px',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Satisfação Geral
                </MuiFormLabel>
                <Box
                  sx={{
                    width: { xs: '300px', sm: '400px' },
                  }}
                >
                  <GraficoCsat filtroData={filtro} />
                </Box>
              </>
            </div>
          </div>
          {/* Card 03 */}
          <div className="item03">
            <div className="cardCsatMedia">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#FAFAFE',
                  border: '1px solid #C9D2FF',
                  width: '100%',
                  borderRadius: '16px 16px 0px 0px',
                }}
              >
                <MuiFormLabel
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '28px',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Satisfação Geral
                </MuiFormLabel>
                <MuiFormLabel
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Médias
                </MuiFormLabel>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <div
                  style={{
                    paddingTop: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <label className="labelCsat">Percentual: </label>

                  <label
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '24px',
                      marginTop: '8px',
                    }}
                  >
                    {formatarPorcentagem(
                      indicadores.porcentagemIndicadorCSAT
                    ) || 0}
                    %
                  </label>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderTop: '1px solid #C9D2FF',
                    height: '100%',
                    marginTop: '-15px',
                  }}
                >
                  <label className="labelCsat" style={{ paddingTop: '15px' }}>
                    Geral:{' '}
                  </label>

                  <label
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '24px',
                      marginTop: '8px',
                    }}
                  >
                    {indicadores.mediaIndicadorCSAT || 0}%
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Card04 */}
          <div className="item04">
            <div className="pnd">
              <TableContainer
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  overflow: 'auto',
                }}
              >
                <Table sx={{ border: 'none' }} size="small">
                  <TableHead>
                    <TableRow sx={{ border: 'none' }}>
                      <TableCell sx={{ border: 'none' }}></TableCell>
                      <TableCell sx={{ border: 'none' }}>Categoria</TableCell>
                      <TableCell align="center" sx={{ border: 'none' }}>
                        Quantidade
                      </TableCell>
                      <TableCell align="center" sx={{ border: 'none' }}>
                        %
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow key={index} sx={{ border: 'none' }}>
                        <TableCell sx={{ border: 'none' }}>
                          {item.icon}
                        </TableCell>
                        <TableCell sx={{ border: 'none' }}>
                          {item.label}
                        </TableCell>
                        <TableCell align="center" sx={{ border: 'none' }}>
                          {item.value}
                        </TableCell>
                        <TableCell align="center" sx={{ border: 'none' }}>
                          {item.percentage}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          {/* Card 05 */}
          <div className="item05">
            <div className="cardFrameW ">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#FAFAFE',
                  border: '1px solid #C9D2FF',
                  width: '100%',
                  borderRadius: '16px 16px 0px 0px',
                  alignItems: 'center',
                  paddingTop: '8px',
                }}
              >
                <LocalPhoneIcon sx={{ color: 'grey' }} />
                <label
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '20px',
                  }}
                >
                  {'Canal de Atendimento'}
                </label>
              </div>
              <label className="labelCardPercent">
                {formatarPorcentagem(indicadores.porcentagemCanalAtendimento) ||
                  0}
                %
              </label>
              <label
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  borderTop: '1px solid #C9D2FF',
                  paddingTop: '15px',
                }}
              >
                {' '}
                Média {indicadores.mediaCanalAtendimento || 0}
              </label>
            </div>
          </div>

          {/* Card 06 */}
          <div className="item06">
            <div className="cardFrameW ">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#FAFAFE',
                  border: '1px solid #C9D2FF',
                  width: '100%',
                  borderRadius: '16px 16px 0px 0px',
                  alignItems: 'center',
                  paddingTop: '8px',
                }}
              >
                <RecentActorsIcon sx={{ color: 'grey' }} />
                <label
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '20px',
                  }}
                >
                  {'Atendente'}
                </label>
              </div>
              <label className="labelCardPercent">
                {formatarPorcentagem(indicadores.porcentagemAtendimento) || 0}%
              </label>
              <label
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  borderTop: '1px solid #C9D2FF',
                  paddingTop: '15px',
                }}
              >
                Média {indicadores.mediaAtendimento || 0}
              </label>
            </div>
          </div>

          {/* Card 07 */}
          <div className="item07">
            <div className="cardFrameW ">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#FAFAFE',
                  border: '1px solid #C9D2FF',
                  width: '100%',
                  borderRadius: '16px 16px 0px 0px',
                  alignItems: 'center',
                  paddingTop: '8px',
                }}
              >
                <LocalShippingIcon sx={{ color: 'grey' }} />
                <label
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '20px',
                  }}
                >
                  {'Coleta/Entrega'}
                </label>
              </div>
              <label className="labelCardPercent">
                {formatarPorcentagem(indicadores.porcentagemColetaEntrega) || 0}
                %
              </label>
              <label
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  borderTop: '1px solid #C9D2FF',
                  paddingTop: '15px',
                }}
              >
                Média {indicadores.mediaColetaEntrega || 0}
              </label>
            </div>
          </div>

          {/* Card 08 */}
          <div className="item08">
            <div className="cardFrameW ">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#FAFAFE',
                  border: '1px solid #C9D2FF',
                  width: '100%',
                  borderRadius: '16px 16px 0px 0px',
                  alignItems: 'center',
                  paddingTop: '8px',
                }}
              >
                <HandymanIcon sx={{ color: 'grey' }} />
                <label
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '20px',
                  }}
                >
                  {'Assistencia Técnica'}
                </label>
              </div>
              <label className="labelCardPercent">
                {formatarPorcentagem(
                  indicadores.porcentagemAssistenciaTecnica
                ) || 0}
                %
              </label>
              <label
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  borderTop: '1px solid #C9D2FF',
                  paddingTop: '15px',
                }}
              >
                Média {indicadores.mediaAssistenciaTecnica || 0}
              </label>
            </div>
          </div>
          {/* </div> */}

          {/* Card 09 */}
          <div className="item09">
            <div className="ultimosmesesNps ">
              <div className="graph">
                <GraficoUltimosMesesNps />
              </div>
            </div>
          </div>
          {/* Card 10 */}
          <div className="item10">
            <div className="ultimosmesesCsat ">
              <div className="graph">
                <GraficoUltimosMesesCsat />
              </div>
            </div>
          </div>

          {/* Card 11 */}
          <div className="item11">
            <div className="cardFrameS">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: '#FFFFFF',
                  border: '1px solid #95DCB1',
                  width: '100%',
                  borderRadius: '16px 16px 0px 0px',
                  alignItems: 'center',
                  paddingTop: '8px',
                }}
              >
                <LocalActivityIcon sx={{ color: 'grey' }} />
                <label
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '20px',
                  }}
                >
                  {'Satisfação Produto'}
                </label>
              </div>
              <label className="labelCardPercent">
                {formatarPorcentagem(
                  indicadores.porcentagemSatisfacaoProduto
                ) || 0}
                %
              </label>
              <label
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  borderTop: '1px solid #95DCB1',
                  paddingTop: '15px',
                }}
              >
                Média {indicadores.mediaSatisfacaoProduto || 0}
              </label>
            </div>
          </div>
        </div>

        <Box
          margin={1}
          paddingTop={3}
          justifyContent={'center'}
          alignItems={'center'}
          gap={2}
          pr={4}
          pl={4}
        >
          <label
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 'bold' }}
          >
            Visualizar histórico
          </label>
          <IconButton size="small" onClick={openHist}>
            {openHistory ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
          </IconButton>
          {openHistory ? <TabelaIndicadoresNps data={dataObj} /> : ''}
        </Box>
        <Box
          margin={1}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={2}
        ></Box>
      </Box>
    </>
  );
}
