import React, { useEffect, useState } from 'react';
import ButtonCloseModal from '@/components/ButtonCloseModal';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Modal,
    TextField,
    Typography,
} from '@mui/material';

import { IMaskInput } from 'react-imask';
import LabelInput from '@/components/Forms/LabelInput';
import { Add, ExitToApp } from '@mui/icons-material';
import { useToast } from '@/hooks/toast.hook';
import { NotaFiscalImagemPedidoPost } from '@/services/notasFiscaisImagem.service';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    height: 600,
    bgcolor: '#fff',
    p: 4,
};

const initialState = {
    numeroPedido: '',
    arquivo: '',
};

export function ModalRegistro({ handleSubmitPedido, numeroPedido, disabled }) {
    const [formData, setFormData] = useState(initialState);
    const { addToast } = useToast()
    const [open, setOpen] = useState(false);

    const handleOpen = (value) => {
        setOpen(true);
        setFormData({
            numeroPedido: value,
            arquivo: ''
        })
    };

    const handleClose = () => {
        setFormData(initialState);
        setOpen(false);
    };

    const handleAddPedido = (value) => {
        handleSubmitPedido(value);
        handleClose();
    };

    return (

        <div>
            <Button onClick={() => handleOpen(numeroPedido)} variant="contained" startIcon={<Add />} disabled={disabled}>
                Anexar 
            </Button>
            <Modal
                open={open}
                handleClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box component={'form'} sx={{ ...style, width: 800, height: 300 }}>
                    <ButtonCloseModal onClick={handleClose} />
                    <Typography
                        variant="h6"
                        component={'p'}
                        textAlign={'center'}
                        color={'#000'}
                    >
                        Anexar Cubagem
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, }}>
                        <FormControl
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start',
                                flex: 8,
                            }}
                        >
                            <FormLabel> Número do Pedido</FormLabel>
                            <TextField
                                variant="filled"
                                size="small"
                                fullWidth
                                value={formData.numeroPedido}
                                sx={{ bgcolor: '#fff', borderRadius: 2 }}
                                disabled
                            />

                        </FormControl>
                        <FormControl
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'start',
                                flex: 2,
                            }}
                        >
                            <FormLabel>Anexo</FormLabel>
                            <LabelInput
                                htmlFor="formFile"
                                className="form-label"
                                name="anexo"
                                type="file"
                                accept="application/pdf"
                                id="formFile"
                                onChange={(e) => {
                                    setFormData({ ...formData, arquivo: e.target.files[0] });
                                }}
                            />
                        </FormControl>
                        <Box sx={{ display: 'flex', justifyContent: 'end', my: 2, gap: 2 }}>
                            <Button
                                type="reset"
                                variant="contained"
                                color="primary"
                                startIcon={<Add />}
                                size="small"
                                onClick={() => handleAddPedido(formData)}
                            >
                                Registrar
                            </Button>
                            <Button
                                variant="contained"
                                color="warning"
                                size="small"
                                endIcon={<ExitToApp />}
                                onClick={handleClose}
                            >
                                Cancelar/Fechar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

