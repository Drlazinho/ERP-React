import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material'
import React, { useState } from 'react'
import debounce from '../../../utils/debounce'
import useUsuarioLocal from '../../../hooks/usuarioLocal.hook'
import { useToast } from '../../../hooks/toast.hook'
import { RegistrarProtocolosDeNotaMultiplas } from '../../../services/protocolodenotas/protocolodenotas.service'
import {InputDateAmvox} from '../../../components/InputDateAmvox/InputDateAmvox'

const style = {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 250,
    bgcolor: '#fff',
    p: 4,
}


const initialState = {
    SETOR_ORIGEM: '',
    ID_USER: 0,
    ID_APROV: 0,
    ID_SITUACAO: 0,
    ID_TIPO: 0,
    DATA_VENCIMENTO: null,
}

export default function ConcluirRegistroNotaModal({ setores, listaDeNotas, tipoDeNota, closeModalCadastroPart1 }) {
    const [formData, setFormData] = useState(initialState)
    const { id } = useUsuarioLocal()
    const { addToast } = useToast()

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setFormData(initialState)
        setOpen(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            ID_USER: id,
        }))
    }

    const RegistrarProtocoloDeNota = (listaDeNotas, listaComplementar) => {
        let newArr = []

        listaDeNotas.map((item) => {
            newArr.push({
                NOTA: item.NOTA,
                OBSERVACAO: item.OBSERVACAO,
                ANEXO: item.ANEXO,
                DATA_VENCIMENTO: listaComplementar.DATA_VENCIMENTO,
                SETOR_ORIGEM: listaComplementar.SETOR_ORIGEM,
                ID_USER: listaComplementar.ID_USER,
                ID_TIPO: listaComplementar.ID_TIPO,
                ID_SITUACAO: listaComplementar.ID_SITUACAO,
            })
        })

        const formData = new FormData()
        newArr.forEach((element, i) => {
            formData.append(`[${i}].DATA_VENCIMENTO`, element.DATA_VENCIMENTO)
            formData.append(`[${i}].NOTA`, element.NOTA)
            formData.append(`[${i}].SETOR_ORIGEM`, element.SETOR_ORIGEM)
            formData.append(`[${i}].ANEXO`, element.ANEXO)
            formData.append(`[${i}].ID_USER`, element.ID_USER)
            formData.append(`[${i}].ID_SITUACAO`, element.ID_SITUACAO)
            formData.append(`[${i}].ID_TIPO`, element.ID_TIPO)
            formData.append(`[${i}].OBSERVACAO`, element.OBSERVACAO)
        })


        RegistrarProtocolosDeNotaMultiplas(formData).catch((err) => {
            addToast({
                type: 'danger',
                title: 'Erro ao Registrar',
            })
        }).finally(() => {
            handleClose()
            closeModalCadastroPart1()
        })
    }

    return (
        <>
            <Button onClick={handleOpen} variant='contained'>Concluir Registro</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style }}>
                    <Typography variant='h6' component={'p'} textAlign={'center'} color={'#000'}>Concluir Registro</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="SETOR_ORIGEM">
                                Setor
                            </InputLabel>
                            <Select
                                defaultValue=""
                                size="small"
                                labelId="SETOR_ORIGEM"
                                name="SETOR_ORIGEM"
                                label="None"
                                onChange={handleChange}
                            >
                                {setores?.map((item) => (
                                    <MenuItem key={item.setor} value={item.setor}>
                                        {item.setor}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputDateAmvox
                                label="Data de Vencimento"
                                value={formData.DATA_VENCIMENTO || ""}
                                onChange={(date) => {
                                    setFormData((prev) => ({ ...prev, DATA_VENCIMENTO: date }))
                                }}
                                format="YYYY-MM-DD"
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="ID_SITUACAO">
                                Situação
                            </InputLabel>
                            <Select
                                defaultValue=""
                                size="small"
                                labelId="ID_SITUACAO"
                                name="ID_SITUACAO"
                                onChange={handleChange}
                            >
                                {situacaoSelecionada?.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.situacao}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="ID_TIPO">
                                Tipo
                            </InputLabel>
                            <Select
                                defaultValue=""
                                size="small"
                                labelId="ID_TIPO"
                                name='ID_TIPO'
                                onChange={handleChange}
                            >
                                {tipoDeNota?.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.descricao}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>


                    <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
                        <Button onClick={() => RegistrarProtocoloDeNota(listaDeNotas, formData)} variant='contained'>Concluir</Button>
                        <Button onClick={handleClose} variant='contained'>Cancelar</Button>
                    </Box>
                </Box>
            </Modal>
        </>

    )
}
