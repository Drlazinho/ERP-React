import React, { useContext, useEffect, useState } from 'react';

import { apiLogin } from '@/services/apis';

import Nivel from '@/repositories/nivel';
import Setor from '@/repositories/setor';
import SetorReal from '@/repositories/setorReal';
import './styles.css';

import xisFooter from '@/assets/xisFooter.png';
import { Add } from '@mui/icons-material';
import { useToast } from '@/hooks/toast.hook';
import { useLocation, useNavigate } from 'react-router';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import HeaderAmvox from '@/components/HeaderAmvox';

import { RestricaoContext } from '@/hooks/acesso-restrito-ti.hook';
import {
  Box,
  Button,
  FormControl,
  Card,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CardMedia,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EmailIcon from '@mui/icons-material/Email';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { sendEmailNewUser } from './utils/sendEmailNewUser';
import SidebarNovo from '@/components/LayoutNovo/SidebarNovo';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function Administracao() {
  const { showModalAccess, LiberarAcesso, setRouteName, error } =
    useContext(RestricaoContext);
  const location = useLocation().pathname;

  const [cadastroUsuario, setCadastroUsuario] = useState({
    nome: '',
    email: '',
    password: '123456789',
    confirmaPassword: '123456789',
    role: 0,
    setor: 0,
    idSetor: 0,
  });
  const { addToast } = useToast();

  useEffect(() => {
    setRouteName(location);
  }, []);

  const addUsuario = async (e) => {
    e.preventDefault();

    try {
      await apiLogin.post('/Account/CreateUser', cadastroUsuario);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Usuario Cadastrado!',
      });
      sendEmailNewUser(cadastroUsuario);
      handleClear();
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro',
        description: 'O Registro falhou ' + error,
      });
    } finally {
      handleClear();
    }
  };
  const inputs = document.querySelectorAll('.form_input');

  const navigate = useNavigate();

  const handleClear = () => {
    setCadastroUsuario({
      nome: '',
      email: '',
      password: '',
      confirmaPassword: '',
      role: 0,
      setor: 0,
      idSetor: 0,
    });
  };

  return (
    <>
      <div className="principalProdutoForaLinha">
        <div className="header">
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
              title="Cadastro de Usuários"
              onBack={() => navigate(-1)}
            />
          </Box>
          <div className="userAdm">
            Usuários cadastrados <br />
            <Button
              onClick={() => navigate('gerenciadorDeUsers')}
              sx={{
                borderRadius: '32px',
                background: '#E6282C',
                height: '54px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.4)',
                '&:hover': {
                  backgroundColor: 'darkred',
                },
              }}
            >
              <PeopleRoundedIcon sx={{ color: '#fff' }} />
            </Button>
          </div>
        </div>

        <Box
          sx={{
            my: 2.5,
            mx: 'auto',
            width: 475,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#C2C2C2',
            opacity: 0.85,
            padding: 5,
            borderRadius: 10,
            border: '1px solid #000',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Typography variant="h6">Preencha as informações!</Typography>

          <FormControl
            variant="outlined"
            fullWidth
            sx={{
              background: '#fff',
              borderRadius: '20px',
              marginTop: '30px',
              width: '380px',
              marginRight: '15px',
            }}
          >
            <OutlinedInput
              placeholder="Nome"
              value={cadastroUsuario.nome}
              onChange={(e) =>
                setCadastroUsuario({
                  ...cadastroUsuario,
                  nome: e.target.value,
                })
              }
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle
                    sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                  />
                </InputAdornment>
              }
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            />
          </FormControl>

          <FormControl
            variant="outlined"
            fullWidth
            sx={{
              background: '#fff',
              borderRadius: '20px',
              marginTop: '15px',
              width: '380px',
              marginRight: '15px',
            }}
          >
            <OutlinedInput
              placeholder="Email"
              value={cadastroUsuario.email}
              label="Email"
              onChange={(e) =>
                setCadastroUsuario({
                  ...cadastroUsuario,
                  email: e.target.value,
                })
              }
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                </InputAdornment>
              }
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            />
          </FormControl>

          <div className="divSelect">
            <FormControl
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                background: '#fff',
                borderRadius: '20px',
                marginTop: '15px',
              }}
            >
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cadastroUsuario.setor}
                onChange={(e) =>
                  setCadastroUsuario({
                    ...cadastroUsuario,
                    setor: Number(e.target.value),
                  })
                }
                startAdornment={
                  <InputAdornment position="start">
                    <ApartmentIcon
                      sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                    />
                  </InputAdornment>
                }
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  minWidth: '300px',
                  height: '55px',
                }}
              >
                <MenuItem disabled value="">
                  <em>Setor</em>
                </MenuItem>
                {Setor.map((opcao) => (
                  <MenuItem key={opcao.valor} value={opcao.valor}>
                    {opcao.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="divSelect">
            <FormControl
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                background: '#fff',
                borderRadius: '20px',
                marginTop: '15px',
              }}
            >
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cadastroUsuario.idSetor}
                onChange={(e) =>
                  setCadastroUsuario({
                    ...cadastroUsuario,
                    idSetor: Number(e.target.value),
                  })
                }
                startAdornment={
                  <InputAdornment position="start">
                    <ManageAccountsIcon
                      sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                    />
                  </InputAdornment>
                }
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  minWidth: '300px',
                  height: '55px',
                }}
              >
                <MenuItem disabled value="">
                  <em>Setor Real</em>
                </MenuItem>
                {SetorReal.map((opcao) => (
                  <MenuItem key={opcao.valor} value={opcao.valor}>
                    {opcao.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="divSelect">
            <FormControl
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                background: '#fff',
                borderRadius: '20px',
                marginTop: '15px',
              }}
            >
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cadastroUsuario.nivel}
                onChange={(e) =>
                  setCadastroUsuario({
                    ...cadastroUsuario,
                    role: Number(e.target.value),
                  })
                }
                startAdornment={
                  <InputAdornment position="start">
                    <SettingsSuggestRoundedIcon
                      sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                    />
                  </InputAdornment>
                }
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  minWidth: '300px',
                  height: '55px',
                }}
              >
                <MenuItem disabled value="">
                  <em>Tipo de Acesso</em>
                </MenuItem>
                {Nivel.map((opcao) => (
                  <MenuItem key={opcao.valor} value={opcao.valor}>
                    {opcao.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Button
            variant="contained"
            color="success"
            onClick={addUsuario}
            sx={{ my: 1.5, marginTop: '25px' }}
            startIcon={<Add />}
          >
            Registrar usuário
          </Button>
        </Box>
      </div>
    </>
  );
}
