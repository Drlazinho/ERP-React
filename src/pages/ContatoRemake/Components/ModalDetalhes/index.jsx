import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { apiInteligencia } from '@/services/apis';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import Modal from '@mui/material/Modal';
import {
  FormLabel,
  IconButton,
  Select,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import LinkIcon from '@mui/icons-material/Link';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import EnviarEmailDetalhe from '../EnviarEmailDetalhe';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import {
  getCategoriasEmail,
  getChamadoSituacao,
  getChamadosStatus,
  getChamadosTipos,
} from '@/services/modalDetalhesService';
import { buscarUsuarioPorSetor } from '@/services/usuarios.service';
import {
  postChamadosDetalhesX,
  putChamadosX,
} from '@/services/chamados/chamadosX.service';
import { useToast } from '@/hooks/toast.hook';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { EnviarFormEmail } from '@/services/email.service';
import CardChatTituloAbertura from '../CardChatTituloAbertura';
import CardChatHistoricoAbertura from '../CardChatHistoricoAbertura';
import { ChamadosXFecharPut } from '@/services/fecharChamado';

const style = {
  position: 'absolute',
  flexDirection: 'column',
  display: 'flex',
  top: '50%',
  left: '50%',
  width: '90%',
  maxHeight: '90%',
  overflowY: 'auto',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FFF',
  boxShadow: 24,
  borderRadius: '8px',
  padding: '24px 29px',
};

const interfacePostDetalhe = {
  IdChamado: 0,
  Descricao: '',
  ImagemDetalhe: '',
  Remetente: '',
  Destinatario: '',
  cc: '',
};

export default function ModalDetalhes({ data = [], update }) {
  const { addToast } = useToast();
  const { email, id } = useUsuarioLocal();
  const textRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [detalhesId, setDetalhesId] = React.useState({});
  const [descricaoTouched, setDescricaoTouched] = useState(false);
  const [formDataDetalhe, setFormDataDetalhe] = useState(interfacePostDetalhe);
  const [aparecerCC, setAparecerCC] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (!data || !data.id) {
      console.error('ID do chamado não encontrado.');
      return;
    }
    setOpen(true);
    loaderDataChamadosDetalhe(data.id);
  };

  const handleClose = () => {
    handleSubmitClear();
    setOpen(false);
  };

  const handleSubmitDetalhe = async (body) => {
    setLoading(true);
    const formData = new FormData();

    formData.append('IdChamado', data.id);
    formData.append('Descricao', body.Descricao);
    formData.append('ImagemDetalhe', body.ImagemDetalhe);
    formData.append('Remetente', email);
    formData.append('Destinatario', data.emailResponsavelDemandado);
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

  const handleEnviarEmail = (value) => {
    const dataAgora = new Date();
    const assunto = 'Nova Ocorrência' + dataAgora;
    const cc = formDataDetalhe.cc;

    const destinatario = data.emailResponsavelDemandado;
    const body = EnviarEmailDetalhe({
      data: dataAgora,
      assunto: 'Nova Ocorrência' + data,
      idChamado: data.id,
      remetente: data.responsavelDemandante,
      setor: data.setorDemandante,
      tituloDoChamado: data.titulo,
      dataRegistro: data.dataAbertura,
      descricao: formDataDetalhe.Descricao,
      destinatario: data.emailResponsavelDemandado,
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
          title: 'Erro!',
          description: 'Erro ao enviar email',
        });
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

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setFormDataDetalhe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitClear = () => {
    setFormDataDetalhe(interfacePostDetalhe);
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.style.height = '40px';
      textRef.current.style.height = `${textRef.current.scrollHeight}px`;
    }
  }, [formDataDetalhe.Descricao]);

  const handleFacharChamado = async () => {
    try {
      await ChamadosXFecharPut(data.id, id);
      handleClose();
      update();
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Chamado fechado com sucesso',
      });
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro!',
        description: 'Erro ao fechar chamado',
      });
    }
  };

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
            {/* <Box sx={{ mb: '16px' }}>Steps</Box> */}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '32px',
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
                gap: '8px',
                minWidth: '75%',
              }}
            >
              <Box
                sx={{
                  gap: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '500px',
                  maxHeight: '500px',
                  overflowY: 'auto',
                }}
              >
                <CardChatTituloAbertura dataCard={data} />
                <CardChatHistoricoAbertura dataCardDetalhe={detalhesId} />
              </Box>

              <Box sx={{ width: '100%', height: 'auto', marginBottom: '16px' }}>
                <TextField
                  fullWidth
                  multiline
                  variant="outlined"
                  name="Descricao"
                  value={formDataDetalhe.Descricao || ''}
                  onChange={inputTextHandler}
                  onFocus={() => setDescricaoTouched(true)}
                  placeholder="Escreva uma mensagem"
                  error={
                    descricaoTouched &&
                    (formDataDetalhe.Descricao || 0).length < 10
                  }
                  helperText={
                    descricaoTouched &&
                    (formDataDetalhe.Descricao || 0).length < 10
                      ? 'Por favor, descreva com mais detalhes. O campo precisa ter pelo menos 10 dígitos.'
                      : ''
                  }
                  inputRef={textRef}
                  sx={{
                    borderRadius: '16px',
                    bgcolor: '#FFF',
                    '& .MuiInputBase-root': {
                      minHeight: '40px',
                      borderRadius: '16px',
                      borderColor:
                        descricaoTouched &&
                        (formDataDetalhe.Descricao || 0).length < 10
                          ? 'red'
                          : 'inherit',
                    },
                    '& .MuiInputBase-input': {
                      height: '40px',
                      overflow: 'hidden',
                      resize: 'none',
                      borderRadius: '16px',
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
                              fontSize: '12px',
                              color: '#333',
                              mt: '4px',
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '8px',
                border: '1px solid #D6D6D6',
                minWidth: '20%',
                padding: '16px',
                minHeight: '610px',
                maxHeight: '610px',
                overflowY: 'auto',
              }}
            >
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '16px' }}
                >
                  {`Solicitante: ${data.responsavelDemandante}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '16px' }}
                >
                  {`Setor Solicitante: ${data.setorDemandante}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '16px' }}
                >
                  {`Responsável: ${data.responsavelDemandado}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '16px' }}
                >
                  {`Dias: ${data.dias}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '16px' }}
                >
                  Atendimento:
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '16px' }}
                >
                  {`Aberto em: ${formatDateTime(data.dataAbertura)}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '16px' }}
                >
                  {`Atualizado em: ${formatDateTime(data.dataAtualizacao)}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '16px' }}
                >
                  {`Tipo: ${data.tipo}`}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ color: '#333', mb: '16px' }}
                >
                  {`Categoria: ${data.categoria}`}
                </Typography>
                <Typography variant="subtitle2" sx={{ color: '#333' }}>
                  {`Prioridade: ${data.urgencia}`}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  mt: 2,
                  alignItems: 'flex-start',
                  height: '100%',
                  gap: '16px',
                }}
              >
                <Typography sx={{ color: '#333333' }}>
                  Se o problema já foi resolvido, clique no botão abaixo para
                  fechar o chamado:{' '}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleFacharChamado}
                  sx={{
                    borderRadius: '32px',
                  }}
                >
                  Fechar chamado
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
