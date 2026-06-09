import React, { useCallback, useEffect, useState } from 'react';
import { buscarArmazens } from '../VivoConferencia.service';
import { useToast } from '@/hooks/toast.hook';

export const useFectchArmazens = () => {
  const [armazens, setArmazens] = useState([]);
  const { addToast } = useToast();

  const fetchArmazens = useCallback(async () => {
    try {
      const response = await buscarArmazens();
      setArmazens(response || []);
    } catch (error) {
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
        title: 'Erro',
        description: errorMessage,
      });
    }
  }, [addToast]);

  useEffect(() => {
    fetchArmazens();
  }, [fetchArmazens]);

  return armazens;
};
