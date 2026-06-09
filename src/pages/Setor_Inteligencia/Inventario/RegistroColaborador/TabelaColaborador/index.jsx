import { Create } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { atualizarInvColaborador, registrarInvColaborador } from '@/pages/Setor_Inteligencia/Inventario/invEquipamento.service';
 
const style = {
  position: 'absolute',
  display: 'block',
  justifyContent: 'around',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: '400px',
};
 

export default function CardColaborador({
  id = '',
  nome = '',
  matricula = '',
  handlePutInvColaborador,
  colaborador,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const [_Nome, _setNome] = useState(nome);
  const [_matricula, _setMatricula] = useState(matricula);

  const _colaborador = {
    id: id,
    nome: _Nome,  
    matricula: _matricula,  
  };

   const handleUpdateColaborador = async () => {
    try {
       await atualizarInvColaborador(_colaborador);
       handleClose();
     } catch (error) {
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid lightgray',
        p: 3,
        display: 'flex',
        justifyContent: 'space-between',  
      }}
    >
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Typography sx={{ color: '#000' }}>ID: {id}</Typography>
        <Typography sx={{ color: '#000' }}>Nome: {nome}</Typography>
        <Typography sx={{ color: '#000' }}>Matrícula: {matricula}</Typography>
        <Button
          variant="contained"
          color="warning"
          endIcon={<Create />}
          onClick={() => {
            handleOpen();
          }}
        >
          Editar
        </Button>
      </Box>
      <Modal
        variant="rounded"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>{}</p>
          <Box className="block w-100">
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Nome"
              value={_Nome} 
              onChange={(e) => _setNome(e.target.value)} 
              size="small"
            />
            <TextField
              className="mt-3"
              fullWidth
              required
              id="outlined-required"
              label="Matrícula"
              value={_matricula}  
              onChange={(e) => _setMatricula(e.target.value)}  
              size="small"
            />
            <br /> <br />
          </Box>
          <Box className="w-100 d-flex justify-content-around">
            <Button variant="contained" onClick={handleUpdateColaborador}>
              Concluir
            </Button>
            <Button
              size="large"
              variant="contained"
              color="error"
              type="reset"
              onClick={handleClose}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}