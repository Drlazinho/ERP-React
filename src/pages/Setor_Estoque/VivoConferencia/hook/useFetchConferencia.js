import React, { useCallback, useState } from 'react';
import { ConferirQrCode } from '../VivoConferencia.service';
import { useToast } from '@/hooks/toast.hook';
import { QrCode } from '@mui/icons-material';

export const useFetchConferencia = () => {
  const [conferencia, setConferencia] = useState(null);

  const { addToast } = useToast();

  const fetchConferencia = useCallback(
    async (formData) => {
      try {
        if (formData.qrCode) {
          const params = {
            QrCodeConcatenado: formData.qrCode,
          };
          const response = await ConferirQrCode(params);
          setConferencia(response || null);
          return response;
        }
        return null;
      } catch (error) {
        let errorMessage = 'Erro!';

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
    },
    [addToast]
  );

  return {
    conferencia: conferencia || 0,
    fetchConferencia,
  };
};
