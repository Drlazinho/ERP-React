import React, { useState, useCallback, useEffect } from 'react';
import HeaderAmvox from '@/components/HeaderAmvox';
import { useNavigate } from 'react-router';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { RiFileExcel2Fill } from 'react-icons/ri';
import {
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import equipe from './DadosMock';
import {
  fetchRelatorioPeriodo,
  postRelatorioApontamentos,
} from '@/pages/Setor_Inteligencia/RelatorioApontamentos/relatorioApontamentos.service';
import { useToast } from '@/hooks/toast.hook';
import { consultaSetores } from '@/services/setores/setores.service';

const RelatorioApontamentos = () => {
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { addToast } = useToast();
  const handleLogoClick = () => navigate(-1);
  const [filtro, setFiltro] = useState({
    dataInicial: '',
    dataFinal: '',
    equipe: '',
  });

  const [filtro1, setFiltro1] = useState({
    dataInicial: '',
    dataFinal: '',
    setor: '',
  });
  const [setores, setSetores] = useState([]);

  const handleLimparFiltro = useCallback(() => {
    setFiltro({
      dataInicial: '',
      dataFinal: '',
      equipe: '',
    });
  }, []);

  const handleLimparFiltro1 = useCallback(() => {
    setFiltro1({
      dataInicial: '',
      dataFinal: '',
      setor: '',
    });
  }, []);

  const handleGetSetores = () => {
    consultaSetores()
      .then((response) => {
        setSetores(response || []);
      })
      .catch((error) => {
        console.error('Erro ao buscar setores:', error);
        setSetores([]);
        addToast({
          type: 'danger',
          description: 'Erro ao buscar setores',
        });
      });
  };

  const formatarData = (data) => {
    if (!data) return '';

    if (data.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return `${data}T00:00:00`;
    }

    if (data.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      const [dia, mes, ano] = data.split('/');
      return `${ano}-${mes}-${dia}T00:00:00`;
    }

    return '';
  };

  const handleGetRelatorioSetor = () => {
    const filtroFormatado = {
      ...filtro1,
      dataInicial: formatarData(filtro1.dataInicial),
      dataFinal: formatarData(filtro1.dataFinal),
    };

    fetchRelatorioPeriodo(filtroFormatado)
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'relatorio-apontamentos.xlsx');
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.error('Erro ao baixar relatório:', error);
      });
  };

  const handleGetRelatorio = useCallback(async () => {
    if (!filtro.dataInicial || !filtro.dataFinal || !filtro.equipe) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      const res = await postRelatorioApontamentos(filtro);
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `Relatorio-Apontamentos-${filtro.equipe}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShowSuccessMessage(true);
    } catch (error) {
      addToast({
        type: 'danger',
        description: 'Erro ao gerar relatorio',
      });
    }
  }, [filtro]);

  useEffect(() => {
    handleGetSetores();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Poppins, sans-serif',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: '24px',
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
            <HeaderAmvox title="Relatório" onBack={() => navigate(-1)} />
          </Box>
          {showSuccessMessage && (
            <Snackbar
              open={showSuccessMessage}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              onClose={() => setShowSuccessMessage(false)}
              autoHideDuration={5000}
            >
              <Alert
                onClose={() => setShowSuccessMessage(false)}
                variant="outlined"
                severity="success"
                sx={{
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  fontFamily: 'Poppins',
                }}
              >
                Relatório exportado.
              </Alert>
            </Snackbar>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            width: '100%',
            marginBottom: '24px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bolder',
              color: '#333333',
              fontSize: '25px',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Relatório de Apontamento:
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            width: '100%',
          }}
        >
          <TextField
            label="Data Inicial"
            type="date"
            size="small"
            sx={{
              backgroundColor: '#fff',
              display: 'flex',
              flex: '1 2 ',
              width: '225px',
              '& .MuiInputBase-root': {
                height: '48px',
                borderRadius: '8px',
                '&:focus-within': {
                  border: '1px solid lightgray',
                },
              },
            }}
            value={filtro.dataInicial}
            onChange={(e) =>
              setFiltro({
                ...filtro,
                dataInicial: e.target.value,
              })
            }
            slotProps={{
              inputLabel: {
                shrink: true,
                sx: {
                  color: '#333333',
                  fontSize: '16px',
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Data Final"
            type="date"
            size="small"
            sx={{
              backgroundColor: '#fff',
              display: 'flex',
              flex: '1 2',
              '& .MuiInputBase-root': {
                height: '48px',
                borderRadius: '8px',
                '&:focus-within': {
                  border: '1px solid lightgray',
                },
              },
            }}
            value={filtro.dataFinal}
            onChange={(e) =>
              setFiltro({
                ...filtro,
                dataFinal: e.target.value,
              })
            }
            slotProps={{
              inputLabel: {
                shrink: true,
                sx: {
                  color: '#333333',
                  fontSize: '16px',
                },
              },
            }}
          />
          <FormControl sx={{ flex: '3 1 ' }}>
            <InputLabel id="select-equipe-label" shrink>
              Equipe
            </InputLabel>
            <Select
              size="small"
              label="Equipe"
              labelId="select-equipe-label"
              value={filtro.equipe}
              onChange={(e) =>
                setFiltro({
                  ...filtro,
                  equipe: e.target.value,
                })
              }
              displayEmpty
              sx={{
                flex: '3 1 ',
                height: '48px',
                borderRadius: '8px',
                backgroundColor: '#fff',
                '& .MuiInputBase-root': {
                  height: '48px',
                  borderRadius: '8px',
                  '&:focus-within': {
                    border: '1px solid lightgray',
                  },
                },
              }}
            >
              <MenuItem value="" disabled>
                Selecione
              </MenuItem>
              {equipe.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            startIcon={<CleaningServicesIcon />}
            onClick={handleLimparFiltro}
            variant="outlined"
            color="inherit"
            size="large"
            sx={{ flex: '1 3', fontWeight: 'bold' }}
          >
            Limpar filtros
          </Button>

          <Button
            type="button"
            variant="contained"
            color="success"
            size="large"
            onClick={handleGetRelatorio}
            sx={{
              textTransform: 'capitalize',
              color: '#fff',
              flex: '1 3',
              fontWeight: 'bold',
              justifyContent: 'center',
              width: 'auto',
            }}
            startIcon={<RiFileExcel2Fill size={20} color="white" />}
          >
            {'EXPORTAR EXCEL'}{' '}
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Poppins, sans-serif',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: '24px',
          }}
        >
          {showSuccessMessage && (
            <Snackbar
              open={showSuccessMessage}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              onClose={() => setShowSuccessMessage(false)}
              autoHideDuration={5000}
            >
              <Alert
                onClose={() => setShowSuccessMessage(false)}
                variant="outlined"
                severity="success"
                sx={{
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  fontFamily: 'Poppins',
                }}
              >
                Relatório exportado.
              </Alert>
            </Snackbar>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            width: '100%',
            marginBottom: '24px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bolder',
              color: '#333333',
              fontSize: '25px',
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            Relatório de Apontamento por setor:
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            width: '100%',
          }}
        >
          <TextField
            label="Data Inicial"
            type="date"
            size="small"
            sx={{
              backgroundColor: '#fff',
              display: 'flex',
              flex: '1 2 ',
              width: '225px',
              '& .MuiInputBase-root': {
                height: '48px',
                borderRadius: '8px',
                '&:focus-within': {
                  border: '1px solid lightgray',
                },
              },
            }}
            value={filtro1.dataInicial}
            onChange={(e) =>
              setFiltro1({
                ...filtro1,
                dataInicial: e.target.value,
              })
            }
            slotProps={{
              inputLabel: {
                shrink: true,
                sx: {
                  color: '#333333',
                  fontSize: '16px',
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Data Final"
            type="date"
            size="small"
            sx={{
              backgroundColor: '#fff',
              display: 'flex',
              flex: '1 2',
              '& .MuiInputBase-root': {
                height: '48px',
                borderRadius: '8px',
                '&:focus-within': {
                  border: '1px solid lightgray',
                },
              },
            }}
            value={filtro1.dataFinal}
            onChange={(e) =>
              setFiltro1({
                ...filtro1,
                dataFinal: e.target.value,
              })
            }
            slotProps={{
              inputLabel: {
                shrink: true,
                sx: {
                  color: '#333333',
                  fontSize: '16px',
                },
              },
            }}
          />
          <FormControl sx={{ flex: '3 1 ' }}>
            <InputLabel id="select-setor-label" shrink>
              Equipe
            </InputLabel>
            <Select
              size="small"
              label="Equipe"
              labelId="select-setor-label"
              value={filtro1.setor}
              onChange={(e) =>
                setFiltro1({
                  ...filtro1,
                  setor: e.target.value,
                })
              }
              displayEmpty
              sx={{
                flex: '3 1 ',
                height: '48px',
                borderRadius: '8px',
                backgroundColor: '#fff',
                '& .MuiInputBase-root': {
                  height: '48px',
                  borderRadius: '8px',
                  '&:focus-within': {
                    border: '1px solid lightgray',
                  },
                },
              }}
            >
              <MenuItem value="" disabled>
                Selecione
              </MenuItem>
              {equipe.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            startIcon={<CleaningServicesIcon />}
            onClick={handleLimparFiltro1}
            variant="outlined"
            color="inherit"
            size="large"
            sx={{ flex: '1 3', fontWeight: 'bold' }}
          >
            Limpar filtros
          </Button>

          <Button
            type="button"
            variant="contained"
            color="success"
            size="large"
            onClick={handleGetRelatorioSetor}
            sx={{
              textTransform: 'capitalize',
              color: '#fff',
              flex: '1 3',
              fontWeight: 'bold',
              justifyContent: 'center',
              width: 'auto',
            }}
            startIcon={<RiFileExcel2Fill size={20} color="white" />}
          >
            {'EXPORTAR EXCEL'}{' '}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default RelatorioApontamentos;
