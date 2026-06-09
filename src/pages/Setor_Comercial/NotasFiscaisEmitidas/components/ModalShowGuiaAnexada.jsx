import React, { useState } from 'react';
import ButtonCloseModal from '@/components/ButtonCloseModal/index.jsx';
import {
  Box,
  Modal,
} from '@mui/material';
import { MdRemoveRedEye } from 'react-icons/md';
import { NotaFiscalImagemGuiaGetDownload } from '@/services/notasFiscaisImagem.service.js';
import { LoadingButton } from '@mui/lab';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '90%',
  bgcolor: '#fff',
  p: 4,
};

export default function ShowModalGuia({ numeroNotaFiscal }) {
  const [open, setOpen] = useState(false);
  const [guiaAnexada, setGuiaAnexada] = useState('');

  const handleOpen = async (value) => {
    setOpen(true);
    await NotaFiscalImagemGuiaGetDownload(value).then((response) => {
      setGuiaAnexada(response);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <LoadingButton
        onClick={() => handleOpen(numeroNotaFiscal)}
        variant="contained"
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid grey',
        }}
        startIcon={<MdRemoveRedEye style={{ color: 'black' }} />}
      >
        <span className="6px" style={{ color: 'black' }}>
          Guia já anexada
        </span>
      </LoadingButton>
      <Modal
        open={open}
        handleClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box component={'form'} sx={{ ...style }}>
          <ButtonCloseModal onClick={handleClose} />
          <iframe
            title="PDF Viewer"
            src={`data:application/pdf;base64,${guiaAnexada}`}
            width="100%"
            height="100%"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}></Box>
        </Box>
      </Modal>
    </div>
  );
}
