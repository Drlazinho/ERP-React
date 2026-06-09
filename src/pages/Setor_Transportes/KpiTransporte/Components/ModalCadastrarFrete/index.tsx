import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, FormLabel, TextField } from '@mui/material';
import { MdClose } from 'react-icons/md';
import { postFrete } from '../../kpiTransport.service';
import { useToast } from '../../../../../hooks/toast.hook';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';

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
  vlrNfsFat: string;
  vlrMtaMensal: string;
  vlrFrteRealizdo: string;
  mtaPorcentgm: number;
}

const initialFormData: FormData = {
  dtMeta: '',
  vlrNfsFat: '',
  vlrMtaMensal: '',
  vlrFrteRealizdo: '',
  mtaPorcentgm: 0,
};

interface ModalCadastrarFreteProps {
  handleFrete: () => void;
}

export default function ModalCadastrarFrete({
  handleFrete,
}: ModalCadastrarFreteProps) {
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

  function parseBRLToFloat(value: string): number {
    if (!value) return 0;
    return parseFloat(value.replace(/\./g, '').replace(',', '.'));
  }

  const handleSubmit = async () => {
    try {
      const payload = {
        dtMeta: new Date(formData.dtMeta).toISOString(),
        vlrNfsFat: parseBRLToFloat(formData.vlrNfsFat),
        vlrMtaMensal: parseBRLToFloat(formData.vlrMtaMensal),
        vlrFrteRealizdo: parseBRLToFloat(formData.vlrFrteRealizdo),
        mtaPorcentgm: Number(formData.mtaPorcentgm),
        userRegisID: id,
      };

      await postFrete(payload);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Cadastro realizado com sucesso!',
      });
      handleClose();
      handleFrete();
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
          description: 'Erro desconhecido ao cadastrar frete.',
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
              Cadastrar frete
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
            <FormLabel>Valor NF Faturado</FormLabel>

            {/* <IMaskInput
              mask={'000.000.000.000,00'}
              value={formData.vlrNfsFat}
              unmask={true}
              inputRef={(ref) => {
                return (
                  <TextField
                    fullWidth
                    name="vlrNfsFat"
                    value={formData.vlrNfsFat}
                    onChange={inputTextHandler}
                    sx={{ minWidth: '400px' }}
                  />
                );
              }}
              onAccept={(value, mask) => {
                setNota({ ...nota, NOTA: value }), setFiltro(value);
              }}
            ></IMaskInput> */}
            <TextField
              fullWidth
              name="vlrNfsFat"
              value={formData.vlrNfsFat}
              onChange={inputTextHandler}
              sx={{ minWidth: '400px' }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Meta</FormLabel>
            <TextField
              fullWidth
              name="vlrMtaMensal"
              value={formData.vlrMtaMensal}
              onChange={inputTextHandler}
              sx={{ minWidth: '400px' }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Valor realizado</FormLabel>
            <TextField
              fullWidth
              name="vlrFrteRealizdo"
              value={formData.vlrFrteRealizdo}
              onChange={inputTextHandler}
              sx={{ minWidth: '400px' }}
            />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Meta percentual</FormLabel>
            <TextField
              type="number"
              fullWidth
              name="mtaPorcentgm"
              value={formData.mtaPorcentgm}
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
