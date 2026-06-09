import React from 'react';
import ButtonCloseModal from '../ButtonCloseModal';
import {
  Box,
  Modal,
  Rating,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import { Margin, Padding } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 850,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  height: 374,
};

export default function ModalDetalhesAgendamentoCarga({
  isOpen,
  handleClose,
  numeroNota,
}) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="body2"
            textAlign={'center'}
            fontSize={'25px'}
            component="h2"
            marginTop={'15px'}
            marginBottom={'15px'}
            color="black"
          >
            Detalhes da Carga
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'Wrap',
              paddingLeft: '65px',
              marginLeft: '125px',
              paddingBottom: '20px',
            }}
          >
            <TextField label="chaveNf" placeholder="" size='small'/>
            <TextField label="tpNota" placeholder="" size='small'/>
            <TextField label="solicitante" placeholder="" size='small'/>
            <TextField label="dtRecebLogistica" placeholder="" size='small'/>
            <TextField label="horaReceLogistica" placeholder="" size='small'/>
            <TextField label="descarga" placeholder="" size='small'/>
          </Box>
          
          <TextField label="agendado" placeholder="" size='small'/>
            <TextField label="previsao" placeholder="" size='small'/>
            <TextField label="dataAgenda" placeholder="" size='small'/>
            <TextField label="observacao" placeholder="" size='small'/>
            <TextField label="statusAgenda" placeholder="" size='small'/>
            <TextField label="entregue" placeholder="" size='small'/>
            <TextField label="canhoto" placeholder="" size='small'/>
          <Box>
            <Button variant="contained" color="success" fullWidth>
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
