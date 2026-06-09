import React, { useState, useCallback, useEffect, useRef } from 'react';
import { apiLogin } from '../../services/apis';
import { login } from '../../services/auth';

import { useUsuario } from '../../hooks/usuario.hook';
import bannerLogin from './../../assets/bannerlogin.jpg';
import spaceAmvox from './../../assets/spaceamvox.jpg';
import spaceAmvox2 from './../../assets/spaceamvox2.jpg';
import bagamvox from './../../assets/bagamvox.jpg';
import logoAmvox20 from './../../assets/amvoxlogomarcabranco.png';
import 'swiper/swiper.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import XisAnimado from '../../assets/xisAnimado.gif';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  EffectFade,
  A11y,
} from 'swiper';
import {
  CarrouselModalLogin,
  Container,
  ContentForm,
  ContentImg,
} from './style';
import './styles.css';
import { useToast } from '../../hooks/toast.hook';
import { formatDateBr } from '../../utils/formatDateInput';
import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import CountUp from 'react-countup';
import LinearProgress from '@mui/joy/LinearProgress';
import { useNavigate } from 'react-router';
import VersionChecker from './components/VersionChecker';

const loginInterface = {
  jwtToken: {
    token: '',
    expiration: '',
    nivel: 0,
    setor: 0,
    nome: '',
    id: 0,
  },
  refreshToken: '',
};

export default function Login() {
  const [emailInput, setEmail] = useState();
  const [passwordInput, setPassword] = useState();
  const [loginRes, setLoginRes] = useState(loginInterface);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();
  const { definirUsuarioSistema } = useUsuario();

  useEffect(() => {
    const formData = new FormData();
    const value = formatDateBr(new Date().toLocaleDateString());

    formData.append('data', value);
  }, []);

  const { addToast } = useToast();

  const loginSistema = useCallback((e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    navigate('/principal');
    // setTimeout(async () => {
    //   try {
    //     const response = await apiLogin.post('/Account/LoginUser', {
    //       email: emailInput,
    //       password: passwordInput,
    //     });

    //     const objUsuario = {
    //       token: response.data.jwtToken.token,
    //       expiration: response.data.jwtToken.expiration,
    //       nivel: response.data.jwtToken.nivel,
    //       setor: response.data.jwtToken.setor,
    //       nome: response.data.jwtToken.nome,
    //       id: response.data.jwtToken.id,
    //       refreshToken: response.data.refreshToken,
    //       email: emailInput,
    //     };

    //     definirUsuarioSistema(objUsuario);

    //     login(response.data.jwtToken.token);
    //   } catch (error) {
    //     addToast({
    //       type: 'danger',
    //       title: 'Erro no Login!',
    //       description: 'O login falhou' + error,
    //     });
    //     setOpenModal(false);
    //   } finally {
    //     setOpenModal(false);
    //   }
    // }, 2500)[(navigate, emailInput, passwordInput)];
  });

  const inputs = document.querySelectorAll('.form_input');

  // *==== adicionando foco===*/
  function addfocus() {
    const parent = this.parentNode.parentNode;
    parent.classList.add('focus');
  }

  // *==== retirando foco===*/

  function remfocus() {
    const parent = this.parentNode.parentNode;
    if (this.value === '') {
      parent.classList.remove('focus');
    }
  }

  // *==== chamando a função ===*/

  inputs.forEach((input) => {
    input.addEventListener('focus', addfocus);
    input.addEventListener('blur', remfocus);
  });

  return (
    <Container>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: {
            backdropFilter: 'blur(3px)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#fff',
            border: '1px solid #000',
            borderRadius: 4,
            p: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div style={{ background: '#fff' }}>
            <img src={XisAnimado} alt="Xis Animado" />
          </div>

          <Typography id="modal-modal-title" variant="h6" component="h2">
            Carregando ...
          </Typography>
        </Box>
      </Modal>
      <VersionChecker />
      <ContentForm>
        <img className="logo" src={logoAmvox20} alt="" />
        <Box
          sx={{
            my: 2,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#adadad',
            opacity: 0.93,
            padding: 3,
            borderRadius: 3,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            color="error"
            textAlign={'center'}
            fontWeight={'700'}
          >
            Acessar Conta
          </Typography>
          <Typography component="caption" variant="caption">
            {import.meta.env.VITE_REACT_APP_VERSION}
          </Typography>
          <Box
            component="form"
            noValidate
            fullWidth
            // onSubmit={handleSubmit}
            sx={{
              mt: 1,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              color="primary"
              id="email"
              type="email"
              variant="outlined"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <Button
              variant="contained"
              type="submit"
              onClick={loginSistema}
              sx={{ width: '100%' }}
            >
              Login
            </Button>
          </Box>
        </Box>
        {/* <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'rgba(213, 213, 213, 0.9)', pb: 1 , opacity: .80, borderRadius: 3 }}>
          <img src={saoJoaoAmvox} width={10} style={{ margin: '0 auto',  width: '85px'}} />
          {
            new Date().toLocaleString() <= "14/06/2024 14:30:00" ? (
              <>
                <Typography component="h6" variant="body1" textAlign={'center'} sx={{ color: '#000' }} fontWeight={'700'} >EVENTO:</Typography>
                <Typography component="h6" variant="body1" textAlign={'center'} sx={{ color: '#000' }} fontWeight={'700'} >14 DE JUNHO &#x2022; <span style={{ fontWeight: '700' }}>13h30</span></Typography>
                <Typography component="h6" variant="body1" textAlign={'center'} sx={{ color: '#000' }} >Espaço Recanto das Orquídeas  </Typography>
                <Typography component="h6" variant="body1" textAlign={'center'} sx={{ color: '#000' }} >Jardim Limoeiro, Camaçari - BA</Typography>
              </>
            ) : (
              <></>
            )

          }

        </Box> */}
        <div className="boxForm"></div>
      </ContentForm>
      <ContentImg>
        <Swiper
          modules={[
            Navigation,
            Pagination,
            Scrollbar,
            Autoplay,
            EffectFade,
            A11y,
          ]}
          spaceBetween={1}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          effect={'fade'}
          className="mySwiper"
        >
          <SwiperSlide className="mySwiper_slide">
            <img src={bagamvox} alt="" />
            <h1>
              Investimento em inovação
              <br />
              <span>
                Criamos experiências novas e únicas, para alegrar o mundo.
              </span>
            </h1>
          </SwiperSlide>
          <SwiperSlide className="mySwiper_slide">
            <img src={spaceAmvox2} alt="" />
            <h1>
              Trabalhamos em equipe
              <br />
              <span>Compartilhamos conquistas para crescermos juntos</span>
            </h1>
          </SwiperSlide>
          <SwiperSlide className="mySwiper_slide">
            <img src={spaceAmvox} alt="" />
            <h1>
              Prezamos pela qualidade <br />
              <span>Alto padrão em tudo que fazemos</span>
            </h1>
          </SwiperSlide>
          <SwiperSlide className="mySwiper_slide">
            <img src={bannerLogin} alt="" />
            <h1>
              Tudo para uma rotina <br />
              <span>Mais leve e divertida</span>
            </h1>
          </SwiperSlide>
        </Swiper>
      </ContentImg>
    </Container>
  );
}
