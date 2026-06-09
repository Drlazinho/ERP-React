import React from 'react';
import { Box, Typography } from '@mui/material';

const Legenda = ({ text1, text2 }) => {
  return (
    <>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Typography sx={{ fontWeight: 'bold', fontSize: '10px' }}>
          {text1}:
        </Typography>
        <Typography
          sx={{ fontWeight: 'bold', fontSize: '10px', color: '#aa0000' }}
        >
          {text2}
        </Typography>
      </Box>
    </>
  );
};

export default Legenda;
