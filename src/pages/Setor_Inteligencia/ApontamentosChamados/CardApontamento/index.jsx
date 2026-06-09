import React from 'react';
import { FormLabel, Typography } from '@mui/material';

const CardApontamentoChamado = ({ numeroChamados, titulo }) => {
  return (
    <>
      <div className="card">
        <Typography
          variant="h4"
          style={{
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
            color: titulo.toLowerCase().includes('atrasados')
              ? 'red'
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
              ? 'red'
              : 'inherit',
          }}
        >
          {titulo}
        </FormLabel>
      </div>
    </>
  );
};

export default CardApontamentoChamado;
