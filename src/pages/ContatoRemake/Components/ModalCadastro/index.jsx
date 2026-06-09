import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CampaignIcon from '@mui/icons-material/Campaign';
import CloseIcon from '@mui/icons-material/Close';
import {
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { consultaSetores } from '@/services/setores/setores.service';
import { useEffect, useState, useRef } from 'react';
import { ChamadosTiposGet } from '@/services/chamados.service';
import {
  GetCatogoriaSetorSelecionado,
  postChamadosX,
} from '@/services/chamados/chamadosX.service';
import { useDropzone } from 'react-dropzone';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import { useToast } from '@/hooks/toast.hook';
import EnviarEmailNovoChamado from '../EnviarEmailNovoChamado';
import { EnviarFormEmail } from '@/services/email.service';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 760,
  maxHeight: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '16px',
  overflowY: 'auto',
  p: 4,
};

const initialNovoChamado = {
  tipo: '',
  urgencia: '',
  setor: '',
  titulo: '',
  descricao: '',
  solicitante: '',
  categoria: '',
  subcategoria: '',
  imagem: null,
  responsavel: '',
};

const interfaceListaDeTipo = {
  id: '',
  nome: '',
  observacao: '',
};

const ListaDeUrgencia = ['BAIXA', 'MÉDIA', 'ALTA'];

