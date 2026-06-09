import { useToast } from '@/hooks/toast.hook';
import { queryKeys } from '@/libs/query-keys';
import { apiFabrica_operacao } from '@/services/apis';
import { PostMotoristas } from '@/services/motorista/motorista.service';
import { consultaProdutos } from '@/services/produtos/produtos.service';
import { consultaContainer } from '@/services/recebimentoPermanenciaContainer.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

type props = Partial<{
  id: number | null;
  produto: string | null;
  bl: string | null;
  data: string | null;
  nf: string | null;
  numeroDaPagina: number;
  itensPorPagina: number;
}>;

export function useRecebimentoContainerTabelaQuery(filtro: props) {
  const { addToast } = useToast();

  // GET
  const { data: ListaContainer = [], error } = useQuery({
    queryKey: [
      queryKeys.setor.transportes.recebimento_container
        .get_recebimento_container,
      filtro,
    ],
    queryFn: () => consultaContainer(filtro),
    staleTime: 0.25 * (60 * 1000),
  });

  useEffect(() => {
    if (error) {
      addToast({
        type: 'error',
        title: 'Erro ao consultar containers',
        description: error.message,
      });
    }
  }, [error]);

  // POST MOTORISTA
  const {
    mutateAsync: RegistrarMotorista,
    isPending: isPendingMotorista,
    error: errorMotorista,
  } = useMutation({
    mutationFn: PostMotoristas,
  });

  useEffect(() => {
    if (errorMotorista) {
      addToast({
        type: 'error',
        title: 'Erro ao registrar motorista',
        description: errorMotorista.message,
      });
    }
  }, [errorMotorista]);

  // POST CONTAINER

  const addContainer = async (value: any) => {
    const {
      LOCAL,
      CONTAINER,
      LACRE,
      BL,
      STATUS,
      DOCA,
      TRANSPORTADORA,
      DECLARACAO_IMPORTACAO,
      NF,
      COD_PRODUTO,
      DATA,
      PREVISAO_CHEGADA,
      CHEGADA,
      INICIO_OP,
      FINAL_OP,
      CONHECIMENTO,
      VOLUMES_NF,
      VOLUMES_RECEBIDOS,
      CONFORME,
      OBSERVACAO,
      DESCARREGADOR,
      CONFERENTE,
      MOTORISTAID,
    } = value;
    const formData = new FormData();
    formData.append('local', LOCAL);
    formData.append('container', CONTAINER);
    formData.append('lacre', LACRE);
    formData.append('bl', BL);
    formData.append('status', STATUS);
    formData.append('doca', DOCA);
    formData.append('transportadora', TRANSPORTADORA);
    formData.append('declaracao_importacao', DECLARACAO_IMPORTACAO);
    formData.append('nf', NF);
    formData.append('cod_produto', COD_PRODUTO);
    formData.append('data', DATA);
    formData.append('previsao_chegada', PREVISAO_CHEGADA);
    formData.append('chegada', CHEGADA);
    formData.append('inicio_op', INICIO_OP);
    formData.append('final_op', FINAL_OP);
    formData.append('conhecimento', CONHECIMENTO);
    formData.append('volumes_nf', VOLUMES_NF);
    formData.append('volumes_recebidos', VOLUMES_RECEBIDOS);
    formData.append('conforme', CONFORME);
    formData.append('observacao', OBSERVACAO);
    formData.append('descarregador', DESCARREGADOR);
    formData.append('conferente', CONFERENTE);
    formData.append('motoristaId', MOTORISTAID);

    await apiFabrica_operacao
      .post(`RecebimentoPermanenciaContainer`, formData)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Cadastro efetuado com sucesso',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'warning',
          description: 'Erro ao fazer o cadastro',
        });
      });
  };

  const {
    mutateAsync: RegistarContainer,
    isPending: isPendingContainer,
    error: errorContainer,
  } = useMutation({
    mutationFn: addContainer,
  });

  useEffect(() => {
    if (errorContainer) {
      addToast({
        type: 'error',
        title: 'Erro ao registrar container',
        description: errorContainer.message,
      });
    }
  }, [errorContainer]);

  // GET PRODUTOS
  const { data: ListaProdutos = [], error: errorProdutos } = useQuery({
    queryKey: [queryKeys.setor.transportes.recebimento_container.get_produtos],
    queryFn: () => consultaProdutos(),
    staleTime: 12 * 60 * (60 * 1000),
  });

  useEffect(() => {
    if (errorProdutos) {
      addToast({
        type: 'error',
        title: 'Erro ao registrar container',
        description: errorProdutos.message,
      });
    }
  }, [errorProdutos]);

  //   const { data: ListaProdutos = [], error : errorProdutos } = useQuery({
  //   queryKey: [queryKeys.setor.transportes.recebimento_container.get_produtos],
  //   queryFn: () => consultaProdutos(),
  //   staleTime: 12 * 60 * (60 * 1000),
  // })

  //   useEffect(() => {
  //   if (errorProdutos) {
  //     addToast({
  //       type: 'error',
  //       title: 'Erro ao registrar container',
  //       description: errorProdutos.message,
  //     })
  //   }
  // }, [errorProdutos])

  return {
    ListaContainer,
    RegistrarMotorista,
    isPendingMotorista,
    RegistarContainer,
    isPendingContainer,
    ListaProdutos,
  };
}
