import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, FormLabel, TextField } from '@mui/material';
import { MdClose } from 'react-icons/md';
import { postOtif } from '../../kpiTransport.service';
import { useToast } from '../../../../../hooks/toast.hook';
import useUsuarioLocal from '../../../../../hooks/usuarioLocal.hook';

const style = {
  position: 'absolute',
  flexDirection: 'column',
  display: 'flex',
  top: '45%',
  left: '50%',
  maxWidth: '90%',
  maxHeight: '80%',
  overflowY: 'auto',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '16px',
  p: '24px',
  gap: '16px',
};

interface FormData {
  dtMeta: string;
  mtaPorcentagm: number;
  qtdAgend: string;
  qtdNoShow: string;
}

const initialFormData: FormData = {
  dtMeta: '',
  mtaPorcentagm: 0,
  qtdAgend: '',
  qtdNoShow: '',
};

interface ModalCadastrarOtif {
  handleGetOtif: () => void;
}

export default function ModalCadastrarOtif({
  handleGetOtif,
}: ModalCadastrarOtif) {
  const { addToast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<FormData>(initialFormData);
  const { id } = useUsuarioLocal();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData(initialFormData);
  };

  const inputTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        dtMeta: new Date(formData.dtMeta).toISOString(),
        mtaPorcentgm: Number(formData.mtaPorcentagm),
        qtdAgend: parseFloat(formData.qtdAgend),
        qtdNoShow: parseFloat(formData.qtdNoShow),
        userRegisID: id,
      };

      await postOtif(payload);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Cadastro realizado com sucesso!',
      });
      handleClose();
      handleGetOtif();
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        error.response &&
        typeof error.response === 'object' &&
        'data' in error.response &&
        error.response.data &&
        typeof error.response.data === 'object' &&
        'message' in error.response.data
      ) {
        addToast({
          type: 'danger',
          title: 'Erro',
          description: error.response.data.message,
        });
      } else {
        addToast({
          type: 'danger',
          title: 'Erro',
          description: 'Erro desconhecido ao cadastrar Otif.',
        });
      }
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ textTransform: 'capitalize', height: '32px', bgcolor: '#A00' }}
      >
        Cadastrar
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Cadastrar OTIF
            </Typography>
            <IconButton onClick={handleClose}>
              <MdClose />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Data da meta</FormLabel>
            <TextField
              fullWidth
              type="date"
              name="dtMeta"
              value={formData.dtMeta}
              onChange={inputTextHandler}
              sx={{ minWidth: '400px' }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Meta porcetagem</FormLabel>
            <TextField
              type="number"
              fullWidth
              name="mtaPorcentagm"
              value={formData.mtaPorcentagm}
              onChange={inputTextHandler}
              sx={{ minWidth: '400px' }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Quantidade agendada</FormLabel>
            <TextField
              fullWidth
              name="qtdAgend"
              value={formData.qtdAgend}
              onChange={inputTextHandler}
              sx={{ minWidth: '400px' }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Quantidade no Show</FormLabel>
            <TextField
              fullWidth
              name="qtdNoShow"
              value={formData.qtdNoShow}
              onChange={inputTextHandler}
              sx={{ minWidth: '400px' }}
            />
          </Box>

          <Box>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{ bgcolor: '#A00', textTransform: 'capitalize' }}
            >
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
