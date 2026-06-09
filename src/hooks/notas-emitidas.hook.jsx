import React, { useContext, createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { buscarNotaFiscalEmitidaPorNumero } from '../pages/Setor_Comercial/NotasFiscaisEmitidas/notas-emitida.service';

const NotasEmitidas = createContext();

export const NotasEmitidasProvider = ({ children }) => {
  const [listaConfirmadas, setListaConfirmadas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addNotaEmitida = useCallback((nota) => {
    const lista = listaConfirmadas;

    lista.push(nota);

    setListaConfirmadas(lista);
  }, [listaConfirmadas]);

  const buscarNotaEmitada = useCallback(async (chaveNf) => {
    setIsLoading(true)
    try {
      const result = await buscarNotaFiscalEmitidaPorNumero(chaveNf);
      addNotaEmitida(result);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      setIsLoading(false)
    }
  }, [addNotaEmitida]);

  return (
    <NotasEmitidas.Provider
      value={{
        listaConfirmadas,
        buscarNotaEmitada,
        isLoading,
      }}
    >
      {children}
    </NotasEmitidas.Provider>
  );
};

NotasEmitidasProvider.propTypes = {
  children: PropTypes.element
}

export const useNotasEmitidas = (props) => {
  const context = useContext(NotasEmitidas);
  if (!context) console.error('Erro hook entregas');
  return context;
};
