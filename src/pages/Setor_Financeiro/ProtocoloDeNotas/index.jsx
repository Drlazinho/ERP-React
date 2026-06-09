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
  Pagination,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import {
  atualizarMultiplosProtocoloDeNotas,
  buscarNotaAprovadasPorFiltro,
  buscarNotaPorFiltro,
} from '@/services/protocoloNotasFiscais.service';
import { useToast } from '@/hooks/toast.hook';
import { useCallback, useEffect, useState } from 'react';
import CardNotaProtocolo from './components/CardNotaProtocolo';
import Loader from '@/components/Loader';
import CadastrarNotaModal from './Form/CadastrarNotaModalPart1';
import { formatDateSendApi } from '@/utils/formatDateInput';
import DeleteIcon from '@mui/icons-material/Delete';
import debounce from '@/utils/debounce';
import useFunctionProtocoloNotaUnity from './hook/useFunctionProtocoloNotaUnity.hook';
import CardNotaProtocoloSelecionada from './components/CardNotaProtocoloSelecionada';
import AtualizarNotasAgrupadasModal from './Form/AtualizarNotasAgrupadasModal';
import useFetchDataList from './hook/useFetchDataList.hook';
import EditarNotaModal from './Form/EditarNotaModal';
import { apiFabricaADM } from '@/services/apis';
import AtualizarNotaIndividualModal from './Form/AtualizarNotaIndividualModal';
import useHookDetalheDaNota from './hook/useHookDetalheDaNota.hook';

import CloseIcon from '@mui/icons-material/Close';
import AtualizarNota from './Form/AtualizarNotaModal/AtualizarNota';
// import useFunctionSelectionNotas from "./hook/useFunctionSelectionNotas.hook";
import { RiFileExcel2Fill } from 'react-icons/ri';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';
import VisualizarDetalhesNotaModal from './Form/VisualizarDetalhesModal';
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

