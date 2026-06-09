import React from 'react';
import { Container, Box, Typography, Link } from '@mui/material';
import error from '../assets/error1.jpg';

function UsuarioBloqueado({ error }) {
  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}> 
        <img src={error} alt="Erro" height="200" /> 
        <Typography variant="h4" gutterBottom>
          Usuário Bloqueado
        </Typography>
        <Link href="/" variant="body1"> 
          Ir para login
        </Link>
      </Box>
    </Container>
  );
}

export default UsuarioBloqueado;