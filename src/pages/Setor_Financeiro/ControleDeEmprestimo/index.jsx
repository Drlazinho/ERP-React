import React, { useEffect, useState, useCallback } from 'react';

import {
  Button,
  Box,
  Typography,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router';
import Loader from '@/components/Loader';
import Amvoxlogopng from '../../../assets/Amvoxlogopng.png';
import { ModalIncluirEmprestimo } from './ModalIncluirEmprestimo';
import TableControleEmprestimo from './TableControleEmprestimo';
import { bancos } from './EmprestimosMock';
import { BuscarControleEmprestimo } from '@/pages/Setor_Financeiro/ControleDeEmprestimo/controleEmprestimo.service';
import { formatDatetoHtmlDay } from '@/utils/formatDate';
import { useToast } from '@/hooks/toast.hook';
import HeaderAmvox from '@/components/HeaderAmvox';

export default function ControleDeEmprestimo() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const handleLogoClick = () => navigate('/principal');
  const [filtro, setFiltro] = useState({
    dataInicio: null,
    dataFinal: formatDatetoHtmlDay(),
    banco: '',
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessMessageEmprestimo, setShowSuccessMessageEmprestimo] =
    useState(false);
  const [showModalEditarEmprestimo, setShowModalEditarEmprestimo] =
    useState(false);
  const [data, setData] = useState([]);

  const handleLimparFiltro = () => {
    setFiltro({
      dataInicio: null,
      dataFinal: formatDatetoHtmlDay(),
      banco: '',
    });
  };

  const handleGetEmprestimos = useCallback(async () => {
    setLoading(true);

    const filtros = {
      dataFinal: filtro.dataFinal,
      instituicao: filtro.banco,
      dataInicial: filtro.dataInicio,
    };

    try {
      const res = await BuscarControleEmprestimo(filtros);
      setData(res);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Empréstimos buscados com sucesso',
      });
    } catch (err) {
      addToast({
        type: 'danger',
        title: 'Erro ao buscar empréstimos',
        description: 'Emprestimos não encontrados',
      });
    } finally {
      setLoading(false);
    }
  }, [filtro]);

  useEffect(() => {
    handleGetEmprestimos();
  }, [filtro]);

  return (
    <>
      <Box
        sx={{
          width: '95%',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
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
              title="Controle De Empréstimos"
              onBack={() => navigate(-1)}
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {showSuccessMessageEmprestimo && (
              <Snackbar
                open={showSuccessMessageEmprestimo}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={() => setShowSuccessMessageEmprestimo(false)}
                autoHideDuration={6000}
              >
                <Alert
                  iconMapping={{
                    success: <CheckCircleOutlineIcon fontSize="inherit" />,
                  }}
                >
                  Emprestimo incluído com sucesso.
                </Alert>
              </Snackbar>
            )}
            {showModalEditarEmprestimo && (
              <Snackbar
                open={showModalEditarEmprestimo}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onClose={() => setShowModalEditarEmprestimo(false)}
                autoHideDuration={6000}
              >
                <Alert
                  iconMapping={{
                    success: <CheckCircleOutlineIcon fontSize="inherit" />,
                  }}
                >
                  Emprestimo editado com sucesso.
                </Alert>
              </Snackbar>
            )}
          </Box>
        </Box>
        <Box
          sx={(theme) => ({
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            [theme.breakpoints.down('900')]: {
              flexWrap: 'wrap',
            },
          })}
        >
          <Box
            sx={(theme) => ({
              display: 'flex',
              gap: 4,
              width: '100%',
              marginLeft: '24px',
              [theme.breakpoints.down('640')]: {
                flexWrap: 'wrap',
              },
            })}
          >
            <Box
              sx={(theme) => ({
                width: '200px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                [theme.breakpoints.down('415')]: {
                  flexWrap: 'wrap',
                },
              })}
            >
              <Typography sx={{ fontSize: '12px' }}>
                Filtro por banco:
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="select-banco-label" shrink>
                  Banco
                </InputLabel>
                <Select
                  label="Banco"
                  labelId="select-banco-label"
                  size="medium"
                  value={filtro.banco}
                  onChange={(e) =>
                    setFiltro({
                      ...filtro,
                      banco: e.target.value,
                    })
                  }
                  displayEmpty
                  sx={{
                    width: '220px',
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
                    Selecione o banco
                  </MenuItem>
                  {bancos
                    .sort((a, b) => a.label.localeCompare(b.label))
                    .map((item, index) => (
                      <MenuItem key={index} value={item.value}>
                        {item.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                width: '100%',
                flexDirection: 'column',
              }}
            >
              <Typography sx={{ fontSize: '12px' }}>
                Selecione o período de contratação:
              </Typography>
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  gap: 2,
                  flexDirection: 'row',
                  [theme.breakpoints.down('415')]: {
                    flexWrap: 'wrap',
                  },
                })}
              >
                <TextField
                  label="Data Inicial"
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="Data Inícial"
                  inputProps={{
                    style: { height: '48px', width: '100%' },
                  }}
                />

                <TextField
                  label="Data Final"
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
                  value={filtro.dataFinal}
                  onChange={(e) =>
                    setFiltro({
                      ...filtro,
                      dataFinal: e.target.value,
                    })
                  }
                  inputProps={{
                    style: { height: '48px', width: '100%' },
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              marginTop: 2,
              [theme.breakpoints.down('1070')]: {
                flexDirection: 'column',
                alignItems: 'flex-end',
              },
              [theme.breakpoints.down('900')]: {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginLeft: '24px',
              },
              [theme.breakpoints.down('415')]: {
                flexWrap: 'wrap',
              },
            })}
          >
            <Button
              onClick={handleLimparFiltro}
              variant="outlined"
              color="inherit"
              size="large"
            >
              Limpar filtro
            </Button>

            <ModalIncluirEmprestimo
              showSuccessMessageEmprestimo={setShowSuccessMessageEmprestimo}
              handleGetEmprestimos={handleGetEmprestimos}
            />
          </Box>
        </Box>
        <Box sx={{ width: '100%', marginTop: '24px' }}>
          {loading ? (
            <Loader />
          ) : (
            <TableControleEmprestimo
              data={data}
              handleGetEmprestimos={handleGetEmprestimos}
              showModalEditarEmprestimo={setShowModalEditarEmprestimo}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
