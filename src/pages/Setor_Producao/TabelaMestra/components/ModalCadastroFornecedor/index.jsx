import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import { FormLabel, TextField } from '@mui/material';
import { useState } from 'react';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import { CadastrarFornecedorChina } from '../../tabelaMestra.service';
import { useToast } from '../../../../../hooks/toast.hook';

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
  gap: '16px',
};

const interfacePost = {
  nome: '',
  cidade: '',
  pais: '',
  email: '',
  responsavel: '',
};

export default function ModalCadastroFornecedor() {
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(interfacePost);
  const { nome } = useUsuarioLocal();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { addToast } = useToast();

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, responsavel: nome });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await CadastrarFornecedorChina(formData);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Fornecedor cadastrado com sucesso',
      });
      setOpen(false);
      setFormData(interfacePost);
    } catch (error) {
      console.error('Erro ao cadastrar fornecedor:', error);
      addToast({
        type: 'danger',
        title: 'Erro',
        description: error.response.data.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        startIcon={<AddIcon />}
        variant="contained"
        size="large"
      >
        {' '}
        Fornecedor
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" id="modal-modal-title" gutterBottom>
            Novo Fornecedor
          </Typography>
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Box>
              {' '}
              <FormLabel>Nome</FormLabel>
              <TextField
                fullWidth
                name="nome"
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
                inputProps={{
                  style: { height: '48px', width: '100%' },
                }}
                onChange={inputTextHandler}
              />
            </Box>
            <Box>
              <FormLabel>Cidade</FormLabel>
              <TextField
                fullWidth
                name="cidade"
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
                inputProps={{
                  style: { height: '48px', width: '100%' },
                }}
                onChange={inputTextHandler}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Box>
              {' '}
              <FormLabel>País</FormLabel>
              <TextField
                fullWidth
                name="pais"
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
                inputProps={{
                  style: { height: '48px', width: '100%' },
                }}
                onChange={inputTextHandler}
              />
            </Box>
            <Box>
              <FormLabel>E-mail</FormLabel>
              <TextField
                fullWidth
                name="email"
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
                inputProps={{
                  style: { height: '48px', width: '100%' },
                }}
                onChange={inputTextHandler}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              sx={{
                bgcolor: isSubmitting ? '#CCC' : '#A00',
                transition:
                  'background-color 0.5s ease, transform 0.3s ease-in-out',
                '&:hover': {
                  bgcolor: !isSubmitting ? '#760000' : '#CCC',
                  transform: !isSubmitting ? 'scale(1.1)' : 'none',
                },
              }}
              onClick={handleSubmit}
              className="cardRegistro"
              variant="contained"
              startIcon={<AddIcon />}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Aguarde...' : 'Registrar'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
