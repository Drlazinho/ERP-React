import { Box, Button, FormControl, FormLabel, IconButton, Input, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { IMask, IMaskInput } from 'react-imask';
import LabelInput from '../../../components/Forms/LabelInput';
import LabelTextArea from '../../../components/Forms/LabelTextArea';
import { Add, Delete, ExitToApp } from '@mui/icons-material';
import ConcluirRegistroNotaModal from './CadastrarNotaModalPart2';
import ButtonCloseModal from '../../../components/ButtonCloseModal';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 600,
  bgcolor: '#fff',
  p: 4,
};

const styleModal = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  height: 250,
  bgcolor: 'background.paper',
  p: 4,
}

export default function CadastrarNotaModal({ openModal, handleClose, setores, tipoDeNota }) {
  const [nota, setNota] = useState({}) //Nota Com 3 campos -> Chave da Nota, ANEXO, Observacao
  const [listaDeNotas, setListaDeNotas] = useState([]) // Lista de Notas com 3 campos

  const handleAddNota = (value) => {
    setListaDeNotas((old) => [...old, value])
    setNota({
      NOTA: '',
      ANEXO: '',
      OBSERVACAO: '',
    })
  }

  const handleCloseModal = () => {
    setListaDeNotas([])
    handleClose()
  }

  const handleDeleteNota = (index) => {
    setListaDeNotas((prev) => {
      const novaLista = [...prev];
      novaLista.splice(index, 1);
      return novaLista;
    });
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box component={'form'} sx={{ ...style, width: 800 }}>
        <ButtonCloseModal onClick={handleCloseModal} />
          <Typography variant='h6' component={'p'} textAlign={'center'} color={'#000'}>Registrar Protocolo</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <FormControl sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', flex: 4 }}>
              <FormLabel>Chave da Nota (Leitor ou Teclado)</FormLabel>
              <IMaskInput
                mask={'00000000000000000000000000000000000000000000'}
                value={nota.NOTA}
                unmask={true} // true|false|'typed'
                inputRef={(ref) => {
                  return <TextField
                    variant="filled"
                    size="small"
                    fullWidth
                    sx={{ bgcolor: "#fff", borderRadius: 2 }}
                    ref={ref} // Pass the ref as a prop to the TextField
                  />;
                }}
                style={{ width: '100%', padding: '5px', marginTop: '8px' }}
                onAccept={

                  (value, mask) => setNota({ ...nota, NOTA: value })
                }

              >
              </IMaskInput>
            </FormControl>
            <FormControl sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', flex: 2 }}>
              <FormLabel>Anexo</FormLabel>
              <LabelInput
                htmlFor="formFile"
                className="form-label"
                name="anexo"
                type="file"
                accept="application/pdf"
                id="formFile"
                onChange={(e) => {
                  setNota({ ...nota, ANEXO: e.target.files[0] });
                }}
              />
            </FormControl>

          </Box>
          <FormControl fullWidth>
            <LabelTextArea
              fullWidth
              maxLength="100"
              onChange={(e) => {
                setNota({
                  ...nota,
                  OBSERVACAO: e.target.value,
                });
              }}
              label="Observação"
              rows="2"
              value={nota.OBSERVACAO}
              name="OBSERVACAO"
              placeholder="Observação"
              className="form-control"
            />
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'end', my: 2, gap: 2 }}>
            <Button type="reset" variant='contained' color='primary' startIcon={<Add />} size='small' onClick={() => handleAddNota(nota)}>
              Adicionar
            </Button>
            <Button variant='contained' color='warning' size='small' endIcon={<ExitToApp />} onClick={handleCloseModal}>
              Cancelar/Fechar
            </Button>
          </Box>
          <Paper sx={{ width: '100%', overflow: 'hidden', height: 250 }}>

            <TableContainer sx={{ maxHeight: 250 }}>
              <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead >
                  <TableRow>
                    <TableCell>Ch. Nota</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listaDeNotas.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.NOTA}
                      </TableCell>
                      <TableCell align="right"><IconButton size='small' onClick={() => handleDeleteNota(index, item.NOTA)}><Delete /></IconButton></TableCell>
                    </TableRow>
                  )).reverse()}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <ConcluirRegistroNotaModal setores={setores} listaDeNotas={listaDeNotas} tipoDeNota={tipoDeNota} closeModalCadastroPart1={handleCloseModal}/>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
