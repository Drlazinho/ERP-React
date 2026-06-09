import React, { useEffect, useState } from 'react';
import ButtonCloseModal from '@/components/ButtonCloseModal';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import LabelInput from '@/components/Forms/LabelInput';
import { Add, ExitToApp } from '@mui/icons-material';
import { useToast } from '@/hooks/toast.hook';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 600,
  bgcolor: '#fff',
  p: 4,
};

const initialState = {
  numeroNotaFiscal: '',
  arquivo: '',
};

export default function ModalGuia({
  handleSubmitGuia,
  row,
  numeroNotaFiscal,
  disabled,
}) {
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const { addToast } = useToast();

  const handleOpen = (value) => {
    setOpen(true);
    setFormData({
      NumeroNotaFiscal: value,
      Arquivo: '',
    });
  };

  const handleClose = () => {
    setFormData(initialState);
    setOpen(false);
  };

  return (
    <div>
      <LoadingButton
        onClick={() => handleOpen(numeroNotaFiscal)}
        variant="contained"
        startIcon={<Add style={{ color: 'black' }} />}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid grey',
        }}
      >
        <span className="6px" style={{ color: 'black' }}>
          Guia
        </span>{' '}
      </LoadingButton>
      <Modal
        open={open}
        handleClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box component={'form'} sx={{ ...style, width: 800, height: 300 }}>
          <ButtonCloseModal onClick={handleClose} />
          <Typography
            variant="h6"
            component={'p'}
            textAlign={'center'}
            color={'#000'}
          >
            Anexar Guia
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                flex: 8,
              }}
            >
              <FormLabel> Número da Nota Fiscal</FormLabel>
              <TextField
                variant="filled"
                size="small"
                fullWidth
                defaultValue={numeroNotaFiscal}
                // value={row?.nf}
                sx={{ bgcolor: '#fff', borderRadius: 2 }}
                disabled
              />
            </FormControl>
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                flex: 2,
              }}
            >
              <FormLabel>Anexo</FormLabel>
              <LabelInput
                htmlFor="formFile"
                className="form-label"
                name="anexo"
                type="file"
                accept="application/pdf"
                id="formFile"
                onChange={(e) => {
                  setFormData({ ...formData, Arquivo: e.target.files[0] });
                }}
              />
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'end', my: 2, gap: 2 }}>
              <Button
                type="reset"
                variant="contained"
                color="success"
                startIcon={<Add />}
                size="small"
                onClick={() => {
                  handleSubmitGuia(formData);
                  handleClose();
                }}
              >
                Registrar
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                endIcon={<ExitToApp />}
                onClick={handleClose}
              >
                Cancelar/Fechar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
