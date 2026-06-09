import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react'
import { ExitToApp, CheckCircleOutline } from '@mui/icons-material';
import debounce from '../../../utils/debounce';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {InputDateAmvox} from '../../../components/InputDateAmvox/InputDateAmvox'
import InputAmvox from '@/components/InputAmvox'

const notaInicial = {
  id: 0,
  OBSERVACAO: '',
  SETOR_ORIGEM: '',
  DATA_VENCIMENTO: '',
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 500,
  bgcolor: '#fff',
  p: 4,
};

const notaEscolhidaInitial = {
  nota: '',
  id: 0,
  OBSERVACAO: 'N/A',
  DATA_VENCIMENTO: '',
  ID_TIPO: '',
  datA_REGISTRO: '',
  SETOR_ORIGEM: '',
  ANEXO: '',
  setoR_PENDENTE: '',
  aprovador: '',
}


export default function EditarNotaModal({ openModal, notaEscolhida = notaEscolhidaInitial, setores, tipoDeNota, handleClose, handleSubmit }) {
  const [formData, setFormData] = useState(notaInicial);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (notaEscolhida) {
      setFormData({
        id: notaEscolhida.id,
        OBSERVACAO: notaEscolhida.observacao,
        SETOR_ORIGEM: notaEscolhida.setor,
        DATA_VENCIMENTO: notaEscolhida.datA_VENCIMENTO,
        ID_TIPO: 0,
      });
    }
  }, [notaEscolhida]);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    setFormData(notaInicial);
  }
  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const selectSetores = setores.map((item) => ({
    value: item.id,
    label: item.setor,
  }));

  const selectTipo = tipoDeNota.map((item) => ({
    value: item.id,
    label: item.descricao,
  }))

  const handleSelectChangeTipoNota = (selectOption) => {
    setFormData({
      ...formData,
      ID_TIPO: selectOption.target.value,
    });
  };

  const handleSelectChangeSetores = (event, value) => {
    if (value !== null) {
      setFormData({
        ...formData,
        SETOR_ORIGEM: value.label,
      });
    } else {
      setFormData({
        ...formData,
        SETOR_ORIGEM: notaEscolhida.setor,
      })
    }
  };

  const handleCancelar = (e) => {
    e.preventDefault();
    handleClose();
    setFormData(notaInicial);
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <form onSubmit={submit} >
          <Box component={'form'} sx={{ ...style }}>
            <Typography variant='h6' color={'#000'} textAlign={'center'}>Notas Fiscal: {notaEscolhida.numero} <br /> Status: {notaEscolhida.status} </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <InputAmvox
                required
                label="Nota (Nº da Chave)"
                value={notaEscolhida.nota}
                disabled
              />
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <InputDateAmvox
                  label={'Data de Registro'}
                  disabled
                  value={notaEscolhida.datA_REGISTRO}
                />
                <InputDateAmvox
                  label={'Data de Vencimento'}
                  value={formData.DATA_VENCIMENTO}
                  format='YYYY-MM-DD'
                  onChange={(date) =>
                    debounce(() => {
                      setFormData({ ...formData, DATA_VENCIMENTO: date });
                    })
                  }
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>

                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={selectSetores}
                  onChange={handleSelectChangeSetores}
                  value={formData.SETOR_ORIGEM}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label={`Setor - ${formData.SETOR_ORIGEM}`} />}
                />
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tipo de Nota</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Tipo"
                    onChange={handleSelectChangeTipoNota}
                  >
                    {
                      selectTipo.map((item) => (<MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                      ))
                    }
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                <InputAmvox
                  required
                  label="Aprovador"
                  value={notaEscolhida.aprovador}
                  disabled
                  sx={{ flex: 2 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                  <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
                    Atualizar Anexo (PDF)
                    <VisuallyHiddenInput type="file" accept="application/pdf" onChange={(e) =>
                      setFormData({
                        ...formData,
                        ANEXO: e.target.files[0],
                      })
                    } />
                  </Button>
                  <Typography>{formData.ANEXO?.name}</Typography>
                </Box>
              </Box>
              <TextField
                id="outlined-multiline-static"
                label="Observação"
                multiline
                fullWidth
                name='OBSERVACAO'
                rows={2}
                value={formData.OBSERVACAO}
                onChange={inputTextHandler}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'end', my: 2, gap: 2 }}>
              <Button type="submit" variant='contained' color='primary' startIcon={<CheckCircleOutline />} size='small' >
                Atualizar/Salvar
              </Button>
              <Button variant='contained' color='warning' size='small' endIcon={<ExitToApp />} onClick={handleCancelar}
              >
                Cancelar/Fechar
              </Button>
            </Box>
          </Box>
        </form>


      </Modal>
      {/* <div>

            
          </div>
          <div className="col-sm-3 col-12">
          <label className="form-label">Setor Origem</label>
          <Select
            aria-required
            options={selectSetores}
            onChange={handleSelectChangeSetores}
            placeholder="Setor"
            />
          </div>

          <div className="col-sm-3 col-12">
            <label className="form-label">Tipo</label>
            <input
              name="NOTA"
              value={notasSelecionada.tipo}
              id="nota"
              type="text"
              className="form-control"
              placeholder="Chave NF"
              maxLength={44}
              disabled
            />
             </div>
             <div className="col-sm-3 col-12">
            <label className="form-label">Tipo</label>
            <Select
            aria-required
            options={selectTipo}
            onChange={handleSelectChangeTipoNota}
            placeholder="Tipo"
            />
          
          </div>
          <div className="col-sm-6 col-12">
            <label className="form-label">Aprovador</label>
            <input
              name="NOTA"
              value={notasSelecionada.aprovador}
              id="nota"
              type="text"
              className="form-control"
              placeholder="Chave NF"
              maxLength={44}
              disabled
            />
          </div>
          <div className="col-sm-6 col-12">
            <label htmlFor="formFile" className="form-label">
              Anexo
            </label>
            <input
              className="form-control"
              name="docNf"
              type="file"
              accept="application/pdf"
              id="formFile"
              onChange={(e) =>
                  setNota({
                    ...nota,
                    ANEXO: e.target.files[0],
                  })
                }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <label className="form-label">Observação</label>
            <br />
            <textarea
              name="OBSERVACAO"
              placeholder="Observação"
              className="form-control"
              defaultValue={notasSelecionada.observacao}
              onChange={inputTextHandler}
              rows="2"
            ></textarea>
          </div>
        </div>

        <div className="row">
          <div className="col-12  mt-2">
            <button className="btn btn-outline-success me-2" type="submit">
              <i className="fas fa-plus me-2"></i>
              Atualizar
            </button>
            <button
              className="btn btn-outline-warning"
              onClick={handleCancelar}
            >
              <i className="fas fa-plus me-2"></i>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div> */}
    </>
  )
}
