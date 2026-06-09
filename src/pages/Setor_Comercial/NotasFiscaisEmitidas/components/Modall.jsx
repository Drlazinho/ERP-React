
import { Box, Modal, Typography, Button, FormControl, InputLabel, Select, TextField, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import ButtonCloseModal from '@/components/ButtonCloseModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '50%',
  height: '50%',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialCadastro = {

  nota: '',
  separado: 0,
  filial_Separad: '',
  endLoc_Separad: '',
}


export default function ModalChange({ open, onClose, nfSelecionada, handleSubmit }) {
  const [formData, setFormData] = useState(initialCadastro);

  useEffect(() => {
    setFormData((prevData) => ({
      nota: nfSelecionada?.nf,
      separado: nfSelecionada?.separado,
      filial_Separad: nfSelecionada?.filial_Separad,
      endLoc_Separad: nfSelecionada?.endLoc_Separad,
    }));
  }, [nfSelecionada])
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      
    }));
  };
  
  const cancelFormData = () => {
    onClose();
  }

 const handleSubmitFormData = (e) => {
    handleSubmit(formData);
    setFormData(initialCadastro);
    onClose();
    e.preventDefault();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ButtonCloseModal onClick={cancelFormData} />
        <Typography variant='h6' sx={{ textAlign: 'center', color: '#000' }}>Nota Fiscal: </Typography>
        <Typography variant='h6' sx={{ textAlign: 'center', color: '#000' }}>{nfSelecionada?.nf}</Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="demo-simple-select-label">Separado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={nfSelecionada?.separado}
            label="Separado"
            name='separado'
            onChange={handleChange}
          >
            <MenuItem value={0}>Não</MenuItem>
            <MenuItem value={1}>Sim</MenuItem>

          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }} size='small'>
              <InputLabel id="demo-simple-select-label">Filial</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={nfSelecionada?.filial_Separad}
                label="filial"
                name='filial_Separad'
                onChange={handleChange}
              >
                <MenuItem value={null}></MenuItem>
                <MenuItem value={'010101'}>010101</MenuItem>
                <MenuItem value={'010102'}>010102</MenuItem>
                <MenuItem value={'010103'}>010103</MenuItem>
              </Select>
            </FormControl>

        <TextField sx={{ mb: 2 }} label="Localização: " variant="outlined" fullWidth name='endLoc_Separad' focused onChange={handleChange} defaultValue={nfSelecionada?.endLoc_Separad} />
        <Button sx={{ mr: 2 }} variant="contained" color="success" onClick={handleSubmitFormData}>
          {nfSelecionada?.endLoc_Separad === null ? "Salvar" : "Atualizar"}
        </Button>
        <Button variant="contained" color="error" onClick={cancelFormData}>
          CANCELAR/FECHAR
        </Button>
      </Box>

    </Modal>
  )
}
