import { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Tab,
  Tabs,
  Box,
  Typography,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QrCodeIcon from '@mui/icons-material/QrCode';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import EspecificacaoEstrutura from './EspecificacaoEstrutura';
import EspecificacaoCodigo from './EspecificacaoCodigo';
import CloseIcon from '@mui/icons-material/Close';

const ButtonHelp = () => {
  const [open, setOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="text"
        sx={{
          color: '#333333',
          fontWeight: 'bold',
          fontSize: '12px',
          width: '200px',
        }}
      >
        <HelpOutlineIcon /> Como funciona?
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              width: '100%',
              maxWidth: '600px',
              maxHeight: 'calc(100vh - 64px)',
              display: 'flex',
              flexDirection: 'column',
            },
          },
        }}
      >
        <DialogTitle sx={{ color: '#5E5E5E', flexShrink: 0 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">Como funciona?</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <Box sx={{ flexShrink: 0, px: 2 }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px',
                minHeight: 'auto',
                padding: '8px 16px',
                fontSize: '0.875rem',
                textTransform: 'none',
                color: '#666',
                '&.Mui-selected': {
                  color: 'red',
                  fontWeight: 'bold',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'red',
              },
              '& .MuiTab-iconWrapper': {
                margin: 0,
                fontSize: '1.5rem',
                '&.Mui-selected': {
                  color: 'red',
                },
              },
            }}
          >
            <Tab label="Estrutura" icon={<QrCodeIcon />} />
            <Tab label="Códigos" icon={<FormatListNumberedIcon />} />
          </Tabs>
        </Box>

        <DialogContent
          dividers
          sx={{
            flex: 1,
            overflow: 'auto',
            padding: '16px',
            '& .MuiDialogContentText-root': {
              width: '100%',
              margin: 0,
            },
          }}
        >
          {tabIndex === 0 ? (
            <DialogContentText>
              <EspecificacaoEstrutura />
            </DialogContentText>
          ) : (
            <DialogContentText>
              <EspecificacaoCodigo />
            </DialogContentText>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ButtonHelp;
