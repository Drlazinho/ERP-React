import React, { useCallback, useEffect, useState } from 'react'
import { consultaSetores } from '../../../../services/setores/setores.service';
import { AtualizarProtrocoloNotaDet, buscarDetalhesNota, buscarProtocoloNotaStatus, buscarProtocoloNotaTipo } from '../../../../services/protocoloNotasFiscais.service';
import { useToast } from '../../../../hooks/toast.hook';

export default function useHookDetalheDaNota() {
    const [idNota, setIdNota] = useState(0);
    const [openModalAtualizarNotaIndv, setOpenModalAtualizarNotaIndv] = useState(false)
    const [listaDetalhesNota, setlistaDetalhesNota] = useState([])
    const [loadingDetalhes, setloadingDetalhes] = useState(false)

    const { addToast } = useToast()

    const handleShowModalAtualizarNotaIndv = (value) => {
        setloadingDetalhes(true)
        setlistaDetalhesNota([])
        setOpenModalAtualizarNotaIndv(!openModalAtualizarNotaIndv)
        if(value) {
            handleGetDetalhesDaNota(value)
        }
    }

    const handleAtualizarDetalhe = (body) => {
      AtualizarProtrocoloNotaDet(body).then(() => {
         addToast({
              type: 'success',
              title: 'Nota Atualizada',
            });
      }) .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao consultar Detalhe',
        });
      }).finally(() => handleGetDetalhesDaNota(id))
    }

    const handleGetDetalhesDaNota = (id) => {
        setIdNota(id);
        buscarDetalhesNota({ Id_nota: id })
          .then((retorno) => {
            setlistaDetalhesNota(retorno);
          })
          .catch((_err) => {
            // addToast({
            //   type: 'danger',
            //   title: 'Erro ao consultar Detalhe',
            // });
          }).finally(() => setloadingDetalhes(false));
      };

    return {
        handleShowModalAtualizarNotaIndv, openModalAtualizarNotaIndv, listaDetalhesNota, idNota, loadingDetalhes, handleAtualizarDetalhe
    }
}
