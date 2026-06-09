import React from 'react';
import { FormLabel, Typography } from '@mui/material';

const CardIndicatorRed = ({ numeroChamados, titulo }) => {
  return (
    <>
      <div className="cardRed">
        <Typography
          variant="h4"
          style={{
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
            color: titulo.toLowerCase().includes('atrasados')
              ? 'black'
              : 'inherit',
          }}
        >
          {numeroChamados}
        </Typography>
        <FormLabel
          style={{
            textAlign: 'center',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
            fontSize: '18px',
            color: titulo.toLowerCase().includes('atrasados')
              ? 'black'
              : 'inherit',
          }}
        >
          {titulo}
        </FormLabel>
      </div>
    </>
  );
};

export default CardIndicatorRed;
