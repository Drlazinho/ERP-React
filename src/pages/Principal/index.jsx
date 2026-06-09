import LayoutNovo from '../../components/LayoutNovo';
import React, { useCallback, useEffect, useState } from 'react';
import { BackgroundFundo, ButtonGeral, ContainerGeral } from './styles';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { CiGrid42 } from 'react-icons/ci';
import useUsuarioLocal from '../../hooks/usuarioLocal.hook';
import styles from './styles.module.css';
import { ButtonsPagesPrincipal } from './components/PagesSystem';
import { BsFillMegaphoneFill } from 'react-icons/bs';
import { PiListDashesFill } from 'react-icons/pi';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import { SiTotvs } from 'react-icons/si';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  EffectFade,
  A11y,
} from 'swiper';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SlidingPane from 'react-sliding-pane';
import { IconButton } from '@mui/material';
import { getPatchNotes } from '../Setor_Inteligencia/PatchNotes/patchNotes.service';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import HeaderImg from './../../assets/header1728x100.png';
import Amvoxlogopng from '../../assets/Amvoxlogopng.png';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MenuPrincipal02 from './components/MenuPrincipal02';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { v4 as uuidv4 } from 'uuid';
import ButtonOrcamentoSetor from './components/ButtonOrcamentoSetor';

const interfaceListaPatches = {
  id: 0,
  rev: '',
  descricao: '',
  bannerUrlAtualizacao: '',
};

