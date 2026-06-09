import { useState, useEffect, useCallback } from 'react';
import { CriarMotivo } from '../RetornoParadaLinha.service';
import { useToast } from '@/hooks/toast.hook';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';

export const useFetchMotivo = () => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { email } = useUsuarioLocal();

  const fetchData = useCallback(
    async (novoMotivo) => {
      setLoading(true);
      try {
        const params = {
          userCadastro: email,
          motivo: novoMotivo,
        };

        const response = await CriarMotivo(params);
      } catch (error) {
        addToast({
          type: 'danger',
          title: 'Erro ao carregar dados',
          description: 'Ocorreu um erro ao buscar as paradas de linha',
        });
      } finally {
        setLoading(false);
      }
    },
    [email]
  );

  return { loading, fetchData };
};
