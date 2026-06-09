import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Stack,
  Pagination,
} from '@mui/material';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import HeaderAmvox from '@/components/HeaderAmvox';
import './styles.css';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TabelaProdutoForaDeLinha from './TabelaProdutoForaDeLinha/TabelaProdutoForaDeLinha';
import OutlinedInput from '@mui/material/OutlinedInput';
import { getProdutosForaLinha } from '@/pages/Setor_PosVenda/HistoricoDoProduto/historicoDoProduto.service';
import debounce from '@/utils/debounce';
import { useToast } from '@/hooks/toast.hook';
import DeleteIcon from '@mui/icons-material/Delete';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';

const interfaceDadosGeral = {
  produtosForaLinha: [
    {
      id: 0,
      codigo: '',
      imagem: '',
      dataUltimImport: '',
      foraLinha: null,
      produzido: null,
      nome: '',
    },
  ],
  totalPaginas: 0,
  totalRegistros: 0,
};
const interfaceFiltro = {
  NomeProduto: '',
  dataInicial: null,
  dataFinal: null,
  ForaLinha: null,
  Produzido: null,
  Pagina: 1,
  itensPorPagina: 20,
};

const ListaForaLinha = [
  { nome: 'NÃO', id: 0 },
  { nome: 'SIM', id: 1 },
];

export default function HistoricoDoProduto() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [modalAtualizarRegistroImagens, setModalAtualizarRegistroImagens] =
    useState(false);
  const [foraLinhaNome, setForaLinhaNome] = useState('');
  const [produzido, setProduzido] = useState('');

  const handleChangeProduzido = (event) => {
    setProduzido(event.target.value);
    setFiltro((prevData) => ({
      ...prevData,
      Produzido: event.target.value == 'SIM' ? 1 : 0,
    }));
  };

  const handleChangeForaLinha = (event) => {
    setForaLinhaNome(event.target.value);
    setFiltro((prevData) => ({
      ...prevData,
      ForaLinha: event.target.value == 'SIM' ? 1 : 0,
    }));
  };

  const handlePageChange = (event, value) => {
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      Pagina: value,
    }));
  };

  const handleShowModalRegistroImagem = () => {
    setModalAtualizarRegistroImagens(!modalAtualizarRegistroImagens);
  };

  const [listaResultados, setListaResultados] = useState(interfaceDadosGeral);
  const [filtro, setFiltro] = useState(interfaceFiltro);

  const handleFetch = () => {
    getProdutosForaLinha(filtro).then((res) => {
      setListaResultados(res);
    });
  };

  useEffect(() => {
    handleFetch();
  }, [filtro]);

  const handleClear = (e) => {
    e.preventDefault();
    e.target.reset();
    setFiltro({
      NomeProduto: '',
      dataInicial: null,
      dataFinal: null,
      ForaLinha: null,
      Produzido: null,
      Pagina: 1,
      itensPorPagina: 20,
    });
    setForaLinhaNome('');
    setProduzido('');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 2,
        }}
      >
        <HeaderAmvox title="Histórico do Produto" onBack={() => navigate(-1)} />
      </Box>
      <Box position={'relative'} gap={1}>
        <form onSubmit={handleClear}>
          <div className="divFiltros">
            <div className="insideFiltros">
              <div className="divDesc" style={{ width: '40%' }}>
                <InputLabel style={{ fontWeight: 'bold' }}>
                  Descrição
                </InputLabel>
                <FormControl
                  variant="outlined"
                  fullWidth
                  style={{
                    fontWeight: 'bold',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    marginBottom: '10px',
                  }}
                >
                  <OutlinedInput
                    placeholder="Pesquisar"
                    onChange={(e) =>
                      debounce(() => {
                        setFiltro({
                          ...filtro,
                          NomeProduto: e.target.value,
                        });
                      }, 1000)
                    }
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    }
                    sx={{
                      '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                      },
                      '& .MuiOutlinedInput-root': {
                        height: 40,
                      },
                    }}
                  />
                </FormControl>
              </div>
              <div className="divData">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <InputLabel style={{ fontWeight: 'bold' }}>
                    Última importação
                  </InputLabel>
                  <Grid item xs={5} sm={1.6} maxWidth={'200px'}>
                    <InputDateAmvox
                      label={'De'}
                      value={filtro.dataInicial}
                      format="YYYYMMDD"
                      onChange={(date) =>
                        debounce(() => {
                          setFiltro({
                            ...filtro,
                            dataInicial: date,
                          });
                        })
                      }
                    />
                  </Grid>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                  }}
                >
                  <Grid item xs={5} sm={1.6} maxWidth={'200px'}>
                    <InputDateAmvox
                      label={'Até'}
                      value={filtro.dataFinal}
                      format="YYYYMMDD"
                      onChange={(date) =>
                        debounce(() => {
                          setFiltro({
                            ...filtro,
                            dataFinal: date,
                          });
                        })
                      }
                    />
                  </Grid>
                </div>
              </div>
              <div className="divSelect">
                <InputLabel style={{ fontWeight: 'bold' }}>
                  Importado há menos de 5 anos?
                </InputLabel>
                <FormControl
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{
                    background: '#fff',
                    borderRadius: 2,
                    flexDirection: 'column',
                  }}
                >
                  <InputLabel>Selecione</InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChangeForaLinha}
                    name="ForaLinha"
                    value={foraLinhaNome}
                  >
                    {ListaForaLinha.map((item) => (
                      <MenuItem key={item.id} value={item.nome}>
                        {item.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="divSelect">
                <InputLabel style={{ fontWeight: 'bold' }}>
                  Produzido há menos de 5 anos?
                </InputLabel>
                <FormControl
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{ background: '#fff', borderRadius: 2 }}
                >
                  <InputLabel>Selecione</InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChangeProduzido}
                    name="produzido"
                    value={produzido}
                  >
                    {ListaForaLinha.map((item) => (
                      <MenuItem key={item.id} value={item.nome}>
                        {item.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <Button
                variant="contained"
                color="warning"
                size="small"
                startIcon={<DeleteIcon />}
                type="submit"
                sx={{
                  backgroundColor: 'gray',
                  minWidth: '60px',
                  height: '35px',
                  marginTop: '15px',
                  marginLeft: '15px',
                  paddingTop: '5px',
                  '&:hover': {
                    backgroundColor: 'darkgray',
                  },
                }}
              >
                Limpar
              </Button>
            </div>
          </div>
        </form>
      </Box>

      <TabelaProdutoForaDeLinha
        handleFetch={handleFetch}
        data={listaResultados?.produtosForaLinha}
        handleAtualizarLista={handleFetch}
      />
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
          count={listaResultados.totalPaginas}
          page={filtro.Pagina}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
          color="error"
        />
      </Stack>
      <Box
        sx={{
          borderTop: '1px solid #000',
          marginTop: '25px',
          opacity: '60%',
        }}
      >
        {' '}
        <footer className="footerPage">Amvox 2024 &copy;</footer>
      </Box>
    </>
  );
}