export default function ProtocolodeNotas() {
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

  const [filtro, setFiltro] = useState({
    dataRegistroInicial: null,
    dataRegistroFinal: null,
    dataVencimentoInicial: null,
    dataVencimentoFinal: null,
    pendencia: null,
    setorPendente: null,
    nota: null,
    idStatus: 0,
    pagina: 1,
    qtdPorPagina: 10,
  });

  const handleFetch = useCallback(async () => {
    setLoading(true);
    await buscarNotaAprovadasPorFiltro(filtro)
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

  const formatDateTime = (value) => {
    if (!value) return '';

    const year = value.slice(0, 4);
    const month = value.slice(5, 7);
    const day = value.slice(8, 10);

    const date = [day, month, year].join('-');

    return date;
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
      });
    // .catch((_err) => {
    //     addToast({
    //         type: 'warning',
    //         title: 'Nota não encontrada',
    //         description: _err.response.data.error
    //     });
    // });
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
      idStatus: 0,
    });
    handleClearListaNotas();
  };

  const ExcelJS = require('exceljs');

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('My Sheet');
    sheet.properties.defaultRowHeight = 20;

    sheet.columns = [
      {
        header: 'Nº Nota Fiscal',
        key: 'numero',
        width: 14,
      },
      {
        header: 'Emissor',
        key: 'emissor',
        width: 35,
      },
      {
        header: 'CNPJ',
        key: 'emissoR_CNPJ',
        width: 15,
      },
      {
        header: 'UF',
        key: 'uf',
        width: 4,
      },
      {
        header: 'Valor',
        key: 'valoR_NOTA',
        width: 9,
      },
      {
        header: 'Status',
        key: 'status',
        width: 15,
      },
      {
        header: 'Setor',
        key: 'setor',
        width: 18,
      },
      {
        header: 'Tipo',
        key: 'tipo',
        width: 15,
      },
      {
        header: 'Inserido por',
        key: 'user',
        width: 25,
      },
      {
        header: 'Data registro',
        key: 'datA_REGISTRO',
        width: 15,
      },
      {
        header: 'Situação',
        key: 'situacao',
        width: 20,
      },
      {
        header: 'Observação',
        key: 'observacao',
        width: 60,
      },
    ];

    notaFiscalLista.map((item) => {
      sheet.addRow({
        numero: item.numero,
        emissor: item.emissor,
        emissoR_CNPJ: item.emissoR_CNPJ,
        uf: item.uf,
        valoR_NOTA: item.valoR_NOTA,
        status: item.status,
        setor: item.setor,
        tipo: item.tipo,
        user: item.user,
        datA_REGISTRO: formatDateTime(item.datA_REGISTRO),
        situacao: item.situacao,
        observacao: item.observacao,
      });

      return null;
    });

    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `ProtocoloNotas - ${formatDateSendApi(
        new Date()
      )}.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <>
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
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
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
        emailCancelado={emailCancelado}
        openModal={openModalAtualizarNotaIndv}
        lista={listaDetalhesNota}
        setores={setores}
        statusDeProtocolo={statusDeProtocolo}
        handleSubmit={handleAtualizarDetalhe}
        loadingDetalhes={loadingDetalhes}
        handleClose={handleShowModalAtualizarNotaIndv}
      />

      <Box position={'relative'} sx={{ width: '98%', margin: '0 auto' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pr: 2,
          }}
        >
          <HeaderAmvox title={'Protocolo de Notas'} />
          <Stack direction={'row'} spacing={3}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ height: '48px' }}
              onClick={handleShowModalCadastrarNota}
              startIcon={<AddIcon />}
            >
              Cadastrar Nota
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<RiFileExcel2Fill />}
              sx={{ width: '15%' }}
              size="small"
              type="submit"
              onClick={exportExcelFile}
            >
              Excel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ height: '48px' }}
              onClick={handleShowModalAtualizarNotaAgrupadas}
              endIcon={<DynamicFeedIcon />}
              disabled={listaDeNotasSelecionada.length === 0}
            >
              Atualizar Notas Agrupadas {listaDeNotasSelecionada.length}
            </Button>
          </Stack>
        </Box>

        <VisualizarDetalhesNotaModal />

        <form onSubmit={handleClear}>
          <Grid container sx={{ p: 1, pb: 0, mb: 1 }} columnSpacing={1}>
            <Grid item xs={5} sm={6} md={2}>
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
            <Grid item xs={5} sm={1.2}>
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

            <Grid item xs={5} sm={1.2}>
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
                  value={filtro.idStatus ?? ''}
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
                label={'Data de Registro Inicial'}
                value={filtro.dataRegistroInicial}
                format="YYYY-MM-DD"
                onChange={(date) =>
                  debounce(() => {
                    setFiltro({
                      ...filtro,
                      dataRegistroInicial: date,
                    });
                  })
                }
              />
            </Grid>
            <Grid item xs={5} sm={1.6}>
              <InputDateAmvox
                label={'Data de Registro Final'}
                value={filtro.dataRegistroFinal}
                format="YYYY-MM-DD"
                onChange={(date) =>
                  debounce(() => {
                    setFiltro({ ...filtro, dataRegistroFinal: date });
                  })
                }
              />
            </Grid>
            <Grid item xs={5} sm={1.6}>
              <InputDateAmvox
                label={'Data de Vencimento Inicial'}
                value={filtro.dataVencimentoInicial}
                format="YYYY-MM-DD"
                onChange={(date) =>
                  debounce(() => {
                    setFiltro({
                      ...filtro,
                      dataVencimentoInicial: date,
                    });
                  })
                }
              />
            </Grid>
            <Grid item xs={5} sm={1.6}>
              <InputDateAmvox
                label={'Data de Vencimento Final'}
                value={filtro.dataVencimentoFinal ?? ''}
                format="YYYY-MM-DD"
                onChange={(date) =>
                  debounce(() => {
                    setFiltro({
                      ...filtro,
                      dataVencimentoFinal: date,
                    });
                  })
                }
              />
            </Grid>
            <Grid item xs={5} sm={1}>
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
                setEmailCancelado={setEmailCancelado}
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
    </>
  );
}