export default function ModalCadastro({ handleChamados }) {
  const { addToast } = useToast();
  const { email, nome, setor } = useUsuarioLocal();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialNovoChamado);
  const [mostrarInputs, setMostrarInputs] = useState(false);
  const [listaSetores, setListaSetores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [listaDeTipo, setListaDeTipo] = useState([interfaceListaDeTipo]);
  const [emailSelecionado, setEmailSelecionado] = useState('');
  const [setorSelecionado, setSetorSelecionado] = useState('');
  const [listaCategoria, setListaCategoria] = useState({});
  const [listaTipo, setListaTipo] = useState({});
  const [mostrarChamado, setMostrarChamado] = useState(false);
  const [dataDest, setDataDest] = useState();
  const [emailDestinatario, setemailDestinatario] = useState();
  const [emailData, setEmailData] = useState({
    destinatario: '',
    assunto: 'Novo Chamado',
    body: ``,
  });
  const [loading, setLoading] = useState(false);

  const validarFormulario = () => {
    if (!formData.descricao || formData.descricao.length < 20) {
      setDescricaoTouched(true);
      return false;
    }
    return true;
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setLoading(false);
    handleClear();
    setOpen(false);
    handleChamados();
  };
  const [fileName, setFileName] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
      'video/mp4': [],
      'video/x-msvideo': [],
      'video/quicktime': [],
      'video/x-matroska': [],
      'application/pdf': [],
      'application/msword': [],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        [],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [],
      'application/vnd.ms-excel': [],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFileName(acceptedFiles.map((file) => file.name).join(', '));
        setFormData((prevData) => {
          const currentImages = Array.isArray(prevData.imagem)
            ? prevData.imagem
            : prevData.imagem
            ? [prevData.imagem]
            : [];

          return {
            ...prevData,
            imagem: [...currentImages, ...acceptedFiles],
          };
        });
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleChangeCategoria = (e) => {
    const nomeSelecionado = e.target;

    const categoriaSelecionada = categorias.find(
      (item) => item.nome === nomeSelecionado.value.nome
    );
    setemailDestinatario(nomeSelecionado.value.emailResponsavel);

    setFormData({ ...formData, categoria: categoriaSelecionada });
  };

  const handleChangeTipo = (e) => {
    const nomeSelecionado = e.target.value;
    const tipoSelecionado = listaDeTipo.find(
      (item) => item.nome === nomeSelecionado
    );

    setFormData({ ...formData, tipo: tipoSelecionado });
  };

  const handleGetDadosSelect = () => {
    ChamadosTiposGet().then((r) => {
      setListaDeTipo(r);
    });
  };

  const buscarDadosSetor = () => {
    const destinatarioId = formData.setor;
    axios
      .get(
        `${import.meta.env.VITE_API_FACTORY}/Setores/${destinatarioId}`
      )
      .then((response) => {
        setDataDest(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
      });
  };

  const buscarSubcategorias = () => {
    if (!formData.categoria?.id) {
      setSubcategorias([]);
      return;
    }

    const categoriaId = formData.categoria.id;
    axios
      .get(
        `${import.meta.env.VITE_API_INTELIGENCIA}/ChamadosxSubCategoria?CategoriaId=${categoriaId}`
      )
      .then((response) => {
        setSubcategorias(response.data.value || []);
      })
      .catch((error) => {
        console.error('Erro ao buscar os dados:', error);
        setSubcategorias([]);
      });
  };

  useEffect(() => {
    if (formData.categoria?.id) {
      buscarSubcategorias();
    }
  }, [formData.categoria]);

  const handleEnviarEmail = async (value) => {
    const tituloChamado = formData.titulo;
    const dataAgora = new Date();
    const assunto =
      'Novo Chamado ' + tituloChamado + ' ' + dataAgora.toLocaleString();
    const destinatario = emailDestinatario;
    const setorSelecionado = dataDest.setor;

    const body = EnviarEmailNovoChamado({
      data: dataAgora,
      assunto,
      email,
      nome,
      setor: setorSelecionado,
      tipo: formData.tipo.nome,
      categoria: formData.categoria.nome,
      subcategoria: formData.subcategoria.descricao,
      urgencia: formData.urgencia,
      titulo: formData.titulo,
      descricao: formData.descricao,
      anoAtual: dataAgora.getFullYear(),
    });

    const newValue = { destinatario, body, assunto };

    try {
      await EnviarFormEmail(newValue);
      addToast({
        type: 'success',
        description: 'Sucesso ao enviar e-mail',
      });
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Falha ao enviar e-mail',
        description: error?.response?.data,
      });
    }
  };

  const submitNovoChamado = () => {
    setLoading(true);
    const formDataToSend = new FormData();

    formDataToSend.append('titulo', formData.titulo);
    formDataToSend.append('urgencia', formData.urgencia);
    formDataToSend.append('descricao', formData.descricao);
    formDataToSend.append('emailsolicitante', email);
    formDataToSend.append('idSetor_Demandado', Number(formData.setor));
    formDataToSend.append('idCategoria', Number(formData.categoria.id));
    formDataToSend.append('idTipo', Number(formData.tipo.id));
    formDataToSend.append(
      'idSubCategoria',
      Number(formData.subcategoria.id) || 0
    );

    if (formData.imagem?.length) {
      formData.imagem.forEach((file) => {
        formDataToSend.append('imagem', file);
      });
    } else {
      formDataToSend.append('imagem', '');
    }

    postChamadosX(formDataToSend)
      .then(() => {
        handleClear();
        setOpen(false);
        handleEnviarEmail(formData);
        handleChamados();

        addToast({
          type: 'success',
          description: 'Sucesso ao registrar chamado',
        });
      })
      .catch(() => {
        addToast({
          type: 'danger',
          title: 'Erro!',
          description: 'Erro ao registrar chamado',
        });
      })
      .finally(() => {
        handleChamados();
        setLoading(false);
      });
  };

  useEffect(() => {
    consultaSetores()
      .then((res) => {
        setListaSetores(res);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro',
          description: 'Erro ao listar Setores !',
        });
      });

    if (setorSelecionado) {
      GetCatogoriaSetorSelecionado(setorSelecionado)
        .then((data) => {
          setCategorias(data);
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
    }

    buscarDadosSetor();

    handleGetDadosSelect();
  }, [setorSelecionado]);

  const handleClear = () => {
    setFormData(initialNovoChamado);
    setSetorSelecionado('');
    setMostrarInputs(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        startIcon={<CampaignIcon />}
        onClick={handleOpen}
        sx={{
          borderRadius: '32px',
          border: '1.5px solid #0897E9',
          bgcolor: '#FFF',
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
          minWidth: '200px',
        }}
      >
        Abrir Chamado
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
            <Box>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Abrir Chamado
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ mb: '8px' }}>
              Para qual setor você gostaria de abrir o chamado? *
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="setor"
              fullWidth
              value={setorSelecionado}
              displayEmpty
              onChange={(e) => {
                const setorID = e.target.value;
                setSetorSelecionado(setorID);
                setFormData((prevData) => ({
                  ...prevData,
                  setor: setorID,
                }));
              }}
              sx={{
                borderRadius: '24px',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                mb: '16px',
              }}
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'left',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'left',
                },
                PaperProps: {
                  style: {
                    maxHeight: 350,
                    width: 250,
                  },
                },
              }}
            >
              <MenuItem value="" disabled>
                Setor
              </MenuItem>
              {[...listaSetores]
                .sort((a, b) =>
                  a.setor.localeCompare(b.setor, 'pt', { sensitivity: 'base' })
                )
                .map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.setor}
                  </MenuItem>
                ))}
            </Select>

            {mostrarInputs && (
              <>
                <Box>
                  <Typography sx={{ mb: '8px' }}>Tipo *</Typography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="tipo"
                    fullWidth
                    value={formData.tipo ? formData.tipo.nome : ''}
                    onChange={handleChangeTipo}
                    sx={{
                      borderRadius: '24px',
                      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                      mb: '16px',
                    }}
                  >
                    {listaDeTipo.map((item) => (
                      <MenuItem key={item.id} value={item.nome}>
                        {item.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <Typography sx={{ mb: '8px' }}>Categoria *</Typography>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="categoria"
                    value={formData.categoria ? formData.categoria : ''}
                    onChange={handleChangeCategoria}
                    sx={{
                      borderRadius: '24px',
                      boxShadow: ' 0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                      mb: '16px',
                    }}
                  >
                    {categorias.map((item) => (
                      <MenuItem key={item.id} value={item}>
                        {item.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <Typography sx={{ mb: '8px' }}>Subcategorias</Typography>
                  <Select
                    fullWidth
                    labelId="subcategoria-select-label"
                    id="subcategoria-select"
                    name="subcategoria"
                    value={formData.subcategoria?.id || ''}
                    onChange={(e) => {
                      const subcategoriaId = e.target.value;
                      const subcategoriaSelecionada = subcategorias.find(
                        (item) => item.id === subcategoriaId
                      );
                      setFormData({
                        ...formData,
                        subcategoria: {
                          id: subcategoriaSelecionada.id,
                          descricao: subcategoriaSelecionada.descricao,
                        },
                      });
                    }}
                    sx={{
                      borderRadius: '24px',
                      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                      mb: '16px',
                    }}
                  >
                    <MenuItem value="" disabled>
                      Selecione uma subcategoria
                    </MenuItem>
                    {subcategorias.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.descricao}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <Typography sx={{ mb: '8px' }}>Urgência *</Typography>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.urgencia}
                    name="urgencia"
                    onChange={(e) => {
                      setFormData({ ...formData, urgencia: e.target.value });
                    }}
                    sx={{
                      borderRadius: '24px',
                      boxShadow: ' 0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                      mb: '16px',
                    }}
                  >
                    {ListaDeUrgencia.map((item, index) => (
                      <MenuItem key={index} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <Typography sx={{ mb: '8px' }}>
                    Assunto da solicitação *
                  </Typography>
                  <TextField
                    id="filled-basic"
                    label="Escreva um assunto para a solicitação"
                    fullWidth
                    name="titulo"
                    onChange={handleChange}
                    sx={{
                      mb: '16px',
                    }}
                    InputProps={{
                      sx: {
                        borderRadius: '24px',
                      },
                    }}
                    inputProps={{
                      maxLength: 45,
                    }}
                  />
                </Box>
                <Box sx={{ mb: '16px' }}>
                  <Typography sx={{ mb: '8px' }}>
                    Descrição do problema *
                  </Typography>
                  <TextField
                    id="outlined-multiline-static"
                    label="Adicione uma descrição completa do problema."
                    multiline
                    fullWidth
                    rows={3}
                    name="descricao"
                    error={(formData.descricao || 0).length < 20}
                    helperText={
                      (formData.descricao || 0).length < 20
                        ? 'Por favor, descreva com mais detalhes. O campo precisa ter pelo menos 20 dígitos.'
                        : ''
                    }
                    onChange={handleChange}
                    sx={{
                      borderRadius: '8px',
                      mb: '16px',
                    }}
                  />

                  <Typography variant="body2">
                    Insira os detalhes de sua solicitação. Um membro de nossa
                    equipe de suporte responderá assim que possível.
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ mb: '8px', fontWeight: '500' }}>
                    Anexo das evidências
                  </Typography>

                  <Box>
                    <Box
                      {...getRootProps()}
                      sx={{
                        border: '2px dashed #aaa',
                        padding: '16px 32px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        borderRadius: '16px',
                        mb: '16px',
                        minHeight: '80px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <input {...getInputProps()} />

                      {formData.imagem?.length > 0 ? (
                        formData.imagem.map((file, index) => (
                          <Box
                            key={index}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              width: '100%',
                              justifyContent: 'space-between',
                              border: '1px solid #ddd',
                              borderRadius: '8px',
                              padding: '8px',
                              mt: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              <Typography variant="body2">
                                📎 {file.name}
                              </Typography>

                              {file.type.startsWith('image/') && (
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt={file.name}
                                  width="50"
                                  height="50"
                                  style={{ borderRadius: '4px' }}
                                />
                              )}

                              {file.type.startsWith('video/') && (
                                <video width="50" height="50" controls>
                                  <source
                                    src={URL.createObjectURL(file)}
                                    type={file.type}
                                  />
                                  Seu navegador não suporta a reprodução de
                                  vídeos.
                                </video>
                              )}
                            </Box>

                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData((prevData) => ({
                                  ...prevData,
                                  imagem: prevData.imagem.filter(
                                    (_, i) => i !== index
                                  ),
                                }));
                              }}
                              size="small"
                              sx={{ color: '#d32f2f' }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </Box>
                        ))
                      ) : (
                        <Typography variant="body1">
                          <span style={{ color: '#2BA8EF' }}>
                            Adicione os arquivos
                          </span>{' '}
                          ou solte-os aqui
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Typography sx={{ fontSize: '10px', color: '#333' }}>
                  Formatos Aceitos: JPG, JPEG, PNG, GIF, WEBM, PDF, DOCX, XLSX
                </Typography>
                <Typography variant="body2" sx={{ mb: '16px' }}>
                  <span style={{ color: '#000', fontWeight: '500' }}>
                    Observação:
                  </span>{' '}
                  Tamanho máximo de 25MB.
                </Typography>
              </>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  borderRadius: '32px',
                  textTransform: 'capitalize',
                  color: '#0897E9',
                }}
              >
                Voltar
              </Button>

              {!mostrarInputs ? (
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '32px',
                    textTransform: 'capitalize',
                    bgcolor: setorSelecionado ? '#2BA8EF' : '#CCC',
                    cursor: setorSelecionado ? 'pointer' : 'not-allowed',
                  }}
                  disabled={!setorSelecionado}
                  onClick={() => {
                    if (!setorSelecionado) {
                      alert('Por favor, selecione um setor antes de avançar.');
                      return;
                    }
                    setMostrarInputs(true);
                  }}
                >
                  Avançar
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: '32px',
                    textTransform: 'capitalize',
                    bgcolor: '#2BA8EF',
                    cursor: 'pointer',
                    ml: 2,
                  }}
                  onClick={() => submitNovoChamado(formData)}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Abrir Chamado'}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
