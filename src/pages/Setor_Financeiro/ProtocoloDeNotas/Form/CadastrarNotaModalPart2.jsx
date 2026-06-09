import { CircularProgress, Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import debounce from '../../../../utils/debounce'
import useUsuarioLocal from '../../../../hooks/usuarioLocal.hook'
import dayjs from 'dayjs'
import { useToast } from '../../../../hooks/toast.hook'
import { RegistrarProtocolosDeNotaMultiplas } from '../../../../services/protocolodenotas/protocolodenotas.service'
import { getSituacoesNota } from '../../../../services/protocoloNotasFiscais.service'
import LabelTextArea from '../../../../components/Forms/LabelTextArea'
import { Add } from '@mui/icons-material'
import { InputDateAmvox } from '../../../../components/InputDateAmvox/InputDateAmvox'

const style = {
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 350,
    bgcolor: '#fff',
    p: 4,
}

const listaIdAprov = [
    {
        id: 0,
        situacao: "",
    },
]

const initialState = {
    SETOR_ORIGEM: '',
    ID_USER: 0,
    ID_TIPO: 0,
    ID_SITUACAO: 0,
    DATA_VENCIMENTO: null,
    OBSERVACAO: '',

}

export default function ConcluirRegistroNotaModal({ setores, listaDeNotas, tipoDeNota, closeModalCadastroPart1 }) {
    const [formData, setFormData] = useState(initialState)
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const { id } = useUsuarioLocal()
    const { addToast } = useToast()
    const [situacaoSelecionada, setSituacaoSelecionada] = useState(listaIdAprov)
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setFormData(initialState)
        setOpen(false)
    }

    const handleGetSituacoes = () => {
        getSituacoesNota().then((r) => {
            setSituacaoSelecionada(r)
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            ID_USER: id,

        }))
    }

    useEffect(() => {
        handleGetSituacoes()
    }, [])

    const RegistrarProtocoloDeNota = (listaDeNotas, listaComplementar) => {
        let newArr = []
        setIsButtonDisabled(true)
        listaDeNotas.map((item) => {
            newArr.push({
                NOTA: item.NOTA,
                ANEXO: item.ANEXO,
                DATA_VENCIMENTO: listaComplementar.DATA_VENCIMENTO,
                SETOR_ORIGEM: listaComplementar.SETOR_ORIGEM,
                ID_USER: listaComplementar.ID_USER,
                ID_TIPO: listaComplementar.ID_TIPO,
                ID_SITUACAO: listaComplementar.ID_SITUACAO,
                OBSERVACAO: listaComplementar.OBSERVACAO,
                UF: item.UF,
                VALOR_NOTA: item.VALOR_NOTA,
                EMISSOR: item.EMISSOR,
                EMISSOR_CNPJ: item.EMISSOR_CNPJ,
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
            formData.append(`[${i}].UF`, element.UF)
            formData.append(`[${i}].VALOR_NOTA`, element.VALOR_NOTA)
            formData.append(`[${i}].EMISSOR`, element.EMISSOR)
            formData.append(`[${i}].EMISSOR_CNPJ`, element.EMISSOR_CNPJ)

        })


        RegistrarProtocolosDeNotaMultiplas(formData).then(() => {
            addToast({
                type: 'success',
                title: 'Sucesso ao Registrar',
            })
        }).catch((err) => {
            addToast({
                type: 'danger',
                title: 'Erro ao Registrar',
                description: err.response.data.title

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



                    {/* <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="SETOR_ORIGEM">
                                UF
                            </InputLabel>
                            <Select
                                defaultValue=""
                                size="small"
                                labelId="SETOR_ORIGEM"
                                name="SETOR_ORIGEM"
                                label="None"
                                onChange={handleChange}
                            >
                                {listaUf?.map((item) => (
                                    <MenuItem key={item.label} value={item.value}>
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                type='text'
                                label="Valor"
                                size="small"
                                name='nota'

                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 2 }}>
                        <FormControl fullWidth>
                        <TextField
                                type='text'
                                label="Emissor"
                                size="small"
                                name='nota'

                            />
                        </FormControl>
                        <FormControl fullWidth>
                        <TextField
                                type='text'
                                label="CNPJ"
                                size="small"
                                name='nota'

                            />
                        </FormControl>
                    </Box>
 */}

                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: 2 }}>
                        <FormControl fullWidth>
                            <LabelTextArea
                                fullWidth
                                maxLength="100"
                                onChange={handleChange}
                                label="Observação"
                                rows="2"
                                name="OBSERVACAO"
                                placeholder="Observação"
                                className="form-control"
                            />
                        </FormControl>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
                        <Button onClick={() => RegistrarProtocoloDeNota(listaDeNotas, formData)} variant='contained' disabled={isButtonDisabled} startIcon={isButtonDisabled ? <CircularProgress size={20} /> : <Add />} >Concluir</Button>
                        <Button onClick={handleClose} variant='contained'>Cancelar</Button>
                    </Box>
                </Box>
            </Modal>
        </>

    )
}
