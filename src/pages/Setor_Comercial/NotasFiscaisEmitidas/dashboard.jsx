import React, { useState, useEffect, useCallback } from 'react';
import { apiFabricaApoio } from '../../../services/apis';
import './styles.css';
import { useToast } from '../../../hooks/toast.hook';

import { Box, Button, TextField, Typography, MenuItem } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DescriptionIcon from '@mui/icons-material/Description';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import TuneIcon from '@mui/icons-material/Tune';
dayjs.locale('pt-br');
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FormLabel from '@mui/material/FormLabel';
import Amvoxlogopng from '../../../assets/Amvoxlogopng.png';
import { useNavigate } from 'react-router';
import './styles.css';
import LayoutNovo from '../../../components/LayoutNovo';
import GraficoNotasFiscais from './components/GraficoDashboard';
import { graficoNotasExpedicao } from './dashboardNotasFiscais.service';

const ButtonTop = {
  borderRadius: '4px',
  border: '1px solid rgba(204, 204, 204, 0.80)',
  boxShadow: '1px 1px 3px 1px rgb(0 0 0 / 0.25)',
  backgroundColor: '#FFF',
  color: 'black',
  marginTop: '15px',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: '#F0F0F0',
  },
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
const mesAtual = new Date().getMonth() + 1;
const anoAtual = new Date().getFullYear();

const dataFiltro = {
  ano: 2024,
  mes: null,
};

