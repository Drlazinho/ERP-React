import './styles.css';
import Amvoxlogopng from '@/assets/Amvoxlogopng.png';
import iconColeta from '@/assets/iconColeta.png';
import iconEntrega from '@/assets/iconEntrega.png';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  Box,
  Button,
  Card,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const CustomCard = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 400,
  height: 425,
  borderRadius: 16,
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
  marginBottom: 170,
}));

const CustomButton = styled(Button)(() => ({
  marginTop: '50px',
  width: '50%',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
  borderRadius: '8px',
  background: '#fff',
  fontFamily: 'Poppins, sans-serif',
  fontWeight: '600',
  fontSize: '24px',
  border: '2px solid #A00',
  '&:hover': {
    background:
      'linear-gradient(180deg, #CC0E0E 23.5%, #990404 56%, #820000 100%)',
    border: '2px solid #800',
    color: '#FFf',
  },
}));

export default function ColetaEntrega() {
  const navigate = useNavigate();

  const handleNavigateToColeta = () => {
    navigate('coletaPosVenda');
  };

  const handleNavigateToEntrega = () => {
    navigate('entregaPosVenda');
  };
  
  function handleBack() {
    navigate(-1);
  }

  return (
    <>
      <Box sx={{ backgroundColor: '#F2F2F2' }} gap={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            pl: 4,
            pb: 10,
          }}
        >
          <IconButton>
            <ChevronLeftIcon onClick={handleBack}/>
          </IconButton>
          <img
            src={Amvoxlogopng}
            alt="Amvox"
            className="imgAmvox"
            draggable="false"
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 12,
            padding: 4,
          }}
        >
          {/* Card de Coleta */}
          <CustomCard>
            <img src={iconColeta} draggable="false" />
            <CustomButton
              variant="outlined"
              color="error"
              onClick={handleNavigateToColeta}
            >
              Coleta
            </CustomButton>
          </CustomCard>
          {/* Card de Entrega */}
          <CustomCard>
            <img src={iconEntrega} draggable="false" />
            <CustomButton
              variant="outlined"
              color="error"
              onClick={handleNavigateToEntrega}
            >
              Entrega
            </CustomButton>
          </CustomCard>
        </Box>
      </Box>
    </>
  );
}
