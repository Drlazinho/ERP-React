import { Box, Button, FormControl, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import { buscarDetalhesNota } from '../../../services/protocoloNotasFiscais.service';
import CardDetalheDaNota from '../components/CardDetalheDaNota';
import Loader from '../../../components/Loader';
import useUsuarioLocal from '../../../hooks/usuarioLocal.hook';
import { ExitToApp } from '@mui/icons-material';
import AtualizarNotaIndividualModal2 from './AtualizarNotaIndividualModal2';

const style = {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 580,
    bgcolor: '#fff',
    p: 4,
};


export default function AtualizarNotaIndividualModal({ openModal, handleClose, handleSubmit, lista, loadingDetalhes, listaStatus, idNota }) {
    const [showModalChildren, setShowModalChildren] = useState(false)
    const [idDetalhe, setIdDetalhe] = useState()

    const handleOpenModal = (id) => {
        if (!showModalChildren){ setIdDetalhe(id)};
        setShowModalChildren(!showModalChildren)
    }

    return (
        <>
            {/* <ChildrenModal /> */}
            <AtualizarNotaIndividualModal2 listaStatus={listaStatus} open={showModalChildren} submit={handleSubmit} handleClose={handleOpenModal} idNota={idNota} idDetalhe={idDetalhe}/>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style }}>
                    <Typography variant='h6' component={'p'} textAlign={'center'} color={'#000'}>Detalhe da Nota</Typography>

                    <Box sx={{ display: 'flex', gap: 1, flexDirection: 'row' }}>
                        {
                            loadingDetalhes &&
                            <Loader />
                        }
                        {
                            lista?.map((item) => (
                                <CardDetalheDaNota key={item.setor} atualizacao={item.data_atualizacao} nota={item.nota} observacao={item.observacao} registro={item.data_registro} setor={item.setor} status={item.status} usuario={item.usuario} openModalUpdate={() => handleOpenModal(item.id)} />

                            ))
                        }
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1, mt: 1 }}>
                        <Button onClick={handleClose} variant='contained' color='error'>Fechar</Button>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}
