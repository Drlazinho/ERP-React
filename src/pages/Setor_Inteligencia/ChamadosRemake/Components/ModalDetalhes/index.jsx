import * as React from 'react';
import { useState, useEffect } from 'react';
import { apiInteligencia } from '@/services/apis';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {
  FormLabel,
  IconButton,
  Select,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  LinearProgress,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import ClearIcon from '@mui/icons-material/Clear';
import LinkIcon from '@mui/icons-material/Link';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import CardChatTitulo from '../CardChatTitulo';
import CardChatDetalhe from '../CardChatDetalhe';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import {
  getCategoriasEmail,
  getChamadoSituacao,
  getChamadosStatus,
  getChamadosTipos,
  getSubcategorias,
} from '@/services/modalDetalhesService';
import { buscarUsuarioPorSetor } from '@/services/usuarios.service';
import {
  postChamadosDetalhesX,
  putChamadosX,
} from '@/services/chamados/chamadosX.service';
import { useToast } from '@/hooks/toast.hook';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import EnviarEmailDetalhe from '../EnviarEmailDetalhe';
import EnviarEmailAtribuido from '../EmailAtribuido';
import { EnviarFormEmail } from '@/services/email.service';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AddIcon from '@mui/icons-material/Add';

const style = {
  position: 'absolute',
  flexDirection: 'column',
  display: 'flex',
  top: '50%',
  left: '50%',
  width: '80%',
  overflowY: 'auto',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FFF',
  boxShadow: 24,
  borderRadius: '8px',
  padding: '24px 29px',
  maxHeight: '95%',
};

const formStyle = {
  fontSize: '13px',
  color: '#000',
};

const ListaDeUrgencia = [
  { id: 1, nome: 'BAIXA' },
  { id: 2, nome: 'MÉDIA' },
  { id: 3, nome: 'ALTA' },
];

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
  subcategoria: '',
  idSubcategoria: null,
};

const interfacePostDetalhe = {
  IdChamado: 0,
  Descricao: '',
  ImagemDetalhe: '',
  Remetente: '',
  Destinatario: '',
  cc: '',
};