export default function DashboardNotasFiscaisEmitidas() {
  const [numeroNotasFiscaisEmitidas, setNumeroNotasFiscaisEmitidas] = useState(
    []
  );
  const [selectedMes, setSelectedMes] = useState(null);

  const baseYear = new Date().getFullYear();
  const years = [baseYear - 1, baseYear];

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value, 10);
    setFiltro({ ano: year, mes: filtro.mes });
    setFiltroGrafico({ ano: year, mes: filtro.mes });
  };

  const [dadosDash, setDadosDash] = useState({});

  const [filtroGrafico, setFiltroGrafico] = useState(dataFiltro);

  const handleFetchGrafico = () => {
    graficoNotasExpedicao(filtroGrafico).then((res) => {
      setDadosDash(res.value);
    });
  };

  useEffect(() => {
    handleFetchGrafico();
  }, [filtroGrafico]);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/comercial/notasFiscaisEmitidas');
  };

  const { addToast } = useToast();

  const handleSelected = (id) => {
    setSelectedMes((prevSelectedMes) => (prevSelectedMes === id ? null : id));
  };

  const [filtro, setFiltro] = useState({
    ano: baseYear,
    mes: null,
  });

  useEffect(() => {
    handleFetchNotas();
  }, [filtro]);

  const handleFetchNotas = async () => {
    try {
      const response = await apiFabricaApoio.get(`Dashboard/NotasExpedicao`, {
        params: filtro,
      });
      setNumeroNotasFiscaisEmitidas(response.data.value);
    } catch (err) {
      addToast({
        type: 'danger',
        title: 'Erro !',
        description: 'Erro grave - não carregou Notas emitidas no mês !!',
      });
    }
  };

  const [openHistory, setOpenHistory] = useState(true);

  const openHist = () => {
    setOpenHistory(!openHistory);
  };

  function handleBack() {
    navigate(-1);
  }

  return (
    <>
      <Box position={'relative'} sx={{ backgroundColor: '#F2F2F2' }} gap={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pl: 4,
          }}
        >
          <IconButton onClick={handleBack}>
            <ChevronLeftIcon />
          </IconButton>
          <img src={Amvoxlogopng} alt="Amvox" className="imgAmvox"></img>
          <div
            className="tituloSec"
            style={{ cursor: 'pointer' }}
            onClick={handleNavigate}
          >
            Tabela
          </div>
          <div className="tituloPri">Dashboard</div>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              pr: 2,
            }}
          >
            <Box sx={{ display: 'flex', gap: 2, pr: 4, pb: 1 }}>
              <Button
                size="small"
                variant="outlined"
                sx={ButtonTop}
                startIcon={<TuneIcon />}
                onClick={openHist}
              >
                Filtros
              </Button>
            </Box>
          </Box>
        </Box>

        {openHistory ? (
          <div className="filtroDashNotaFiscal">
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
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex' }}>
                {meses
                  .filter(
                    (item) => filtro.ano < anoAtual || item.id <= mesAtual
                  )
                  .map((item) => (
                    <Button
                      key={item.id}
                      variant="contained"
                      onClick={() => {
                        handleSelected(item.id);
                        setFiltro((prevFiltro) => ({
                          ...prevFiltro,
                          mes: prevFiltro.mes === item.id ? 0 : item.id,
                        }));
                        setFiltroGrafico((prevFiltro) => ({
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
                        marginLeft: '8px',
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
          </div>
        ) : (
          ''
        )}
        <div className="divTotalNFDash">
          <div className="cardNfEmitidaDash">
            <Typography
              variant="h7"
              style={{
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {' '}
              Total de Notas Fiscais
              <DescriptionIcon />
            </Typography>
            <FormLabel
              style={{
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                fontSize: '24px',
                textAlign: 'left',
                color: 'black',
                marginTop: 'auto',
              }}
            >
              {numeroNotasFiscaisEmitidas.totalEmitidas}
            </FormLabel>
            <Box style={{ marginTop: 'auto' }}>
              Valor total:{' '}
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(numeroNotasFiscaisEmitidas.valorTotalNotas)}
            </Box>
          </div>
          <div className="cardNfEmitidaDash">
            <Typography
              variant="h7"
              style={{
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                textAlign: 'left',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {' '}
              Notas Expedidas
              <CheckCircleOutlinedIcon style={{ color: 'green' }} />
            </Typography>
            <FormLabel
              style={{
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                fontSize: '24px',
                textAlign: 'left',
                color: 'green',
                marginTop: 'auto',
              }}
            >
              {numeroNotasFiscaisEmitidas.totalNotasExpedidas}
            </FormLabel>
            <Box style={{ marginTop: 'auto' }}>
              Valor total:{' '}
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(numeroNotasFiscaisEmitidas.valorTotalNotasExpedidas)}
            </Box>
          </div>
          <div className="cardNfEmitidaDash">
            <Typography
              variant="h7"
              style={{
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {' '}
              Notas não expedidas
              <WarningAmberIcon style={{ color: 'red' }} />
            </Typography>
            <FormLabel
              style={{
                // textAlign: 'center',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                fontSize: '24px',
                textAlign: 'left',
                color: 'red',
                marginTop: 'auto',
              }}
            >
              {numeroNotasFiscaisEmitidas.totalNotasNaoExpedidas}
            </FormLabel>
            <Box style={{ marginTop: 'auto' }}>Notas pendentes</Box>
          </div>
          <div className="cardNfEmitidaDash">
            <Typography
              variant="h7"
              style={{
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {' '}
              Valor notas não expedidas
              <WarningAmberIcon style={{ color: 'red' }} />
            </Typography>

            <FormLabel
              style={{
                // textAlign: 'center',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                fontSize: '24px',
                textAlign: 'left',
                marginTop: 'auto',
                color: 'red',
              }}
            >
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(numeroNotasFiscaisEmitidas.valorTotalNotasNaoExpedidas)}
            </FormLabel>
            <Box style={{ marginTop: 'auto' }}>Valor total</Box>
          </div>
        </div>

        <div className="divGeralNotasEmitidas">
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              maxWidth: '2200px',
              height: '700px',
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
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                color: '#5C5C5C',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal',
              }}
            >
              <Box>Notas Fiscais</Box>
              <Box sx={{ flexDirection: 'row', display: 'flex', gap: '8px' }}>
                <Box sx={{ display: 'flex', gap: '4px' }}>
                  <Box>
                    <Brightness1Icon sx={{ color: '#6FD195' }} />
                  </Box>
                  <Box>Expedidas</Box>
                </Box>
                <Box sx={{ display: 'flex', gap: '4px' }}>
                  <Box>
                    <Brightness1Icon sx={{ color: '#ffa8a8' }} />
                  </Box>
                  <Box>Não Expedidas</Box>
                </Box>
              </Box>
            </Box>

            <GraficoNotasFiscais data={dadosDash} />
          </Box>
        </div>
      </Box>
    </>
  );
}
