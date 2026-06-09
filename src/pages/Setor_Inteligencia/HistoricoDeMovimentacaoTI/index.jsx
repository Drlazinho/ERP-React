import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { Box, Typography, Button } from '@mui/material';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import MovTable from './components/MovTable';
import { buscarInsumosMovimentacaoPorFiltro } from '@/pages/Setor_Recepcao/Insumos/insumosMovimentacao.service';

const DataProps = {
  IdInsumos: null,
  tipoMovimentacao: '',
  dataInicio: null,
  dataFim: null,
};

export default function HistoricoDeMovimentacaoTI() {
  const [data, setData] = useState({ DataProps });

  const navigate = useNavigate();

  const handleMovimentacao = () => {
    buscarInsumosMovimentacaoPorFiltro(data)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    handleMovimentacao();
  }, []);

  return (
    <>
      <Box sx={{ position: 'relative' }}>
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
            }}
          >
            <AccountTreeIcon size={35} />
            <Typography variant="h4">Histórico de Movimentações TI</Typography>
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
        <Box>
          <MovTable data={data} />
        </Box>
      </Box>
    </>
  );
}