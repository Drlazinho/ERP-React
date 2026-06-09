import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HistoryIcon from '@mui/icons-material/History';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '90%',
  maxHeight: '80%',
  overflowY: 'auto',
  padding: '32px',
  borderRadius: '16px',
  bgcolor: 'background.paper',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
  gap: '32px',
};

const tableContainerStyle = {
  maxHeight: '400px',
  overflowY: 'auto',
};

export default function ModalHistorico({ dataHistorico }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        startIcon={<HistoryIcon />}
        sx={{ color: '#333' }}
      >
        Histórico
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: '#A00' }}
            >
              Histórico
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <TableContainer component={Paper} sx={tableContainerStyle}>
            <Table sx={{ minWidth: 1120 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Atualizado em</TableCell>
                  <TableCell>Usuário</TableCell>
                  <TableCell>ARM 30</TableCell>
                  <TableCell>ARM 40</TableCell>
                  <TableCell>ARM 50</TableCell>
                  <TableCell>ARM 51</TableCell>
                  <TableCell>ARM 52</TableCell>
                  <TableCell>Qtd Com Divergência</TableCell>
                  <TableCell>Acuracidade Geral</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataHistorico.map((entry) => {
                  const armCounts = {
                    arm30: 0,
                    arm40: 0,
                    arm50: 0,
                    arm51: 0,
                    arm52: 0,
                    acuracidadeGeral: entry.acuracidadeGeral || '0',
                    qtdComDivergencia: 0,
                  };

                  entry.inventarios.forEach((inventario) => {
                    const armKey = `arm${inventario.armazem}`;
                    armCounts[armKey] += inventario.qtdContada;
                    armCounts.qtdComDivergencia +=
                      inventario.qtdComDivergencia || 0;
                  });

                  return (
                    <TableRow
                      key={entry.data}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {new Date(entry.data).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {entry.inventarios[0]?.nomeUser || 'Desconhecido'}
                      </TableCell>
                      <TableCell>{armCounts.arm30 || '0'}</TableCell>
                      <TableCell>{armCounts.arm40 || '0'}</TableCell>
                      <TableCell>{armCounts.arm50 || '0'}</TableCell>
                      <TableCell>{armCounts.arm51 || '0'}</TableCell>
                      <TableCell>{armCounts.arm52 || '0'}</TableCell>
                      <TableCell align="center">
                        {armCounts.qtdComDivergencia || '0'}
                      </TableCell>
                      <TableCell align="center">
                        {armCounts.acuracidadeGeral}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
}
