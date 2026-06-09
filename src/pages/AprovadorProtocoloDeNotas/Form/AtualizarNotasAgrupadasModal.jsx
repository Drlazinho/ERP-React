import React, { useEffect, useState } from 'react'
import useUsuarioLocal from '../../../hooks/usuarioLocal.hook'
import Select from 'react-select';
import { Box, Button, Chip, FormControl, FormLabel, InputLabel, MenuItem, Modal, Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    height: 480,
    bgcolor: 'background.paper',
    p: 4,
}

const listaSetores = [
    'FINANCEIRO',
    'FISCAL',
    'APROVADOR'
]

export default function AtualizarNotasAgrupadasModal({ listaDeNotasSelecionada, statusDeProtocolo, handleAtualizarListaDeNotas, handleClose, openModal }) {
    const [listaConfirmarNota, setListaConfirmarNota] = useState([])
    const [submitList, setSubmitLista] = useState([])
    const [status, setStatus] = useState(0)
    const [setor, setSetor] = useState('')

    const { id } = useUsuarioLocal()

    const handleSubmit = () => {
        const notasNaoRepetidas = Array.from(new Set(listaDeNotasSelecionada));
        notasNaoRepetidas.map((item) => {
            setSubmitLista((old) => [...old, {
                id_nota: item.id,
                id_user: id,
                id_status: status,
                setor
            }]); setListaConfirmarNota((old) => [...old, item.nota]);
            return null
        })
    }

    const handleConfirmar = () => {
        handleAtualizarListaDeNotas(submitList)
        setSubmitLista([])
        handleClose()
    }

    const close = () => {
        setSubmitLista([])
        handleClose()
    }


    const listaStatus = statusDeProtocolo.map((item) => ({
        value: item.id,
        label: item.descricao,
    }));

    const handleSelectChangeStatus = (selectedOption) => {
        setStatus(
            selectedOption.value,
        );
    };

    const listaSetorHandle = listaSetores.map((item) => ({
        value: item,
        label: item,
    }));

    const handleSelectChangeSetores = (selectedOption) => {
        setSetor(
            selectedOption.value
        )
    }

    return (
        <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box component={'form'} sx={{ ...style }}>
            <Typography variant='h6' color={'black'} textAlign={'center'} mb={1}>Atualização das Notas</Typography>

                <FormControl fullWidth>
                    <FormLabel>Status das Notas</FormLabel>
                    <Select
                        aria-required
                        options={listaStatus}
                        onChange={handleSelectChangeStatus}
                        required
                    />
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel>Setor</FormLabel>

                    <Select
                        aria-required
                        options={listaSetorHandle}
                        onChange={handleSelectChangeSetores}
                        required
                    />
                </FormControl>
                {listaConfirmarNota.length > 0 && <Typography variant='body1' color={'black'} mt={1}>Confirmar Nota</Typography>}
                <Box sx={{ maxHeight: 200, overflowY: 'scroll', display: 'flex', flexDirection: 'column', gap: 1, py: 1 }}  > {listaConfirmarNota.map((item, index) => (<Chip key={item} label={item} />
                ))} </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: 1 }}>
                    <Button variant='outlined' color='warning' onClick={close}>
                        Cancelar/Fechar
                    </Button>
                    {
                        submitList.length > 0 ? <Button variant='contained' onClick={handleConfirmar}>
                            Confirmar
                        </Button> : <Button variant='contained' onClick={handleSubmit}>
                            Check
                        </Button>
                    }

                </Box>


                {/* <div className="col-12">
                    <label className="form-label">Status</label>
                    <Select
                        aria-required
                        options={listaStatus}
                        onChange={handleSelectChangeStatus}
                        required
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Setor</label>
                    <Select
                        aria-required
                        options={listaSetorHandle}
                        onChange={handleSelectChangeSetores}
                        required
                    />
                </div>

                {listaConfirmarNota.length > 0 && <p>Confirmar Nota</p>}

                <div className='flex-column' style={{ maxHeight: '300px', overflowY: 'auto' }}  > {listaConfirmarNota.map((item, index) => (<div className='flex-column w-100' key={index}> <p className="badge bg-primary text-wrap w-100 p-3" >{item} </p></div>))} </div>
                <div className='col-12'>
                    {
                        submitList.length > 0 ? <Button variant='contained' onClick={handleConfirmar}>
                            Confirmar
                        </Button> : <Button variant='contained' onClick={handleSubmit}>
                            Check
                        </Button>
                    }
                    <Button variant='outlined'>
                        Cancelar
                    </Button>
                </div> */}
            </Box>

        </Modal>)
}
