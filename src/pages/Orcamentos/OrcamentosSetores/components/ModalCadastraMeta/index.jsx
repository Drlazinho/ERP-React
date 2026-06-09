import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SpeedIcon from '@mui/icons-material/Speed';
import {
  IconButton,
  MenuItem,
  TextField,
  FormLabel,
  Modal,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

import { CadastrarMeta } from '../../orcamentoSetores.service';
import { useToast } from '@/hooks/toast.hook';
import { set } from 'date-fns';

const style = {
  position: 'absolute',
  flexDirection: 'column',
  display: 'flex',
  top: '45%',
  left: '50%',
  maxWidth: '90%',
  maxHeight: '80%',
  overflowY: 'auto',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '16px',
  p: '40px',
};

const ModalCadastraMeta = ({ anoMeta, onUpdate }) => {
  const [open, setOpen] = React.useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const handleOpen = () => {
    setOpen(true);
    setHasError(false);
  };
  const handleClose = () => {
    setOpen(false);
    setHasError(false);
  };

  const handleModalClickOutside = () => {
    setHasError(true);
  };

  const [formData, setFormData] = useState({
    ano: anoMeta,
    metaFaturamentoAnual: '',
  });

  const isFormvalid = () => {
    return formData.metaFaturamentoAnual !== '';
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ano: anoMeta }));
  }, [anoMeta]);

  const handleClear = () => {
    setFormData({
      metaFaturamentoAnual: '',
    });
  };

  const handleSubmit = useCallback(async () => {
    const parseCurrency = (value) =>
      Number(
        value.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
      );
    setIsLoading(true);

    try {
      const params = {
        ano: formData.ano,
        metaFaturamentoAnual: parseCurrency(formData.metaFaturamentoAnual),
      };
      await CadastrarMeta(params);
      handleClose();
      handleClear();
      onUpdate();

      addToast({
        type: 'success',
        title: 'Meta cadastrada com sucesso',
        description: 'Meta cadastrada com sucesso',
      });
    } catch (error) {
      let errorMessage = 'Erro ao editar meta';

      if (error.response && error.response.data) {
        if (typeof error.response.data === 'object') {
          errorMessage =
            JSON.stringify(error.response.data) ||
            error.message ||
            error.response.data.title;
        } else {
          errorMessage = error.response.data;
        }
      }

      addToast({
        type: 'danger',
        title: 'Erro',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData, onUpdate]);

  return (
    <div>
      <Button
        size="medium"
        onClick={handleOpen}
        variant="contained"
        color="primary"
        startIcon={<SpeedIcon />}
      >
        Cadastrar Meta
      </Button>
      <Modal open={open} onClose={handleModalClickOutside}>
        <Box sx={{ ...style, border: hasError ? '2px solid red' : 'none' }}>
          <Box
            sx={{
              display: 'flex',
              height: '40px',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography
              id="modal-modal-title"
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '20px',
                color: '#333',
              }}
            >
              Cadastrar Meta
            </Typography>
            <IconButton
              onClick={() => {
                handleClose();
                handleClear();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Ano"
              variant="outlined"
              value={formData.ano}
              disabled
              sx={{
                backgroundColor: '#fff',
                display: 'flex',
                width: '100%',
                '& .MuiInputBase-root': {
                  height: '48px',
                  borderRadius: '8px',
                  '&:focus-within': {
                    border: '1px solid lightgray',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Meta Anual "
              variant="outlined"
              valueIsNumericString
              value={formData.metaFaturamentoAnual}
              sx={{
                backgroundColor: '#fff',
                display: 'flex',
                width: '100%',
                '& .MuiInputBase-root': {
                  height: '48px',
                  borderRadius: '8px',
                  '&:focus-within': {
                    border: '1px solid lightgray',
                  },
                },
              }}
              onChange={(e) => {
                let inputValue = e.target.value;
                const numericValue = inputValue
                  .replace(/[^\d,]/g, '')
                  .replace(',', '');
                const sizeSlice = numericValue.length - 2;
                const formattedValue =
                  numericValue.length > 2
                    ? `R$ ${[
                        numericValue
                          .slice(0, sizeSlice)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                        numericValue.slice(sizeSlice),
                      ].join(',')}`
                    : `R$ ${numericValue}`;
                setFormData({
                  ...formData,
                  metaFaturamentoAnual: formattedValue,
                });
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="error"
                startIcon={<AddIcon />}
                disabled={!isFormvalid() || isLoading}
                onClick={() => {
                  handleSubmit();
                }}
              >
                {isLoading ? 'Cadastrando...' : 'Cadastrar'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCadastraMeta;
