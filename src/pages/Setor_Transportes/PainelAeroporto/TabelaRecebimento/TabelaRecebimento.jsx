import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Typography,
  Box,
  Button,
  FormLabel,
  Select,
  MenuItem,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { apiFabrica_operacao } from '@/services/apis';
import { useToast } from '@/hooks/toast.hook';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  height: '250px',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '16px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  p: 4,
  overflowY: 'auto',
  '&::-webkit-scrollbar': { display: 'none' },
};

const interfaceStatusCadastro = [
  { id: 1, status: 'EM DOCA' },
  { id: 2, status: 'EM CARREGAMENTO' },
  { id: 3, status: 'EM DESCARGA' },
  { id: 4, status: 'ACESSANDO O PATIO' },
  { id: 5, status: 'LIBERADO' },
  { id: 6, status: 'CANCELADO' },
  { id: 7, status: 'AGUARD. SEPARAÇÃO' },
];

export function TabelaRecebimento({ listaRecebimento = [], handleFetch }) {
  const [showModal, setShowModal] = useState(false);
  const [novoStatus, setNovoStatus] = useState('');
  const [itemSelecionado, setItemSelecionado] = useState('');
  const { addToast } = useToast();

  const handleClose = () => {
    setShowModal(false);
    setNovoStatus('');
    setItemSelecionado('');
  };

  const AtualizarStatus = async (idSelecionado, novoStatusSelecionado) => {
    try {
      await apiFabrica_operacao.put(
        `/RecebimentoPermanenciaContainer?id=${idSelecionado}&status=${novoStatusSelecionado}`
      );
      addToast({ type: 'success', title: 'Sucesso ao atualizar status!' });
      handleFetch();
    } catch (err) {
      addToast({ type: 'warning', title: 'Erro ao atualizar status!' });
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <Modal open={showModal} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{ fontSize: '16px', fontWeight: 'bold' }}
            >
              Atualizar Status
            </Typography>
            <Button onClick={handleClose} variant="text">
              <CloseIcon sx={{ color: '#333' }} />
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormLabel sx={{ fontWeight: 'bold', fontSize: '12px' }}>
              Status
            </FormLabel>
            <Select
              size="small"
              fullWidth
              value={novoStatus}
              onChange={(e) => setNovoStatus(e.target.value)}
            >
              {interfaceStatusCadastro.map((item) => (
                <MenuItem key={item.id} value={item.status}>
                  {item.status}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              size="small"
              sx={{ backgroundColor: 'green', color: 'white', mt: 2 }}
              onClick={() => AtualizarStatus(itemSelecionado, novoStatus)}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>

      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="small">
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell align="center">Hora De Chegada</TableCell>
              <TableCell align="center">Hora Da Finalização</TableCell>
              <TableCell align="center">HoraRec Logist</TableCell>
              <TableCell align="center">Doca</TableCell>
              <TableCell align="center">Motorista</TableCell>
              <TableCell align="center">D.I</TableCell>
              <TableCell align="center">BL</TableCell>
              <TableCell align="center">CNTR</TableCell>
              <TableCell align="center">Transporte</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(listaRecebimento?.containeres) &&
              listaRecebimento?.containeres.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell align="center">{row.inicio_op}</TableCell>
                  <TableCell align="center">{row.final_op}</TableCell>
                  <TableCell align="center">{row.chegada}</TableCell>
                  <TableCell align="center">
                    <b>{row.doca}</b>
                  </TableCell>
                  <TableCell align="center">{row.motorista}</TableCell>
                  <TableCell align="center">
                    {row.declaracao_importacao}
                  </TableCell>
                  <TableCell align="center">{row.bl}</TableCell>
                  <TableCell align="center">{row.container}</TableCell>
                  <TableCell align="center">{row.transportadora}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        borderRadius: '16px',
                        border: '2px solid #799351',
                        backgroundColor: '#f0fff0',
                        color: '#799351',
                        fontWeight: 'bold',
                      }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        setItemSelecionado(row.id);
                        setShowModal(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
