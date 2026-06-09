import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  Button,
  Modal,
  Box,
  IconButton,
  TextField,
  FormControl,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { formatDateTotvsFromDate } from '@/utils/formatDataTotvs';
import { formatDateToHtml } from '@/utils/formatDate';
import { updateInspecaoFornecedor } from '@/pages/Setor_ComprasInt/Inspecao/inspecao.service';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import { useToast } from '@/hooks/toast.hook';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};

FasesModal.propTypes = {
  show: PropTypes.bool,
  alteracao: PropTypes.string,
  data: PropTypes.object,
  closeModal: PropTypes.func,
};

export default function FasesModal({ show, closeModal, alteracao, data }) {
  const [dataAlteracao, setDataAlteracao] = useState(
    formatDateToHtml(new Date())
  );

  const { addToast } = useToast();

  const handleCancelar = useCallback(() => {
    closeModal();
  }, []);

  const handleSubmit = useCallback(() => {
    const item = data;

    const dataFormatada = formatDateTotvsFromDate(dataAlteracao);

    switch (alteracao) {
      case 'dataProducao':
        item.dataProducao = dataFormatada;
        break;
      case 'dataPrevista':
        item.dataPrevista = dataFormatada;
        break;
      case 'dataTransporte':
        item.dataTransporte = dataFormatada;
        break;
      case 'dataEntrega':
        item.dataEntrega = dataFormatada;
        break;
      case 'dataInspecao':
        item.dataInspecao = dataFormatada;
        break;
    }
    const { nivel } = useUsuarioLocal();

    if (nivel === 2 || nivel === 5 || nivel === 8) {
      updateInspecaoFornecedor(item.id, item)
        .then((res) => {
          closeModal();
        })
        .catch((err) => err);
    } else {
      addToast({
        type: 'warning',
        title: 'Sem Permissão',
        description:
          'Seu perfil não possui permissão para atualizar as data de Inspeção',
      });
    }
  }, [data, dataAlteracao]);

  return (
    <Modal open={show} onClose={handleCancelar} size="lg">
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: '24px',
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
          >
            Choose Inspection Date
          </Typography>

          <Button
            type="reset"
            onClick={() => {
              handleCancelar();
            }}
            variant="text"
          >
            <CloseIcon sx={{ color: '#333333' }} />
          </Button>
        </Box>
        <Box sx={{ mb: '24px' }}>
          <FormControl
            sx={{ fontSize: '12px', fontWeight: 'bold', color: '#333333' }}
          >
            Date Inspection
          </FormControl>
          <TextField
            name="data"
            onChange={(e) => setDataAlteracao(e.target.value)}
            value={dataAlteracao}
            id="nome"
            type="date"
            className="form-control"
            placeholder="dd/mm/yyyy"
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            startIcon={<AddIcon />}
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            Confirm
          </Button>
          <Button
            startIcon={<CloseIcon />}
            variant="contained"
            color="error"
            onClick={handleCancelar}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
