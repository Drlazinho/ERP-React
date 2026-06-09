import React from 'react';
import { useState, useCallback, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
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

import { AtualizarMeta } from '../../orcamentoSetores.service';
import { useToast } from '@/hooks/toast.hook';

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

const ModalAtualizarMeta = ({ anoMeta, faturamento, idMeta, onUpdate }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    ano: anoMeta,
    metaFaturamentoAnual: faturamento,
  });

  const isFormvalid = () => {
    return formData.metaFaturamentoAnual !== '';
  };

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ano: anoMeta }));
  }, [anoMeta]);

  const handleAtualizar = useCallback(async () => {
    setIsLoading(true);

    try {
      const params = {
        idMeta: idMeta,
        ano: anoMeta,
        metaFaturamentoAnual: formData.metaFaturamentoAnual,
        deletado: '',
      };

      await AtualizarMeta(params);

      onUpdate();
      handleClose();

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
        variant="outlined"
        color="inherit"
        startIcon={<EditIcon />}
      >
        Atualizar Meta
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
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
              Atualizar Meta
            </Typography>
            <IconButton
              onClick={() => {
                handleClose();
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
              value={
                formData.metaFaturamentoAnual !== undefined
                  ? new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(parseFloat(formData.metaFaturamentoAnual || 0))
                  : ''
              }
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

                const numericValue = inputValue.replace(/[^\d]/g, '');

                const parsedValue = numericValue
                  ? parseFloat(numericValue) / 100
                  : 0;
                setFormData({
                  ...formData,
                  metaFaturamentoAnual: parsedValue,
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
                  handleAtualizar();
                }}
              >
                {isLoading ? 'Atualizando...' : 'Atualizar'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalAtualizarMeta;
