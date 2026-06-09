import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal as MuiModal,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
} from '@mui/material';
import { BiSearch } from 'react-icons/bi';
import CloseIcon from '@mui/icons-material/Close';
import { useToast } from '../../hooks/toast.hook';

import LoaderBasico from '../LoaderBasico';
import debounce from '../../utils/debounce';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: ' auto',
  height: 'auto',
  maxHeight: '90vh',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
};

const BarcodeNotaFiscalConfirmacao = ({
  isShow,
  handleClose,
  fn,
  isLoading,
  children,
}) => {
  const [entrega, setEntrega] = useState({ chaveNf: '' });

  const { addToast } = useToast();

  const buscarEntregaHandle = useCallback(
    (chaveNf) => {
      fn(chaveNf)
        .then(() => {
          addToast({
            type: 'success',
            title: 'Nota Fiscal Confirmada',
            description: 'Nota alterada para Expedida.',
          });
        })
        .catch((err) => {
          const error = err.response.data;
          addToast({
            type: 'danger',
            title: 'Erro na requisição',
            description: error,
          });
        })
        .finally(() => setEntrega({ chaveNf: '' }));
    },
    [entrega, fn, addToast]
  );

  return (
    <MuiModal open={isShow} onClose={handleClose}>
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: '24px',
            flexShrink: 0,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontSize: '20px', fontWeight: 'bold', color: '#333333' }}
          >
            Verificação de Nota Fiscal
          </Typography>

          <Button
            type="reset"
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon sx={{ color: '#333333' }} />
          </Button>
        </Box>
        <Box sx={{ flexShrink: 0 }}>
          <p style={{ color: '#333', fontSize: 16, fontWeight: 'bold' }}>
            Faça a leitura da nota com o leitor de código de barras, e aguarde a
            confirmação.
          </p>
          <Box sx={{ display: 'flex', width: '100%', mb: 2 }}>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <FormControl
                style={{ fontSize: 12, fontWeight: 'bold', color: '#333' }}
              >
                Código de Barras da Nota Fiscal
              </FormControl>

              <TextField
                type="text"
                value={entrega.chaveNf}
                onChange={(e) => {
                  debounce(() => buscarEntregaHandle(e.target.value), 1000);
                  setEntrega({ chaveNf: e.target.value });
                }}
                readOnly={isLoading}
              />
            </Box>
            <Button
              variant="outlined"
              onClick={buscarEntregaHandle}
              sx={{
                mt: 2.4,
                borderRadius: '0 10px 10px 0',
                color: '#ccc',
                border: '1px solid #ccc',
                '&:hover': {
                  border: '1px solid #333',
                  color: '#333',
                },
              }}
            >
              {isLoading ? <LoaderBasico /> : <BiSearch size={20} />}
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            maxHeight: '500px',
            pr: '10px',
            mt: '24px',
          }}
        >
          {children}
        </Box>
      </Box>
    </MuiModal>
  );
};

BarcodeNotaFiscalConfirmacao.propTypes = {
  isShow: PropTypes.bool,
  handleClose: PropTypes.func,
  fn: PropTypes.func,
  isLoading: PropTypes.bool,
  children: PropTypes.element,
};

export default BarcodeNotaFiscalConfirmacao;
