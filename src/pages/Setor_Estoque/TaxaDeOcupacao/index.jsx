import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Select,
  Modal as MuiModal,
  FormLabel,
  Typography,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import SidebarNovo from '../../../components/LayoutNovo/SidebarNovo';
import Grid from '@mui/material/Grid2';

import CircularProgressWithColor from '../../../components/CircularProgressWithColor';

import {
  cadastrarCapacidade,
  getGalpao,
  getEstoqueOcupacao,
  cadastrarAtualizacao,
} from './taxaDeOcupacao.service';
import './styles.css';
import LoadingButton from '@mui/lab/LoadingButton';
import { MenuItem } from '@mui/material';
import { TabelaTaxaDeOcupacao } from './TabelaTaxaDeOcupacao/TabelaTaxaDeOcupacao';
import SaveIcon from '@mui/icons-material/Save';
import useUsuarioLocal from '../../../hooks/usuarioLocal.hook';
import { useToast } from '../../../hooks/toast.hook';
import HeaderAmvox from '@/components/HeaderAmvox';
import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};

const interfaceFilial = [
  { galpaoId: 0, nome: '', referencia: null, obs: null, letra: '' },
];

const interfaceFiltro = {
  galpao: 0,
  endereco: '',
  ocupacao: null,
};

const interfaceListaResultados = {
  id: 0,
  galpao: '',
  endereco: '',
  capacidade: 0,
  ocupacao: 0,
  ocupacCalc: 0,
};

const interfaceDadosGeral = {
  estoqueOcup: [interfaceListaResultados],
  espacoOcupado: 0,
  porcetagemOcupada: 0,
  espacoDisponivel: 0,
  porcetagemDisponivel: 0,
};

const interfaceCadastroCapacidade = {
  idGalpao: '',
  endereco: '',
  capacidade: '',
  userRegistro: '',
};

const interfaceCadastroAtualizacao = {
  idEstoqOcup: 0,
  qtdMov: null,
  tipoMov: '',
  codigoProduto: '',
  userMov: '',
};

const interfaceTipoMov = [
  { id: 1, nome: 'ENTRADA' },
  { id: 2, nome: 'SAIDA' },
];

