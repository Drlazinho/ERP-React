import { Box, Modal, Typography, Button, FormControl, InputLabel, Select, TextField, MenuItem, IconButton, Grid, Paper, Radio, FormControlLabel, FormLabel, RadioGroup } from '@mui/material'
import { useCallback, useState } from 'react'
import ButtonCloseModal from '../../../../components/ButtonCloseModal';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import debounce from '../../../../utils/debounce';
import { registrarNovaSeparada } from '../notas-emitida.service';
import { useToast } from '../../../../hooks/toast.hook';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '50%',
  height: '50%',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialCadastro = {
  chaveNf: '',
  // separado: 0,
  filial_Separad: '',
  endLoc_Separad: '',
}

export default function ModalLeitorSeparado({ open, onClose, }) {
  const [formData, setFormData] = useState(initialCadastro);
  const [opcaoPreenchimento, setopcaoPreenchimento] = useState('leitor')
  const [nota, setNota] = useState('')
  const [listaNf, setListaNf] = useState([])
  const { addToast } = useToast()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const separarNota = useCallback((value) => {
    registrarNovaSeparada({
      chaveNf: value,
      filial_Separad: formData.filial_Separad,
      endLoc_Separad: formData.endLoc_Separad,
    }).then(() => {
      addToast({
        type: 'success',
        title: 'Nota Fiscal Separada',
        description: 'Nota Separada.',
      });
      setListaNf((old) => [{ nf: value, separado: 1 }, ...old])
    })
      .catch((err) => {
        const error = err.response.data.error;
        addToast({
          type: 'danger',
          title: 'Erro na requisição',
          description: error,
        });
        setListaNf((old) => [{ nf: value, separado: 0 }, ...old])
      })
      .finally(() => setNota(''));
  }, [formData, nota])

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // Faça algo quando a tecla Enter for pressionada
      // separarNota(nota)
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ButtonCloseModal onClick={() => { onClose(); setFormData(initialCadastro) }} />
        <Typography variant='h6' sx={{ textAlign: 'center', color: '#000' }}>Atualizar Separação de Nota</Typography>
        <Grid container columnGap={1} my={2}>
          <Grid item xs={12} md={5.9}>

            <FormControl fullWidth sx={{ mb: 2 }} size='small'>
              <InputLabel id="demo-simple-select-label">Filial</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.filial_Separad}
                label="Separado"
                name='filial_Separad'
                onChange={handleChange}
              >
                <MenuItem value={'010101'}>010101</MenuItem>
                <MenuItem value={'010102'}>010102</MenuItem>
                <MenuItem value={'010103'}>010103</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={5.8}>

            <TextField size='small' label="Localização: " variant="outlined" fullWidth name='endLoc_Separad' onChange={handleChange} value={formData.endLoc_Separad} InputProps={{
              endAdornment: (
                <IconButton aria-label="delete" disabled color="primary" onClick={() => setFormData({ ...formData, endLoc_Separad: '' })}>
                  <DeleteIcon />
                </IconButton>),
            }} />
          </Grid>
          <Grid item xs={12} >
            <FormControl disabled={formData.endLoc_Separad === '' || formData.filial_Separad === ''}>
              <FormLabel id="demo-row-radio-buttons-group-label">Opção de Preenchimento (Localização e Filial devem esta preenchidas)</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="teclado" control={<Radio />} label="Teclado" checked={opcaoPreenchimento === 'teclado'} onClick={(e) => setopcaoPreenchimento(e.target.value)} />
                <FormControlLabel value="leitor" control={<Radio />} label="Leitor" checked={opcaoPreenchimento === 'leitor'} onClick={(e) => setopcaoPreenchimento(e.target.value)} />
              </RadioGroup>
            </FormControl>

            {
              opcaoPreenchimento === 'leitor' ? (
                <TextField helperText="Preencha Filial e Localização antes da nota"
                  disabled={formData.endLoc_Separad === '' || formData.filial_Separad === ''} size='small' label="Nota Fiscal (Leitor)" variant="outlined" fullWidth name='chaveNf' focused onChange={(e) => {
                    setFormData({ ...formData, chaveNf: e.target.value });
                    setNota(e.target.value)
                    debounce(() => separarNota(e.target.value), 1000);
                  }} value={nota} InputProps={{
                    endAdornment: (
                      <SearchIcon />
                    ),
                  }}
                />
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <TextField helperText="Preencha Filial e Localização antes da nota"
                    disabled={formData.endLoc_Separad === '' || formData.filial_Separad === ''} size='small' label="Nota Fiscal (Teclado)" variant="outlined" fullWidth name='chaveNf' focused onChange={(e) => {
                      setFormData({ ...formData, chaveNf: e.target.value });
                      setNota(e.target.value)
                      // debounce(() => separarNota(e.target.value), 1000);
                    }} value={nota} InputProps={{
                      endAdornment: (
                        <SearchIcon />
                      ),
                    }}
                  />
                  <Button type="submit" variant='contained' color='primary' disabled={nota.length < 44 || nota.length > 44} onClick={() => separarNota(nota)} >
                    Separar ({44 - nota.length} )
                  </Button>
                </Box>

              )
            }


          </Grid>
        </Grid>

        <TableContainer component={Paper} sx={{ minWidth: '100%', height: 200, overflow: 'scroll' }} >
          <Table stickyHeader size="small" aria-label="simple table">
            <TableHead sx={{ bgcolor: '#d3d3d3' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', bgcolor: '#000' }}>Nota</TableCell>
                <TableCell align="right" sx={{ color: '#fff', bgcolor: '#000' }}>Separado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listaNf.map((item) => (
                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{item.nf}
                  </TableCell>

                  <TableCell align="right">        {
                    item.separado === 1 ? (<CheckCircleIcon color='success' />
                    ) : (<CancelIcon color='#f00' />)
                  }</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Button sx={{ mr: 2 }} variant="contained" color="success" onClick={''}>
        ENVIAR
      </Button>
      <Button variant="contained" color="error" onClick={''}>
        CANCELAR/FECHAR
      </Button> */}
      </Box>

    </Modal>
  )
}
