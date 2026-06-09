import React, { useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import useUsuarioLocal from '../../../hooks/usuarioLocal.hook';
import { ExitToApp } from '@mui/icons-material';
const styleChildren = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 380,
    height: 270,
    bgcolor: '#fff',
    p: 4,
};
export default function AtualizarNotaIndividualModal2({ listaStatus, data, handleClose, open, idNota, idDetalhe, submit }) {
    const { id } = useUsuarioLocal()
    const [formData, setFormData] = useState({});

    const inputTextHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSelectChangeStatus = (selectedOption) => {
        setFormData({
            ...formData,
            id_status: selectedOption.target.value,
            id: idDetalhe,
            id_nota: idNota,
            id_user: id,
        }
        );
    };


    const handleSubmitForm = (body) => {
        submit(body);
        setFormData([]);
        handleClose();
    }

    return (
        <Modal open={open}
            onClose={handleClose}
        >
            <Box sx={{ ...styleChildren }}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                        defaultValue=""
                        size="small"
                        labelId="status"
                        name='status'
                        onChange={handleSelectChangeStatus}
                    >
                        {listaStatus?.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    id="outlined-multiline-static"
                    label="Observação"
                    multiline
                    fullWidth
                    name="observacao"
                    rows={2}
                    value={formData.OBSERVACAO}
                    onChange={inputTextHandler}
                />
                <Box sx={{ display: 'flex', justifyContent: 'end', my: 2, gap: 2 }}>
                    <Button type="reset" variant='contained' color='primary' size='small' onClick={() => handleSubmitForm(formData)}>
                        Atualizar/Salvar
                    </Button>
                    <Button variant='contained' color='warning' size='small' endIcon={<ExitToApp />} onClick={handleClose}>
                        Cancelar/Fechar
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}
