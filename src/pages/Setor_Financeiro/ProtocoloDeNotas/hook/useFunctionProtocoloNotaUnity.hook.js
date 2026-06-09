import React, { useState } from 'react'
import { buscarArquivoDaNota } from '../../../../services/protocoloNotasFiscais.service';
import { donwloadPDF } from '../../../../utils/downloadPdf';

export default function useFunctionProtocoloNotaUnity() {
    const [listaDeNotasSelecionada, setListaDeNotasSelecionada] = useState([]);

    const handleBaixarNota = async (id, nota, body) => {
        const file = await buscarArquivoDaNota(id);
        donwloadPDF(file, `Nota - ${nota}`);
        setListaDeNotasSelecionada((old) => [...old, body]);
    };

    const handleAddNotaNaLista = (body) => {
        setListaDeNotasSelecionada((old) => [...old, body]);
    };

    const handleRemoveNotaNaLista = (value) => {
        const lista = listaDeNotasSelecionada.filter((item) => item.id !== value);
        setListaDeNotasSelecionada(lista);
    };

    const handleClearListaNotas = () => {
        setListaDeNotasSelecionada([])
    }
    
    return {
        handleClearListaNotas,
        handleAddNotaNaLista,
        handleBaixarNota,
        listaDeNotasSelecionada,
        handleRemoveNotaNaLista
    }
}
