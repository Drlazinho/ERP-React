import React, { useEffect, useState } from 'react';
import { useToast } from '../../../../../hooks/toast.hook';
import LabelInput from '../../../../../components/Forms/LabelInput';
import { Container, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import LabelTextArea from '../../../../../components/Forms/LabelTextArea';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
dayjs.locale('pt-br');
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import useUsuarioLocal from '../../../../../hooks/usuarioLocal.hook';
import { InputDateAmvox } from '../../../../../components/InputDateAmvox/InputDateAmvox'

const style = {
  position: 'absolute',
  top: '15%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  height: 250,
  bgcolor: 'background.paper',
  boxShadow: '5px 2px 35px 5px',
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


const listaIdAprov = [
  {
    label: 'Gilberto Artur - Prod/Adm/Ti',
    value: 3,
    email: 'artur@amvox.com.br'
  },
  {
    label: 'Lucas Souza - Pos-Venda',
    value: 19,
    email: 'gerenciaposvendas@amvox.com.br'
  },
  {
    label: 'Alexandro Teixeira - Fiscal',
    value: 40,
    email: 'fiscal@amvox.com.br'
  },
  {
    label: 'Calebe Moraes - Financeiro',
    value: 97,
    email: 'gerentefinanceiro@amvox.com.br'
  },
  {
    label: 'Priscila Souza - Pós-Venda',
    value: 50,
    email: 'supervisoraatendimento@amvox.com.br'
  },
];

const notaInicial = {
  NOTA: '',
  DATA_VENCIMENTO: '',
  SETOR_ORIGEM: '',
  ANEXO: '',
  OBSERVACAO: '',
  ID_APROV: 0,
  ID_TIPO: 0,
  ID_USER: 0,
};

export default function RegistroNotaModal({
  setValorForm,
  adicionarNovaNota,
  tipoApi,
  setores
}) {
  const [notasLista, setNotasListas] = useState([]);
  const [dataVencimento, setDataVencimento] = useState('');
  const [tipo, setTipo] = useState('');
  const [setor, setSetor] = useState('');
  const [aprovador, setAprovador] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [dataInicial, setDataInicial] = useState('');
  const [nomeAprovador, setNomeAprovador] = useState('');
  const [dataEmissaoInicio, setDataEmissaoInicio] = useState('');
  const [dataPrevisaoInicio, setDataPrevisaoInicio] = useState('');
  const [AbriModal, setAbrirModal] = useState(false);
  const [dataSaidaInicio, setDataSaidaInicio] = useState(null);
  const { id } = useUsuarioLocal();
  const [arrayObj, setArrayObj] = useState([]);
  const [enabled, setEnable] = useState(false);
  const [notaFiscalInfo, setNotaFiscalInfo] = useState(notaInicial);
  const [emailDestino, setEmailDestino] = useState('')
  const [tipoDeLeitura, setTipoDeLeitura] = useState('Leitor')
  const handleAddNota = () => {
    if (nota.OBSERVACAO && nota.NOTA !== '' && nota?.NOTA.length == 44) {
      setNotasListas((oldState) => [...oldState, nota]);
      handleClear();
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleClear = () => {
    setNota({
      id: '',
      NOTA: '',
      ANEXO: '',
      OBSERVACAO: '',
    });
  };
  const [nota, setNota] = useState({
    id: '',
    NOTA: '',
    ANEXO: '',
    OBSERVACAO: '',
  });
  const { addToast } = useToast();
  const formatDateForDisplay = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = (index) => {
    setNotasListas((prevNotasLista) => {
      const novaLista = [...prevNotasLista];
      novaLista.splice(index, 1);
      return novaLista;
    });
  };

  const [dados, setDados] = useState({
    aprovador: '',
    setor: '',
    tipo: '',
    data: '',
  });
  const handleChangeSetor = (event) => {
    setDados((prevDados) => ({
      ...prevDados,
      setor: event.target.value,
    }));
  };

  const handleChangeAprovador = (event) => {
    const selectedAprovador = listaIdAprov.find(
      (item) => item.label === event.target.value
    );
    if (selectedAprovador) {
      setAprovador(selectedAprovador.value);
      setNomeAprovador(selectedAprovador.label);
      setDados((prevDados) => ({
        ...prevDados,
        aprovador: selectedAprovador.value,
      }));
    }
  }

  const handleChangeTipo = (event) => {
    const selectedTipoId = event.target.value;
    setTipo(selectedTipoId);
    setDados((prevDados) => ({
      ...prevDados,
      tipo: event.target.value,
    }));
  };
  const listaIdAprov = [
    {
      label: 'Gilberto Artur - Prod/Adm/Ti',
      value: 3,
      email: 'artur@amvox.com.br',
    },
    {
      label: 'Lucas Souza - Pos-Venda',
      value: 19,
      email: 'gerenciaposvendas@amvox.com.br',
    },
    {
      label: 'Alexandro Teixeira - Fiscal',
      value: 40,
      email: 'fiscal@amvox.com.br',
    },
    {
      label: 'Calebe Moraes - Financeiro',
      value: 97,
      email: 'gerentefinanceiro@amvox.com.br',
    },
    {
      label: 'Priscila Souza - Pós-Venda',
      value: 50,
      email: 'supervisoraatendimento@amvox.com.br',
    },
  ];

  const [dadosModal, setDadosModal] = useState({
    DATA_VENCIMENTO: dataInicial,
    SETOR_ORIGEM: dados?.setor,
    ID_USER: id,
    ID_APROV: aprovador,
    ID_TIPO: tipo,
  });

  useEffect(() => {
    setDadosModal((prevFiltro) => ({
      ...prevFiltro,

      ID_USER: id,
      ID_APROV: aprovador,
      ID_TIPO: tipo,
      SETOR_ORIGEM: dados?.setor,
      DATA_VENCIMENTO: dataInicial,
    }));
  }, [notasLista, dataInicial, dados]);
  
const handleDataLista = () => {
    const Lista = [];

    notasLista.forEach((item) => {
      Lista.push({
        DATA_VENCIMENTO: dadosModal.DATA_VENCIMENTO,
        NOTA: item.NOTA,
        SETOR_ORIGEM: dadosModal.SETOR_ORIGEM,
        ANEXO: item.ANEXO,
        ID_USER: dadosModal.ID_USER,
        ID_APROV: dadosModal.ID_APROV,
        ID_TIPO: dadosModal.ID_TIPO,
        OBSERVACAO: item.OBSERVACAO,
      });
    });

    const isUnique = (value, index, self) => {
      return self.findIndex((obj) => obj.NOTA === value.NOTA) === index;
    };

    const uniqueLista = Lista.filter(isUnique);

 
  setValorForm(uniqueLista);
  };
  
  const handleCancelar = () => {
    setDadosModal({
      ID_USER: null,
      ID_APROV: null,
      ID_TIPO: null,
      SETOR_ORIGEM: null,
      DATA_VENCIMENTO: null,
    });
  };
  
  return (
       <form>
      <Container>
      <div className='row'>        <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              onChange={(e) => setTipoDeLeitura(e.target.value)}
              value={tipoDeLeitura}
              sx={{ px: 2 }}
            >
              <FormControlLabel value="Leitor" control={<Radio />} label="Leitor" />
              <FormControlLabel value="Teclado" control={<Radio />} label="Teclado" />
            </RadioGroup>
          </FormControl></div>

        <div className="w-100 d-flex justify-content-around align-items-center">
            <div className="col-sm-6 col-12">
              {
                tipoDeLeitura === 'Leitor' ?
                  <>
                    <label className="form-label">Nota (Número da Chave)* - Leitor</label>
                    <input
                      name="NOTA"
                      value={nota?.NOTA}
                      onChange={(e) => {
                        setNota({ ...nota, NOTA: e.target.value });
                      }}
                      id="nota"
                      type="text"
                      className="form-control"
                      placeholder="Chave NF (Teclado)"
                      maxLength={44}
                      required
                    />      
                  </>
                  :
                  <>
                    <label className="form-label">Nota (Número da Chave)* -  Teclado</label>
                    <input
                      name="NOTA"
                      value={nota?.NOTA}
                      onChange={(e) => {
                        setNota({ ...nota, NOTA: e.target.value });
                      }}
                      id="nota"
                      type="text"
                      className="form-control"
                      placeholder="Chave NF (Teclado)"
                      maxLength={44}
                      required
                    />                  </>
              }

            </div>
          {/* <div className="col-sm-6 col-12">
            <LabelInput
              label="Notas Fiscal (Número da Chave)"
              name="NOTA"
              value={nota?.NOTA}
              type="text"
              placeholder="Chave NF"
              minLength={44}
              maxLength={44}
              onChange={(e) => {
                setNota({ ...nota, NOTA: e.target.value });
              }}
            />
          </div> */}
          <div className="col-sm-6 col-12 ">
            <LabelInput
              label="Anexo"
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
          </div>{' '}
        </div>
        <LabelTextArea
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
      </Container>
      <div className="row">
        <div className="col-12  mt-2 d-flex justify-content-end">
          <div>
            {AbriModal && (
              <section id="modal" style={styleModal}>
                <Box sx={style}>
                  <div className="d-column w-100 ">
                    <div className="d-flex w-100 gap-2">
                      <div className="col-sm-6 col-12 pt-4 ">
                      <InputDateAmvox
                          label="Data Inicial"
                          value={dataSaidaInicio || ""}
                          onChange={(date) => {
                            setDataSaidaInicio(date);
                            setDataInicial(date);
                          }}
                          format="YYYY-MM-DD"
                        />
                      </div>
                      <Box className="col-sm-6 col-12 ">
                        <label className="form-label">Setor Origem</label>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            None
                          </InputLabel>
                          <Select
                            defaultValue=""
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="None"
                            onChange={handleChangeSetor}
                          >
                            {setores?.map((item) => (
                              <MenuItem key={item.setor} value={item.setor}>
                                {item.setor}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="d-flex w-100 gap-2">
                      <Box className="col-sm-6 col-12 ">
                        <label className="form-label">Aprovador</label>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            None
                          </InputLabel>
                          <Select
                            defaultValue=""
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="None"
                            onChange={(event) => handleChangeAprovador(event)}
                          >
                            {listaIdAprov?.map((item) => (
                              <MenuItem key={item.label} value={item.label}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                      <Box className="col-sm-6 col-12 ">
                        <label className="form-label">Tipo</label>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            None
                          </InputLabel>
                          <Select
                            defaultValue=""
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="None"
                            onChange={(event) => handleChangeTipo(event)}
                          >
                            {tipoApi?.map((item) => (
                              <MenuItem key={item.id} value={item.id}>
                                {item.descricao}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="d-flex justify-content-end">
                      <Button
                        onClick={() => {
                          handleDataLista(),
                            handleClose(),
                            // adicionarNovaNota(),
                            setAbrirModal(false);
                            // handleClick();
                        }}
                        className="btn btn-sm bg-primary text-light me-1 mt-2"
                      >
                        Finalizar
                      </Button>
                      <Button
                        onClick={() => {
                          setAbrirModal(false);
                          handleCancelar();
                        }}
                        className="btn btn-sm bg-danger text-light me-1 mt-2"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </Box>
              </section>
            )}
          </div>

          <button
            className="btn btn-outline-primary me-2"
            type="reset"
            onClick={() => {
              handleAddNota();
            }}
          >
            <i className="fas fa-plus me-2"></i>
            Adicionar nota
          </button>
          <button
            className="btn btn-outline-warning"
            // onClick={handleCancelar}
          >
            Cancelar
          </button>
          {/* <button
            className="btn btn-outline-danger"
            // onClick={handleCancelar}
          >
            <i className="fas fa-plus me-2"></i>
            Adicionar
          </button> */}
        </div>

        <div className="flex-column w-100" style={{ maxHeight: '500px' }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '100px' }}>NOTA</th>
                <th style={{ width: '200px' }}>OBSERVACAO</th>

                <th>Ações</th>
              </tr>
            </thead>
            <tbody className="overflow-auto h-75">
              {notasLista.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{ fontSize: 12, paddingTop: '10px', width: '100px' }}
                  >
                    {item.NOTA}
                  </td>
                  <td style={{ width: '100px', wordWrap: 'break-word' }}>
                    {item.OBSERVACAO}
                  </td>

                  <td className="justify-content-end   p-2">
                    <Button
                      onClick={() => handleDelete(index, item.NOTA)}
                      className="btn btn-sm"
                      variant="outlined"
                      size="small"
                    >
                      <DeleteIcon color="error" size={20} />
                      Deletar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-100 d-flex justify-content-end align-items-center">
          <Button
            disabled={notasLista?.length > 0 ? false : true}
            className="btn btn-sm bg-success text-light me-1 mt-2"
            onClick={() => {
              handleOpen(), setAbrirModal(true);
            }}
          >
            Registrar
          </Button>
        </div>
      </div>
    </form>
)
}
