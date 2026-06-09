import React, { useCallback, useEffect, useState } from 'react';

import { BiBarcodeReader } from 'react-icons/bi';

import './styles.css';
import { useVerificaNotaFiscalPortaria } from '@/hooks/nota-fiscal-verifica-portaria.hook';
import { useUsuario } from '@/hooks/usuario.hook';

import { consultarNfe } from '@/pages/Setor_Portaria/NotasSaida/notaSaida.service';
import NotasSaidaTabela from '@/components/Tabela/NotaSaidaTabela';
import {
  Box,
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
  debounce,
  Modal as MuiModal,
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};

export default function NotasSaida() {
  const [removeLoading, setRemoveLoading] = useState(false);
  const { usuario } = useUsuario();
  const [showModal, setShowModal] = useState(false);
  const { verificaNotaPortaria, isLoading } = useVerificaNotaFiscalPortaria();
  const [notasLista, setNotasLista] = useState([]);
  const [filtro, setFiltro] = useState({
    nf: null,
    chaveNota: null,
    DataInicial: null,
    DataFinal: null,
  });

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleFetchNotaLeitor = useCallback(async (value) => {
    if (value)
      await verificaNotaPortaria(value, {
        usuario: usuario.email,
        liberadoPor: usuario.email,
      });
    handleFetch();
  }, []);

  const handleClear = (e) => {
    e.preventDefault();
    e.target.reset();
    setFiltro({
      nf: null,
      chaveNota: null,
      DataInicial: null,
      DataFinal: null,
    });
  };

  const handleFetch = useCallback(() => {
    setRemoveLoading(true);
    consultarNfe(filtro)
      .then((retorno) => {
        setNotasLista(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro',
          description: 'Erro ao carregar as informações',
        });
      })
      .finally(() => setRemoveLoading(true));
  }, [filtro]);

  useEffect(() => {
    handleFetch();
  }, [filtro]);

  return (
    <Box sx={{ marginX: 2 }}>
      <Typography
        variant="h5"
        textAlign={'center'}
        sx={{
          background: '#000',
          color: '#fff',
          position: 'sticky',
          top: 0,
          width: '100%',
          zIndex: 4,
        }}
      >
        Saída de Notas pela Portaria
      </Typography>
      <MuiModal open={showModal} onClose={handleShowModal}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Registrar Nota Fiscal
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleShowModal();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
        </Box>
      </MuiModal>
      <form onSubmit={handleClear}>
        <Grid container sx={{ p: 1, pb: 0, mb: 1 }} columnSpacing={1}>
          <Grid item xs={6} sm={6} md={1.7}>
            <FormControl
              variant="filled"
              size="small"
              fullWidth
              sx={{ background: '#fff', borderRadius: 2 }}
            >
              <TextField
                type="text"
                label="Número Nota Fiscal"
                size="small"
                name="nf"
                onChange={(e) =>
                  setFiltro({
                    ...filtro,
                    nf: e.target.value,
                  })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} md={3.5}>
            <FormControl
              variant="filled"
              size="medium"
              fullWidth
              sx={{ background: '#fff', borderRadius: 2 }}
            >
              <TextField
                type="text"
                label="Chave da Nota"
                size="small"
                name="chaveNota"
                onChange={(e) =>
                  setFiltro({
                    ...filtro,
                    chaveNota: e.target.value,
                  })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} md={1.7}>
            <FormControl
              variant="filled"
              size="small"
              fullWidth
              sx={{ background: '#fff', borderRadius: 2 }}
            >
              <TextField
                type="date"
                size="small"
                name="DataInicial"
                onChange={(e) =>
                  setFiltro({
                    ...filtro,
                    DataInicial: e.target.value,
                  })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} md={1.7}>
            <FormControl
              variant="filled"
              size="small"
              fullWidth
              sx={{ background: '#fff', borderRadius: 2 }}
            >
              <TextField
                type="date"
                size="small"
                name="DataInicial"
                onChange={(e) =>
                  setFiltro({
                    ...filtro,
                    DataFinal: e.target.value,
                  })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={6} md={1.7}>
            <FormControl variant="filled" size="medium">
              <Button
                variant="contained"
                color="error"
                type="submit"
                className="w-100"
              >
                <Delete />
                Clear
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </form>
      <Box
        sx={{
          width: '100%',
          overflow: 'scroll',
          flexGrow: '3',
        }}
      >
        <NotasSaidaTabela nfLista={notasLista} />
      </Box>
    </Box>
  );
}
