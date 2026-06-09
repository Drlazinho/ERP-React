import React, { useCallback, useState } from 'react';
import { VerificarQrCode } from '../VivoConferencia.service';
import { useToast } from '@/hooks/toast.hook';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';

export const useFetchVerificar = () => {
  const { addToast } = useToast();
  const [sucesso, setSucesso] = useState(0);
  const { id } = useUsuarioLocal();

  const fetchVerificar = useCallback(
    async (formData2) => {
      try {
        const params = {
          galpaoID: formData2.galpaoID,
          qrCode: formData2.qrCode,
          userIdExpedicao: id,
          notaFiscalDeReferencia: formData2.notaFicalDeReferencia,
        };
        const response = await VerificarQrCode(params);
        setSucesso(response.expedido);
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'QR Code verificado com sucesso!',
        });
        setTimeout(() => setSucesso(0), 3000);
      } catch (error) {
        let errorMessage = 'Erro!';

        if (error.response?.status === 400) {
          setSucesso(2);
          errorMessage = 'QR Code já expedido ou inválido';
        } else if (error.response?.data) {
          errorMessage =
            typeof error.response.data === 'object'
              ? error.response.data.title || JSON.stringify(error.response.data)
              : error.response.data;
        }

        addToast({
          type: 'danger',
          title: 'Erro',
          description: errorMessage,
        });
        setTimeout(() => setSucesso(0), 3000);
      }
    },
    [addToast, id]
  );

  return { fetchVerificar, sucesso };
};
