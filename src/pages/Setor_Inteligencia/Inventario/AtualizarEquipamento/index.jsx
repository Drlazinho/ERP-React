import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Typography,
 } from '@mui/material';
import ButtonCloseModal from '@/components/ButtonCloseModal';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '55%',
  height: '55%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  p: 4,
};

const invEquipamentoInicial = {
  id: 0,
  idEquipamentoStatus: 0,
  tipo: '',
  marca: '',
  patrimonio: '',
  descricao: '',
};

export default function ModalAtualizarEquipamento({
  open,
  onClose,
  listaStatus,
  dadosEquipamento,
  handleSubmit,
}) {
  // const [formData, setFormData] = useState({
  //   id: dadosEquipamento.id,
  //   status: dadosEquipamento.status,
  //   tipo: dadosEquipamento.tipo,
  //   marca: dadosEquipamento.marca,
  //   patrimonio: dadosEquipamento.patrimonio,
  //   descricao: dadosEquipamento.descricao,
  // });

  const [formData, setFormData] = useState({});

useEffect(() => {
  if(dadosEquipamento){  
    setFormData({
      id: dadosEquipamento.id,
     idEquipamentoStatus: dadosEquipamento.status,
     tipo: dadosEquipamento.tipo,
     marca: dadosEquipamento.marca,
     patrimonio: dadosEquipamento.patrimonio,
     descricao: dadosEquipamento.descricao,
    });
  }
}, [dadosEquipamento]);

  const cancelFormData = () => {
    setFormData(invEquipamentoInicial);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleSubmitFormData = () => {
    handleSubmit(formData);
    cancelFormData();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/* <ButtonCloseModal onClick={cancelFormData} /> */}
        <Typography variant="h5" sx={{ textAlign: 'center', color: '#000' }}>
          Atualizar Equipamento
        </Typography>
         <form className="d-flex justify-content-center">
          <Box sx={{ bgcolor: 'danger', width: '500px', gap: 2, my: 2 }}>
            <FormControl sx={{ width: '504px'}}>
              <Select
                size="small"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="idEquipamentoStatus"
                onChange={handleChange}
              >
                {listaStatus.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.descricao}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box className="d-inline">
              <TextField
                onChange={handleChange}
                fullWidth
                name='descricao'
                id="descricao"
                label="Descrição"
                variant="standard"
                defaultValue={formData?.descricao}
              />
              <TextField
                onChange={handleChange}
                fullWidth
                name='marca'
                id="marca"
                label="Marca"
                variant="standard"
                defaultValue={formData?.marca}
              />
              <TextField
                onChange={handleChange}
                fullWidth
                name='tipo'
                id="tipo"
                label="Tipo"
                variant="standard"
                defaultValue={formData?.tipo}
              />
              <TextField
                fullWidth
                name='patrimonio'
                id="patrimonio"
                label="Patrimônio"
                variant="standard"
                defaultValue={formData?.patrimonio}
                onChange={handleChange}
              />
            </Box>
            <div className="d-flex w-100 justify-content-center p-2">
              <Button
                disabled={false}
                className="me-2"
                variant="contained"
                onClick={handleSubmitFormData}
              >
                Editar
              </Button>
              <Button variant="contained" color="error" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
