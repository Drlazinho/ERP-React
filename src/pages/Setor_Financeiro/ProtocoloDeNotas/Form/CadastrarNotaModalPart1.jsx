import { CircularProgress, Box, Button, FormControl, FormLabel, IconButton, Input, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { IMaskInput } from 'react-imask';
import LabelInput from '../../../../components/Forms/LabelInput';
import { Add, Delete, ExitToApp } from '@mui/icons-material';
import ConcluirRegistroNotaModal from './CadastrarNotaModalPart2';
import ButtonCloseModal from '../../../../components/ButtonCloseModal';
import { useCallback } from 'react';
import { RetornarPdfNotaFiscal, BuscarNotaFiscal, BuscarNota } from '../../../../services/fiscal.Service';
import { useToast } from '../../../../hooks/toast.hook';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 550,
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
  const [filtro, setFiltro] = useState();
  const [loading, setLoading] = useState(false);
  const [nota, setNota] = useState({
    NOTA: '',
    ANEXO: '',
    UF: '',
    VALOR_NOTA: '',
    EMISSOR: '',
    EMISSOR_CNPJ: '',
  }) 
  const { addToast } = useToast()
  const [listaDeNotas, setListaDeNotas] = useState([])

  const handleAddNota = (value) => {
    setListaDeNotas((old) => [...old, value])
    setNota({
      NOTA: '',
      ANEXO: '',
      UF: '',
      VALOR_NOTA: '',
      EMISSOR: '',
      EMISSOR_CNPJ: '',
      ISEDITAVEL: false,
    })
    let fileInput = document.getElementById('formFile');
    fileInput.value ="";
  }

  const handleFetch = useCallback(() => {
    if(nota.NOTA.length === 44){
      setLoading(true);
      RetornarPdfNotaFiscal(filtro)
      .then((retorno) => {
        //Decodifica o base64 para um formato binario
        const binaryString = window.atob(retorno);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);

        //Converte a strin binaria para um array binaria
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }

        // Cria um Blob com o array binaria
        const blob = new Blob([bytes], {type: 'application/pdf'});
        const file = new File([blob], 'nota.pdf', { type: 'application/pdf'});

        BuscarNota({ ChaveNotaFiscal: nota.NOTA }).then((item) => {
        setNota({
          ...nota,
          ANEXO: file,
          EMISSOR: item[0].nomeEmissor,
          EMISSOR_CNPJ: item[0].cnpjEmissor,
          UF: item[0].ufEmissor,
          VALOR_NOTA: item[0].valor,
          ISEDITAVEL: true,
        })
        })

        addToast({
          type: 'success',
          title: 'Nota Identificada',
          description:
            'Não precisa adicionar Anexo - Clique em Adicionar',
        })
        
      }).catch((_err) => {
        setNota({
          ...nota,
          ANEXO: "",
        })
        addToast({
          type: 'danger',
          title: 'Nota não identificada',
          description: 'Adicione um anexo manualmente'
        });
      })
      .finally(() => {setLoading(false)});
    }
  }, [filtro]);

  const handleCloseModal = () => {
    setListaDeNotas([])
    handleClose()
  }

  const handleChange = (index) => (e) => {
    const { value, name } = e.target;
    
    const newArray = [...listaDeNotas];

    newArray[index] = {
        ...newArray[index],
        [name]: value
    }

    setListaDeNotas(newArray);
    };

  const handleDeleteNota = (index) => {
    setListaDeNotas((prev) => {
      const novaLista = [...prev];
      novaLista.splice(index, 1);
      return novaLista;
    });
  };

  useEffect(() => {
    handleFetch()
  }, [filtro])

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box component={'form'} sx={{ ...style, width: 1300 }}>
          <ButtonCloseModal onClick={handleCloseModal} />
          <Typography variant='h6' component={'p'} textAlign={'center'} color={'#000'}>Registrar Protocolo</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <FormControl sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', flex: 4 }}>
              <FormLabel>Chave da Nota (Leitor ou Teclado)</FormLabel>
              <IMaskInput
                mask={'00000000000000000000000000000000000000000000'}
                value={nota.NOTA}
                unmask={true} 
                inputRef={(ref) => {
                  return <TextField
                    variant="filled"
                    size="small"
                    fullWidth
                    sx={{ bgcolor: "#fff", borderRadius: 2 }}
                    ref={ref} 
                  />;
                }}
                style={{ width: '100%', padding: '5px', marginTop: '8px' }}
                onAccept={
                  (value, mask) => { setNota({ ...nota, NOTA: value }), setFiltro(value) }
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
                disabled={nota.NOTA.length != 44}
                onChange={(e) => {
                  setNota({ ...nota, ANEXO: e.target.files[0] });
                }}
              />
            </FormControl>

          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'end', my: 2, gap: 2 }}>
            <Typography color={'error'} variant='subtitle2'>Caso a nota seja identificada clique em adicionar, sem precisar anexar</Typography>
            <Button type="reset" variant='contained' color='primary' disabled={nota.ANEXO === "" || loading} startIcon={loading ? <CircularProgress size={20} /> : <Add />} size="small" onClick={() => handleAddNota(nota)}>
              Adicionar
            </Button>

          </Box>
          <Paper sx={{ width: '100%', overflow: 'hidden', height: 250 }}>

            <TableContainer sx={{ maxHeight: 250 }}>
              <Table stickyHeader sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead >
                  <TableRow sx={{ bgcolor: '#000' }}>
                    <TableCell>Ch. Nota</TableCell>
                    <TableCell>Nº</TableCell>
                    <TableCell sx={{width: '350px'}}>Emissor</TableCell>
                    <TableCell>CNPJ</TableCell>
                    <TableCell sx={{width: '55px'}}>UF</TableCell>
                    <TableCell sx={{width: '105px'}}>Valor</TableCell>
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
                      <TableCell component="th" scope="row">
                        {item.NOTA.substring(25, 34)}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <TextField 
                        value={item.EMISSOR}
                        disabled={item.ISEDITAVEL}
                        variant="standard"
                        size="small"
                        name='EMISSOR'
                        sx={{width: '37ch'}}
                        onChange={
                          handleChange(index)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        
                      <TextField 
                        value={item.EMISSOR_CNPJ}
                        disabled={item.ISEDITAVEL}
                        variant="standard"
                        type="number"
                        size="small"
                        inputProps={{ maxLength: 14 }}
                        name='EMISSOR_CNPJ'
                        sx={{width: '16ch'}}
                        onChange={
                          handleChange(index)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                      <TextField 
                        value={item.UF}
                        disabled={item.ISEDITAVEL}
                        variant="standard"
                        size="small"
                        name='UF'
                        inputProps={{ maxLength: 2 }}
                        sx={{width: '4ch'}}
                        onChange={
                          handleChange(index)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                      <TextField
                        value={item.VALOR_NOTA}
                        disabled={item.ISEDITAVEL}
                        variant="standard"
                        size="small"
                        name='VALOR_NOTA'
                        onChange={
                          handleChange(index)}
                        />
                      </TableCell>
                      <TableCell align="right"><IconButton size='small' onClick={() => handleDeleteNota(index, item.NOTA)}><Delete /></IconButton></TableCell>
                    </TableRow>
                  )).reverse()}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2, mt: 2 }}>
            <Button variant='contained' color='error' size='small' endIcon={<ExitToApp />} onClick={handleCloseModal}>
              Cancelar/Fechar
            </Button>
            <ConcluirRegistroNotaModal setores={setores} listaDeNotas={listaDeNotas} tipoDeNota={tipoDeNota} closeModalCadastroPart1={handleCloseModal} />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
