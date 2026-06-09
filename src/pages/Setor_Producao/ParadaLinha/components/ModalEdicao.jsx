import React, { useState, useCallback, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Typography,
  Box,
} from '@mui/material';
import InputAmvox from '@/components/InputAmvox';
import { ButtonCancel } from '@/components/ButtonAmvox/ButtonsAmvox';
import { ButtonSave } from '@/components/ButtonAmvox/ButtonsAmvox';
import { CriarObservacao } from '../RetornoParadaLinha.service';
import { useToast } from '@/hooks/toast.hook';
import { set } from 'date-fns';

const ModalEdicao = ({ open, handleCloseModal, data, update }) => {
  const [formData, setFormData] = useState({
    idParada: data.id,
    observacao: '',
  });
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleCriarObservacao = useCallback(async () => {
    setLoading(true);
    try {
      await CriarObservacao(formData.idParada, formData.observacao);
      update();
      handleCloseModal();
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro',
        description: 'A atualização falhou',
      });
    } finally {
      setLoading(false);
    }
  }, [data.id, formData]);

  useEffect(() => {
    setFormData({ ...formData, idParada: data.id });
  }, [data.id]);

  return (
    <>
      <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>Criar observação</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <InputAmvox
                label="Motivo"
                name="motivo"
                defaultValue={data.motivo}
                disabled
              />
            </Box>
            <Box>
              <InputAmvox
                label="Motivo"
                name="motivo"
                defaultValue={data.op}
                disabled
              />
            </Box>
            <Box fullWidth>
              <InputAmvox
                label="Observação"
                name="observacao"
                defaultValue={data.observacao}
                onChange={(e) => {
                  setFormData({ ...formData, observacao: e.target.value });
                }}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <ButtonCancel onClick={handleCloseModal}>Fechar</ButtonCancel>
          <ButtonSave onClick={handleCriarObservacao} disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar'}
          </ButtonSave>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalEdicao;
