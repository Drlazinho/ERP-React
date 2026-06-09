import { useState, useEffect, useCallback } from 'react';
import { getMotivoParada } from '../RetornoParadaLinha.service';

export const useFetchMotivoParada = () => {
  const [motivoParada, setMotivoParada] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const response = await getMotivoParada();
      setMotivoParada(response);
    } catch (error) {
      setMotivoParada([]);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return motivoParada;
};
