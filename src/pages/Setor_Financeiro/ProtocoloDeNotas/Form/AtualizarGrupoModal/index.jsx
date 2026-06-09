import React, { useEffect, useState } from 'react'
import useUsuarioLocal from '../../../../../hooks/usuarioLocal.hook'
import Select from 'react-select';
import { Button } from '@mui/material';


const listaSetores = [
    'FINANCEIRO',
    'FISCAL',
    'APROVADOR'
]

export default function AtualizarGrupoModal({ listaDeNotas, protocoloStatus, handleAtualizarListaDeNotas, onClose }) {
    const [listaConfirmarNota, setListaConfirmarNota] = useState([])
    const [submitList, setSubmitLista] = useState([])
    const [status, setStatus] = useState(0)
    const [setor, setSetor] = useState('')

    const { id } = useUsuarioLocal()

    const handleSubmit = () => {
        const notasNaoRepetidas = Array.from(new Set(listaDeNotas));
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
        onClose()
    }

    const listaStatus = protocoloStatus.map((item) => ({
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
        <div>
            <div className="col-12">
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
            </div>
        </div>
    )
}
