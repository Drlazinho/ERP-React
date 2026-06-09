import { useState } from "react";
import ButtonCloseModal from "@/components/ButtonCloseModal";
import { Box, TextField, Typography, Modal, FormControl, Button } from "@mui/material";
import { Delete, Loupe, Send } from "@mui/icons-material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '50%',
    // height: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    display: 'flex',
    flexDirection: 'column',
    p: 4,
    width:'800px',
    height:'500px'
};

const invEquipamentoInicial = {
    tipo: '',
    marca: '',
    patrimonio: 0,
    descricao: '',
}

export default function ModalRegistrarInvEquipamento({ open, onClose, handleSubmit }) {
    const [formData, setFormData] = useState(invEquipamentoInicial)

    const cancelFormData = () => {
        setFormData(invEquipamentoInicial)
        onClose();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmitFormData = (e) => {
        handleSubmit(formData);
        setFormData(invEquipamentoInicial)
        onClose();
        e.preventDefault(); // Isso previne o recarregamento da página
                
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
                <Typography variant='h5' sx={{ textAlign: 'center', color: '#000' }}>Registrar Equipamento</Typography>
                <form>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, my: 2, justifyContent: 'center' }}>
                        <FormControl variant="filled" sx={{ width: '690px' }}>
                            <TextField
                                variant="filled"
                                id="outlined-multiline-static"
                                label="Tipo"
                                name='tipo'
                                rows={3}
                                required
                                value={formData.tipo}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, my: 2, justifyContent: 'center'  }}>
                        <FormControl variant="filled" sx={{ width: '690px' }}>
                            <TextField
                                variant="filled"
                                id="outlined-multiline-static"
                                label="Marca"
                                name='marca'
                                rows={3}
                                required
                                value={formData.marca}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, my: 2, justifyContent: 'center' }}>
                        <FormControl variant="filled" sx={{ width: '690px' }}>
                            <TextField
                                variant="filled"
                                id="outlined-multiline-static"
                                label="Patrimonio"
                                name='patrimonio'
                                rows={3}
                                required
                                value={formData.patrimonio}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, my: 2, justifyContent: 'center' }}>
                        <FormControl variant="filled" sx={{ width: '690px' }}>
                            <TextField
                                variant="filled"
                                id="outlined-multiline-static"
                                label="Descrição"
                                name='descricao'
                                rows={3}
                                required
                                multiline
                                value={formData.descricao}
                                onChange={handleChange}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ display: 'flex', marginBottom: 2 }}>
                            <Button size='large' variant='contained' color='success' type='submit' endIcon={<Send />} onClick={handleSubmitFormData}>Adicionar Equipamento</Button>
                        </Box>
                        <Box sx={{ display: 'flex', marginBottom: 2, marginLeft: 32 }}>
                        <Button size='large' variant="outlined" color='error' startIcon={<Delete />} onClick={cancelFormData} type='reset'>Cancelar</Button>
                        </Box>
                    </Box>
                </form>
            </Box>

           
        </Modal>
    )
}