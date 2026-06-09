import { useToast } from '@/hooks/toast.hook';
import { consultaProdutos } from '@/services/produtos/produtos.service';
import {
  GetLinhasProducao,
  GetArmazens,
  GetOrigem,
  GetDefeitos,
  GetControleDeQualidade,
} from '../ControleDeQualidade.service';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

type FiltrosControleQualidade = {
  numeroDaPagina: number;
  itensPorPagina: number;
  dataInicio: string | null;
  dataFinal?: string | null;
  codigoProduto?: string | null;
  linhaId: number | null;
  descricao: string | null;
  idOrigem: number | null;
  armazem: string | null;
};

export const useFetchControleQualidade = (filtro: FiltrosControleQualidade) => {
  const { addToast } = useToast();

  // GET
  const {
    data: ControleDeQualidade = [],
    error: errorControleDeQualidade,
    isLoading: isLoadingControleQualidade,
    refetch,
  } = useQuery({
    queryKey: ['controle-qualidade', filtro],
    queryFn: () => GetControleDeQualidade(filtro),
    staleTime: 12 * 60 * 60 * 1000,
    enabled: !!filtro.numeroDaPagina && !!filtro.itensPorPagina,
  });

  // GET PRODUTOS
  const { data: ListaProdutos = [], error: errorProdutos } = useQuery({
    queryKey: ['produtos-controle-qualidade'],
    queryFn: () => consultaProdutos(),
    staleTime: 12 * 60 * 60 * 1000,
  });

  // GET LINHAS PRODUCAO
  const { data: LinhasProducao = [], error: errorLinhasProducao } = useQuery({
    queryKey: ['linhas-producao-controle-qualidade'],
    queryFn: () => GetLinhasProducao(),
    staleTime: 12 * 60 * 60 * 1000,
    select: (data) => {
      return data.filter((linha: { nomeGalpaoLinha: string }) =>
        linha.nomeGalpaoLinha?.startsWith('CORDEBRAS')
      );
    },
  });

  // GET ARMZENS
  const { data: Armazem = [], error: errorArmazens } = useQuery({
    queryKey: ['armazens-controle-qualidade'],
    queryFn: () => GetArmazens(),
    staleTime: 12 * 60 * 60 * 1000,
  });

  // GET ORIGEM
  const { data: Origem = [], error: errorOrigem } = useQuery({
    queryKey: ['origem-controle-qualidade'],
    queryFn: () => GetOrigem(),
    staleTime: 12 * 60 * 60 * 1000,
  });

  // GET DEFEITOS
  const { data: Defeitos = [], error: errorDefeitos } = useQuery({
    queryKey: ['defeitos-controle-qualidade'],
    queryFn: () => GetDefeitos(),
    staleTime: 12 * 60 * 60 * 1000,
  });

  useEffect(() => {
    if (errorProdutos) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar produtos',
        description: errorProdutos.message,
      });
    }

    if (errorLinhasProducao) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar linhas de produção',
        description: errorLinhasProducao.message,
      });
    }

    if (errorArmazens) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar armazens',
        description: errorArmazens.message,
      });
    }

    if (errorOrigem) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar origem',
        description: errorOrigem.message,
      });
    }

    if (errorDefeitos) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar defeitos',
        description: errorDefeitos.message,
      });
    }

    if (errorControleDeQualidade) {
      addToast({
        type: 'error',
        title: 'Erro ao carregar controle de qualidade',
        description: errorControleDeQualidade.message,
      });
    }
  }, [
    errorProdutos,
    errorLinhasProducao,
    errorArmazens,
    errorOrigem,
    errorDefeitos,
    errorControleDeQualidade,
    addToast,
  ]);

  const Armazens = Armazem?.value?.armazens || [];

  return {
    ListaProdutos,
    LinhasProducao,
    Armazens,
    Origem,
    Defeitos,
    ControleDeQualidade,
    isLoadingControleQualidade,
    refetch,
  };
};
