import React, { useState, useEffect } from 'react';
import { buscarClientesJoinPorFiltro } from '@/pages/Setor_Financeiro/PosicaoDeClientes/PosicaoDeClientes.service';
import { useToast } from '@/hooks/toast.hook';
import Amvoxlogopng from '../../../assets/Amvoxlogopng.png';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  FormLabel,
  Checkbox,
  OutlinedInput,
  InputLabel,
  Stack,
  Pagination,
  CircularProgress,
  Select,
} from '@mui/material';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TabelaClientesComVendedores from './TabelaClientesComVendedores';
import { buscarClientesComVendedores } from '@/pages/Setor_Financeiro/PosicaoDeClientes/PosicaoDeClientes.service';
import './styles.css';
import Loader from '@/components/Loader';
import debounce from '@/utils/debounce';
import HeaderAmvox from '@/components/HeaderAmvox';
import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox';

export default function PosicaoDeClientes() {
  const [clienteLista, setClienteLista] = useState([]);
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [filtro, setFiltro] = useState({
    pagina: 1,
    quantidadeItensPorPagina: 10,
    codigoCliente: null,
    nomeCliente: null,
    cnpj: null,
    status: null,
    titulosEmAberto: false,
  });

  const handleFilterChange = (filterName, value) => {
    setFiltro((prev) => ({
      ...prev,
      [filterName]: value,
      pagina: 1,
    }));
  };

  const handleClear = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    setFiltro({
      pagina: 1,
      quantidadeItensPorPagina: 10,
      codigoCliente: null,
      nomeCliente: null,
      cnpj: null,
      status: null,
      titulosEmAberto: false,
    });
  };

  const handleChange = (event) => {
    setFiltro({
      ...filtro,
      titulosEmAberto: event.target.checked,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const retorno = await buscarClientesComVendedores(filtro);
        setClienteLista(retorno);
      } catch (_err) {
        addToast({
          type: 'danger',
          title: 'Erro!',
          description: 'CNPJ/CPF imcompleto ou inválido, tente novamente!',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filtro]);

  const handlePageChange = (event, value) => {
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      pagina: value,
    }));
  };

  return (
    <>
      <Box
        position={'relative'}
        sx={{ backgroundColor: '#F2F2F2', width: '98%', margin: '0 auto' }}
        gap={2}
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
            title="Posição de Clientes"
            onBack={() => navigate(-1)}
          />
        </Box>

        <div className="divGeralClientesCVendedores">
          <div className="divConsultarClientesCVendedores">
            <div style={{ display: 'flex' }}>
              <label
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'Poppins, sans-serif',
                  paddingLeft: '18px',
                }}
              >
                Filtros
              </label>
            </div>
            <form className="divSelects" onSubmit={handleClear}>
              <div className="itemFiltro">
                <InputLabel style={{ fontWeight: 'bold' }}>Código</InputLabel>
                <OutlinedInput
                  type="number"
                  onChange={(e) =>
                    debounce(() => {
                      handleFilterChange('codigoCliente', e.target.value);
                    })
                  }
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-input': {
                      padding: '10px 14px',
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 40,
                    },
                  }}
                />
              </div>
              <div className="itemFiltro">
                <InputLabel style={{ fontWeight: 'bold' }}>Cliente</InputLabel>
                <OutlinedInput
                  type="text"
                  onChange={(e) =>
                    debounce(() => {
                      handleFilterChange('nomeCliente', e.target.value);
                    })
                  }
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-input': {
                      padding: '10px 14px',
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 40,
                    },
                  }}
                />
              </div>
              <div className="itemFiltro">
                <InputLabel style={{ fontWeight: 'bold' }}>CNPJ/CPF</InputLabel>
                <OutlinedInput
                  type="text"
                  onChange={(e) =>
                    debounce(() => {
                      handleFilterChange('cnpj', e.target.value);
                    })
                  }
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-input': {
                      padding: '10px 14px',
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 40,
                    },
                  }}
                />
              </div>
              <div className="itemFiltro">
                <InputLabel style={{ fontWeight: 'bold' }}>Situação</InputLabel>
                <Select
                  placeholder="Selecione a situação"
                  size="small"
                  value={filtro.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected === null) {
                      return 'Todos';
                    }
                    return selected;
                  }}
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-input': {
                      padding: '10px 14px',
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 40,
                    },
                  }}
                >
                  <MenuItem value={null}>Todos</MenuItem>
                  <MenuItem value="Inadimplente">Inadimplente</MenuItem>
                  <MenuItem value="Adimplente">Adimplente</MenuItem>
                  <MenuItem value="Débitos a compensar">
                    Débitos a compensar
                  </MenuItem>
                </Select>
              </div>
              <Box
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  width: '32%',
                  paddingLeft: '15px',
                  [theme.breakpoints.down(500)]: {
                    width: '100%',
                    justifyContent: 'center',
                  },
                })}
              >
                <Checkbox
                  checked={filtro.titulosEmAberto}
                  onChange={handleChange}
                />
                <FormLabel sx={{ textAlign: 'center', color: 'black' }}>
                  Títulos em aberto
                </FormLabel>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mt: 2,
                  width: '20%',
                }}
              >
                <ButtonClear type="submit">Limpar</ButtonClear>
              </Box>
            </form>
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
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="200px"
            >
              <Loader />
            </Box>
          ) : (
            <TabelaClientesComVendedores data={clienteLista.clientes} />
          )}
        </Box>

        <Stack
          spacing={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '25px',
          }}
        >
          <Pagination
            count={176}
            page={filtro.pagina}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            color="error"
          />
        </Stack>
      </Box>
      <footer className="footerPage">Amvox 2024</footer>
    </>
  );
}
