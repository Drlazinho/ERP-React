import React, { useContext, createContext, useState, useCallback } from 'react';
import { saidaNotaFiscalPortaria } from '../pages/Setor_Comercial/NotasFiscaisEmitidas/notas-emitida.service';
import { useToast } from './toast.hook';

const VerificaNotaPortariaContext = createContext();

export const VerificaNotaPortariaProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const { addToast } = useToast();

    const verificaNotaPortaria = useCallback((numero, body) => {
        setIsLoading(true)
        saidaNotaFiscalPortaria(numero, body)
            .then(() => addToast({
                title: '',
                type: 'success',
                description: 'Nota foi dada saída'
            }))
            .catch(error => addToast({
                title: '',
                type: 'danger',
                description: error.response.data.erro
            }))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <VerificaNotaPortariaContext.Provider
            value={{
                verificaNotaPortaria,
                isLoading,
            }}
        >
            {children}
        </VerificaNotaPortariaContext.Provider>
    );
};

export const useVerificaNotaFiscalPortaria = (props) => {
    const context = useContext(VerificaNotaPortariaContext);
    if (!context) console.error('Erro hook entregas');
    return context;
};
