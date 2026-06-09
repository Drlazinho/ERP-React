import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import { Button, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';

import WidgetsIcon from '@mui/icons-material/Widgets';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ListAlt } from '@mui/icons-material';

const images = [
  {
    // url: ListaEquipamentos,
    title: 'Lista de Equipamentos',
    width: '25%',
    path: '/inteligencia/geral/listaDeEquipamentos',
  },
  {
    // url: Administração,
    title: 'Administração',
    width: '25%',
    path: '/inteligencia/geral/administracaoDeUsuario',
  },
  {
    // url: GerenciamentoInfo,
    title: 'Gerenciamento de Informações',
    width: '25%',
    path: '/inteligencia/geral/gerenciamentoDeInformacoes',
  },
  {
    // url: GerenciamentoTi,
    title: 'Gerenciamento de TI',
    width: '25%',
    path: '/inteligencia/geral/gerenciamentoDeTI',
  },
  {
    // url: GerenciamentoChamados,
    title: 'Gerenciamento de Chamados',
    width: '25%',
    path: '/inteligencia/geral/chamadosNovo',
  },
  {
    // url: Monitoramento de chamados,
    title: 'Monitoramento Chamados',
    width: '25%',
    path: '/inteligencia/geral/telaMonitoramento',
  },
  {
    // url: Inventario,
    title: 'Inventário',
    width: '25%',
    path: '/inteligencia/geral/inventario',
  },
  {
    // url: LogServico,
    title: 'Log De Serviços',
    width: '25%',
    path: '/inteligencia/geral/logDeServicos',
  },
  // {
  //   // url: GerenciamentoChamados,
  //   title: 'Gerenciamento de Chamados [ANTIGO]',
  //   width: '25%',
  //   path: '/inteligencia/geral/chamadosAntigo',
  // },
  {
    // url: ControleEstoqueTi,
    title: 'Controle de Estoque TI',
    width: '25%',
    path: '/inteligencia/geral/controleDeEstoqueTI',
  },
  {
    // url: ApontamentoImg,
    title: 'Apontamentos na Web',
    width: '25%',
    path: '/inteligencia/geral/apontamentosWeb',
  },
  // {
  //   // url: ApontamentoChamados,
  //   title: 'Apontamentos Chamados',
  //   width: '25%',
  //   path: '/inteligencia/geral/apontamentosChamados',
  // },
  // {
  //   // url: LogsMonitoramento,
  //   title: 'Monitoramento de Logs',
  //   width: '25%',
  //   path: '/inteligencia/geral/monitoramentoDeLogs',
  // },
  {
    // url: DashboardChamado,
    title: 'Dashboard Chamados',
    width: '25%',
    path: '/inteligencia/geral/dashboardChamados',
  },
  {
    // url: RelatorioApontamentos,
    title: 'Relatório de Apontamentos',
    width: '25%',
    path: '/inteligencia/geral/relatorioApontamentos',
  },
  {
    // url: dashQualidade,
    title: 'Dashboard Qualidade',
    width: '25%',
    path: '/inteligencia/geral/dashboardQualidade',
  },
  {
    // url: kpisInteligencia,
    title: 'Kpis de Inteligência',
    width: '25%',
    path: '/inteligencia/kpisInteligencia',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: '#121212',
  opacity: 0.9,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function CentralTI() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 2,
          '@media (max-width: 600px)': {
            flexDirection: 'column',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
            textShadow: '-1px -1px 6px #000000',
            color: 'rgb(248, 249, 250)',
            p: [2],
            zIndex: 1,
          }}
        >
          <WidgetsIcon size={40} />
          <Typography variant="h3">Menu Inteligencia</Typography>
        </Box>
        <Button
          variant="contained"
          color="success"
          onClick={() => navigate(-1)}
          startIcon={<KeyboardBackspaceIcon />}
        >
          Voltar
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginTop: '5px',
          marginBottom: '5px',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            onClick={() => navigate(image.path)}
            style={{
              width: image.width,
            }}
          >
            {/* <ImageSrc style={{ backgroundImage: `url(${image.url})` }} /> */}
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <Image>
              <Typography
                component="span"
                variant="h6"
                color="inherit"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                }}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </Image>
          </ImageButton>
        ))}
      </Box>
    </>
  );
}
