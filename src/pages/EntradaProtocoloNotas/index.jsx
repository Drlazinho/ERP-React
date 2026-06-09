import {
  Avatar,
  Box,
  Button,
  Divider,
  Typography,
  useTheme,
} from '@mui/material';
import React from 'react';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LayoutNovo from '../../components/LayoutNovo';
import RecommendIcon from '@mui/icons-material/Recommend';
import { green } from '@mui/material/colors';
import { Link } from 'react-router-dom';

export default function EntradaProtocoloNotas() {
  return (
    <LayoutNovo>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '92vh',
          gap: 1,
        }}
      >
        <Box
          height={'100%'}
          flex={1}
          bgcolor={green[100]}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box
            sx={{
              width: '80%',
              height: '50%',
              bgcolor: green[50],
              border: '4px solid #000',
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 3.5,
              padding: 4,
            }}
          >
            <Avatar sx={{ bgcolor: green[900], width: 60, height: 60 }}>
              <AssignmentIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography textAlign={'center'} variant="h5">
                Cadastro de <br /> Protocolo de Notas
              </Typography>
              <Divider
                orientation="horizontal"
                sx={{ height: 2, bgcolor: '#000', my: 1.5 }}
              />
              <Typography
                variant="body1"
                color={'GrayText'}
                textAlign={'center'}
              >
                {' '}
                Visualizar/registrar notas
              </Typography>
            </Box>
            <Link to="/cadastroprotocolodenotas">
              <Button variant="contained" size="large" fullWidth>
                Entrar
              </Button>
            </Link>
          </Box>
        </Box>
        {/* <Box
          height={'100%'}
          flex={1}
          bgcolor={green[100]}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box
            sx={{
              width: '80%',
              height: '50%',
              bgcolor: green[50],
              border: '4px solid #000',
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 3.5,
              padding: 4,
            }}
          >
            <Avatar sx={{ bgcolor: green[900], width: 60, height: 60 }}>
              <RecommendIcon fontSize="large" />
            </Avatar>
            <Box width={'100%'}>
              <Typography textAlign={'center'} variant="h5">
                Aprovador de <br /> Protocolo de Notas
              </Typography>
              <Divider
                orientation="horizontal"
                sx={{ height: 2, bgcolor: '#000', my: 1.5 }}
              />
              <Typography
                variant="body1"
                color={'GrayText'}
                textAlign={'center'}
              >
                Aprovacão das Notas
              </Typography>
            </Box>

            <Link>
              <Button
                variant="contained"
                size="large"
                sx={{ justifySelf: 'end' }}
                fullWidth
                disabled
              >
                Entrar
              </Button>
            </Link>
          </Box>
        </Box> */}
      </Box>
    </LayoutNovo>
  );
}
