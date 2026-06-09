import React, { useContext, createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { useToast } from './toast.hook';
import useUsuarioLocal from './usuarioLocal.hook';
import { buscarNotaFiscalPorNumero } from '../services/entregas.service'
import { apiFabrica } from '../services/apis'

const Entregas = createContext();

export const EntregasProvider = ({ children }) => {
  const [listaConfirmadas, setListaConfirmadas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [entregaPriority, setEntregaPriority] = useState({ expedido: 1 });
  const { addToast } = useToast();
  const { email } = useUsuarioLocal();
  const [usuarioSetor, setUsuarioSetor] = useState({
    userlog: email + ' | ' + new Date().toLocaleString(),
  });

  const addEntrega = useCallback(
    async (entrega) => {
      const lista = listaConfirmadas;
      lista.push(entrega);

      setListaConfirmadas(lista);
    },
    [listaConfirmadas]
  );

  const handleChangeExpedicao = async (item) => {
    try {
      await apiFabrica.put(`/Entregas/${item.id}`, {
        ...entregaPriority,
        ...usuarioSetor,
      });
      addToast({
        type: 'success',
        title: 'Status Expedido - Atualizado',
        description: `Alteração da NF ${item.documento} bem sucedida`,
      });
    } catch (err) {
      addToast({
        type: 'danger',
        title: 'ERRO - Não Enviado',
        description: 'Erro ao tentar alterar o status de expedição!',
      });
    }
  };

  const buscarEntrega = useCallback(
    async (chaveNf) => {
      setIsLoading(true);

      try {
        const result = await buscarNotaFiscalPorNumero(chaveNf);
        addEntrega(result);
        handleChangeExpedicao(result);
        return Promise.resolve(result);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        setIsLoading(false);
      }
    },
    [addEntrega]
  );

  return (
    <Entregas.Provider
      value={{
        buscarEntrega,
        listaConfirmadas,
        isLoading,
      }}
    >
      {children}
    </Entregas.Provider>
  );
};

EntregasProvider.propTypes = {
  children: PropTypes.any,
};

export const useEntregas = () => {
  const context = useContext(Entregas);
  if (!context) console.error('');
  return context;
};
