import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ReplyIcon from '@mui/icons-material/Reply';
import { BsPersonWorkspace } from 'react-icons/bs';
import CardTI from '../components/CardTI';
import { useToast } from '@/hooks/toast.hook';
import GridDashInteligencia from '../components/GridDashInteligencia/index';
import { buscarDashboardInteligencia } from '../dashboardInteligencia.service';

export default function DashboardTi() {
  const [dataApi, setDataApi] = useState([]);
  const [loader, setLoader] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    buscarDashboardInteligencia()
      .then((res) => {
        setDataApi(res.value);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao Log Usuarios',
          description: 'Erro ao Carregar  Log Usuarios !',
        });
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <Box sx={{ position: 'relative', width: '98%', margin: '0 auto' }}>
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
            <BsPersonWorkspace size={40} color={'#FFFFFF'} />
            <Typography variant="h4">Dashboard - TI</Typography>
          </Box>
          <Link to={'/inteligencia/geral/gerenciamentoDeTI'}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                '@media (max-width: 600px)': {
                  width: '90%',
                },
              }}
              startIcon={<ReplyIcon />}
            >
              Voltar p/ Gerenciamento
            </Button>
          </Link>
        </Box>
        <Box sx={{ width: '100%', margin: 'auto' }}>
          <Typography
            variant="h6"
            align="center"
            fontWeight={'bold'}
            sx={{ color: 'rgb(0, 0, 0)', p: [2], borderRadius: 4 }}
          >
            Qtd. de Requisições da API
          </Typography>
        </Box>
        <GridDashInteligencia data={dataApi} />
      </Box>
    </>
  );
}
