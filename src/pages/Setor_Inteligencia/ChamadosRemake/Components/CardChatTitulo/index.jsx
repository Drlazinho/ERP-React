import * as React from 'react';
import { apiFabricaDev, apiInteligencia } from '@/services/apis';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Typography,
} from '@mui/material';
import { formatarImagem } from '@/utils/formatarImagem';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CardChatTitulo({ dataCard }) {
  const [dataSave, setDataSave] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');

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

  {
    /* metodo futuro, aguardando implementação  👇👇*/
  }
  const handleClickOpenImage = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (!dataCard || !dataCard.id) return;

    const loaderId = async () => {
      try {
        const res = await apiInteligencia.get(`/ChamadosX/${dataCard.id}`);
        setDataSave(res.data);
      } catch (error) {
        console.error('Erro ao listar Detalhes do Chamado:', error);
      }
    };

    loaderId();
  }, [dataCard]);

  return (
    <Box
      sx={{
        bgcolor: '#F5F5F5',
        borderRadius: '16px',
        padding: '16px',
        width: '60%',
        mr: 'auto',
        alignSelf: 'flex-start',
      }}
    >
      <Typography
        variant="body1"
        sx={{ color: '#333', fontWeight: '500', mb: '8px' }}
      >
        {`${dataCard.responsavelDemandante} (Solicitante)`}
      </Typography>
      <Box sx={{ mb: '8px', wordBreak: 'break-word' }}>
        {dataCard.descricao}
      </Box>

      {/* metodo futuro, aguardando implementação  👇👇*/}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {dataSave.listaAnexo?.map((anexo, index) => {
          const extensao = anexo.extensao || '';
          const isImage = extensao.startsWith('image/');
          const isVideo = extensao.startsWith('video/');

          return (
            <Box key={index} sx={{ mb: '8px' }}>
              <Button
                variant="contained"
                onClick={() => {
                  if (isImage) {
                    handleClickOpenImage(anexo.linkArquivo);
                  } else {
                    window.open(anexo.linkArquivo, '_blank');
                  }
                }}
                sx={{
                  borderRadius: '32px',
                  bgcolor: '#FFF',
                  alignItems: 'center',
                  color: '#000',
                  textTransform: 'capitalize',
                  fontSize: '12px',
                }}
                startIcon={
                  isImage ? (
                    <InsertPhotoOutlinedIcon
                      sx={{ color: '#AA000099', width: '24px', height: '24px' }}
                    />
                  ) : isVideo ? (
                    <VideoLibraryOutlinedIcon
                      sx={{ color: '#AA000099', width: '24px', height: '24px' }}
                    />
                  ) : (
                    <FilePresentOutlinedIcon
                      sx={{ color: '#AA000099', width: '24px', height: '24px' }}
                    />
                  )
                }
              >
                {anexo.nome}
              </Button>
            </Box>
          );
        })}

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle>{`Imagem - Nº ${dataSave.id}`}</DialogTitle>
          <DialogContent>
            <Box>
              <img
                src={selectedImage}
                alt="Imagem"
                width={'100%'}
                height={'100%'}
                style={{ objectFit: 'contain' }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Fechar</Button>
          </DialogActions>
        </Dialog>
      </Box>
      {/* <Box>
        {dataSave.imagem && (
          <Button
            variant="contained"
            onClick={handleClickOpen}
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
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle>{`Imagem - Nº ${dataSave.id}`}</DialogTitle>
          <DialogContent>
            <Box>
              <img
                src={formatarImagem(dataSave.imagem)}
                alt="Imagem"
                width={'100%'}
                height={'100%'}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Fechar</Button>
          </DialogActions>
        </Dialog>
      </Box> */}
      <Typography variant="subtitle2" sx={{ color: '#767676' }}>
        {formatDateTime(dataCard.dataAbertura)}
      </Typography>
    </Box>
  );
}
