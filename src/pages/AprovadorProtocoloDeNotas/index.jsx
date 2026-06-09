import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import LayoutNovo from '../../components/LayoutNovo';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  atualizarMultiplosProtocoloDeNotas,
  buscarNotaPorFiltro,
  buscarNotaAprovadasPorFiltro,
} from '../../services/protocoloNotasFiscais.service';
import { useToast } from '../../hooks/toast.hook';
import { useCallback, useEffect, useState } from 'react';
import CardNotaProtocolo from './components/CardNotaProtocolo';
import Loader from '../../components/Loader';
import CadastrarNotaModal from './Form/CadastrarNotaModalPart1';
import DeleteIcon from '@mui/icons-material/Delete';
import debounce from '../../utils/debounce';
import useFunctionProtocoloNotaUnity from './hook/useFunctionProtocoloNotaUnity.hook';
import AtualizarNotasAgrupadasModal from './Form/AtualizarNotasAgrupadasModal';
import useFetchDataList from './hook/useFetchDataList.hook';
import EditarNotaModal from './Form/EditarNotaModal';
import AtualizarNotaIndividualModal from './Form/AtualizarNotaIndividualModal';
import useHookDetalheDaNota from './hook/useHookDetalheDaNota.hook';

import CloseIcon from '@mui/icons-material/Close';
import { Modal as MuiModal } from '@mui/material';
import AtualizarNota from './Form/AtualizarNotaModal/AtualizarNota';
import RecommendIcon from '@mui/icons-material/Recommend';
import CardNotaProtocoloSelecionada from './components/CardNotaProtocoloSelecionada';
import useUsuarioLocal from '../../hooks/usuarioLocal.hook';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox'
import HeaderAmvox from '@/components/HeaderAmvox'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1000px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  overflowY: 'auto',
};

const ListaSetorPendente = ['FISCAL', 'FINANCEIRO'];

const ListaPendencia = [
  { value: null, label: 'Escolhe uma Opcão' },
  { value: 'SIM', label: 'Com Pendência' },
  { value: 'NAO', label: 'Sem Pendência' },
];

