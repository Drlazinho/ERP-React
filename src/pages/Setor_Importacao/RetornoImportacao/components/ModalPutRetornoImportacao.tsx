import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid2';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { IImportacaoItem } from '../types';
import { useUpdateImportBI } from '../hooks/useUpdateImportBI';
import { Edit } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30%',
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #333',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
};

interface IModalProps {
  row?: Partial<IImportacaoItem>;
  onUpdate?: () => void;
}

export default function ModalPutRetornoImport({ row, onUpdate }: IModalProps) {
  const initialState = {
    id: row?.id,
    cntr: row?.cntr || '',
    terminal_Destino: row?.terminal_Destino || '',
    local_Entrega: row?.local_Entrega || '',
    presenc_Carga: row?.presenc_Carga || '',
    transportadora: row?.transportadora || '',
    nro_BL: row?.nro_BL || '',
    desovado: row?.desovado || '',
    armador: row?.armador || '',
  };

  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState(initialState);
  const { updateData, showModal, loading } = useUpdateImportBI({
    onUpdate: onUpdate,
  });

  const handleClose = () => {
    setOpen(false);
    setFormData(initialState);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const dadosParaEnviar = {
      ...formData,
    };

    updateData(dadosParaEnviar, handleClose);
    setOpen(showModal);
  };
  const handleShowModal = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleShowModal} size="small">
        <Edit />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#333333',
              }}
            >
              {row ? 'Atualizar Importação' : 'Adicionar Nova Importação'}
            </Typography>
            <Typography
              id="transition-modal-title"
              sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#333333',
              }}
            >
              {formData.nro_BL ? formData.nro_BL : ''}
            </Typography>
            <Box component="form" sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid>
                  <TextField
                    name="cntr"
                    label="CNTR"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    value={formData.cntr}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                        sx: {
                          color: '#333333',
                          fontSize: '16px',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid>
                  <TextField
                    name="terminal_Destino"
                    label="Terminal de Destino"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    value={formData.terminal_Destino}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                        sx: {
                          color: '#333333',
                          fontSize: '16px',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid>
                  <TextField
                    name="local_Entrega"
                    label="Local de Entrega"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    value={formData.local_Entrega}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                        sx: {
                          color: '#333333',
                          fontSize: '16px',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid>
                  <TextField
                    name="presenc_Carga"
                    label="Presença de Carga"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    value={formData.presenc_Carga}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                        sx: {
                          color: '#333333',
                          fontSize: '16px',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid>
                  <TextField
                    name="transportadora"
                    label="Transportadora"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    value={formData.transportadora}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                        sx: {
                          color: '#333333',
                          fontSize: '16px',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid>
                  <TextField
                    name="desovado"
                    label="Desovador"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    value={formData.desovado}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                        sx: {
                          color: '#333333',
                          fontSize: '16px',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid>
                  <TextField
                    name="armador"
                    label="Armador"
                    fullWidth
                    margin="normal"
                    onChange={handleChange}
                    value={formData.armador}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                        sx: {
                          color: '#333333',
                          fontSize: '16px',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  sx={{ mt: 2 }}
                  loading={loading}
                  loadingPosition="end"
                >
                  Salvar
                </Button>
                <Button
                  type="reset"
                  color="error"
                  onClick={handleClose}
                  variant="outlined"
                  sx={{ mt: 2 }}
                >
                  Cancelar
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
