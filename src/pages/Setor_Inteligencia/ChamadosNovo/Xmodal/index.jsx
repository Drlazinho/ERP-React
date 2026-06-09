import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  TextField,
  FormLabel,
  Typography,
} from '@mui/material';
import Select from 'react-select';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import CardDetalheChamadaX from '../XCardHistory';
import LoupeIcon from '@mui/icons-material/Loupe';
import { formatDatewithHour } from '@/utils/formatDateInput';
import { formatarImagem } from '@/utils/formatarImagem';
import { Image } from '@mui/icons-material';
import { putChamadosX } from '@/services/chamados/chamadosX.service';
import { buscarUsuarioPorSetor } from '@/services/usuarios.service';
import ButtonCloseModal from '@/components/ButtonCloseModal';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import {
  getChamadoSituacao,
  getResponsavelChamados,
  getChamadosCategoria,
  getChamadosTipos,
  getChamadosStatus,
  getCategoriasEmail,
} from '@/services/modalDetalhesService';
import { useToast } from '@/hooks/toast.hook';
import { apiFabrica, apiLogin } from '@/services/apis';
import { donwloadPDF } from '@/utils/downloadPdf';
import { Text } from 'recharts';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '80%',
  height: '80%',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const interfaceDadostabela = {
  dataAbertura: '',
  dataAtualizacao: '',
  descricao: '',
  dias: null,
  id: null,
  quantidadeOcorrecias: null,
  responsavelDemandado: '',
  responsavelDemandante: '',
  setorDemandado: '',
  setorDemandante: '',
  situacao: '',
  status: '',
  tipo: '',
  titulo: '',
  urgencia: '',
  categoria: '',
  idStatus: null,
  idTipo: null,
  idCategoria: null,
  idSituacao: null,
  emailRespDemandado: '',
  emailRespDemandante: '',
  idSetorDemandado: null,
  emailResponsavelDemandante: '',
};

const initialChamado = {
  tipo: '',
  urgencia: '',
  setor: '',
  titulo: '',
  descricao: '',
  solicitante: '',
  categoria: '',
  imagem: null,
  responsavel: '',
  emailRespDemandado: '',
  emailRespDemandante: '',
  emailResponsavelDemandante: '',
};

const ListaDeUrgencia = [
  {
    id: 1,
    nome: 'BAIXA',
  },
  {
    id: 2,
    nome: 'MÉDIA',
  },
];

const InterfaceResponsavel = [
  {
    setor: '',
    nome: '',
    email: '',
  },
];

const interfaceDefault = [
  {
    id: null,
    nome: '',
    observacao: '',
  },
];

const interfaceSelect = {
  value: '',
  label: '',
};

