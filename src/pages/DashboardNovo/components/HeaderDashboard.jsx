import React from 'react';
import { Box, Button } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';

const HeaderDashboard = ({
  logoSrc,
  title,
  isPaused,
  togglePause,
  manualFlip,
  buttonLabel,
  colorA,
  colorB,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        borderBottom: '1px solid #000000',
      }}
    >
      <Box
        component="img"
        src={logoSrc}
        alt="Logo Anual"
        sx={{
          width: '150px',
          height: '100px',
          marginLeft: '10px',
          '@media (max-width: 430px)': {
            width: '100px',
            height: 'auto',
            marginTop: '20px',
          },
        }}
      />
      <Box
        component="h3"
        sx={{
          fontWeight: 'bold',
          color: '#5C5C5C',
          '@media (max-width: 430px)': {
            fontSize: '18px',
            marginTop: '20px',
          },
        }}
      >
        {title}
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          '@media (max-width: 430px)': {
            marginTop: '20px',
            marginBottom: '20px',
          },
        }}
      >
        <Button onClick={togglePause} sx={{ color: `${colorA}` }}>
          {isPaused ? <PlayCircleOutlineIcon /> : <PauseCircleOutlineIcon />}
        </Button>
        <Button
          variant="outlined"
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            borderRadius: '10px',
            fontWeight: 'bold',
            marginRight: '10px',
            color: `${colorB}`,
            borderColor: `${colorB}`,
          }}
          onClick={() => manualFlip()}
        >
          <FlipCameraAndroidIcon /> {buttonLabel}
        </Button>
      </Box>
    </Box>
  );
};

export default HeaderDashboard;
