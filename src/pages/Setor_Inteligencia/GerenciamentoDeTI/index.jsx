import { BsPersonWorkspace } from 'react-icons/bs';
import { useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/toast.hook';
import { buscarLogUsuarios } from '@/services/gerenciamentoTi/logUsuario.service';
import UserAccessChart from './components/userAccessChart';
import ChartTop5 from './components/ChartTop5';
import { Box, Button, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import InfoCardAmvox from '@/components/InfoCardAmvox'

export default function GerenciamentoDeTi() {
  const [usuarios, setUsuarios] = useState([]);
  const { addToast } = useToast();
  const [loader, setLoader] = useState(true);

  const navigate = useNavigate();

  function handleBack() {
    navigate('/inteligencia/geral');
  }

  useEffect(() => {
    buscarLogUsuarios()
      .then((res) => {
        setUsuarios(res.value);
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
          <Link to="dashboardTi">
            <Button
              variant="contained"
              color="primary"
              sx={{
                '@media (max-width: 600px)': {
                  width: '90%',
                },
              }}
              startIcon={<ShortcutIcon />}
            >
              Ir p/ Dashboard
            </Button>
          </Link>
        </Box>
        <Button
          variant="contained"
          color="success"
          onClick={handleBack}
          startIcon={<KeyboardBackspaceIcon />}
        >
          Voltar
        </Button>
        <InfoCardAmvox
          title="Usuários Logado - Dia"
          backcolor="#008000"
        />
        <ChartTop5 data={usuarios?.top5}></ChartTop5>
        <UserAccessChart
          data={usuarios.listaAcessoDiario ? usuarios.listaAcessoDiario : []}
        />
      </Box>
    </>
  );
}
