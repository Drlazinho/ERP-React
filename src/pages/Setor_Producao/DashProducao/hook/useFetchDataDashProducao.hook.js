import React, { useCallback, useEffect, useState } from 'react';
import {
  buscarProducaoLinhaGalpao,
  buscarTotalProducaoLinhas,
} from '../../../services/dashboardproducao.service';
import { formatDatetoHtmlDay } from '../../../utils/formatDate';
import { useToast } from '../../../hooks/components/toast.hook';

export default function useFetchDataDashProducao() {
  const [loading, setLoading] = useState(true);
  const [totalProducaoLinhas, setTotalProducaoLinhas] = useState([]);
  const [produtoLinhagalpao, setProdutoLinhagalpao] = useState([]);
  const [filtroGalpao, setfiltroGalpao] = useState({
    dataInicial: formatDatetoHtmlDay(),
    dataFinal: formatDatetoHtmlDay(),
  });
  const [filtro, setFiltro] = useState({
    dataProducaoInicial: formatDatetoHtmlDay(),
    dataProducaoFinal: formatDatetoHtmlDay(),
  });
  const { addToast } = useToast();

  const handleFetch = useCallback(() => {
    setLoading(true);
    buscarTotalProducaoLinhas(filtro)
      .then((res) => {
        setTotalProducaoLinhas(res);
      })
      .catch(() =>
        addToast({
          type: 'danger',
          title: 'Erro - Info Gráfico',
          description: 'Erro grave - não carregou os dados do gráfico !!',
        })
      )
      .finally(() => setLoading(false));
  }, [filtro]);

  const handleFecthGalpao = useCallback(() => {
    buscarProducaoLinhaGalpao(filtroGalpao)
      .then((res) => {
        setProdutoLinhagalpao(res);
      })
      .catch(() =>
        addToast({
          type: 'danger',
          title: 'Erro - Info Tabela',
          description: 'Erro grave - não carregou os dados da tabela !!',
        })
      );
  }, [filtroGalpao]);

  useEffect(() => {
    handleFetch();
  }, [filtro]);

  useEffect(() => {
    handleFecthGalpao();
  }, [filtroGalpao]);

  return {
    setFiltro,
    filtro,
    setfiltroGalpao,
    filtroGalpao,
    totalProducaoLinhas,
    produtoLinhagalpao,
    loading,
  };
}
