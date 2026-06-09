import * as React from 'react';
import {
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import useUsuarioLocal from '../../../../hooks/usuarioLocal.hook';
import { useToast } from '../../../../hooks/toast.hook';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: '50vh',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '16px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};

const bancos = [
  { label: 'Banco do Brasil', value: 'Banco do Brasil' },
  { label: 'Bradesco', value: 'Bradesco' },
  { label: 'Itau', value: 'Itau' },
  { label: 'Santander', value: 'Santander' },
  { label: 'Caixa Econômica', value: 'Caixa Econômica' },
  { label: 'Unibanco', value: 'Unibanco' },
  { label: 'Nubank', value: 'Nubank' },
  { label: 'Banco Inter', value: 'Banco Inter' },
  { label: 'Banco Original', value: 'Banco Original' },
  { label: 'Sofisa', value: 'Sofisa' },
];
export const ModalIncluirBanco = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { addToast } = useToast();
  const { email } = useUsuarioLocal();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        fullWidth
        variant="outlined"
        color="inherit"
        size="large"
      >
        Incluir Banco
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
              Incluir Banco
            </Typography>

            <Button type="reset" onClick={handleClose} variant="text">
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <TextField
              shrink
              size="small"
              label="Banco"
              placeholder="Nome do Banco"
              type="text"
              fullWidth
              sx={{
                backgroundColor: '#fff',
                display: 'flex',
                width: '350px',
              }}
            />

            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Incluir
            </Button>
          </Box>
          <Box
            sx={{
              borderTop: '1px solid #333333',
              marginTop: '24px',
              paddingTop: '24px',
            }}
          >
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#333333',
                mb: '16px',
              }}
            >
              Bancos Cadastrados:
            </Typography>
            <Box
              sx={{
                maxHeight: '200px',
                overflowY: 'auto',
                paddingRight: '8px',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              {bancos.map((banco) => (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                  }}
                >
                  <Typography sx={{ fontSize: '12px', fontWeight: 'bold' }}>
                    {banco.label}
                  </Typography>
                  <IconButton variant="text" color="error">
                    <DeleteOutlineIcon color="action" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
