import React from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Select,
  Tab,
  Tabs,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Modal,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router';
import HeaderAmvox from '@/components/HeaderAmvox';
import { useFectchArmazens } from './hook/useFectchArmazens';
import { useFetchConferencia } from './hook/useFetchConferencia';
import { useFetchVerificar } from './hook/useFetchVerificar';
import { QrCode } from '@mui/icons-material';
import logoBranca from '@/assets/logoBranca.svg';
import TabelaQRcodes from './components/TableQRcodes';
import { useDebounce } from '@/hooks/debounce.hook';

const style = {
  position: 'absolute',
  flexDirection: 'column',
  display: 'flex',
  top: '45%',
  left: '50%',
  maxWidth: '60%',
  maxHeight: '80%',
  overflowY: 'auto',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '16px',
  p: '40px',
  gap: '20px',
};

const VivoConferencia = () => {
  const [formData, setFormData] = useState({
    qrCode: '',
  });
  const [formData2, setFormData2] = useState({
    galpaoID: '',
    qrCode: '',
    notaFicalDeReferencia: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const handleClear = () => {
    setFormData({ qrCode: '' });
    setFormData2({ ...formData2, qrCode: '' });
  };

  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const armazens = useFectchArmazens();
  const { conferencia = 0, fetchConferencia } = useFetchConferencia();
  const { fetchVerificar, sucesso } = useFetchVerificar();
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const debouncedQrCode = useDebounce(formData.qrCode, 1000);
  const dobounceExpedir = useDebounce(
    {
      qrCode: formData2.qrCode,
      notaFicalDeReferencia: formData2.notaFicalDeReferencia,
    },
    1000
  );

  const handleGalpao = (event) => {
    const selectedGalpaoID = event.target.value;
    setFormData2((prev) => ({
      ...prev,
      galpaoID: selectedGalpaoID,
    }));
    handleClose();
  };

  useEffect(() => {
    if (
      dobounceExpedir.notaFicalDeReferencia.length === 44 &&
      dobounceExpedir.qrCode.length === 15 &&
      formData2.galpaoID
    ) {
      fetchVerificar?.({
        galpaoID: formData2.galpaoID,
        qrCode: formData2.qrCode,
        notaFicalDeReferencia: formData2.notaFicalDeReferencia,
      });
      handleClear();
    }
  }, [dobounceExpedir]);

  const handleVerificar = () => {
    fetchVerificar({
      galpaoID: formData2.galpaoID,
      qrCode: formData2.qrCode,
    });
  };
  useEffect(() => {
    if (debouncedQrCode && debouncedQrCode.length > 0) {
      fetchConferencia?.(formData);
      handleClear();
    }
  }, [debouncedQrCode, fetchConferencia, formData]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    let timer;

    if (sucesso === 1 || sucesso === 2) {
      setShowSuccess(true);

      timer = setTimeout(() => {
        setShowSuccess(false);
        handleClear();
        setTabIndex(0);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [sucesso]);

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {showSuccess && sucesso === 1 ? (
        <Box
          sx={{
            backgroundColor: '#23B14D',
            padding: '10px',
            color: '#fff',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
          }}
        >
          <img src={logoBranca} width={150} alt="Logo" />
          <Typography sx={{ marginTop: '10px', fontSize: '30px' }}>
            Expedido com sucesso.
          </Typography>
        </Box>
      ) : showSuccess && sucesso === 2 ? (
        <Box
          sx={{
            backgroundColor: '#F92B34',
            padding: '10px',
            color: '#fff',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <img src={logoBranca} width={150} alt="Logo" />
          <Typography sx={{ marginTop: '10px', fontSize: '30px' }}>
            Já expedido.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            position: 'relative',
            padding: '0 20px',
            marginBottom: '530px',
          }}
        >
          <HeaderAmvox onBack={() => navigate(-1)} title="Vivo Conferência" />

          <Box
            sx={(theme) => ({
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-start',
              margin: '50px 0 30px 30px',
              [theme.breakpoints.down('sm')]: {
                margin: '50px 0 30px 10px',
              },
            })}
          >
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#ccc',
                },
              }}
              sx={{
                display: 'flex',
              }}
            >
              <Tab
                label="Expedir QR Code"
                sx={{
                  color: '#333',
                  '&.Mui-selected': {
                    color: '#AA0000',
                    fontWeight: '800',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    boxShadow: '1px 1px 5px 2px rgba(255,255,255,0.58)',
                    background: '#fff',
                  },
                }}
              />
              <Tab
                label="Realizar Conferência"
                sx={{
                  color: '#333',
                  '&.Mui-selected': {
                    color: '#AA0000',
                    fontWeight: '800',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    boxShadow: '1px 1px 5px 2px rgba(255,255,255,0.58)',
                    background: '#fff',
                  },
                }}
              />
            </Tabs>
          </Box>

          {tabIndex === 0 ? (
            <>
              <Box sx={{ display: 'flex', gap: '20px' }}>
                <Modal open={open}>
                  <Box sx={style}>
                    <Box>
                      <Typography
                        id="modal-modal-title"
                        sx={{
                          fontWeight: 'bold',
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '20px',
                          color: '#333',
                        }}
                      >
                        Selecionar Galpão
                      </Typography>
                    </Box>
                    <FormControl fullWidth>
                      <InputLabel
                        id="demo-simple-select-label"
                        shrink
                        sx={{
                          fontWeight: 'bold',
                          backgroundColor: '#f3f0f0',
                        }}
                      >
                        GALPÃO
                      </InputLabel>

                      <Select
                        name="armazem"
                        size="medium"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Galpão"
                        value={formData2.galpaoID}
                        onChange={handleGalpao}
                        sx={{
                          backgroundColor: '#fff',
                          height: '48px',
                          borderRadius: '8px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(0, 0, 0, 0.23)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                          },
                        }}
                      >
                        <MenuItem value="" disabled>
                          Selecione o galpão
                        </MenuItem>
                        {armazens?.map((armazem) => (
                          <MenuItem
                            key={armazem.galpaoId}
                            value={armazem.galpaoId}
                          >
                            {armazem.nome}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Modal>

                <TextField
                  type="text"
                  required
                  variant="outlined"
                  size="medium"
                  label="QR Code Vivo"
                  value={formData2.qrCode}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                      sx: {
                        fontWeight: 'bold',
                      },
                    },
                  }}
                  sx={{
                    bgcolor: '#fff',
                    '& .MuiOutlinedInput-input': {
                      padding: '10px 14px',
                      borderRadius: 2,
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 48,
                    },
                  }}
                  fullWidth
                  onChange={(e) => {
                    setFormData2({ ...formData2, qrCode: e.target.value });
                  }}
                  placeholder="Leia o QR Code"
                />

                <TextField
                  type="text"
                  required
                  variant="outlined"
                  size="medium"
                  label=" Nota Fiscal Referência"
                  value={formData2.notaFicalDeReferencia}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                      sx: {
                        fontWeight: 'bold',
                      },
                    },
                  }}
                  sx={{
                    bgcolor: '#fff',
                    '& .MuiOutlinedInput-input': {
                      padding: '10px 14px',
                      borderRadius: 2,
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 48,
                    },
                  }}
                  fullWidth
                  onChange={(e) => {
                    setFormData2({
                      ...formData2,
                      notaFicalDeReferencia: e.target.value,
                    });
                  }}
                  placeholder="Leia o QR Code"
                />
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ display: 'flex', gap: '20px' }}>
                <TextField
                  type="text"
                  variant="outlined"
                  size="medium"
                  label="QR Code Vivo"
                  value={formData.qrCode}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                      sx: {
                        fontWeight: 'bold',
                      },
                    },
                  }}
                  sx={{
                    bgcolor: '#fff',
                    '& .MuiOutlinedInput-input': {
                      padding: '10px 14px',
                      borderRadius: 2,
                    },
                    '& .MuiOutlinedInput-root': {
                      height: 48,
                    },
                  }}
                  fullWidth
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      qrCode: e.target.value,
                    });
                  }}
                  placeholder="Leia o QR Code"
                />
              </Box>
              <Box
                sx={{
                  width: '100%',
                  bgcolor: '#fff',
                  borderRadius: 2.5,
                  mt: 2,
                  p: 2,
                }}
              >
                <TabelaQRcodes data={conferencia} />
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default VivoConferencia;