export default function Principal() {
  const navigate = useNavigate();

  const { setor, nivel, nome, id: idUser } = useUsuarioLocal();
  const [showSlide, setShowSlide] = useState(false);
  const [filtroPaginas, setFiltroPaginas] = useState([]);
  const [listaPatches, setListaPatches] = useState([interfaceListaPatches]);

  const setoresTipos = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28,
  ];
  const nivelTipos = [1, 6, 7, 8, 9];

  const handlePatch = useCallback(() => {
    getPatchNotes().then((res) => {
      setListaPatches(res);
    });
  });

  useEffect(() => {
    handlePatch();
  }, []);

  const handleOpenAndClose = () => {
    setShowSlide(!showSlide);
  };

  const handleFetch = () => {
    ButtonsPagesPrincipal.forEach((item) => {
      if (item.notSeePrincipal != true) {
        filtroPaginas.push(item);
      }
    });
  };

  useEffect(() => handleFetch(), [ButtonsPagesPrincipal]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <SlidingPane
        closeIcon={<ArrowForwardIosIcon size="medium" color="error" />}
        className="some-custom-class"
        overlayClassName="overlaySlide"
        isOpen={showSlide}
        title="Ultimas Atualizações do Gestão Web"
        width="500px"
        from="right"
        onRequestClose={handleOpenAndClose}
      >
        {listaPatches.map((item) => {
          return (
            <>
              <Card key={item.id} sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    Rev - {item.rev}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Descrição
                  </Typography>
                  <Typography variant="body2">{item.descricao}</Typography>
                </CardContent>
              </Card>
              <br />
            </>
          );
        })}
      </SlidingPane>

      <>
        <BackgroundFundo>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              position: 'relative',
              justifyContent: 'space-between',
              backgroundImage: `url(${HeaderImg})`,
              backgroundPosition: 'center',
              height: '80px',
              marginBottom: '20px',
            }}
          >
            <Box>
              <img
                src={Amvoxlogopng}
                style={{ width: '150px', height: '100px', marginLeft: '10px' }}
              />
            </Box>

            {/* navBar */}
            <Box
              style={{
                display: 'flex',
                justifyContent: 'start',
                paddingTop: '10px',
                marginLeft: '45px',
              }}
            >
              <Typography>
                Bem vindo, Sr(a). <b>{nome}</b>!
              </Typography>
            </Box>
            {/* {[
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20,
              21, 22, 23, 24, 25, 26,
            ].includes(setor) &&
              [1, 6, 7, 8, 9].includes(nivel) && (
                <div className={styles.navBar}>
                  <MenuPrincipal02 />
                </div>
              )} */}

            <Box>
              <Tooltip title="Conta">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{
                    color: 'black',
                    ml: 2,
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32, mr: 0.2 }} />
                  <Typography
                    className={styles.text}
                    sx={{
                      minWidth: 100,
                    }}
                  >
                    {nome}
                  </Typography>
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleOpenAndClose}>
                  <ListItemIcon>
                    <InfoOutlinedIcon fontSize="medium" />
                  </ListItemIcon>
                  <strong>Verificar Atualizações</strong>
                </MenuItem>
                <MenuItem onClick={() => navigate('/redefinirsenha')}>
                  <ListItemIcon>
                    <LockOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <strong>Redefinir Senha</strong>
                </MenuItem>
                <MenuItem onClick={() => navigate('/')}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <strong>Sair</strong>
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          <ContainerGeral>
            {/* Dashboard Geral */}
            {(() => {
              const buttonId = uuidv4();
              return (
                <ButtonGeral
                  data-testid={`button-${buttonId}`}
                  onClick={() => navigate('/dashboard')}
                  setorNivel={
                    [
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18,
                      19, 20, 21, 22, 23, 24, 25, 26,
                    ].includes(setor) && [6, 7, 8, 9].includes(nivel)
                  }
                >
                  <CiGrid42 />
                  <strong>Dashboard Geral</strong>
                </ButtonGeral>
              );
            })()}

            {/* Dashboard Comercial */}
            {(() => {
              const buttonId = uuidv4();
              return (
                <ButtonGeral
                  data-testid={`button-${buttonId}`}
                  onClick={() => navigate('/dashComercial')}
                  setorNivel={
                    !!(
                      [
                        1, 2, 3, 4, 5, 7, 8, 9, 10, 15, 17, 18, 19, 20, 26,
                      ].includes(setor) && [1, 6, 7, 8, 9].includes(nivel)
                    )
                  }
                >
                  <StorefrontIcon fontSize="large" />
                  <strong>Dashboard Comercial</strong>
                </ButtonGeral>
              );
            })()}

            {/* Chamado do Setor */}
            {(() => {
              const buttonId = uuidv4();
              return (
                <ButtonGeral
                  data-testid={`button-${buttonId}`}
                  onClick={() => navigate('/inteligencia/geral/chamadosNovo')}
                  setorNivel={
                    [
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18,
                      19, 20, 21, 22, 23, 24, 25, 26,
                    ].includes(setor) && [1, 6, 7, 8, 9].includes(nivel)
                  }
                >
                  <PiListDashesFill />
                  <strong>Chamado do Setor</strong>
                </ButtonGeral>
              );
            })()}

            {/* Abrir Chamado */}
            {(() => {
              const buttonId = uuidv4();
              return (
                <ButtonGeral
                  data-testid={`button-${buttonId}`}
                  onClick={() => navigate('/xcontato')}
                  setorNivel={
                    setoresTipos.includes(setor) && nivelTipos.includes(nivel)
                  }
                >
                  <BsFillMegaphoneFill />
                  <strong>Abrir Chamado</strong>
                </ButtonGeral>
              );
            })()}

            {/* Cadastro de Nota */}
            {(() => {
              const buttonId = uuidv4();
              return (
                <ButtonGeral
                  data-testid={`button-${buttonId}`}
                  onClick={() => navigate('/cadastroprotocolodenotas')}
                  setorNivel={
                    [
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18,
                      19, 20, 21, 22, 23, 24, 25, 26,
                    ].includes(setor) && [1, 6, 7, 8, 9].includes(nivel)
                  }
                >
                  <AssignmentIcon />
                  <strong>Cadastro de Nota</strong>
                </ButtonGeral>
              );
            })()}

            {/* Processos e Procedimentos */}
            {(() => {
              const buttonId = uuidv4();
              return (
                <ButtonGeral
                  data-testid={`button-${buttonId}`}
                  onClick={() =>
                    window.open(
                      import.meta.env.VITE_URL_PROCESSOS_PROCEDIMENTOS,
                      '_blank'
                    )
                  }
                  setorNivel={
                    [
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18,
                      19, 20, 21, 22, 23, 24, 25, 26,
                    ].includes(setor) && [1, 6, 7, 8, 9].includes(nivel)
                  }
                >
                  <TouchAppOutlinedIcon fontSize="large" />
                  <strong>Processos e Procedimentos</strong>
                </ButtonGeral>
              );
            })()}

            {/* Mastersales */}
            {(() => {
              const buttonId = uuidv4();
              return (
                <ButtonGeral
                  data-testid={`button-${buttonId}`}
                  onClick={() =>
                    window.open(
                      import.meta.env.VITE_URL_MASTERSALES,
                      '_blank'
                    )
                  }
                  setorNivel={
                    setoresTipos.includes(setor) && nivelTipos.includes(nivel)
                  }
                >
                  <QueryStatsIcon />
                  <strong>Mastersales</strong>
                </ButtonGeral>
              );
            })()}

            {/* Fluig */}
            {(() => {
              const buttonId = uuidv4();
              return (
                <ButtonGeral
                  data-testid={`button-${buttonId}`}
                  onClick={() =>
                    window.open(
                      import.meta.env.VITE_URL_FLUIG,
                      '_blank'
                    )
                  }
                  setorNivel={
                    setoresTipos.includes(setor) && nivelTipos.includes(nivel)
                  }
                >
                  <ShoppingCartIcon />
                  <strong>Fluig</strong>
                </ButtonGeral>
              );
            })()}
            {(() => {
              const buttonId = uuidv4();
              return (
                <ButtonGeral
                  data-testid={`button-${buttonId}`}
                  onClick={() =>
                    window.open(
                      import.meta.env.VITE_URL_PROTHEUS,
                      '_blank'
                    )
                  }
                  setorNivel={
                    setoresTipos.includes(setor) && nivelTipos.includes(nivel)
                  }
                >
                  <SiTotvs />
                  <strong>Protheus</strong>
                </ButtonGeral>
              );
            })()}
            {(() => {
              const buttonId = uuidv4();
              return (
                <ButtonOrcamentoSetor
                  data-testid={`button-${buttonId}`}
                  setor={setor}
                  id={idUser}
                  setorNivel={
                    [
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18,
                      19, 20, 21, 22, 23, 24, 25, 26,
                    ].includes(setor) && [1, 6, 7, 8, 9].includes(nivel)
                  }
                />
              );
            })()}
          </ContainerGeral>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: '24px',
              mb: '20px',
            }}
          >
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
              autoplay={{ delay: 5000 }}
              loop={true}
              className="mySwiper"
              style={{
                width: '97%',
                height: '700px',
                margin: '0 auto',
              }}
            >
              {listaPatches.slice(0, 4).map((item) => {
                return (
                  <>
                    <SwiperSlide
                      key={item.id}
                      className="mySwiper_slide"
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {item.descricao ? (
                        <a
                          href={item.descricao}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          <img
                            src={item.bannerUrlAtualizacao || ''}
                            alt="imagens"
                            className={styles.carousel}
                          />
                        </a>
                      ) : (
                        <img
                          src={item.bannerUrlAtualizacao || ''}
                          alt="imagens"
                          className={styles.carousel}
                        />
                      )}
                    </SwiperSlide>
                  </>
                );
              })}
            </Swiper>
          </Box>
        </BackgroundFundo>
      </>
    </>
  );
}
