import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ButtonCloseModal from "../../../../components/ButtonCloseModal";
import { setorSelect } from "../../../../repositories/setor";
import { Delete, Send } from "@mui/icons-material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '50%',
    height: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column',
    p: 4,
};

const invEquipamentoColaboradorInicial = {
    idEquipamento: 0,
    idColaborador: 0,
    idSetor: 0,
    observacao: '',
}


export default function ModalRegistrarMovEquipamento({ open, onClose, idEquipamento, listaColaborador, handleSubmit }) {
    const [formData, setFormData] = useState(invEquipamentoColaboradorInicial);

    const cancelFormData = () => {
        setFormData(invEquipamentoColaboradorInicial)
        onClose();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            idEquipamento: idEquipamento.id
        }
        
        ));
        

    };

    const handleSubmitFormData = (e) => {
        handleSubmit(formData);
        setFormData(invEquipamentoColaboradorInicial)
        onClose();
    }
    return (
        <Modal
            open={open}
             
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <ButtonCloseModal onClick={cancelFormData} />
                <Typography variant='h5' sx={{ textAlign: 'center', color: '#000' }}>Registrar Movimentação</Typography>

                <Typography variant='h6' sx={{ textAlign: 'center', color: '#000', gap: 2, my: 2 }}>{ idEquipamento.tipo } { idEquipamento.marca }</Typography>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                         
                            <Typography variant='body1' sx={{ textAlign: 'center' }}> Colaborador</Typography>
                            <FormControl >
                                <Select
                                    style={{width:'400px'}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='idColaborador'
                                    value={formData.idColaborador}
                                    onChange={handleChange}
                                >
                                    {
                                        listaColaborador.map((item, index) => (
                                            <MenuItem key={index} value={item.id}>{item.nome}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                
                        
                            <Typography variant='body1' sx={{ textAlign: 'center' }}> Setor</Typography>
                            <FormControl  >
                                <Select
                                 style={{width:'400px'}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='idSetor'
                                    value={formData.idSetor}
                                    onChange={handleChange}
                                >
                                    {
                                        setorSelect.map((item, index) => (
                                            <MenuItem key={index} value={item.valor}>{item.nome}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                  
                        
                            <Typography variant='body1' sx={{ textAlign: 'center' }}> Observação</Typography>
                            <FormControl >
                                <TextField
                                 style={{width:'400px'}}
                                variant="filled"
                                id="outlined-multiline-static"
                                label="Observacao"
                                name='observacao'
                                rows={4}
                                value={formData.observacao}
                                onChange={handleChange}
                            />
                            </FormControl>
                        
                    </Box>
                  
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt:2 }}>
                        
                            <Button   variant='contained' color='success' type='submit' endIcon={<Send />} onClick={handleSubmitFormData}>Registrar Movimentação</Button>
                     
                       
                        <Button  className="ms-2" variant="outlined" color='error' startIcon={<Delete />} onClick={cancelFormData} type='reset'>Cancelar</Button>
                       
                    </Box>
                </form>
            </Box>
        </Modal> 
    )
}
