import { useState, useEffect, useCallback } from 'react';
import {
  Grid2,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Snackbar,
  Alert,
  Icon,
  IconButton,
  Pagination,
  Input,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router';
import Amvoxlogopng from '@/assets/Amvoxlogopng.png';
import SearchIcon from '@mui/icons-material/Search';
import { useToast } from '@/hooks/toast.hook';
import NewTable from './components/NewTable';
import ModalRegistro from './components/Modal';
import {
  BuscarProdutoMetahoraGet,
  ProdutoMetahoraPost,
} from '@/pages/Setor_Producao/TabelaMestra/tabelaMestra.service';
import { ModalCadastro } from './components/ModalCadastro';
import Loading from '@/components/Loading';
import HeaderAmvox from '@/components/HeaderAmvox';
import ModalCadastroFornecedor from './components/ModalCadastroFornecedor';
import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox';
import debounce from '@/utils/debounce';

const interfaceFiltro = {
  codigo: '',
  descricao: '',
  statusProducao: true,
  Pagina: 1,
  QuantidadeItensPagina: 10,
};

const dadosObj = {
  dados: [],
  totalLinhas: 1,
};

export default function TabelaMestra() {
  const navigate = useNavigate();
  const [data, setData] = useState(dadosObj);
  const [filtro, setFiltro] = useState(interfaceFiltro);
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { addToast } = useToast();
  const handleLogoClick = () => navigate('/principal');

  const SubmitMetaHora = async (body) => {
    ProdutoMetahoraPost(body)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Cadastrado com sucesso',
        });
        setShowSuccessMessage(true);
        GetDados();
      })
      .catch((error) => {
        let errorMessage = 'Erro ao editar meta';

        if (error.response && error.response.data) {
          if (typeof error.response.data === 'object') {
            errorMessage =
              JSON.stringify(error.response.data) ||
              error.message ||
              error.response.data.title;
          } else {
            errorMessage = error.response.data;
          }
        }

        addToast({
          type: 'danger',
          title: 'Erro',
          description: errorMessage,
        });
      });
  };

  const GetDados = useCallback(() => {
    setLoading(true);

    BuscarProdutoMetahoraGet(filtro)
      .then((res) => {
        setData({
          dados: res.listaTabelaMestra,
          totalLinhas: res.totalLinhas,
          totalPaginas: res.totalPaginas,
        });
      })
      .catch(() =>
        addToast({
          type: 'danger',
          description: 'Erro ao buscar tabela',
        })
      )
      .finally(() => setLoading(false));
  }, [filtro]);

  const handleFiltro = (e, value) => {
    setFiltro((prev) => ({ ...prev, Pagina: value }));
  };

  useEffect(() => {
    GetDados();
  }, [filtro]);

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleClear = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    setFiltro(interfaceFiltro);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '95%',
            [theme.breakpoints.down(1700)]: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              mb: 2,
            },
          })}
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
            <HeaderAmvox title="Tabela mestra" onBack={() => navigate(-1)} />
          </Box>

          {showSuccessMessage && (
            <Snackbar
              open={showSuccessMessage}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              onClose={() => setShowSuccessMessage(false)}
            >
              <Alert
                onClose={() => setShowSuccessMessage(false)}
                variant="filled"
                severity="success"
                sx={{
                  borderRadius: '25px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  fontFamily: 'Poppins',
                }}
              >
                Registro realizado com sucesso!
              </Alert>
            </Snackbar>
          )}
          <form onSubmit={handleClear}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <Grid2 item xs={6} sm={3} md={2} xl={1.5}>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Descrição do produto"
                  label="Descrição do produto"
                  onChange={(e) =>
                    debounce(() => {
                      setFiltro({ ...filtro, descricao: e.target.value });
                    })
                  }
                  Input={
                    <Input
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                  }
                  sx={{ bgcolor: '#fff', borderRadius: 2, width: '280px' }}
                />
              </Grid2>
              <Grid2 item xs={6} sm={3} md={2} xl={1.5}>
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="Código do produto"
                  label="Código do produto"
                  onChange={(e) =>
                    debounce(() => {
                      setFiltro({ ...filtro, codigo: e.target.value });
                    })
                  }
                  Input={
                    <Input
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                  }
                  sx={{ bgcolor: '#fff', borderRadius: 2, width: '280px' }}
                />
              </Grid2>
              <Grid2 item xs={6} sm={3} md={2} xl={1.5}>
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel id="status-produto-label" shrink>
                    Status do produto
                  </InputLabel>
                  <Select
                    labelId="status-produto-label"
                    id="status-produto-select"
                    label="Status do produto"
                    value={filtro.statusProducao}
                    displayEmpty
                    renderValue={(selected) => {
                      if (selected === null) {
                        return 'Todos';
                      }
                      if (selected === true) {
                        return 'Ativo';
                      }
                      if (selected === false) {
                        return 'Inativo';
                      }
                      return selected;
                    }}
                    onChange={(e) =>
                      setFiltro({ ...filtro, statusProducao: e.target.value })
                    }
                    sx={{ borderRadius: 1, width: '280px', bgcolor: '#fff' }}
                  >
                    <MenuItem value={null}>Todos</MenuItem>
                    <MenuItem value={true}>Ativo</MenuItem>
                    <MenuItem value={false}>Inativo</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 6, md: 1 }}>
                <ButtonClear
                  type="submit"
                  sx={{ width: '100%', height: '100%' }}
                />
              </Grid2>
              <ModalRegistro
                handleSubmit={SubmitMetaHora}
                GetDados={GetDados}
              />

              <Box>
                <ModalCadastroFornecedor />
              </Box>
            </Box>
          </form>
        </Box>

        <Box sx={{ width: '100%', padding: '0 30px' }}>
          {loading ? (
            <Loading />
          ) : (
            <NewTable
              data={data.dados}
              totalLinhas={data.totalLinhas}
              GetDados={GetDados}
              loading={loading}
            />
          )}
          <Pagination
            sx={{
              marginTop: 4,
              display: 'flex',
              justifyContent: 'center',
            }}
            count={data.totalPaginas}
            page={filtro.Pagina}
            onChange={handleFiltro}
            showFirstButton
            showLastButton
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
}
