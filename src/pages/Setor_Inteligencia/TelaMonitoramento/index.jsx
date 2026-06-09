import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
} from '@mui/material';
import HeaderAmvox from '@/components/HeaderAmvox';
import { keyframes } from '@emotion/react';
import './styles.css';

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255,255,255, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 15px 5px rgba(255,255,255, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255,255,255, 0);
  }
`;

const TelaMonitoramento = () => {
  const [dadosChamados] = useState({
    proximosEstourar: 7,
    atrasados: 4,
    semComentarios: 6,
    emDia: 18,
  });

  const [dadosDetalhados] = useState({
    semDetalhes: [
      { tecnico: 'Fulano da Silva', numeroChamado: 28995 },
      { tecnico: 'Ciclano Souza', numeroChamado: 95841 },
      { tecnico: 'Ciclano Moura', numeroChamado: 95841 },
      { tecnico: 'Ciclano Souza', numeroChamado: 95841 },
      { tecnico: 'Ciclano Souza', numeroChamado: 95841 },
      { tecnico: 'Ciclano Souza', numeroChamado: 95841 },
      { tecnico: 'Ciclano Souza', numeroChamado: 95841 },
    ],
    emAtraso: [
      { tecnico: 'Fulano da Silva', numeroChamado: 42985 },
      { tecnico: 'Ciclano Souza', numeroChamado: 24848 },
      { tecnico: 'Ciclano Souza', numeroChamado: 24848 },
      { tecnico: 'Ciclano Souza', numeroChamado: 24848 },
    ],
    proximosEstourar: [
      { tecnico: 'Maria Oliveira', numeroChamado: 32356 },
      { tecnico: 'João Pedro', numeroChamado: 41234 },
      { tecnico: 'João Pedro', numeroChamado: 41234 },
      { tecnico: 'João Pedro', numeroChamado: 41234 },
      { tecnico: 'João Pedro', numeroChamado: 41234 },
      { tecnico: 'João Pedro', numeroChamado: 41234 },
    ],
  });

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        fontFamily: 'Poppins, sans-serif',
        padding: '12px 10px',
        backgroundColor: 'white',
        minHeight: '100vh',
        color: '#000',
      }}
    >
      <Box sx={{ width: '100%', marginBottom: '16px' }}>
        <HeaderAmvox
          title="Monitoramento de Chamados"
          onBack={() => window.history.back()}
        />
      </Box>

      <Grid container spacing={4} justifyContent="center" maxWidth="100%">
        <CardChamado
          titulo="Chamados Próximos De Estourar"
          quantidade={dadosChamados.proximosEstourar}
          cor="#f57c00"
          animar
        />
        <CardChamado
          titulo="Chamados Atrasados"
          quantidade={dadosChamados.atrasados}
          cor="#d32f2f"
          animar
        />
        <CardChamado
          titulo="Sem Comentários"
          quantidade={dadosChamados.semComentarios}
          cor="#ffc107"
          animar
        />
        <CardChamado
          titulo="Chamados Em Dia"
          quantidade={dadosChamados.emDia}
          cor="#4caf50"
        />
      </Grid>

      <Box
        sx={{
          mt: 3,
          width: '100%',
          maxWidth: '100%',
        }}
      >
        <Typography variant="h6" sx={{ mb: 1, color: 'black' }}>
          Detalhamento por técnico
        </Typography>

        <Grid container spacing={2}>
          <ListaCard
            titulo="Próximos de Estourar"
            cor="#f57c00"
            dados={dadosDetalhados.proximosEstourar}
          />
          <ListaCard
            titulo="Atrasados"
            cor="#d32f2f"
            dados={dadosDetalhados.emAtraso}
          />
          <ListaCard
            titulo="Sem Comentários"
            cor="#ffc107"
            dados={dadosDetalhados.semDetalhes}
          />
        </Grid>
      </Box>
    </Box>
  );
};

const CardChamado = ({ titulo, quantidade, cor, animar }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Card
      sx={{
        backgroundColor: cor,
        color: 'white',
        borderRadius: '12px',
        boxShadow: 3,
        height: 120,
        animation: animar ? `${pulse} 2s infinite` : 'none',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        },
      }}
    >
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '12px',
        }}
      >
        <Typography variant="h6" component="div" gutterBottom>
          {titulo}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {quantidade}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

const ListaCard = ({ titulo, cor, dados }) => (
  <Grid item xs={12} md={4}>
    <Card
      sx={{
        backgroundColor: cor,
        color: 'white',
        borderRadius: '12px',
        height: '100%',
        boxShadow: 3,
      }}
    >
      <CardContent sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          {titulo}
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}
        >
          <Table size="small" sx={{ color: 'white', minWidth: 320 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                  Nome do Técnico
                </TableCell>
                <TableCell
                  sx={{ color: 'white', fontWeight: 'bold' }}
                  align="right"
                >
                  Número do Chamado
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dados.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#fff !important',
                      color: '#000 !important',
                      '& .MuiTableCell-root': {
                        color: '#000 !important',
                      },
                    },
                  }}
                >
                  <TableCell>{item.tecnico}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                    {item.numeroChamado}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  </Grid>
);

export default TelaMonitoramento;
