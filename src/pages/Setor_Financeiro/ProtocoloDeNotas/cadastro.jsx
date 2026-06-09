import { TbNotebook } from 'react-icons/tb';
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
  Modal as MuiModal,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  atualizarMultiplosProtocoloDeNotas,
  buscarNotaAprovadasPorFiltro,
} from '../../../services/protocoloNotasFiscais.service';
import { useToast } from '../../../hooks/toast.hook';
import { useCallback, useEffect, useState } from 'react';
import CardNotaProtocoloX from '../../AprovadorProtocoloDeNotas/components/CardNotaProtocolo';
import Loader from '../../../components/Loader';
import CadastrarNotaModal from './Form/CadastrarNotaModalPart1';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import debounce from '../../../utils/debounce';
import useFunctionProtocoloNotaUnity from './hook/useFunctionProtocoloNotaUnity.hook';
import AtualizarNotaIndividualModal from './Form/AtualizarNotaIndividualModal';
import useHookDetalheDaNota from './hook/useHookDetalheDaNota.hook';
import AtualizarNota from './Form/AtualizarNotaModal/AtualizarNota';
import useUsuarioLocal from '../../../hooks/usuarioLocal.hook';
import useFetchDataList from './hook/useFetchDataList.hook';
import { apiFabricaADM } from '../../../services/apis';
import { InputDateAmvox } from '../../../components/InputDateAmvox/InputDateAmvox';
import HeaderAmvox from '@/components/HeaderAmvox';

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

const ListaSetorPendente = ['FISCAL', 'FINANCEIRO'];

const ListaPendencia = [
  { value: null, label: 'Escolhe uma Opcão' },
  { value: 'SIM', label: 'Com Pendência' },
  { value: 'NAO', label: 'Sem Pendência' },
];

export default function CadastrodeNotas() {
  const [notaFiscalLista, setNotaFiscalLista] = useState([]);
  const [nota, setNota] = useState({});
  const [loading, setLoading] = useState(true);

  const [openModalCadastrarNota, setOpenModalCadastrarNota] = useState(false);
  const [openModalEditarNota, setOpenEditarNota] = useState(false);

  const handleShowModalCadastrarNota = () => {
    setOpenModalCadastrarNota(!openModalCadastrarNota);
  };

  const handleShowModalEditarNota = (body) => {
    setNota(body);
    setOpenEditarNota(!openModalEditarNota);
  };

  const { addToast } = useToast();

  const { handleBaixarNota, handleClearListaNotas } =
    useFunctionProtocoloNotaUnity();

  const { setores, tipoDeNota, statusDeProtocolo, statusTodas } =
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
    const response = await apiFabricaADM
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
      dataRegistroInicial: null,
      dataVencimentoFinal: null,
      dataRegistroFinal: null,
      dataVencimentoInicial: null,
      pendencia: null,
      setorPendente: null,
      nota: null,
      idUser: null,
      idStatus: 0,
    });
    handleClearListaNotas();
  };

  return (
    <>
      <CadastrarNotaModal
        openModal={openModalCadastrarNota}
        handleClose={handleShowModalCadastrarNota}
        tipoDeNota={tipoDeNota}
        setores={setores}
      />
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
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Editar Nota
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
        statusDeProtocolo={statusDeProtocolo}
        handleSubmit={handleAtualizarDetalhe}
        loadingDetalhes={loadingDetalhes}
        handleClose={handleShowModalAtualizarNotaIndv}
      />

      <Box position={'relative'}>
        <Box
          position="relative"
          sx={{
            backgroundColor: '#f3f4f6',
            gap: 2,
            display: 'flex',
            flexDirection: 'row',
            padding: '0px 20px 20px 20px',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <HeaderAmvox title="Cadastro Protocolo de Notas" />
          <Button
            variant="contained"
            color="primary"
            sx={{
              height: '2.5rem',
              fontSize: '1.1rem',
              textTransform: 'capitalize',
            }}
            onClick={handleShowModalCadastrarNota}
            startIcon={<AddIcon />}
          >
            Cadastrar Nota
          </Button>
        </Box>

        <form onSubmit={handleClear}>
          <Grid
            container
            sx={{ p: 2, pb: 0, mb: 1, mt: 3.5, alignItems: 'center' }}
            columnSpacing={1}
          >
            <Grid item xs={5} sm={5} md={2.47}>
              <FormControl
                variant="filled"
                size="normal"
                fullWidth
                sx={{ background: '#f0f0f0', borderRadius: 2 }}
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
            <Grid item xs={5} sm={1.5}>
              <FormControl
                variant="filled"
                size="small"
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

            <Grid item xs={5} sm={1.5} md={1.8}>
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

            <Grid item xs={5} sm={1.5}>
              <FormControl
                variant="filled"
                size="small"
                fullWidth
                sx={{ background: '#fff', borderRadius: 2 }}
              >
                <InputLabel id="demo-simple-select-label">
                  Status da Nota
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filtro.idStatus ?? '0'}
                  label="Status"
                  name="idStatus"
                  onChange={handleChange}
                >
                  {statusTodas.map((item, index) => (
                    <MenuItem key={index} value={item.id}>
                      {item.descricao}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={5} sm={1.6}>
              <InputDateAmvox
                label="Data de Registro Inicial"
                value={filtro.dataRegistroInicial || ''}
                onChange={(date) => {
                  setFiltro((prev) => ({ ...prev, dataRegistroInicial: date }));
                }}
                format="YYYY-MM-DD"
              />
            </Grid>
            <Grid item xs={5} sm={1.6}>
              <InputDateAmvox
                label="Data de Registro Final"
                value={filtro.dataRegistroFinal || ''}
                onChange={(date) => {
                  setFiltro((prev) => ({ ...prev, dataRegistroFinal: date }));
                }}
                format="YYYY-MM-DD"
              />
            </Grid>
            <Grid item xs={5} sm={1.8}>
              <InputDateAmvox
                label="Data de Vencimento Inicial"
                value={filtro.dataVencimentoInicial || ''}
                onChange={(date) => {
                  setFiltro((prev) => ({
                    ...prev,
                    dataVencimentoInicial: date,
                  }));
                }}
                format="YYYY-MM-DD"
              />
            </Grid>
            <Grid item xs={5} sm={1.8}>
              <InputDateAmvox
                label="Data de Vencimento Final"
                value={filtro.dataVencimentoFinal || ''}
                onChange={(date) => {
                  setFiltro((prev) => ({
                    ...prev,
                    dataVencimentoFinal: date,
                  }));
                }}
                format="YYYY-MM-DD"
              />
            </Grid>
            <Grid item xs={12} sm={1} container alignItems="center">
              <Button
                fullWidth
                variant="contained"
                color="warning"
                size="small"
                startIcon={<DeleteIcon />}
                type="submit"
                sx={{ height: '2.0rem', width: '8rem', fontSize: '1rem', m: 1 }}
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
              <CardNotaProtocoloX
                notaFiscalLista={notaFiscalLista}
                handleBaixarNota={handleBaixarNota}
                showModalEditarNota={handleShowModalEditarNota}
                handleShowModalAtualizarNotaIndv={
                  handleShowModalAtualizarNotaIndv
                }
                isAddListView={false}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
