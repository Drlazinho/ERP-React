import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import CardDetalheDaNota from '../components/CardDetalheDaNota';
import Loader from '../../../../components/Loader';
import AtualizarNotaIndividualModal2 from './AtualizarNotaIndividualModal2';

const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: '#fff',
  p: 1,
};

export default function AtualizarNotaIndividualModal({
  openModal,
  handleClose,
  handleSubmit,
  lista,
  loadingDetalhes,
  statusDeProtocolo,
  idNota,
  emailCancelado,
}) {
  const [showModalChildren, setShowModalChildren] = useState(false);
  const [idDetalhe, setIdDetalhe] = useState();
  const [setor, setSetor] = useState();
  const [nota, setNota] = useState();

  const handleOpenModal = (id) => {
    if (!showModalChildren) {
      setIdDetalhe(id);
    }
    setShowModalChildren(!showModalChildren);
  };

  return (
    <>
      {/* <ChildrenModal /> */}
      <AtualizarNotaIndividualModal2
        statusDeProtocolo={statusDeProtocolo}
        open={showModalChildren}
        submit={handleSubmit}
        handleClose={handleOpenModal}
        emailCancelado={emailCancelado}
        idNota={idNota}
        idDetalhe={idDetalhe}
        nota={nota}
        setor={setor}
      />
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '65%',
            bgcolor: '#fff',
            transform: 'translate(-50%, -50%)',
            gap: 1,
            p: 2,
          }}
        >
          <Typography variant="h6" textAlign={'center'} color={'#000'}>
            DETALHE DA NOTA
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: 'row',
              margin: 'auto',
              my: 4,
            }}
          >
            {loadingDetalhes && <Loader />}
            {lista?.map((item) => (
              <CardDetalheDaNota
                key={item.setor}
                atualizacao={item.data_atualizacao}
                nota={item.nota}
                observacao={item.observacao}
                registro={item.data_registro}
                setor={item.setor}
                status={item.status}
                usuario={item.usuario}
                openModalUpdate={() => {
                  handleOpenModal(item.id),
                    setSetor(item.setor),
                    setNota(item.nota);
                }}
              />
            ))}
          </Box>

          <Button
            onClick={handleClose}
            fullWidth
            variant="contained"
            color="error"
          >
            Fechar{' '}
          </Button>
        </Box>
      </Modal>
    </>
  );
}
