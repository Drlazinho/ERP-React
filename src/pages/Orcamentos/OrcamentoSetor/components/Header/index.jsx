import React from 'react';
import { Box, Modal, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Amvoxlogopng from '@/assets/Amvoxlogopng.png';

const Header = ({ title }) => {
  const navigate = useNavigate();
  const handleLogoClick = () => navigate('/financeiro/orcamentosSetores');
  return (
    <div>
      <Box
        sx={(theme) => ({
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          gap: 2,
          mb: 4,
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
          },
        })}
      >
        <Box>
          <IconButton onClick={handleLogoClick} sx={{ cursor: 'pointer' }}>
            <ChevronLeftIcon />
          </IconButton>
          <img
            src={Amvoxlogopng}
            style={{ width: '150px', height: '100px', cursor: 'pointer' }}
          />
        </Box>
        <Typography sx={{ fontWeight: '500', color: '#000', fontSize: '30px' }}>
          {title}
        </Typography>
      </Box>
    </div>
  );
};

export default Header;