export default function AprovadorProtocoloDeNotasPagina() {
  const [notaFiscalLista, setNotaFiscalLista] = useState([]);
  const [nota, setNota] = useState({});
  const [emailCancelado, setEmailCancelado] = useState({});
  const [loading, setLoading] = useState(true);

  const [openModalCadastrarNota, setOpenModalCadastrarNota] = useState(false);
  const [openModalAtualizarNotaAgrupadas, setOpenModalAtualizarNotaAgrupadas] =
    useState(false);
  const [openModalEditarNota, setOpenEditarNota] = useState(false);

  const handleShowModalCadastrarNota = () => {
    setOpenModalCadastrarNota(!openModalCadastrarNota);
  };
  const handleShowModalAtualizarNotaAgrupadas = () => {
    setOpenModalAtualizarNotaAgrupadas(!openModalAtualizarNotaAgrupadas);
  };

  const handleShowModalEditarNota = (body) => {
    setNota(body);
    setOpenEditarNota(!openModalEditarNota);
  };

  const { addToast } = useToast();

  const {
    handleAddNotaNaLista,
    handleBaixarNota,
    listaDeNotasSelecionada,
    handleRemoveNotaNaLista,
    handleClearListaNotas,
  } = useFunctionProtocoloNotaUnity();

  const { setores, tipoDeNota, statusDeProtocolo, listaStatus, statusTodos } =
    useFetchDataList();
  const {
    idNota,
    listaDetalhesNota,
    openModalAtualizarNotaIndv,
    handleShowModalAtualizarNotaIndv,
    loadingDetalhes,
    handleAtualizarDetalhe,
  } = useHookDetalheDaNota();

  // const { handleNotaParaSelecionada, handleRemocaoSelecionada, visibilidadeNota} = useFunctionSelectionNotas()
  const { id } = useUsuarioLocal();
  const [filtro, setFiltro] = useState({
    dataRegistroInicial: null,
    dataRegistroFinal: null,
    dataVencimentoInicial: null,
    dataVencimentoFinal: null,
    pendencia: null,
    setorPendente: null,
    nota: null,
    idStatus: 0,
  });

  const handleFetch = useCallback(() => {
    setLoading(true);
    buscarNotaAprovadasPorFiltro(filtro)
      .then((retorno) => {
        setNotaFiscalLista(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar as Notas !',
          description:
            'Erro ao listar as Notas, por favor tente novamente dentre de instantes !',
        });
      })
      .finally(() => setLoading(false));
  }, [filtro]);

  const handleAtualizarListaDeNotas = (body) => {
    atualizarMultiplosProtocoloDeNotas(body)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Sucesso - Notas Atualizadas',
        });
        handleClearListaNotas([]);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro - Tentativa de Atualizar Notas',
        });
      })
      .finally(() => {
        handleFetch();
      });
  };

  const updateNota = async (value) => {
    handleShowModalEditarNota();
    const {
      id,
      DATA_VENCIMENTO,
      SETOR_ORIGEM,
      ANEXO,
      OBSERVACAO,
      ID_TIPO,
      SETOR,
    } = value;
    const formData = new FormData();
    formData.append('Id', id);
    formData.append('DATA_VENCIMENTO', DATA_VENCIMENTO);
    formData.append('SETOR_ORIGEM', SETOR_ORIGEM);
    formData.append('ANEXO', ANEXO);
    formData.append('OBSERVACAO', OBSERVACAO);
    formData.append('ID_TIPO', ID_TIPO);
    formData.append('SETOR', SETOR);
    const response = await apiFabrica
      .put(`/Protocolo_nota/`, formData)
      .then((retorno) => {
        addToast({
          type: 'success',
          title: 'Nota Fiscal cadastrada com sucesso',
          description: retorno.data.message,
        });
      })
      .catch((_err) => {
        addToast({
          type: 'warning',
          title: 'Nota não encontrada',
          description: _err.response.data.error,
        });
      });
    handleFetch();
    handleShowModalEditarNota();
  };

  useEffect(() => {
    handleFetch();
  }, [filtro]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltro((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClear = (e) => {
    e.preventDefault();
    e.target.reset();
    setFiltro({
      dataRegistro: null,
      dataVencimento: null,
      pendencia: null,
      idStatus: 0,
      setorPendente: null,
      nota: null,
      idAprovador: id,
    });
    handleClearListaNotas();
  };

  return (
    <LayoutNovo setorColor={'financeiro'}>
      <CadastrarNotaModal
        openModal={openModalCadastrarNota}
        handleClose={handleShowModalCadastrarNota}
        tipoDeNota={tipoDeNota}
        setores={setores}
      />
      <AtualizarNotasAgrupadasModal
        listaDeNotasSelecionada={listaDeNotasSelecionada}
        openModal={openModalAtualizarNotaAgrupadas}
        handleClose={handleShowModalAtualizarNotaAgrupadas}
        statusDeProtocolo={statusDeProtocolo}
        handleAtualizarListaDeNotas={handleAtualizarListaDeNotas}
      />

      {/* <EditarNotaModal
                openModal={openModalEditarNota}
                handleClose={handleShowModalEditarNota}
                tipoDeNota={tipoDeNota}
                setores={setores}
                notaEscolhida={nota}
                handleSubmit={updateNota}
            /> */}

      <MuiModal open={openModalEditarNota} onClose={handleShowModalEditarNota}>
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
              sx={{ fontSize: '20px', fontWeight: 'bold', color: '#333333' }}
            >
              Nota Fiscal
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleShowModalEditarNota();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box>
            <AtualizarNota
              notasSelecionada={nota}
              setores={setores}
              handleClose={handleShowModalEditarNota}
              protocoloTipo={tipoDeNota}
              handleSubmit={updateNota}
            />
          </Box>
        </Box>
      </MuiModal>

      <AtualizarNotaIndividualModal
        idNota={idNota}
        openModal={openModalAtualizarNotaIndv}
        lista={listaDetalhesNota}
        setores={setores}
        listaStatus={listaStatus}
        handleSubmit={handleAtualizarDetalhe}
        loadingDetalhes={loadingDetalhes}
        handleClose={handleShowModalAtualizarNotaIndv}
      />

      <Box position={'relative'}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pr: 2,
          }}
        >
          <HeaderAmvox
            title={'Aprovação de Protocolo'}
          />
          <Stack direction={'row'} spacing={2}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ height: '2rem' }}
              onClick={handleShowModalAtualizarNotaAgrupadas}
              endIcon={<DynamicFeedIcon />}
              disabled={listaDeNotasSelecionada.length === 0}
            >
              Atualizar Notas Agrupadas {listaDeNotasSelecionada.length}
            </Button>
          </Stack>
        </Box>

        <form onSubmit={handleClear}>
          <Grid container sx={{ p: 1, pb: 0, mb: 1 }} columnSpacing={1}>
            <Grid item xs={6} sm={6} md={1.7}>
              <FormControl
                variant="filled"
                size="small"
                fullWidth
                sx={{ background: '#fff', borderRadius: 2 }}
              >
                <TextField
                  type="text"
                  // value={filtro.nota}
                  label="Número NF"
                  size="small"
                  name="nota"
                  onChange={(e) =>
                    debounce(() => {
                      setFiltro({
                        ...filtro,
                        nota: e.target.value,
                      });
                    }, 2200)
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={2} md={1.7}>
              <FormControl
                variant="filled"
                size="small
              "
                fullWidth
                sx={{ background: '#fff', borderRadius: 2 }}
              >
                <InputLabel id="demo-simple-select-label">
                  Setor Pendente
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filtro.setorPendente ?? ''}
                  label="Setor Pendente"
                  name="setorPendente"
                  onChange={handleChange}
                >
                  {ListaSetorPendente.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={2} md={1.7}>
              <FormControl
                variant="filled"
                size="small"
                fullWidth
                sx={{ background: '#fff', borderRadius: 2 }}
              >
                <InputLabel id="demo-simple-select-label">Pendência</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filtro.pendencia ?? ''}
                  label="Pendente"
                  name="pendencia"
                  onChange={handleChange}
                >
                  {ListaPendencia.map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={2} md={1.7}>
              <FormControl
                variant="filled"
                size="small"
                fullWidth
                sx={{ background: '#fff', borderRadius: 2 }}
              >
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filtro.idStatus ?? ''}
                  label="Status"
                  name="idStatus"
                  onChange={handleChange}
                >
                  {statusTodos.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.descricao}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={2} md={1.7}>
              <InputDateAmvox
                label={'Data de Registro'}
                value={filtro.dataRegistro}
                format="YYYY-MM-DD"
                onChange={(date) =>
                  debounce(() => {
                    setFiltro({ ...filtro, dataRegistro: date });
                  })
                }
              />
            </Grid>
            <Grid item xs={6} sm={2} md={1.7}>
              <InputDateAmvox
                label={'Data de Vencimento'}
                value={filtro.dataVencimento}
                format="YYYY-MM-DD"
                onChange={(date) =>
                  debounce(() => {
                    setFiltro({ ...filtro, dataVencimento: date });
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={2} md={1.7}>
              <Button
                fullWidth
                variant="contained"
                color="warning"
                size="large"
                startIcon={<DeleteIcon />}
                type="submit"
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Box position={'relative'} flex={3} height={600} overflow={'auto'}>
            <Typography
              variant="h5"
              textAlign={'center'}
              sx={{
                background: '#000',
                color: '#fff',
                position: 'sticky',
                top: 0,
                width: '100%',
                zIndex: 4,
              }}
            >
              Notas Protocoladas
            </Typography>
            {loading ? (
              <Loader />
            ) : (
              <CardNotaProtocolo
                notaFiscalLista={notaFiscalLista}
                handleAddNotaNaLista={handleAddNotaNaLista}
                listaDeNotasSelecionada={listaDeNotasSelecionada}
                handleBaixarNota={handleBaixarNota}
                showModalEditarNota={handleShowModalEditarNota}
                handleShowModalAtualizarNotaIndv={
                  handleShowModalAtualizarNotaIndv
                }
                isAddListView={true}
              />
            )}
          </Box>
          <Box position={'relative'} flex={1} height={600} overflow={'auto'}>
            <Typography
              variant="h5"
              textAlign={'center'}
              sx={{ background: '#000', color: '#fff' }}
            >
              Notas Selecionada
            </Typography>
            <CardNotaProtocoloSelecionada
              listaDeNotasSelecionada={listaDeNotasSelecionada}
              handleRemoveNotaNaLista={handleRemoveNotaNaLista}
            />
          </Box>
        </Box>
      </Box>
    </LayoutNovo>
  );
}
