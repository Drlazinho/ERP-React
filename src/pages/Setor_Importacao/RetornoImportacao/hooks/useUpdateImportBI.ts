import { IRetornoImportacaoPut } from './../types';
import { useToast } from '@/hooks/toast.hook';
import { putDadosImportBI } from '../RetornoImportacao.service';
import { useState } from 'react';

interface UseUpdateImportBIOptions {
  onUpdate?: () => void;
}

export const useUpdateImportBI = ({ onUpdate }: UseUpdateImportBIOptions) => {
  const { addToast } = useToast();
  const [showModal, setShowModal] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const updateData = (body: IRetornoImportacaoPut, onSuccess?: () => void) => {
    setLoading(true);
    putDadosImportBI(body)
      .then(() => {
        if (onUpdate) onUpdate();
        addToast({
          type: 'success',
          title: 'Sucesso - Ao atualizar',
        });
        setShowModal(false);
        if (onSuccess) onSuccess();
      })
      .catch((error) => {
        let errorMessage = 'Erro ao editar meta';

        if (error.response && error.response.data) {
          if (typeof error.response.data === 'object') {
            errorMessage =
              JSON.stringify(error.response.data) ||
              error.message ||
              error.response.data.title;
          } else {
            errorMessage = error.response.data;
          }
        }
        addToast({
          type: 'danger',
          title: 'Erro - Ao atualizar',
          description: errorMessage,
        });
        setShowModal(true);
      })
      .finally(() => setLoading(false));
  };

  return { updateData, showModal, loading };
};
