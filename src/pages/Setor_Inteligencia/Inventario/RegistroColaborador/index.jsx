import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import ButtonCloseModal from '@/components/ButtonCloseModal';
import { Delete, Send } from '@mui/icons-material';
import CardColaborador from './TabelaColaborador';
import Modal_colaborador from './TabelaColaborador/Modal_colaborador';
import modal_number from './TabelaColaborador/modal_numberOrLatter/modal_numer';
import { set } from 'date-fns';
import { useToast } from '@/hooks/toast.hook';
import { registrarInvColaborador } from '@/pages/Setor_Inteligencia/Inventario/invEquipamento.service';
import { Cell } from 'recharts';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '60%',
  height: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  p: 4,
};

const invColaboradorInicial = {
  nome: '',
  matricula: '',
};

export default function ModalRegistrarInvColaborador({
  open,
  onClose,
  handleSubmit,
  handleFiltro,
  listaColaborador,
}) {
  const [data, setData] = useState(invColaboradorInicial);
  const [putColaborador, setPutColaborador] = useState([]);
  const { addToast } = useToast();

  const [_nome, _setNome] = useState('');
  const [_matricula, _setMatricula] = useState('');


  const cancelData = () => {
    setData(invColaboradorInicial);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    handleFiltro({ [name]: value });
  };

  const handleSubmitData = () => {
    handleSubmit(_colaborador);
    setData(invColaboradorInicial);
    onClose();
  };

  const [termo_colaborador, setTermoColaborador] = useState('');
  const [termo_matricula, set_termo_matricula] = useState('');
  const [termoNome, setTermoNome] = useState('');

  const handleInputChangeMatricula = (e) => {
    const novoTermoMatricula = e.target.value;
    set_termo_matricula(novoTermoMatricula);

    if (novoTermoMatricula.match(regex_number)) {
      addToast({
        type: 'danger',
        title: 'Digite apenas números e sem espaço!',
      });
      setCondition_Nome(true);
    } else {
      setCondition_Nome(false);
    }
  };

  const [condition_nome, setCondition_Nome] = useState(true);

  const regex_number = /[^0-9]/g;
  const regex_latter = /\d+/g;

  const handleInputChangeColaborador = (e) => {
    const novoTermoColaborador = e.target.value;
    setTermoColaborador(novoTermoColaborador);
  };

  const handleInputChangeNome = (e) => {
    const novoTermoNome = e.target.value;
    setTermoNome(novoTermoNome);

    if (novoTermoNome.match(regex_latter)) {
      addToast({
        type: 'danger',
        title: 'Digite apenas letras!',
      });
    } else {
      setCondition_Nome(false);
    }
  };

  const handle = () => {
    setTermoColaborador('');
  };

  const colaboradoresFiltradosNome = listaColaborador.filter(
    (colaboradorNome) =>
      colaboradorNome.nome
        .toLowerCase()
        .includes(termo_colaborador.toLowerCase())
  );

  const colaboradoresFiltradosMatricula = listaColaborador.filter(
    (colaboradorNome) =>
      colaboradorNome.registroAmvox
        .toLowerCase()
        .includes(termo_colaborador.toLowerCase())
  );

  const style_filter = {
    position: 'absolute',
    display: 'block',
    justifyContent: 'around',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: '400px',
  };

  const  handleAdicionarColaborador = async (e) => {
      await registrarInvColaborador(_colaborador).then((retorno) => {
        addToast({
          type: 'success',
          description: retorno.message
        });
      }).catch((_err) => {
        addToast({
          type: 'danger',
          description: _err.response.data.error
        });
      }).finally(() => onClose());
      
  };

  const _colaborador = {
    nome: termoNome,
    matricula: termo_matricula,
  };


  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <ButtonCloseModal onClick={cancelData} />
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#000' }}>
          Registrar Colaborador
        </Typography>
        <form onSubmit={handleSubmitData}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              my: 2,
              justifyContent: 'center',
            }}
          >
            <FormControl
              variant="filled"
              sx={{ width: '690px', height: '60px' }}
            >
              <TextField
                className="mb-2"
                variant="filled"
                id="outlined-multiline-static"
                label="Nome"
                name="nome"
                rows={3}
                required
                onChange={handleInputChangeNome}
                value={termoNome}
                size="small"
              />
              <TextField
                className=""
                variant="filled"
                id="outlined-multiline-static"
                label="Matricula"
                name="matricula"
                rows={3}
                required
                value={termo_matricula}
                onChange={handleInputChangeMatricula}
                size="small"
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              height: '50px',
              margin: 'dense',
            }}
            className="mt-5 "
          >
            <Button
              className="m-2"
              size="large"
              variant="contained"
              color="success"
              
              disabled={condition_nome}
              endIcon={<Send />}
              onClick={handleAdicionarColaborador}
            >
              Adicionar Colaborador
            </Button>

            <Button
              className="m-2"
              size="large"
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={cancelData}
              type="reset"
            >
              Cancelar
            </Button>
          </Box>
          <Typography variant="h6" sx={{ textAlign: 'center', color: '#000' }}>
            Atualizar Registro Colaborador
          </Typography>
        </form>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
            my: 2,
            padding: '0px',
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            id="outlined-multiline-static"
            label="Colaborador"
            name="nome"
            rows={3}
            size="small"
            value={termo_colaborador}
            onChange={handleInputChangeColaborador}
          />
          <Button
            variant="outlined"
            color="error"
            onClick={() => setTermoColaborador('')}
          >
            Limpar
          </Button>
        </Box>

        <Box
          sx={{
            overflow: 'scroll',
            height: 500,
            display: 'flex',
            gap: 1,
            flexDirection: 'column',
          }}
        >
          {termo_colaborador === '' ? (
            <div>
              {listaColaborador &&
                listaColaborador.map((item) => (
                  <CardColaborador
                    colaborador={item}
                    key={item.id}
                    id={item.id}
                    nome={item.nome}
                    matricula={item.registroAmvox}
                  />
                ))}
            </div>
          ) : (
            <div>
              {!isNaN(termo_colaborador) ? (
                <div>
                  <Box fullWidth>
                    <div className="d-flex w-75 ps-3 justify-content-between ">
                      <p>ID</p>
                      <p>NOME</p>
                      <p>MATRÍCULA</p>
                    </div>
                    {colaboradoresFiltradosMatricula.map((colaborador) => (
                      <div className="d-flex w-100 justify-content-between border p-3">
                        <Modal_colaborador
                          id={colaborador.id}
                          nome={colaborador.nome}
                          matricula={colaborador.registroAmvox}
                        ></Modal_colaborador>
                      </div>
                    ))}
                  </Box>
                </div>
              ) : (
                <div>
                  <Box fullWidth>
                    <div className="d-flex w-75 ps-3 justify-content-between ">
                      <p>ID</p>
                      <p>NOME</p>
                      <p>MATRÍCULA</p>
                    </div>
                    {colaboradoresFiltradosNome.map((colaborador) => (
                      <div className="d-flex w-100 justify-content-between border">
                        <Modal_colaborador
                          id={colaborador.id}
                          nome={colaborador.nome}
                          matricula={colaborador.registroAmvox}
                        ></Modal_colaborador>
                      </div>
                    ))}
                  </Box>
                </div>
              )}
            </div>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
