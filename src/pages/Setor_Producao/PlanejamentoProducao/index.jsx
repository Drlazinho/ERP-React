import React, { useEffect, useState } from 'react';
import './styles.css';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Button,
  Typography,
  Alert,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { IconButton } from '@mui/material';
import Amvoxlogopng from '@/assets/Amvoxlogopng.png';
import ModalRegistro from './ModalRegistro';
import { ModalRegistroProdutos } from './ModalRegistroProdutos';
import { useToast } from '@/hooks/toast.hook';
import TabelaPlanejamento from './tabela';
import Loader from '@/components/Loader';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import xVermelho from '@/assets/xVermelho.svg';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import {
  RegistrarApontamentoFinal,
  ConsultarPlanejamento,
  ConsultaProdutos,
  ConsultarPlanejamentoId,
} from '@/pages/Setor_Producao/PlanejamentoProducao/services/planejamentoProducao.service';
import HeaderAmvox from '@/components/HeaderAmvox';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';

export default function PlanejamentoProducao() {
  const [produtosLista, setProdutosLista] = useState([]);
  const [planejamentoProducaoLista, setPlanejamentoProducaoLista] = useState({
    produtos: [],
    executado: 0,
    planejado: 0,
  });
  const [modal1Aberto, setModal1Aberto] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isComfirmed, setIsComfirmed] = useState(false);
  const [filtro, setFiltro] = useState({
    Semana: '',
    PeriodoInicio: '',
    PeriodoFim: '',
    CodigoProduto: '',
    NomeProduto: '',
  });

  const [semanasOptions, setSemanasOptions] = useState([]);

  const [subRowData, setSubRowData] = useState({});

  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleAbrirModal1 = () => {
    setModal1Aberto(true);
  };

  const handleCadastrarProduto = async (formData) => {
    setIsLoading(true);
    try {
      await RegistrarApontamentoFinal(formData);
      addToast({
        type: 'success',
        title: 'Registro efetuado.',
        description: 'Quantidade produzida foi registrada com sucesso.',
      });
      setIsLoading(false);
      setIsComfirmed(true);
      setTimeout(() => setIsComfirmed(false), 3000);
      setModal1Aberto(false);
      handleFetchAtt();
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro ao registrar planejamento',
        description: '',
      });

      setIsLoading(false);
    }
  };

  const extractSemanasFromData = (data) => {
    if (!data || !data.listaPlanejamento) return [];

    const semanasUnicas = data.listaPlanejamento.reduce((acc, item) => {
      if (!acc.includes(item.semana_Ano)) {
        acc.push(item.semana_Ano);
      }
      return acc;
    }, []);

    return semanasUnicas.sort((a, b) => a - b);
  };

  const handleConsultarProdutos = () => {
    ConsultaProdutos()
      .then((res) => {
        setProdutosLista(res);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao consultar produtos',
          description: '',
        });
      });
  };

  const handleFetchAtt = () => {
    const filtroTratado = {
      Semana: filtro.Semana,
      PeriodoInicio: filtro.PeriodoInicio
        ? new Date(filtro.PeriodoInicio).toISOString()
        : undefined,
      PeriodoFim: filtro.PeriodoFim
        ? new Date(filtro.PeriodoFim).toISOString()
        : undefined,
      CodigoProduto: filtro.CodigoProduto,
      NomeProduto: filtro.NomeProduto,
    };

    ConsultarPlanejamento(filtroTratado)
      .then((res) => {
        setPlanejamentoProducaoLista({
          produtos: res.listaPlanejamento,
          executado: res.executado,
          planejado: res.planejado,
        });

        const semanas = extractSemanasFromData(res);
        setSemanasOptions(semanas);

        setLoading(false);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao consultar planejamento',
          description: '',
        });
      });
  };

  const fetchSubRowData = async (id, filtro) => {
    const filtroTratado = {
      Semana: filtro.Semana,
      PeriodoInicio: filtro.PeriodoInicio
        ? new Date(filtro.PeriodoInicio).toISOString()
        : undefined,
      PeriodoFim: filtro.PeriodoFim
        ? new Date(filtro.PeriodoFim).toISOString()
        : undefined,
      CodigoProduto: filtro.CodigoProduto,
      NomeProduto: filtro.NomeProduto,
    };

    try {
      const res = await ConsultarPlanejamentoId(id, filtroTratado);
      setSubRowData((prev) => ({ ...prev, [id]: res }));
    } catch (error) {}
  };

  const handleLimparFiltro = () => {
    setFiltro({
      Semana: '',
      PeriodoInicio: '',
      PeriodoFim: '',
      CodigoProduto: '',
      NomeProduto: '',
    });
    setSemanasOptions([]);
    handleFetchAtt();
  };

  useEffect(() => {
    handleFetchAtt();
    handleConsultarProdutos();
  }, [filtro]);

  useEffect(() => {
    if (planejamentoProducaoLista.produtos.length > 0) {
      const semanas = extractSemanasFromData({
        listaPlanejamento: planejamentoProducaoLista.produtos,
      });
      setSemanasOptions(semanas);
    }
  }, [planejamentoProducaoLista.produtos]);

  return (
    <>
      <Box className="Principal">
        <Box
          position={'relative'}
          sx={{ backgroundColor: '#FAFAFA' }}
          gap={2}
          padding={'32px'}
        >
          <Box position={'relative'}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                pr: 2,
              }}
            >
              <Box
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  display: 'flex',
                  width: '100%',
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
                    title="Planejamento de Produção"
                    onBack={() => navigate(-1)}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  {isLoading && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '1px solid #AA0000',
                        color: '#AA0000',
                        padding: ' 8px',
                        borderRadius: '4px',
                        gap: '8px',
                        width: '200px',
                      }}
                    >
                      <img src={xVermelho} alt="Amvox"></img>
                      <Typography sx={{ fontWeight: 'bold' }}>
                        Carregando...
                      </Typography>
                    </Box>
                  )}
                  {isComfirmed && (
                    <Alert variant="filled" severity="success">
                      Planejamento confirmado!
                    </Alert>
                  )}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'flex-end',
                    gap: '8px',
                  }}
                >
                  <Button
                    sx={{
                      padding: '4px 16px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontFamily: 'Poppins, sans-serif',
                      borderRadius: '4px',
                      border: '1px solid rgba(0, 0, 0, 0.10)',
                      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                      color: '#333',

                      transition:
                        'background-color 0.5s ease, transform 0.3s ease-in-out',
                      '&:hover': {
                        border: '1px solid rgba(0, 0, 0, 0.10)',
                        transform: 'scale(1.1)',
                        fontFamily: 'Poppins, sans-serif',
                        transition:
                          'background-color 0.5s ease, transform 0.3s ease-in-out',
                      },
                    }}
                    variant="outlined"
                    onClick={handleFetchAtt}
                    startIcon={
                      <AutorenewIcon sx={{ width: '24px', height: '24px' }} />
                    }
                  >
                    Atualizar
                  </Button>
                  <Button
                    onClick={handleAbrirModal1}
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<PlaylistAddIcon />}
                    type="reset"
                  >
                    Registrar
                  </Button>

                  <ModalRegistroProdutos
                    produtosLista={produtosLista}
                    handleAtt={handleFetchAtt}
                    open={modal1Aberto}
                    onClose={() => setModal1Aberto(false)}
                    handleSubmit={handleCadastrarProduto}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: '16px' }}>
              <Box
                sx={{
                  display: 'flex',
                  padding: '24px 32px',
                  gap: '16px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  backgroundColor: '#fff',
                  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                  flexDirection: 'column',
                  width: '50%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      display: 'flex',
                      fontFamily: 'Poppins, sans-serif',
                      color: '#666',
                      fontStyle: 'normal',
                      fontWeight: '400',
                    }}
                  >
                    Filtro
                  </Typography>
                  <Button
                    sx={{
                      padding: '4px 16px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontFamily: 'Poppins, sans-serif',
                      borderRadius: '4px',
                      border: '1px solid rgba(0, 0, 0, 0.10)',
                      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                      color: '#333',
                      transition:
                        'background-color 0.5s ease, transform 0.3s ease-in-out',
                      '&:hover': {
                        border: '1px solid rgba(0, 0, 0, 0.10)',
                        transform: 'scale(1.1)',
                        fontFamily: 'Poppins, sans-serif',
                        transition:
                          'background-color 0.5s ease, transform 0.3s ease-in-out',
                      },
                    }}
                    variant="outlined"
                    onClick={handleLimparFiltro}
                    startIcon={
                      <ChevronLeftIcon sx={{ width: '24px', height: '24px' }} />
                    }
                  >
                    Limpar
                  </Button>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: { xs: 2, md: 3 },
                    alignItems: 'end',
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    label="Código produto"
                    variant="outlined"
                    size="small"
                    value={filtro.CodigoProduto}
                    onChange={(e) =>
                      setFiltro((prev) => ({
                        ...prev,
                        CodigoProduto: e.target.value,
                      }))
                    }
                    sx={{ minWidth: { xs: '100%', sm: 300 }, flex: 1 }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Nome produto"
                    variant="outlined"
                    size="small"
                    value={filtro.NomeProduto}
                    onChange={(e) =>
                      setFiltro((prev) => ({
                        ...prev,
                        NomeProduto: e.target.value,
                      }))
                    }
                    sx={{ minWidth: { xs: '100%', sm: 300 }, flex: 1 }}
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 1,
                      flex: 1,
                      minWidth: { sm: 350 },
                    }}
                  >
                    <InputDateAmvox
                      label="De"
                      value={filtro.PeriodoInicio}
                      onChange={(data) =>
                        setFiltro((prev) => ({ ...prev, PeriodoInicio: data }))
                      }
                    />
                    <InputDateAmvox
                      label="Até"
                      value={filtro.PeriodoFim}
                      onChange={(data) =>
                        setFiltro((prev) => ({ ...prev, PeriodoFim: data }))
                      }
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      minWidth: { xs: '100%', sm: 'auto' },
                    }}
                  >
                    <InputLabel id="semana-select-label">Semana</InputLabel>
                    <Select
                      labelId="semana-select-label"
                      id="semana-select"
                      value={filtro.Semana}
                      label="Semana"
                      sx={{ minWidth: 100, height: 40 }}
                      disabled={!filtro.PeriodoFim}
                      onChange={(e) =>
                        setFiltro((prev) => ({
                          ...prev,
                          Semana: e.target.value,
                        }))
                      }
                    >
                      <MenuItem value="">
                        <em>Todas</em>
                      </MenuItem>
                      {semanasOptions.map((semana) => (
                        <MenuItem key={semana} value={semana}>
                          {semana}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </Box>
              </Box>
              <Box className="boxCard">
                <PrecisionManufacturingIcon
                  sx={{
                    bgcolor: 'green',
                    color: '#fff',
                    borderRadius: '10px',
                    width: '50px',
                    height: '50px',
                    padding: '10px',
                  }}
                />
                <Box sx={{ flexDirection: 'column' }}>
                  <Typography
                    sx={{
                      display: 'flex',
                      fontFamily: 'Poppins, sans-serif',
                      color: '#666',
                      fontStyle: 'normal',
                      fontWeight: '400',
                    }}
                  >
                    Quantidade Planejada
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      display: 'flex',
                      fontFamily: 'Poppins, sans-serif',
                      color: '#333',
                      fontStyle: 'normal',
                      fontWeight: '700',
                    }}
                  >
                    {planejamentoProducaoLista.planejado.toLocaleString(
                      'pt-BR'
                    )}
                  </Typography>
                </Box>
              </Box>
              <Box className="boxCard">
                <DoneOutlineIcon
                  sx={{
                    bgcolor: 'green',
                    color: '#fff',
                    borderRadius: '10px',
                    width: '50px',
                    height: '50px',
                    padding: '10px',
                  }}
                />
                <Box sx={{ flexDirection: 'column' }}>
                  <Typography
                    sx={{
                      display: 'flex',
                      fontFamily: 'Poppins, sans-serif',
                      color: '#666',
                      fontStyle: 'normal',
                      fontWeight: '400',
                    }}
                  >
                    Quantidade Executada{' '}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      display: 'flex',
                      fontFamily: 'Poppins, sans-serif',
                      color: '#333',
                      fontStyle: 'normal',
                      fontWeight: '700',
                    }}
                  >
                    {planejamentoProducaoLista.executado.toLocaleString(
                      'pt-BR'
                    )}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            margin={1}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
          >
            {loading ? (
              <Loader />
            ) : (
              <Box
                sx={{
                  borderRadius: '16px',
                  width: '100%',
                  mt: '16px',
                }}
              >
                <TabelaPlanejamento
                  listaPlanejamento={planejamentoProducaoLista.produtos}
                  handleAtt={handleFetchAtt}
                  fetchSubRowData={fetchSubRowData}
                  subRowData={subRowData}
                  produtosLista={produtosLista}
                  filtro={filtro}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
