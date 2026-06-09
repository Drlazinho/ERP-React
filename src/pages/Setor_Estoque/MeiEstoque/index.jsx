import React, { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {
  Box,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import SidebarNovo from '../../../components/LayoutNovo/SidebarNovo';
import Amvoxlogopng from '../../../assets/Amvoxlogopng.png';
import MeiTable from './components/MeiTable';
import ModalMei from './components/ModalCadastroMEI';
import {
  buscarMovimentacao,
  buscarMovimentacaoProdutos,
  getKit,
} from '../../../services/movimentacaoCorrente.service';
import debounce from '../../../utils/debounce';
import { GetArmazem } from '../../../services/armazem/armazem.service';
import xVermelho from '../../../assets/xVermelho.svg';
import HeaderAmvox from '@/components/HeaderAmvox';
import { useDebounce } from '@/hooks/debounce.hook';

const programacaoSelect = [
  { label: 'Programação Avaria', value: 'Programação Avaria' },
  { label: 'Programação de Devolução', value: 'Programação de Devolução' },
  { label: 'Transferência', value: 'Transferência' },
  {
    label: 'Liberação de retrabalho da Produção',
    value: 'Liberação de retrabalho da Produção',
  },
  { label: 'OP', value: 'OP' },
  { label: 'Entrada Manual ', value: 'Entrada Manual ' },
  { label: 'Saída Manual', value: 'Saída Manual' },
];

const selectMov = [
  { label: 'ENTRADA', value: 'ENTRADA' },
  { label: 'SAIDA', value: 'SAIDA' },
  { label: 'TRANSFERENCIA', value: 'TRANSFERENCIA' },
  { label: 'TRANSFORMAÇÃO', value: 'TRANSFORMAÇÃO' },
];

export default function EstoqueMei() {
  const [dataMovimentacao, setDataMovimentacao] = useState({});
  const [dataSubRow, setDataSubRow] = useState({});
  const [armazem, setArmazem] = useState({});
  const [dataKit, setDataKit] = useState({});

  const [filtro, setFiltro] = useState({
    id: '',
    mei: '',
    motivo: '',
    tipo: '',
    quantidade: '',
    dataInicio: new Date().toISOString().split('T')[0],
    usuario: '',
  });

  const debounceFiiltro = useDebounce(filtro, 1000);

  const handleClear = () => {
    setFiltro({
      id: null,
      mei: '',
      motivo: '',
      tipo: '',
      quantidade: null,
      dataInicio: null,
      usuario: '',
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    debounce(() => {
      setFiltro((prevFiltro) => ({ ...prevFiltro, motivo: value }));
    });
  };
  const handleChangeTipo = (e) => {
    const value = e.target.value;
    debounce(() => {
      setFiltro((prevFiltro) => ({ ...prevFiltro, tipo: value }));
    });
  };

  const handleFetchMovimentação = () => {
    buscarMovimentacao(debounceFiiltro).then((response) => {
      setDataMovimentacao(response);
    });
    buscarMovimentacaoProdutos().then((res) => {
      setDataSubRow(res.value.movimentacaoProdutos);
    });
    getKit().then((response) => {
      setDataKit(response);
    });
    GetArmazem().then((response) => {
      setArmazem(response.value);
    });
  };

  useEffect(() => {
    handleFetchMovimentação();
  }, [debounceFiiltro]);

  const navigate = useNavigate();

  return (
    <>
      <Box className="Principal">
        <Box
          position={'relative'}
          sx={{ backgroundColor: '#FAFAFA' }}
          gap={2}
          padding={'0 10px '}
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
            <HeaderAmvox title="MEI" onBack={() => navigate(-1)} />
          </Box>
          <Box className="boxGeralMEI">
            <Box className="boxFiltro">
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography>Filtros</Typography>
                <Box
                  sx={(theme) => ({
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    [theme.breakpoints.down('sm')]: {
                      flexDirection: 'column',
                    },
                  })}
                >
                  <Button
                    onClick={handleClear}
                    variant="outlined"
                    sx={{
                      color: '#6E6E6E',
                      border: '2px solid #CCCCCC',
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
                  <ModalMei
                    dataArmazem={armazem}
                    dataKit={dataKit}
                    handleFetchMovimentação={handleFetchMovimentação}
                  />
                </Box>
              </Box>
              <Box className="boxConsultarMEI">
                <Box className="boxSelects">
                  <Box
                    sx={(theme) => ({
                      display: 'flex',
                      width: '100%',
                      gap: '32px',
                      [theme.breakpoints.down(1000)]: {
                        flexWrap: 'wrap',
                      },
                    })}
                  >
                    <Box>
                      <FormLabel>Nº da MEI</FormLabel>
                      <TextField
                        type="number"
                        fullWidth
                        sx={{
                          backgroundColor: '#fff',
                          display: 'flex',
                          maxWidth: '142px',
                          '& .MuiInputBase-root': {
                            borderRadius: '8px',
                            height: '48px',
                            '&:focus-within': {
                              border: '1px solid lightgray',
                            },
                          },
                        }}
                        inputProps={{ style: { height: '48px' } }}
                        value={filtro.mei}
                        onChange={(e) =>
                          setFiltro({ ...filtro, mei: e.target.value })
                        }
                      />
                    </Box>

                    <Box
                      sx={{
                        width: '300px',
                      }}
                    >
                      <FormLabel>Motivo</FormLabel>
                      <TextField
                        select
                        fullWidth
                        sx={{
                          backgroundColor: '#fff',
                          display: 'flex',
                          maxWidth: '100%',
                          '& .MuiInputBase-root': {
                            height: '48px',
                            borderRadius: '8px',
                            '&:focus-within': {
                              border: '1px solid lightgray',
                            },
                          },
                        }}
                        inputProps={{ style: { height: '48px' } }}
                        value={filtro.motivo}
                        onChange={handleChange}
                      >
                        {programacaoSelect.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>

                    <Box
                      sx={{
                        width: '200px',
                      }}
                    >
                      <FormLabel>Tipo</FormLabel>
                      <TextField
                        select
                        fullWidth
                        sx={{
                          backgroundColor: '#fff',
                          display: 'flex',
                          width: '100%',
                          '& .MuiInputBase-root': {
                            height: '48px',
                            borderRadius: '8px',
                            '&:focus-within': {
                              border: '1px solid lightgray',
                            },
                          },
                        }}
                        inputProps={{
                          style: { height: '48px', width: '100%' },
                        }}
                        value={filtro.tipo}
                        onChange={handleChangeTipo}
                      >
                        {selectMov.map((item, index) => (
                          <MenuItem key={index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>

                    <Box
                      sx={{
                        width: '168px',
                      }}
                    >
                      <FormLabel>Data</FormLabel>
                      <TextField
                        type="date"
                        fullWidth
                        sx={{
                          backgroundColor: '#fff',
                          display: 'flex',
                          width: '168px',
                          '& .MuiInputBase-root': {
                            height: '48px',
                            borderRadius: '8px',
                            '&:focus-within': {
                              border: '1px solid lightgray',
                            },
                          },
                        }}
                        value={filtro.dataInicio || ''}
                        onChange={(e) =>
                          setFiltro({
                            ...filtro,
                            dataInicio: e.target.value,
                          })
                        }
                        inputProps={{
                          style: { height: '48px', width: '100%' },
                        }}
                      />
                    </Box>

                    <Box sx={{ maxWidth: '350px' }}>
                      <FormLabel>Registrado por</FormLabel>
                      <TextField
                        fullWidth
                        sx={{
                          backgroundColor: '#fff',
                          display: 'flex',
                          height: '48px',
                          '& .MuiInputBase-root': {
                            borderRadius: '8px',
                            '&:focus-within': {
                              border: '1px solid lightgray',
                            },
                          },
                        }}
                        InputProps={{
                          style: { height: '48px' },
                          endAdornment: (
                            <InputAdornment position="end">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                        value={filtro.usuario}
                        onChange={(e) =>
                          setFiltro({
                            ...filtro,
                            usuario: e.target.value,
                          })
                        }
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', mt: '24px' }}>
              <MeiTable
                data={dataMovimentacao}
                dataSubRow={dataSubRow}
                handleMovAtt={handleFetchMovimentação}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
