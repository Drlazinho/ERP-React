import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import ButtonCloseModal from '@/components/ButtonCloseModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function ModalGerenciamento({ CriarParametrizacaoPage }) {
  const titleName = 'Registrar Page';
  const [open, setOpen] = useState(false);
  const [novaDescricaoCard, setnovaDescricaoCard] = useState({
    descricao: '',
    idprocess: 'string',
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRegister = () => {
    CriarParametrizacaoPage(novaDescricaoCard);
    handleClose();
  };
  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        {titleName}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <ButtonCloseModal onClick={handleClose} />

          <TextField
            id="standard-basic"
            label="Valor"
            variant="standard"
            value={novaDescricaoCard.descricao}
            onChange={(e) =>
              setnovaDescricaoCard({
                descricao: e.target.value,
                idprocess: 'string',
              })
            }
          />
          <Button
            variant="contained"
            color="success"
            className="mt-2"
            onClick={() => {
              handleRegister(), handleClose();
            }}
          >
            Registrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