export default function ModalChamadoDetalhes({
  open,
  onClose,
  openModalDet,
  handleDeleteChamadoDet,
  handleGetChamadoDet,
  listaMembros,
  handleFetch,
  handleEnviarEmail,
  dadosTabela,
  imagem,
  listaChamadosDetalhes,
  emailRespDemandante,
  setoresInfo,
}) {
  const [formData, setFormData] = React.useState(initialChamado);
  const [dadosTab, setDadosTab] = useState(interfaceDadostabela);
  const [dadosSituacao, setDadosSituacao] = useState(interfaceDefault);
  const [execFunc, setExecFunc] = useState(false);
  const [listaResponsavel, setListaResponsavel] =
    useState(InterfaceResponsavel);
  const [listaCategoria, setListaCategoria] = useState(interfaceDefault);
  const [listaTipos, setListaTipos] = useState(interfaceDefault);
  const [listaStatus, setListaStatus] = useState(interfaceDefault);
  const { addToast } = useToast();

  const [dadosSituacaoSelect, setDadosSituacaoSelect] =
    useState(interfaceSelect);
  const [responsavelSelect, setResponsavelSelect] = useState(interfaceSelect);
  const [categoriaSelect, setCategoriaSelect] = useState(interfaceSelect);
  const [tiposSelect, setTiposSelect] = useState(interfaceSelect);
  const [statusSelect, setStatusSelect] = useState(interfaceSelect);
  const [setorDemandandadoSelect, setSetorDemandandado] =
    useState(interfaceSelect);
  const [urgenciaSelect, setUrgenciaSelect] = useState(interfaceSelect);
  const { email, setor } = useUsuarioLocal();

  const [mostraImage, setMostraImage] = useState(false);

  const [setorSelecionado, setSetorSelecionado] = useState(
    dadosTab.setorDemandado
  );
  const fetchCategoriasByEmail = async () => {
    try {
      const categorias = await getCategoriasEmail(email);
      setListaCategoria(categorias);
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro ao carregar categorias',
        description:
          'Não foi possível carregar as categorias para o responsável selecionado.',
      });
    }
  };

  useEffect(() => {
    fetchCategoriasByEmail();
  }, [dadosTab.emailResponsavelDemandante]);

  const listaStatusObj = listaStatus.map((item) => ({
    value: item.id,
    label: item.nome,
  }));

  const listaSetorDemandandado = setoresInfo.map((item) => ({
    value: item.id,
    label: item.setor,
  }));

  const dadosSituacaoObj = dadosSituacao.map((item) => ({
    value: item.id,
    label: item.nome,
  }));

  const listaResponsavelObj = listaResponsavel.map((item) => ({
    value: item.email,
    label: item.nome,
  }));

  const listaTiposObj = listaTipos.map((item) => ({
    value: item.id,
    label: item.nome,
  }));

  const listaDeUrgenciaObj = ListaDeUrgencia.map((item) => ({
    value: item.id,
    label: item.nome,
  }));

  const listaCategoriaObj = listaCategoria.map((item) => ({
    value: item.id,
    label: item.nome,
  }));

  const getListaSituacao = () => {
    getChamadoSituacao().then((res) => {
      setDadosSituacao(res);
    });
  };

  const getResponsavel = () => {
    buscarUsuarioPorSetor(email).then((res) => {
      setListaResponsavel(res.usuarios);
    });
  };

  const getChamadosTiposFunc = () => {
    getChamadosTipos().then((res) => {
      setListaTipos(res);
    });
  };

  // const getChamadosCategoriaFunc = () => {
  //   getChamadosCategoria().then((res) => {
  //     setListaCategoria(res);
  //   });
  // };

  const getChamadosStatusFunc = () => {
    getChamadosStatus().then((res) => {
      setListaStatus(res);
    });
  };

  const handleChangeDadosStatus = (e) => {
    setDadosTab((prevData) => ({
      ...prevData,
      status: e.label,
      idStatus: e.value,
    }));
  };

  const handleChangeSetorDemandado = (e) => {
    setDadosTab((prevData) => ({
      ...prevData,
      setorDemandado: e.label,
      idSetorDemandado: e.value,
    }));
  };

  const handleSelectDados = (e) => {
    setDadosSituacaoSelect(() => ({
      label: dadosTabela.situacao,
      value: dadosTabela.idSituacao,
    }));
    setResponsavelSelect(() => ({
      label: dadosTabela.responsavelDemandado,
    }));
    setCategoriaSelect(() => ({
      label: dadosTabela.categoria,
      value: dadosTabela.idCategoria,
    }));
    setTiposSelect(() => ({
      label: dadosTabela.tipo,
      value: dadosTabela.idTipo,
    }));
    setStatusSelect(() => ({
      label: dadosTabela.status,
      value: dadosTabela.idStatus,
    }));
    setSetorDemandandado(() => ({
      label: dadosTabela.setorDemandado,
      value: dadosTabela.idSetorDemandado,
    }));
    setUrgenciaSelect(() => ({
      label: dadosTabela.urgencia,
    }));
  };

  const handleChangeDadosResponsavel = (e) => {
    setDadosTab((prevData) => ({
      ...prevData,
      responsavelDemandado: e.value,
    }));
    enviarEmailResponsavel(e.value, dadosTab.titulo);
  };

  const handleChangeDadosSituacao = (e) => {
    setDadosTab((prevData) => ({
      ...prevData,
      situacao: e.label,
      idSituacao: e.value,
    }));
  };

  const handleChangeDadosTipos = (e) => {
    setDadosTab((prevData) => ({
      ...prevData,
      tipo: e.label,
      idTipo: e.value,
    }));
  };

  const handleChangeDadosUrgencia = (e) => {
    setDadosTab((prevData) => ({
      ...prevData,
      urgencia: e.label,
    }));
  };

  const handleChangeDadosCategoria = (e) => {
    setDadosTab((prevData) => ({
      ...prevData,
      categoria: e.label,
      idCategoria: e.value,
    }));
  };

  useEffect(() => {
    if (dadosTabela) {
      setDadosTab((prevData) => ({
        ...prevData,
        ...dadosTabela,
        idSetorDemandado:
          dadosTabela.idSetorDemandado || setoresInfo[0]?.id || null,
      }));
      getListaSituacao();
      getResponsavel();
      // getChamadosCategoriaFunc();
      getChamadosTiposFunc();
      getChamadosStatusFunc();
      handleSelectDados();
    }

    if (imagem) {
      setFormData(imagem);
    }
  }, [dadosTabela, imagem]);

  const cancelFormData = () => {
    setFormData(initialChamado);
    onClose();
  };

  const handleUpdateChamado = async (value) => {
    let re = /\S+@\S+\.\S+/;
    let validacao = re.test(dadosTab.responsavelDemandado);

    await putChamadosX({
      id: value.id,
      status: value.idStatus,
      situacao: value.idSituacao,
      IdSetor_Demandado: value.idSetorDemandado,
      emailResponsavel: validacao
        ? dadosTab.responsavelDemandado
        : value.emailResponsavelDemandado,
      tipo: value.idTipo,
      categoria: value.idCategoria,
      urgencia: value.urgencia,
    })
      .then((res) => {
        addToast({
          type: 'success',
          title: 'Sucesso ao atualizar chamados!',
        });
      })
      .catch((error) => {
        addToast({
          type: 'danger',
          title: 'Erro ao atualizar Chamado !',
          description: error.response.data.title,
        });
      })
      .finally(() => {
        setExecFunc(false);
        handleFetch();
        onClose();
      });
  };

  const enviarEmailResponsavel = async (email, tituloChamado) => {
    try {
      await apiLogin.post('/Email', {
        destinatario: email,
        assunto: `Novo Chamado Atribuído: ${tituloChamado}`,
        body: `
        <table
    align="center"
    role="presentation"
    cellspacing="0"
    cellpadding="0"
    border="0"
    width="100%"
    style="max-width: 37.5em"
  >
  <p
                        style="
                          font-size: 16px;
                          line-height: 24px;
                          margin: 16px 0;
                          margin-top: -5px;
                        "
                      >
  Olá,

        Você foi designado como responsável pelo chamado "${tituloChamado}". 
                </p> 
                 
       Avalie o chamado e tome as ações necessárias para seu andamento. Caso tenha alguma dúvida , não hesite em entrar em contato com o demandante.

        Agradecemos pelo seu empenho e dedicação.
                </p> 
                <p>
                        © 2024 | REISTAR INDÚSTRIA E COMÉRCIO DE ELETRÔNICOS
                        LTDA
        </table>
        `,
      });
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro ao enviar e-mail!',
        description: 'Não foi possível notificar o responsável.',
      });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ButtonCloseModal onClick={cancelFormData} />
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#000' }}>
          Detalhes do Chamado
        </Typography>
        <Typography variant="body1" sx={{ textAlign: 'center', color: '#000' }}>
          Título: {dadosTab.titulo}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#000' }}>
          ID: {dadosTab.id}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#000' }}>
          Setor Demandante: {dadosTab.setorDemandante}
        </Typography>
        <Typography variant="body2" sx={{ textAlign: 'center', color: '#000' }}>
          Solicitante: {dadosTab.responsavelDemandante}
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: 'center', marginBottom: 2, color: '#000' }}
        >
          Abertura: {formatDatewithHour(dadosTab.dataAbertura)}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ alignContent: 'center', mr: '10px' }}>
            Setor Demandado:{dadosTab.setorDemandado}
          </Typography>
          <Select
            sx={{
              backgroundColor: '#fff',
              display: 'flex',
              '& .MuiInputBase-root': {
                height: '48px',
                borderRadius: '8px',
                '&:focus-within': {
                  border: '1px solid lightgray',
                },
              },
            }}
            inputProps={{ style: { height: '48px' } }}
            name="setorDemandandado"
            options={listaSetorDemandandado}
            onChange={handleChangeSetorDemandado}
            defaultValue={setorDemandandadoSelect}
          />
        </Box>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', gap: 2, my: 2 }}
          fullWidth
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              my: 2,
              alignItems: 'center',
              width: '50%',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                color: dadosTab.status === 'FECHADO' ? '#00750c' : '#F00',
              }}
            >
              Status: {dadosTab.status}
            </Typography>
            <FormControl variant="filled" sx={{ flex: 1 }}>
              <FormLabel id="demo-simple-select-label">
                Alterar Status
              </FormLabel>
              <Select
                name="status"
                options={listaStatusObj}
                onChange={handleChangeDadosStatus}
                defaultValue={statusSelect}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              my: 2,
              alignItems: 'center',
              width: '50%',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                color: dadosTab.status === 'FECHADO' ? '#00750c' : '#F00',
              }}
            >
              Situacão: {dadosTab.situacao}
            </Typography>
            <FormControl variant="filled" sx={{ flex: 1 }}>
              <FormLabel id="demo-simple-select-label">
                Alterar Situação
              </FormLabel>
              <Select
                name="situacao"
                options={dadosSituacaoObj}
                onChange={handleChangeDadosSituacao}
                defaultValue={dadosSituacaoSelect}
              />
            </FormControl>
          </Box>
        </Box>
        <FormControl variant="filled" fullWidth>
          <FormLabel id="demo-simple-select-label">Responsável</FormLabel>
          <Select
            name="responsavel"
            options={listaResponsavelObj}
            onChange={handleChangeDadosResponsavel}
            defaultValue={responsavelSelect}
          />
          <Typography
            variant="body2"
            sx={{ textAlign: 'start', marginBottom: 2, color: '#f00' }}
          >
            Lembrete: Atribuir Responsável
          </Typography>
        </FormControl>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, my: 2 }}>
          <FormControl variant="filled" fullWidth>
            <FormLabel id="demo-simple-select-label">Tipo</FormLabel>
            <Select
              name="tipo"
              options={listaTiposObj}
              onChange={handleChangeDadosTipos}
              defaultValue={tiposSelect}
            />
          </FormControl>
          <FormControl variant="filled" fullWidth>
            <FormLabel id="demo-simple-select-label">Urgência</FormLabel>
            <Select
              name="urgencia"
              options={listaDeUrgenciaObj}
              onChange={handleChangeDadosUrgencia}
              defaultValue={urgenciaSelect}
            />
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, my: 2 }}>
          <FormControl variant="filled" fullWidth>
            <FormLabel id="demo-simple-select-label">Categoria</FormLabel>
            <Select
              name="categoria"
              options={listaCategoriaObj}
              onChange={handleChangeDadosCategoria}
              defaultValue={categoriaSelect}
            />
          </FormControl>
        </Box>
        <Typography
          variant="body1"
          sx={{ textAlign: 'left', my: 2, color: '#000' }}
        >
          Descrição: {dadosTab.descricao}
        </Typography>
        {/* Botão mostrar imagem */}
        {formData.imagem && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setMostraImage(!mostraImage)}
            >
              {' '}
              {mostraImage ? 'Esconder Imagem' : 'Mostrar Imagem'}
            </Button>
            {mostraImage && (
              <img src={formatarImagem(formData.imagem)} alt="" width={'60%'} />
            )}
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 2, paddingY: 2 }} fullWidth>
          <Button
            variant="contained"
            color="success"
            endIcon={<SendIcon />}
            fullWidth
            onClick={() => {
              handleUpdateChamado(dadosTab);
            }}
          >
            Atualizar
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            fullWidth
            onClick={cancelFormData}
          >
            Cancelar
          </Button>
        </Box>
        <Box sx={{}}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', marginBottom: 2, color: '#000' }}
            >
              Detalhes do Chamado
            </Typography>

            <Button
              size="small"
              variant="contained"
              color="primary"
              type="button"
              startIcon={<LoupeIcon />}
              onClick={() => {
                openModalDet(
                  dadosTab.id,
                  dadosTab.solicitante,
                  dadosTab.emailRespDemandado,
                  dadosTab.emailRespDemandante
                );
              }}
            >
              Adicionar Detalhe
            </Button>
          </Box>
          <Box
            sx={{
              overflow: 'scroll',
              height: 300,
              display: 'flex',
              gap: 1,
              flexDirection: 'column',
            }}
          >
            {listaChamadosDetalhes &&
              listaChamadosDetalhes.map((item) => (
                <CardDetalheChamadaX
                  idDetalhe={item.idDetalhe}
                  idChamado={item.idChamado}
                  descricao={item.descricao}
                  previsaoEntrega={item.previsaoEntrega}
                  previsaoInicio={item.previsaoInicio}
                  responsavelAprovacao={item.responsavelAprovacao}
                  responsavelDemandado={item.responsavelDemandado}
                  observacao={item.observacao}
                  handleDeleteChamadoDet={handleDeleteChamadoDet}
                  handleGetChamadoDet={handleGetChamadoDet}
                  imagemDetalhe={item.imagemDetalhe}
                  emailRespDemandante={item.emailRespDemandante}
                />
              ))}
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