export default function ModalDetalhes({ data = [], handleGetData }) {
  const { addToast } = useToast();
  const { email, id } = useUsuarioLocal();
  const textRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [descricaoTouched, setDescricaoTouched] = useState(false);
  const [detalhesId, setDetalhesId] = React.useState({});
  const [dadosTab, setDadosTab] = useState(interfaceDadostabela);
  const [listaCategoria, setListaCategoria] = useState([]);
  const [listaSubcategoria, setListaSubcategoria] = useState([]);
  const [listaTipos, setListaTipos] = useState([]);
  const [listaResponsavel, setListaResponsavel] = useState([]);
  const [listaStatus, setListaStatus] = useState([]);
  const [dadosSituacao, setDadosSituacao] = useState([]);
  const [formDataDetalhe, setFormDataDetalhe] = useState(interfacePostDetalhe);
  const [aparecerCC, setAparecerCC] = useState(false);
  const [dadosTabInicializado, setDadosTabInicializado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState({
    id: null,
    status: 2,
    EmailUsuario: email,
    titulo: '',
    categoria: 0,
    subcategoria: 0,
    prioridade: '',
    setorSolicitante: 0,
    IdResponsavel: 0,
    atendimento: '',
  });

  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString('pt-BR', options);
  };

  const validarFormulario = () => {
    if (!formDataDetalhe.Descricao || formDataDetalhe.Descricao.length < 10) {
      setDescricaoTouched(true);
      return false;
    }
    return true;
  };

  const handleEnviar = () => {
    if (validarFormulario()) {
      setOpen(true);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    loaderDataChamadosDetalhe(data.id);
    fetchCategoriasByEmail();
    getSubcategoriasFunc();
    getChamadosTiposFunc();
    getResponsavel();
    getChamadosStatusFunc();
    getListaSituacao();
  };

  const handleClose = () => {
    handleSubmitClear();
    setOpen(false);
    setDadosTabInicializado(false);
    handleGetData();
  };

  const fetchCategoriasByEmail = async () => {
    try {
      const categorias = await getCategoriasEmail(email);

      setListaCategoria(categorias);
    } catch (error) {}
  };

  const getSubcategoriasFunc = async () => {
    try {
      const categoriaId = data.idCategoria || dadosTab.categoria;
      if (categoriaId) {
        const res = await getSubcategorias(categoriaId);
        setListaSubcategoria(res.value);
      }
    } catch (error) {
      console.error('Erro ao buscar subcategorias:', error);
    }
  };

  const getChamadosTiposFunc = async () => {
    try {
      const res = await getChamadosTipos();
      setListaTipos(res);
    } catch (error) {
      console.error('Erro ao buscar tipos de chamados:', error);
    }
  };

  const getResponsavel = async () => {
    try {
      const res = await buscarUsuarioPorSetor(email);
      setListaResponsavel(res.usuarios);
    } catch (error) {
      console.error('Erro ao buscar responsáveis:', error);
    }
  };

  const getChamadosStatusFunc = async () => {
    try {
      const res = await getChamadosStatus();
      setListaStatus(res);
    } catch (error) {
      console.error('Erro ao buscar status dos chamados:', error);
    }
  };

  const getListaSituacao = () => {
    getChamadoSituacao().then((res) => {
      setDadosSituacao(res);
    });
  };

  const loaderDataChamadosDetalhe = (id) => {
    apiInteligencia
      .get(`/ChamadoDetalheX/${id}`)
      .then((res) => {
        setDetalhesId(res.data.value);
      })
      .catch((error) => {});
  };

  const handleEnviarEmail = (value) => {
    const dataAgora = new Date();
    const assunto = 'Nova Ocorrência' + dataAgora;
    const cc = formDataDetalhe.cc;

    const destinatario = data.emailResponsavelDemandante;
    const body = EnviarEmailDetalhe({
      data: dataAgora,
      assunto: 'Nova Ocorrência' + data,
      idChamado: data.id,
      remetente: data.responsavelDemandado,
      setor: data.setorDemandado,
      tituloDoChamado: data.titulo,
      dataRegistro: data.dataAbertura,
      descricao: formDataDetalhe.Descricao,
      destinatario: data.emailResponsavelDemandante,
    });
    const newValue = { destinatario, body, assunto, cc };

    EnviarFormEmail(newValue)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Sucesso ao enviar email',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Falha ao enviar email',
          description: error.response.data,
        });
      });
  };

  const handleEnviarEmailAtribuido = (value) => {
    const dataAgora = new Date();
    const assunto = 'Nova Ocorrência' + dataAgora;

    const destinatario = value;
    const body = EnviarEmailAtribuido({
      data: dataAgora,
      assunto: 'Nova Ocorrência' + data,
      idChamado: data.id,
      remetente: data.responsavelDemandante,
      setor: data.setorDemandante,
      tituloDoChamado: data.titulo,
      dataRegistro: dataAgora,
    });

    const newValue = { destinatario, body, assunto };

    EnviarFormEmail(newValue)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Sucesso ao enviar email',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Falha ao enviar email',
          description: error.response.data,
        });
      });
  };

  const handleSubmitDetalhe = async (body) => {
    setLoading(true);
    const formData = new FormData();

    formData.append('IdChamado', data.id);
    formData.append('Descricao', body.Descricao);
    formData.append('ImagemDetalhe', body.ImagemDetalhe);
    formData.append('Remetente', email);
    formData.append('Destinatario', data.emailResponsavelDemandante);
    await postChamadosDetalhesX(formData)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso ao criar Detalhes!',
          idChamado: data.id,
        });
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
      })
      .finally(() => {
        handleSubmitClear();
        loaderDataChamadosDetalhe(data.id);
        handleEnviarEmail(formDataDetalhe);
        setLoading(false);
      });
  };

  const handleUpdateChamado = async () => {
    let re = /\S+@\S+\.\S+/;
    let validacao = re.test(dadosTab.responsavelDemandado);

    await putChamadosX({
      id: data.id,
      status: dadosTab.status,
      situacao: dadosTab.situacao,
      emailResponsavel: validacao
        ? dadosTab.responsavelDemandado
        : dadosTab.emailRespDemandado,
      tipo: dadosTab.tipo,
      categoria: dadosTab.categoria,
      subcategoria: dadosTab.subcategoria || 0,
      urgencia: dadosTab.urgencia,
      idUserFechamento: id,
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
        });
      })
      .finally(() => {
        handleClose();
        handleGetData();
      });
  };

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setFormDataDetalhe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeDadosUrgencia = (event) => {
    setDadosTab((prevData) => ({
      ...prevData,
      urgencia: event.target.value,
    }));
  };

  const handleChangeDadosCategoria = async (e) => {
    const novaCategoria = e.target.value;

    setDadosTab((prevData) => ({
      ...prevData,
      categoria: novaCategoria,
      subcategoria: '',
    }));

    try {
      const res = await getSubcategorias(novaCategoria);
      setListaSubcategoria(res.value || []);
    } catch (error) {
      console.error('Erro ao buscar subcategorias:', error);
      setListaSubcategoria([]);
    }
  };

  const handleChangeDadosSubcategoria = (e) => {
    setDadosTab((prevData) => ({
      ...prevData,
      subcategoria: e.target.value,
    }));
  };

  const handleChangeDadosTipo = (e) => {
    setDadosTab((prevData) => ({
      ...prevData,
      tipo: e.target.value,
    }));
  };

  const handleChangeDadosResponsavel = (e) => {
    setDadosTab((prevData) => ({
      ...prevData,
      responsavelDemandado: e.target.value,
    }));
    handleEnviarEmailAtribuido(e.target.value);
  };
  const handleChangeStatus = (e) => {
    setDadosTab((prevData) => ({
      ...prevData,
      status: e.target.value,
    }));
  };
  const handleChangeSituacao = (e) => {
    setDadosTab((prevData) => ({
      ...prevData,
      situacao: e.target.value,
    }));
  };

  useEffect(() => {
    if (!open || dadosTabInicializado) return;

    const urgenciaCorrespondente = ListaDeUrgencia.find(
      (item) => item.nome === data.urgencia
    );

    const categoriaCorrespondente = listaCategoria.find(
      (item) => item.id === data.idCategoria
    );

    const subcategoriaCorrespondente = listaSubcategoria.find(
      (item) => item.id === data.idSubCategoria
    );
    const tipoCorrespondente = listaTipos.find(
      (item) => item.id === data.idTipo
    );
    const respCorrespondente = listaResponsavel.find(
      (item) => item.nome === data.responsavelDemandado
    );
    const statusCorrespondente = listaStatus.find(
      (item) => item.id === data.idStatus
    );
    const statusSituacao = dadosSituacao.find(
      (item) => item.id === data.idSituacao
    );

    setDadosTab((prev) => ({
      ...prev,
      urgencia: urgenciaCorrespondente ? urgenciaCorrespondente.nome : '',
      categoria: data.idCategoria || '',
      tipo: data.idTipo || '',
      responsavelDemandado: data.emailResponsavelDemandado
        ? data.emailResponsavelDemandado
        : respCorrespondente.email || '',
      status: data.idStatus || '',
      situacao: data.idSituacao || '',
      subcategoria: data.idSubCategoria || '',
    }));

    setDadosTabInicializado(true);
  }, [
    open,
    data,
    listaCategoria,
    listaSubcategoria,
    listaTipos,
    listaResponsavel,
    listaStatus,
    dadosSituacao,
  ]);

  useEffect(() => {
    if (textRef.current) {
      requestAnimationFrame(() => {
        textRef.current.style.height = 'auto';
        textRef.current.style.height = `${textRef.current.scrollHeight}px`;
      });
    }
  }, [formDataDetalhe.Descricao]);

  const handleSubmitClear = () => {
    setFormDataDetalhe(interfacePostDetalhe);
  };

  useEffect(() => {}, [dadosTab.categoria, dadosTab.responsavelDemandado]);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          borderRadius: '16px',
          backgroundColor: '#0897E9',
          color: '#FFFFFF',
        }}
      >
        Ver
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ gap: '16px', display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {`Nº ${data.id} - ${data.titulo}`}
              </Typography>
              <IconButton onClick={handleClose}>
                <ClearIcon />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ mb: '16px', display: 'flex', gap: '16px' }}>
            <Box color={data.status === 'ABERTO' ? '#47B13D' : '#47B13D'}>
              <Box
                sx={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <CheckCircleOutlineIcon sx={{ width: '20px' }} />
                <Typography variant="subtitle2">{data.status}</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={data.status === 'ABERTO' ? 100 : 100}
                sx={{
                  height: '8px',
                  borderRadius: '16px',
                  backgroundColor: 'lightgray',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#47B13D',
                  },
                }}
              />
            </Box>
            <Box
              color={data.situacao === 'EM ANDAMENTO' ? '#FF811A' : '#47B13D'}
            >
              <Box
                sx={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{
                    width: '20px',
                    color:
                      data.situacao === 'EM ANDAMENTO' ? '#FF811A' : '#47B13D',
                  }}
                />
                <Typography variant="subtitle2">EM ANDAMENTO</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={data.situacao === 'EM ANDAMENTO' ? 80 : 100}
                sx={{
                  height: '8px',
                  borderRadius: '16px',
                  backgroundColor: 'lightgray',
                  '& .MuiLinearProgress-bar': {
                    backgroundImage:
                      data.situacao === 'EM ANDAMENTO'
                        ? 'linear-gradient(90deg, #FF811A 0%, #E69C6D 50%, #C2C2C2 100%)'
                        : 'none',
                    backgroundColor:
                      data.situacao === 'EM ANDAMENTO'
                        ? 'transparent'
                        : '#47B13D',
                  },
                }}
              />
            </Box>
            <Box color={data.situacao === 'FINALIZADO' ? '#47B13D' : '#A0A0A0'}>
              <Box
                sx={{
                  flexDirection: 'row',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <CheckCircleOutlineIcon
                  sx={{
                    width: '20px',
                    color:
                      data.situacao === 'FINALIZADO' ? '#47B13D' : '#A0A0A0',
                  }}
                />
                <Typography variant="subtitle2">FECHADO</Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={data.situacao === 'FINALIZADO' ? 100 : 0}
                sx={{
                  height: '8px',
                  borderRadius: '16px',
                  backgroundColor: 'lightgray',
                  '& .MuiLinearProgress-bar': {
                    backgroundImage:
                      data.situacao === 'FINALIZADO' ? '#47B13D' : '#A0A0A0',
                    backgroundColor:
                      data.situacao === 'FINALIZADO' ? '#47B13D' : '#A0A0A0',
                  },
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #D6D6D6',
                padding: '32px 24px',
                borderRadius: '16px',
                bgcolor: '#FFF',
                minWidth: '70%',
                minHeight: '400px',
              }}
            >
              <Box
                sx={{
                  gap: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '610px',
                  maxHeight: '610px',
                  overflowY: 'auto',
                }}
              >
                <CardChatTitulo dataCard={data} />
                <CardChatDetalhe dataCardDetalhe={detalhesId} />
              </Box>

              <Box sx={{ width: '100%', height: 'auto', marginBottom: '16px' }}>
                <TextField
                  fullWidth
                  multiline
                  name="Descricao"
                  value={formDataDetalhe.Descricao || ''}
                  onChange={inputTextHandler}
                  placeholder="Escreva uma mensagem"
                  error={
                    descricaoTouched &&
                    (formDataDetalhe.Descricao || '').length < 10
                  }
                  helperText={
                    descricaoTouched &&
                    (formDataDetalhe.Descricao || '').length < 10
                      ? 'Por favor, descreva com mais detalhes. O campo precisa ter pelo menos 10 dígitos.'
                      : ''
                  }
                  inputRef={textRef}
                  sx={{
                    borderRadius: '24px',
                    bgcolor: '#FFF',
                    '& .MuiInputBase-root': {
                      minHeight: '40px',
                      borderRadius: '24px',
                    },
                    '& .MuiInputBase-input': {
                      height: 'auto',
                      overflow: 'hidden',
                      resize: 'none',
                      backdropFilter: 'none',
                    },
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '14px',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ width: '100%', height: 'auto' }}>
                  {!aparecerCC && (
                    <Box
                      sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                    >
                      <Typography variant="body2" color="#333">
                        Não há usuários em cópia
                      </Typography>

                      <Button onClick={() => setAparecerCC(!aparecerCC)}>
                        Adicionar
                      </Button>
                    </Box>
                  )}

                  {aparecerCC && (
                    <Box
                      sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}
                    >
                      <TextField
                        fullWidth
                        name="cc"
                        value={formDataDetalhe.cc || ''}
                        onChange={inputTextHandler}
                        placeholder="Mencionar"
                        sx={{
                          bgcolor: '#FFF',
                          '& .MuiInputBase-root': {
                            minHeight: '40px',
                            borderRadius: '24px',
                          },
                          '& .MuiInputBase-input': {
                            height: 'auto',
                            overflow: 'hidden',
                            resize: 'none',
                            backdropFilter: 'none',
                          },
                        }}
                      />
                      <IconButton
                        onClick={() => setAparecerCC(!aparecerCC)}
                        color="#ccc"
                      >
                        <CancelIcon />
                      </IconButton>
                    </Box>
                  )}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    gap: '16px',
                    justifyContent: 'flex-end',
                    width: '100%',
                  }}
                >
                  <Box
                    sx={{
                      flexDirection: 'column',
                    }}
                  >
                    <InputLabel htmlFor="file-input">
                      <input
                        accept="image/jpeg, image/png, image/jpg"
                        id="file-input"
                        size="small"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={(e) =>
                          setFormDataDetalhe({
                            ...formDataDetalhe,
                            ImagemDetalhe: e.target.files[0],
                          })
                        }
                      />
                      <Button
                        startIcon={<LinkIcon />}
                        variant="outlined"
                        component="span"
                        sx={{
                          borderRadius: '32px',
                          flexShrink: 0,
                          whiteSpace: 'nowrap',
                          border: '1px solid #0897E9',
                          textTransform: 'capitalize',
                        }}
                      >
                        Anexar Arquivo
                      </Button>
                      <Typography sx={{ fontSize: '10px', color: '#333' }}>
                        Formatos Aceitos: JPG, JPEG, PNG
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          maxWidth: '100%',
                        }}
                      >
                        {formDataDetalhe.ImagemDetalhe && (
                          <Typography
                            sx={{
                              wordBreak: 'break-word',
                              overflowWrap: 'break-word',
                              maxWidth: '100%',
                              whiteSpace: 'normal',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              color: '#333',
                              fontSize: '12px',
                              mt: 1,
                            }}
                          >
                            <CropOriginalIcon />{' '}
                            {formDataDetalhe.ImagemDetalhe.name}
                          </Typography>
                        )}
                      </Box>
                    </InputLabel>
                  </Box>
                  <Box>
                    <Button
                      startIcon={<SendOutlinedIcon />}
                      variant="contained"
                      onClick={() => {
                        if (validarFormulario()) {
                          handleSubmitDetalhe(formDataDetalhe);
                          handleEnviar();
                        }
                      }}
                      sx={{
                        borderRadius: '32px',
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                        textTransform: 'capitalize',
                        transition:
                          'background-color 0.5s ease, transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.1)',
                          fontFamily: 'Poppins, sans-serif',
                          transition:
                            'background-color 0.5s ease, transform 0.3s ease-in-out',
                        },
                      }}
                      disabled={loading}
                    >
                      {loading ? 'Enviando...' : 'Enviar'}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* card lateral */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '8px',
                border: '1px solid #D6D6D6',
                padding: '16px',
                minWidth: '27%',
                maxHeight: '755px',
                overflowY: 'auto',
              }}
            >
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '8px' }}
                >
                  {`Solicitante: ${data.responsavelDemandante}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '8px' }}
                >
                  {`Email Solicitante: ${data.emailResponsavelDemandante}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '8px' }}
                >
                  {`Setor Solicitante: ${data.setorDemandante}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '8px' }}
                >
                  {`Responsável: ${data.responsavelDemandado}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '8px' }}
                >
                  {`Dias: ${data.dias}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '8px' }}
                >
                  {`Atendimento: ${data.atendimento}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '8px' }}
                >
                  {`Aberto em: ${formatDateTime(data.dataAbertura)}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '8px' }}
                >
                  {`Atualizado em: ${formatDateTime(data.dataAtualizacao)}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '8px' }}
                >
                  {`Responsável Fechamento: ${data.emailResponsavelFechamento}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '32px' }}
                >
                  {`Fechado em: ${formatDateTime(data.dataFechamento)}`}
                </Typography>
              </Box>

              <Box
                sx={{ gap: '8px', display: 'flex', flexDirection: 'column' }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel sx={formStyle}>Status</FormLabel>
                  <Select
                    labelId="responsavel-label"
                    value={dadosTab.status || ''}
                    onChange={handleChangeStatus}
                    sx={{
                      backgroundColor: '#fff',
                      display: 'flex',
                      color: '#333333',
                      borderRadius: '4px',
                    }}
                  >
                    {listaStatus.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        sx={{
                          display: 'flex',
                          color: '#333333',
                        }}
                      >
                        {item.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel sx={formStyle}>Responsável</FormLabel>
                  <Select
                    labelId="responsavel-label"
                    value={dadosTab.responsavelDemandado || ''}
                    onChange={handleChangeDadosResponsavel}
                    displayEmpty
                    sx={{
                      backgroundColor: '#fff',
                      display: 'flex',
                      color: '#333333',
                      borderRadius: '4px',
                    }}
                  >
                    <MenuItem value="" disabled>
                      Não atribuido
                    </MenuItem>

                    {listaResponsavel
                      .sort((a, b) => a.nome.localeCompare(b.nome))
                      .map((item) => (
                        <MenuItem
                          key={item.id}
                          value={item.email}
                          sx={{
                            display: 'flex',
                            color: '#333333',
                          }}
                        >
                          {item.nome}
                        </MenuItem>
                      ))}
                  </Select>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel sx={formStyle}>Tipo</FormLabel>
                  <Select
                    labelId="categoria-label"
                    value={dadosTab.tipo || ''}
                    onChange={handleChangeDadosTipo}
                    sx={{
                      backgroundColor: '#fff',
                      display: 'flex',
                      color: '#333333',
                      borderRadius: '4px',
                    }}
                  >
                    {listaTipos.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        sx={{
                          display: 'flex',
                          color: '#333333',
                        }}
                      >
                        {item.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel sx={formStyle}>Categoria</FormLabel>
                  <Select
                    labelId="categoria-label"
                    value={String(dadosTab.categoria || '')}
                    onChange={handleChangeDadosCategoria}
                    sx={{
                      backgroundColor: '#fff',
                      display: 'flex',
                      color: '#333333',
                      borderRadius: '4px',
                    }}
                  >
                    {listaCategoria.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={String(item.id)}
                        sx={{
                          display: 'flex',
                          color: '#333333',
                        }}
                      >
                        {item.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel sx={formStyle}>Subcategoria</FormLabel>
                  <Select
                    labelId="subcategoria-label"
                    value={dadosTab.subcategoria || ''}
                    onChange={handleChangeDadosSubcategoria}
                    disabled={!listaSubcategoria.length}
                    sx={{
                      backgroundColor: '#fff',
                      display: 'flex',
                      color: '#333333',
                      borderRadius: '4px',
                    }}
                  >
                    {listaSubcategoria && listaSubcategoria.length > 0 ? (
                      listaSubcategoria.map((item) => (
                        <MenuItem
                          key={item.id}
                          value={item.id}
                          sx={{
                            display: 'flex',
                            color: '#333333',
                          }}
                        >
                          {item.descricao}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>
                        Nenhuma subcategoria disponível
                      </MenuItem>
                    )}
                  </Select>
                </Box>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', mb: '10px' }}
                >
                  <FormLabel sx={formStyle}>Prioridade</FormLabel>
                  <Select
                    labelId="urgencia-label"
                    value={dadosTab.urgencia || ''}
                    onChange={handleChangeDadosUrgencia}
                    sx={{
                      backgroundColor: '#fff',
                      display: 'flex',
                      color: '#333333',
                      borderRadius: '4px',
                    }}
                  >
                    {ListaDeUrgencia.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item.nome}
                        sx={{
                          display: 'flex',
                          color: '#333333',
                        }}
                      >
                        {item.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box
                  sx={{ display: 'flex', flexDirection: 'column', mb: '10px' }}
                >
                  <FormLabel sx={formStyle}>Situação</FormLabel>
                  <Select
                    labelId="urgencia-label"
                    value={dadosTab.situacao || ''}
                    onChange={handleChangeSituacao}
                    sx={{
                      backgroundColor: '#fff',
                      display: 'flex',
                      color: '#333333',
                      borderRadius: '4px',
                    }}
                  >
                    {dadosSituacao.map((item) => (
                      <MenuItem
                        key={item.id}
                        value={item.id}
                        sx={{
                          display: 'flex',
                          color: '#333333',
                        }}
                      >
                        {item.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  startIcon={<SendOutlinedIcon />}
                  variant="contained"
                  onClick={handleUpdateChamado}
                  sx={{
                    borderRadius: '32px',
                    fontFamily: 'Poppins, sans-serif',
                    textTransform: 'capitalize',
                    transition:
                      'background-color 0.5s ease, transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      fontFamily: 'Poppins, sans-serif',
                      transition:
                        'background-color 0.5s ease, transform 0.3s ease-in-out',
                    },
                  }}
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
