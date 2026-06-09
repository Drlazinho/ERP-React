import { useToast } from '@/hooks/toast.hook';
import { queryKeys } from '@/libs/query-keys';
import { queryClient } from '@/libs/react-query';
import { apiFabrica_operacao } from '@/services/apis';
import { GetMotoristas } from '@/services/motorista/motorista.service';
import { consultaProdutos } from '@/services/produtos/produtos.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface IProduto {
  codigoDeProduto: string;
  qtdVolumes: number;
}

interface IRegistroContainer {
  BL?: string;
  CHEGADA?: string;
  COD_PRODUTOS?: IProduto[];
  CONFERENTE?: string;
  CONFORME?: string;
  CONHECIMENTO?: string;
  CONTAINER?: string;
  DATA?: string;
  DECLARACAO_IMPORTACAO?: string;
  DESCARREGADOR?: string;
  DOCA?: string;
  FINAL_OP?: string;
  INICIO_OP?: string;
  LACRE?: string;
  LOCAL?: string | Blob | undefined;
  MOTORISTAID?: number;
  NF?: string;
  OBSERVACAO?: string;
  PREVISAO_CHEGADA?: string;
  STATUS?: string;
  TRANSPORTADORA?: string;
  VOLUMES_NF?: string;
  VOLUMES_RECEBIDOS?: string;
}

export function useRegistroContainer() {
  const { addToast } = useToast();

  const addContainer = async (data: Partial<IRegistroContainer>) => {
    await apiFabrica_operacao
      .post(`RecebimentoPermanenciaContainer`, data)
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: [
            queryKeys.setor.transportes.recebimento_container
              .get_recebimento_container,
          ],
        });
        addToast({
          type: 'success',
          description: 'Cadastro efetuado com sucesso',
        });
      })
      .catch((_err) => {
        console.error(_err);
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

  const { data: ListaMotorista = [], error: errorMotorista } = useQuery({
    queryKey: [queryKeys.setor.transportes.recebimento_container.get_motorista],
    queryFn: () => GetMotoristas(),
  });

  useEffect(() => {
    if (errorMotorista) {
      addToast({
        type: 'error',
        title: 'Erro ao registrar container',
        description: errorMotorista.message,
      });
    }
  }, [errorMotorista]);

  return {
    RegistarContainer,
    isPendingContainer,
    ListaProdutos,
    ListaMotorista,
  };
}
