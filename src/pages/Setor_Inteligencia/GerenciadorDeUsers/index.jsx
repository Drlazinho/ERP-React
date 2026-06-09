import React, { useCallback, useEffect, useState } from 'react';
import './styles.css';

import {
  buscarUsuarioPorFiltro,
  trocarSenha,
  updateUsuario,
} from '@/services/usuarios.service';
import UpdateUser from './UpdateUserModal';
import { useToast } from '@/hooks/toast.hook';
import nivel from '@/repositories/nivel';
import setor from '@/repositories/setor';

import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { useNavigate } from 'react-router-dom';
import { sendEmailNewUser } from '../AdministracaoDeUsuario/utils/sendEmailNewUser';
import {
  Box,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormLabel,
  Modal as MuiModal,
  Typography,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HeaderAmvox from '@/components/HeaderAmvox';
import xVermelho from '@/assets/xVermelho.png';
import UserTableManagment from './Components/UserTableManagment';
import CloseIcon from '@mui/icons-material/Close';

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

export default function GerenciadorDeUsers() {
  const [userList, setUserList] = useState([]);
  const [modalItem, setModalItem] = useState([]);
  const [filtro, setFiltro] = useState({
    email: '',
    nome: '',
    setor: '',
    nivel: '',
  });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleFetch = useCallback(() => {
    buscarUsuarioPorFiltro(filtro)
      .then((res) => {
        setUserList(res.data);
      })
      .catch(() =>
        addToast({
          type: 'danger',
          title: 'Erro ao Listar os Usuários',
          description: 'Por favor, tente novamente mais tarde.',
        })
      );
  }, [filtro]);

  useEffect(() => {
    handleFetch();
  }, [filtro]);

  const bloquearUsuario = async (value) => {
    const data = value;

    const bloqueio = {
      idUsuario: data.id,
      nome: data.nome,
      email: data.email,
      idSetor: data.setor.id,
      idNivel: (data.nivel.id = 0),
    };

    await updateUsuario(bloqueio)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Usuário atualizado com sucesso.',
        });
      })
      .catch(() =>
        addToast({
          type: 'warning',
          title: 'Erro ao Atualizar o Usuário',
          description: 'Verifique os campos obrigatórios.',
        })
      )
      .finally(() => {
        handleFetch();
      });
  };

  const updateSenhaUsuario = async (value) => {
    const usuario = {
      email: value,
      password: 123456789,
    };

    await trocarSenha(usuario.email, usuario.password)
      .then((res) => {
        sendEmailNewUser(usuario);
        addToast({
          type: 'success',
          title: 'Sucesso ao Atualizar Senha',
          description: res.message,
        });
      })
      .catch((_err) => {
        addToast({
          type: 'warning',
          title: 'Erro ao Atualizar Senha',
          description: _err.response.data.errors,
        });
      })
      .finally(() => {
        handleFetch();
      });
  };

  const atualizarUsuarioModal = async (item) => {
    await updateUsuario(item)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Sucesso ao Atualizar o Usuário',
        });
      })
      .catch(() =>
        addToast({
          type: 'warning',
          title: 'Erro ao Atualizar o Usuário',
          description: 'Verifique se todos os campos estão preenchidos!!',
        })
      )
      .finally(() => {
        handleFetch(), handleClose();
      });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleModalUpdateUsuario = (item) => {
    setShowModal(true);
    setModalItem(item);
  };

  const handleClear = () => {
    setFiltro({ email: '', nome: '', setor: '', nivel: '' });
    addToast({
      type: 'info',
      title: 'Filtros Limpos',
      description: 'Os campos de filtro foram limpos.',
    });
  };

  return (
    <>
      <Box className="Principal">
        <Box
          position={'relative'}
          sx={{ backgroundColor: '#f3f4f6' }}
          gap={2}
          padding={'0px 50px 50px 50px'}
        >
          <Box
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              display: 'flex',
              gap: '20px',
              '@media (max-width: 670px)': {
                flexDirection: 'column',
                alignItems: 'flex-start',
              },
            }}
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                width: '100%',
              }}
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
                <HeaderAmvox
                  title="Gerenciador de Usuários"
                  onBack={() => navigate(-1)}
                />
              </Box>
              <MuiModal open={showModal} onClose={handleClose}>
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
                      sx={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: '#333333',
                      }}
                    >
                      Atualizar Usuário
                    </Typography>

                    <Button
                      type="reset"
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      <CloseIcon sx={{ color: '#333333' }} />
                    </Button>
                  </Box>
                  <Box>
                    <UpdateUser
                      dadosUser={modalItem}
                      atualizarUsuario={atualizarUsuarioModal}
                      cancelarAtualizacao={handleClose}
                    />
                  </Box>
                </Box>
              </MuiModal>
            </Box>
          </Box>
          <Box className="boxFiltros">
            <Box className="boxField">
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  width: '100%',
                  gap: '32px',
                }}
              >
                <Box>
                  <FormLabel>Nome</FormLabel>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={filtro.nome}
                    sx={{
                      backgroundColor: '#fff',
                      display: 'flex',
                      '& .MuiInputBase-root': {
                        borderRadius: '8px',
                        height: '48px',
                        '&:focus-within': {
                          border: '1px solid lightgray',
                        },
                      },
                    }}
                    inputProps={{ style: { height: '48px' } }}
                    onChange={(e) =>
                      setFiltro({ ...filtro, nome: e.target.value })
                    }
                  />
                </Box>
                <Box>
                  <FormLabel>Email</FormLabel>
                  <TextField
                    type="email"
                    variant="outlined"
                    fullWidth
                    value={filtro.email}
                    sx={{
                      backgroundColor: '#fff',
                      display: 'flex',
                      '& .MuiInputBase-root': {
                        borderRadius: '8px',
                        height: '48px',
                        '&:focus-within': {
                          border: '1px solid lightgray',
                        },
                      },
                    }}
                    inputProps={{ style: { height: '48px' } }}
                    onChange={(e) =>
                      setFiltro({ ...filtro, email: e.target.value })
                    }
                  />
                </Box>
                <Box
                  sx={{
                    width: '300px',
                  }}
                >
                  <FormLabel>Setor</FormLabel>
                  <Select
                    defaultValue=""
                    fullWidth
                    value={filtro.setor}
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      height: '48px',
                      '& .MuiOutlinedInput-root': {
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        '& fieldset': {
                          borderColor: 'lightgray',
                        },
                        '&:hover fieldset': {
                          borderColor: '#a0a0a0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'lightgray',
                        },
                      },
                    }}
                    onChange={(e) =>
                      setFiltro({ ...filtro, setor: e.target.value })
                    }
                  >
                    <MenuItem value="">Selecionar Setor</MenuItem>
                    {setor.map((item) => (
                      <MenuItem key={item.valor} value={item.valor}>
                        {item.valor} - {item.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>

                <Box
                  sx={{
                    width: '300px',
                  }}
                >
                  <FormLabel>Nível</FormLabel>
                  <Select
                    defaultValue=""
                    fullWidth
                    value={filtro.nivel}
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      height: '48px',
                      '& .MuiOutlinedInput-root': {
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        '& fieldset': {
                          borderColor: 'lightgray',
                        },
                        '&:hover fieldset': {
                          borderColor: '#a0a0a0',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'lightgray',
                        },
                      },
                    }}
                    onChange={(e) =>
                      setFiltro({ ...filtro, nivel: e.target.value })
                    }
                  >
                    <MenuItem value="">Selecionar Nível</MenuItem>
                    {nivel.map((item) => (
                      <MenuItem key={item.valor} value={item.valor}>
                        {item.valor} - {item.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'flex-end',
                  alignSelf: 'center',
                }}
              >
                <Button
                  onClick={handleClear}
                  variant="outlined"
                  sx={{
                    color: '#6E6E6E',
                    border: '2px solid #CCCCCC',
                    transition:
                      'background-color 0.5s ease, transform 0.3s ease-in-out',

                    '&:hover': {
                      transform: 'scale(1.1)',
                      transition:
                        'background-color 0.5s ease, transform 0.3s ease-in-out',
                    },
                  }}
                  startIcon={<HighlightOffIcon />}
                >
                  Limpar filtro
                </Button>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              overflow: 'auto',
              height: '700px',
              mb: '-60px',
            }}
          >
            <UserTableManagment
              data={userList}
              handleModalUpdateUsuario={handleModalUpdateUsuario}
              redefinirSenha={updateSenhaUsuario}
              updateSenhaUsuario={updateSenhaUsuario}
              bloquearUsuario={bloquearUsuario}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