export default function TaxaDeOcupacao() {
  const { setor } = useUsuarioLocal();
  const theme = useTheme();
  const [showModal, setShowModal] = useState(false);
  const [showModalAtualizacao, setShowModalAtualizacao] = useState(false);
  const [cadastroAtualizacao, setCadastroAtualizacao] = useState(
    interfaceCadastroAtualizacao
  );
  const [cadastroCapacidade, setCadastroCapacidade] = useState(
    interfaceCadastroCapacidade
  );
  const [listaAtualizacao, setListaAtualizacao] = useState(
    interfaceListaResultados
  );
  const [filialState, setFilialState] = useState(interfaceFilial);
  const [filtro, setFiltro] = useState(interfaceFiltro);
  const [listaResultados, setListaResultados] = useState(interfaceDadosGeral);
  const [isLoading, setIsLoading] = useState(false);
  const { nome } = useUsuarioLocal();

  const { addToast } = useToast();

  const cleanFilter = () => {
    setFiltro(interfaceFiltro);
    addToast({
      type: 'success',
      title: 'Filtro limpo',
    });
  };

  function permissionFilter(setorEnv) {
    switch (setorEnv) {
      case 6:
        return false;
      case 7:
        return false;
      case 8:
        return false;
      case 9:
        return false;
      default:
        return true;
    }
  }

  const handleFetch = () => {
    getGalpao().then((res) => {
      setFilialState(res);
    });
    getEstoqueOcupacao(filtro).then((res) => {
      setListaResultados(res.value);
    });
  };

  const cadastrarCapacidadeF = useCallback((obj) => {
    setIsLoading(true);
    cadastrarCapacidade(obj)
      .then((res) => {
        if (res) {
          setTimeout(() => {
            handleFetch();
          }, 1500);
          setIsLoading(false);
          handleCloseCadastroCapacidade();
          addToast({
            type: 'success',
            title: 'Sucesso ao cadastrar capacidade!',
          });
        }
      })
      .catch((_err) => {
        setIsLoading(false);
        addToast({
          type: 'warning',
          title: 'Erro ao cadastrar capacidade!',
        });
      });
  });

  const cadastrarAtualizacaoFunction = useCallback((obj) => {
    setIsLoading(true);
    cadastrarAtualizacao(obj)
      .then((res) => {
        if (res.value) {
          setTimeout(() => {
            handleFetch();
          }, 1500);
          setIsLoading(false);
          handleCloseMovimentacaoDetalhe();
          addToast({
            type: 'success',
            title: 'Sucesso ao cadastrar Atualização!',
          });
        }
      })
      .catch((_err) => {
        setIsLoading(false);
        addToast({
          type: 'warning',
          title: 'Erro ao cadastrar Atualização!',
        });
      });
  });

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setFiltro({ ...filtro, [name]: value });
  };

  const inputTextHandlerCapacidade = (e) => {
    const { name, value } = e.target;
    setCadastroCapacidade({ ...cadastroCapacidade, [name]: value });
  };

  const inputTextHandlerAtualizacao = (e) => {
    const { name, value } = e.target;
    setCadastroAtualizacao({ ...cadastroAtualizacao, [name]: value });
  };

  const handleCloseCadastroCapacidade = () => {
    setShowModal(!showModal);
    setCadastroCapacidade(interfaceCadastroCapacidade);
  };

  const handleCloseMovimentacaoDetalhe = () => {
    setShowModalAtualizacao(!showModalAtualizacao);
    setCadastroAtualizacao(interfaceCadastroAtualizacao);
  };

  useEffect(() => {
    handleFetch();
  }, [filtro]);

  return (
    <>
      <MuiModal open={showModal} onClose={handleCloseCadastroCapacidade}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Cadastro de Capacidade
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleCloseCadastroCapacidade();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              gap: '15px',
            }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', width: '32%' }}
            >
              <FormLabel>Filial</FormLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={cadastroCapacidade.idGalpao}
                onChange={(e) =>
                  setCadastroCapacidade({
                    ...cadastroCapacidade,
                    idGalpao: e.target.value,
                    userRegistro: nome,
                  })
                }
              >
                {filialState.map((item) => (
                  <MenuItem key={item.galpaoId} value={item.galpaoId}>
                    {item.nome}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', width: '32%' }}
            >
              <FormLabel>Endereço</FormLabel>
              <TextField
                type="text"
                id="endereco"
                name="endereco"
                value={cadastroCapacidade.endereco}
                onChange={inputTextHandlerCapacidade}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
              }}
            >
              <FormLabel>Capacidade</FormLabel>
              <TextField
                type="number"
                id="capacidade"
                name="capacidade"
                value={cadastroCapacidade.capacidade}
                onChange={inputTextHandlerCapacidade}
              />
            </div>
          </Box>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              margin: 'auto',
            }}
          >
            <LoadingButton
              loading={isLoading}
              style={{
                backgroundColor: 'green',
                color: 'white',
                width: '200px',
                marginTop: '20px',
                marginBottom: '20px',
              }}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={() => {
                cadastrarCapacidadeF(cadastroCapacidade);
              }}
            >
              <span>Cadastrar</span>
            </LoadingButton>
          </div>
        </Box>
      </MuiModal>

      <MuiModal
        open={showModalAtualizacao}
        onClose={handleCloseMovimentacaoDetalhe}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Cadastro de Movimentação
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleCloseMovimentacaoDetalhe();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              gap: '15px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '40%',
              }}
            >
              <FormLabel>Galpao</FormLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={cadastroAtualizacao.idEstoqOcup}
                onChange={(e) =>
                  setCadastroAtualizacao({
                    ...cadastroAtualizacao,
                    idEstoqOcup: e.target.value,
                    userMov: nome,
                  })
                }
              >
                {listaResultados.estoqueOcup.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.endereco}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', width: '40%' }}
            >
              <FormLabel>Quantidade Movimentação</FormLabel>
              <TextField
                type="number"
                id="qtdMov"
                name="qtdMov"
                value={cadastroAtualizacao.qtdMov}
                onChange={inputTextHandlerAtualizacao}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '40%',
              }}
            >
              <FormLabel>Tipo Movimentação</FormLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={cadastroAtualizacao.tipoMov}
                onChange={(e) =>
                  setCadastroAtualizacao({
                    ...cadastroAtualizacao,
                    tipoMov: e.target.value,
                  })
                }
              >
                {interfaceTipoMov.map((item) => (
                  <MenuItem key={item.id} value={item.nome}>
                    {item.nome}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '40%',
              }}
            >
              <FormLabel>Produto</FormLabel>
              <TextField
                type="text"
                id="codigoProduto"
                name="codigoProduto"
                value={cadastroAtualizacao.codigoProduto}
                onChange={inputTextHandlerAtualizacao}
              />
            </div>
          </Box>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              margin: 'auto',
            }}
          >
            <LoadingButton
              loading={isLoading}
              style={{
                backgroundColor: 'green',
                color: 'white',
                width: '200px',
                marginTop: '20px',
                marginBottom: '20px',
                marginRight: '30px',
                fontSize: '12px',
              }}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={() => {
                cadastrarAtualizacaoFunction(cadastroAtualizacao);
              }}
            >
              <span>Cadastrar Atualização</span>
            </LoadingButton>
          </div>
        </Box>
      </MuiModal>

      <div className="principal">
        <Box
          position={'relative'}
          sx={{ backgroundColor: '#F2F2F2', marginLeft: '20px' }}
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
            <HeaderAmvox title="Taxa De Ocupação" onBack={() => navigate(-1)} />
          </Box>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
            sx={{ pr: 5, pb: 1 }}
          >
            <Button
              variant="text"
              size="small"
              sx={{ textDecoration: 'underline', color: 'black' }}
              onClick={() => {
                setShowModalAtualizacao(true);
              }}
              disabled={permissionFilter(setor)}
            >
              Cadastrar Movimentação
            </Button>
            <Button
              variant="text"
              size="small"
              sx={{ textDecoration: 'underline', color: 'black' }}
              onClick={() => {
                setShowModal(true);
              }}
              disabled={permissionFilter(setor)}
            >
              Cadastrar Capacidade
            </Button>
          </Box>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, lg: 9 }}>
              <Box
                sx={{
                  bgcolor: theme.palette.background.paper,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'end',
                  width: '100%',
                  padding: 2,
                }}
              >
                <Typography variant="h6">Consultar</Typography>
                <Grid container spacing={2} sx={{ alignItems: 'flex-end' }}>
                  <Grid size={{ xs: 12, md: 3.33 }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                      }}
                    >
                      <FormLabel style={{ textAlign: 'center' }}>
                        Filial
                      </FormLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={filtro.galpao}
                        size="small"
                        onChange={(e) =>
                          setFiltro({
                            ...filtro,
                            galpao: e.target.value,
                          })
                        }
                      >
                        {filialState.map((item) => (
                          <MenuItem key={item.galpaoId} value={item.galpaoId}>
                            {item.nome}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </Grid>
                  <Grid size={{ xs: 12, md: 3.33 }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                      }}
                    >
                      <FormLabel style={{ textAlign: 'center' }}>
                        Endereço
                      </FormLabel>
                      <TextField
                        type="text"
                        id="endereco"
                        size="small"
                        name="endereco"
                        value={filtro.endereco}
                        onChange={inputTextHandler}
                      >
                        Digita o Endereço
                      </TextField>
                    </div>
                  </Grid>
                  {/* <Grid size={{ xs: 12, md: 3.33 }}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                      }}
                    >
                      <FormLabel style={{ textAlign: 'center' }}>
                        Situação
                      </FormLabel>
                      <TextField
                        type="number"
                        id="ocupacao"
                        size="small"
                        name="ocupacao"
                        value={filtro.ocupacao || ''}
                        onChange={inputTextHandler}
                      />
                    </div>
                  </Grid> */}
                  <Grid size={{ xs: 12, md: 2.01 }}>
                    <ButtonClear onClick={cleanFilter} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 1.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    bgcolor: theme.palette.background.paper,
                    minHeight: '104px',
                  }}
                >
                  <Typography align="center" color="error">
                    {' '}
                    {listaResultados.espacoOcupado}{' '}
                  </Typography>
                  <Typography align="center" variant="body1">
                    {' '}
                    Total Ocupado
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    bgcolor: theme.palette.background.paper,
                    minHeight: '104px',
                  }}
                >
                  <Typography align="center" color="success">
                    {' '}
                    {listaResultados.espacoDisponivel}{' '}
                  </Typography>
                  <Typography align="center" variant="body1">
                    {' '}
                    Total Disponível
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 1.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    minHeight: '104px',
                  }}
                >
                  <Box sx={{ pt: 1 }}>
                    <CircularProgressWithColor
                      sx={{ width: '250px', Height: '250px' }}
                      value={listaResultados.porcetagemOcupada}
                      cor={'#f77b7b'}
                    />
                  </Box>
                  <Typography style={{ textAlign: 'center' }}>
                    Taxa de Ocupação
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: theme.palette.background.paper,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    minHeight: '104px',
                  }}
                >
                  <Box sx={{ pt: 1 }}>
                    <CircularProgressWithColor
                      sx={{ width: '250px', Height: '250px' }}
                      value={listaResultados.porcetagemDisponivel}
                      cor={'#219C90'}
                    />
                  </Box>
                  <Typography style={{ textAlign: 'center' }}>
                    Taxa de Disponibilidade
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box mt={2} justifyContent={'center'} alignItems={'center'} gap={2}>
            <TabelaTaxaDeOcupacao
              listaResultados={listaResultados.estoqueOcup}
              handleFetch={handleFetch}
              permissionFilter={permissionFilter}
            />
          </Box>
        </Box>
      </div>
    </>
  );
}
