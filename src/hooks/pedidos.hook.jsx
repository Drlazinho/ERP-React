import React, { useContext, createContext, useState, useCallback } from 'react';

const PedidosContext = createContext();

export const PedidosProvider = ({ children }) => {
    const [obj, setObj] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [filtro, setFiltro] = useState({
        descricao: null,
        nome: null,
        datainicio: newDateFormatYearMonth(),
        datafim: null,
    });

    const { addToast } = useToast();

    const buscarPedidos = useCallback(async (f) => {
        try {
            setIsLoading(true)
            const res = await buscarPedidosPorFiltro(f);
            return Promise.resolve(res.data);
        } catch (error) {
            addToast({ type: 'danger', title: 'Erro na requisição', description: 'Erro interno no servidor, verifique sua conexão ou tente novamente mais tarde ¹' });
            return Promise.reject(error);
        } finally {
            setIsLoading(false)
        }
    }, []);

    useEffect(() => {
        buscarPedidos(filtro).then((res) => setObj(res.data));
    }, [filtro]);

    return (
        <PedidosContext.Provider
            value={{
                obj,
                filtro,
                isLoading,
                setFiltro,
            }}
        >
            {children}
        </PedidosContext.Provider>
    );
};

export const usePedidos = () => {
    const context = useContext(PedidosContext);
    if (!context) console.error('');

    return context;
};
