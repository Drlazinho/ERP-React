import React from 'react';
import { useState } from 'react';
import {
  FormLabel,
  TextField,
  Box,
  Button,
  Typography,
  Modal,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  ButtonCancel,
  ButtonRegister,
} from '@/components/ButtonAmvox/ButtonsAmvox';
import { useFetchMotivo } from '../hooks/useFetchMotivo';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: ' auto',
  height: '250px',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '16px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  p: 4,
  '@media (max-width: 550px)': {
    width: '90%',
  },
};

const ModalMotivo = () => {
  const [open, setOpen] = useState(false);
  const [motivoInput, setMotivoInput] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setMotivoInput('');
  };
  const { fetchData, loading } = useFetchMotivo();

  const handleSubmit = async () => {
    await fetchData(motivoInput);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        color="#fff"
        onClick={handleOpen}
        sx={{ color: '#AA0000' }}
      >
        Registrar novo motivo
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Registrar de motivo
            </Typography>

            <Button type="reset" onClick={handleClose} variant="text">
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box>
            <FormLabel
              sx={{ color: '#333333', fontSize: '12px', fontWeight: '500' }}
            >
              Motivo de parada
            </FormLabel>
            <TextField
              placeholder="Ex: Queda de energia"
              variant="outlined"
              size="small"
              fullWidth
              name="motivo"
              value={motivoInput}
              onChange={(e) => setMotivoInput(e.target.value)}
            />
          </Box>
          <Box
            sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 2 }}
          >
            <ButtonCancel
              onClick={handleClose}
              variant="contained"
              color="inherit"
            />
            <ButtonRegister
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#AA0000',
                width: '300px',
              }}
              disabled={!motivoInput || loading}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalMotivo;
