import * as React from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
  Button,
} from '@mui/material';
import { formatarImagem } from '@/utils/formatarImagem';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CardChatHistoricoAbertura({ dataCardDetalhe }) {
  const [imagemAberta, setImagemAberta] = React.useState(null);

  const handleClickOpen = (id) => {
    setImagemAberta(id);
  };

  const handleClose = () => {
    setImagemAberta(null);
  };

  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString('pt-BR', options);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {dataCardDetalhe?.chamadosDetalhes?.map((detalhe) => (
        <Box
          key={detalhe.idDetalhe}
          sx={{
            bgcolor: detalhe.flag === 'Direita' ? '#F5F5F5' : '#FCF1E7',
            borderRadius: '16px',
            padding: '16px',
            width: '50%',
            alignSelf: detalhe.flag === 'Direita' ? 'flex-start' : 'flex-end',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: '#333', fontWeight: '500', mb: '8px' }}
            >
              {detalhe.flag === 'Esquerda'
                ? `${detalhe.remetenteNome} `
                : detalhe.flag === 'Direita'
                ? `${detalhe.remetenteNome} `
                : ``}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: '#767676', fontSize: '12px', mb: '5px' }}
            >
              deixou um comentário:
            </Typography>
          </Box>

          <Box sx={{ mb: '8px', wordBreak: 'break-word' }}>
            {detalhe.descricao}
          </Box>
          <Box>
            {detalhe.imagemDetalhe && (
              <Button
                variant="contained"
                onClick={() => handleClickOpen(detalhe.idDetalhe)}
                sx={{
                  mb: '8px',
                  borderRadius: '32px',
                  bgcolor: '#FFF',
                  alignItems: 'center',
                  color: '#000',
                  textTransform: 'capitalize',
                }}
                startIcon={
                  <CropOriginalIcon
                    sx={{ color: '#AA000099', width: '24px', height: '24px' }}
                  />
                }
              >
                Ver Imagem
              </Button>
            )}
            <Dialog
              open={imagemAberta === detalhe.idDetalhe}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
              fullWidth
              maxWidth="md"
            >
              <DialogTitle>{`Imagem - Nº ${detalhe.idChamado}`}</DialogTitle>
              <DialogContent>
                <Box>
                  <img
                    src={formatarImagem(detalhe.imagemDetalhe)}
                    alt="Imagem"
                    width="100%"
                    height="100%"
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  sx={{ textTransform: 'capitalize' }}
                  onClick={handleClose}
                >
                  Fechar
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Typography variant="subtitle2" sx={{ color: '#767676' }}>
            {`Data de registro: ${formatDateTime(detalhe.dataRegistro)}`}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
