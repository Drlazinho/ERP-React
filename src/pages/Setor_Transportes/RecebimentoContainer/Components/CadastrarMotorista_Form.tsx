import { useState, FormEvent } from 'react';
import { IMaskInput } from 'react-imask';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Typography,
} from '@mui/material';
import InputAmvox from '@/components/InputAmvox';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';
import {
  ButtonCancel,
  ButtonRegister,
  ButtonSave,
} from '@/components/ButtonAmvox/ButtonsAmvox';
import useRegistroMotorista from '../hooks/useRegistroMotorista';

export default function CadastrarMotorista_Form() {
  const initialState = {
    NOME: '',
    CPF_CNPJ: '',
    CNH: '',
    DA4_DTVCNH: '',
  };

  const [motoristaInfo, setMotoristaInfo] = useState(initialState);
  const [open, setOpen] = useState(false);
  const handleShow = () => {
    setOpen(!open);
  };

  const { RegistrarMotorista, isPendingMotorista } = useRegistroMotorista();

  const handleClear = () => {
    setMotoristaInfo(initialState);
    handleShow();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    RegistrarMotorista(motoristaInfo).then(() => {
      handleShow();
      setMotoristaInfo(initialState);
    });
  };

  return (
    <>
      <ButtonRegister onClick={handleShow} title="Cadastrar Motorista" />

      <Dialog maxWidth={'md'} open={open} onClose={handleShow}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>
            <Typography variant="h5">Cadastrar Motorista</Typography>
          </DialogTitle>
          <DialogContent>
            <Grid2 container spacing={2} sx={{ mt: 2 }}>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <InputAmvox
                  required
                  fullWidth
                  label="Nome"
                  name="NOME"
                  value={motoristaInfo.NOME}
                  onChange={(e) =>
                    setMotoristaInfo({ ...motoristaInfo, NOME: e.target.value })
                  }
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 4 }}>
                <InputAmvox
                  label="CPF/CNPJ"
                  name="CPF_CNPJ"
                  type="number"
                  value={motoristaInfo.CPF_CNPJ}
                  onChange={(e) =>
                    setMotoristaInfo({
                      ...motoristaInfo,
                      CPF_CNPJ: e.target.value,
                    })
                  }
                  helperText="SOMENTE NÚMEROS"
                  FormHelperTextProps={{
                    sx: { color: 'red', fontWeight: 'bold' },
                  }}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 4 }}>
                <InputAmvox
                  fullWidth
                  label="CNH"
                  name="CNH"
                  value={motoristaInfo.CNH}
                  onChange={(e) =>
                    setMotoristaInfo({ ...motoristaInfo, CNH: e.target.value })
                  }
                  InputProps={{
                    inputComponent: IMaskInput as any,
                    inputProps: {
                      mask: '00000000000',
                      overwrite: true,
                    },
                  }}
                  helperText="SOMENTE NÚMEROS"
                  FormHelperTextProps={{
                    sx: { color: 'red', fontWeight: 'bold' },
                  }}
                />
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <InputDateAmvox
                  label="Data vencimento CNH"
                  value={motoristaInfo.DA4_DTVCNH || ''}
                  onChange={(date) =>
                    setMotoristaInfo({
                      ...motoristaInfo,
                      DA4_DTVCNH: date,
                    })
                  }
                />
              </Grid2>
            </Grid2>
          </DialogContent>
          <DialogActions>
            <Box display="flex" justifyContent="flex-end" sx={{ p: 2 }} gap={2}>
              <ButtonCancel onClick={handleClear} />
              <ButtonSave type="submit" loading={isPendingMotorista} />
            </Box>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
