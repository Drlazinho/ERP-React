import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, TextField } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { postNF } from '@/pages/Setor_Transportes/AgendamentoCarga/agendamentoCarga.service';
import { useToast } from '@/hooks/toast.hook';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

const style = {
  position: 'absolute',
  top: 50,
  left: '50%',
  transform: 'translateX(-50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '8px',
  p: 4,
  maxWidth: '80%',
  width: '800px',
};

export default function LeitorNF() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { addToast } = useToast();

  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    if (value.length == 44) {
      handleSearch();
    }
  }, [value]);

  const handleSearch = async () => {
    setIsLoading(true);

    const item = {
      chaveNf: value,
    };

    try {
      const response = await postNF(item);
      addToast({
        type: 'success',
        title: 'Chave NF Confirmada',
        description: 'Chave NF enviada com sucesso!',
      });
      setValue('');
    } catch (error) {
      console.error('Erro ao enviar chave NF:', error);
      addToast({
        type: 'error',
        title: 'Erro',
        description: 'Ocorreu um erro ao enviar a requisição',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="text"
        sx={{
          fontWeight: 'bold',
          fontFamily: 'Poppins, sans-serif',
          color: 'black',
          marginRight: '10px',
          '&:hover': {
            color: '#FFF',
            bgcolor: '#A00',
          },
        }}
        onClick={handleOpen}
        startIcon={<QrCodeScannerIcon />}
      >
        Leitor NF
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Nota Fiscal
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 2,
                width: '100%',
              }}
            >
              <TextField
                variant="outlined"
                fullWidth
                value={value}
                onChange={handleChange}
                label="Chave NF"
              />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
