import React, { useCallback, useEffect, useState } from 'react'
import { consultaSetores } from '../../../../services/setores/setores.service';
import { buscarProtocoloNotaStatus, buscarProtocoloNotaStatusTodas, buscarProtocoloNotaTipo } from '../../../../services/protocoloNotasFiscais.service';
import { useToast } from '../../../../hooks/toast.hook';

export default function useFetchDataList() {
    const [setores, setSetores] = useState([]);
    const [statusDeProtocolo, setStatusDeProtocolo] = useState([]);
    const [tipoDeNota, setTipoDeNota] = useState([]);
    const [statusTodas, setStatusTodas] = useState([]);
    const { addToast } = useToast()

    const fetchDataList = useCallback(() => {
        consultaSetores().then((retorno) => {
            setSetores(retorno);
        }).catch((_err) => {
            addToast({
                type: 'danger',
                title: 'Erro ao listar as Notas !',
                description:
                    'Erro ao listar SETORES !',
            });
        });

        buscarProtocoloNotaTipo().then((retorno) => {
            setTipoDeNota(retorno);
        }).catch((_err) => {
            addToast({
                type: 'danger',
                title: 'Erro ao listar as Notas !',
            });
        });

        buscarProtocoloNotaStatusTodas().then((retorno) => {
            setStatusTodas(retorno);
        }).catch((_err) => {
            addToast({
                type: 'danger',
                title: 'Erro ao listar as Notas !',
            });
        });

        buscarProtocoloNotaStatus()
            .then((retorno) => {
                setStatusDeProtocolo(retorno);
            })
            .catch((_err) => {
                addToast({
                    type: 'danger',
                    title: 'Erro ao carregar status da Nota',
                });
            });
    }, [])

    useEffect(() => {
        fetchDataList()
    }, [])

    return {
        statusDeProtocolo,
        tipoDeNota,
        setores,
        statusTodas,
    }
}
