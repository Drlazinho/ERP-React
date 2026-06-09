import React from 'react'
import { formatDateTime } from '../../../../utils/formatDateInput'
import { Box, Divider, IconButton, Tooltip, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

export default function CardNotaProtocoloSelecionada({ listaDeNotasSelecionada, handleRemoveNotaNaLista }) {
  return (
    <>
      {
        listaDeNotasSelecionada.map((item) => (
        <Box key={item.id} sx={{ width: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#e3e3e3',  borderRadius: 4, border: 2, pb: 1, my: 1 }} position={'relative'}>
                       <IconButton sx={{ position: 'absolute', right: 0 }} aria-label="Example" onClick={() => handleRemoveNotaNaLista(item.id)}>
                <CloseIcon color='error' />
              </IconButton>    
         <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Tooltip title={item.nota}>
              <IconButton>
                <ManageSearchIcon />
              </IconButton>
            </Tooltip>
            <Typography variant='body2'><b>Nota Fiscal: <span style={{ fontWeight: 'bolder' }}>{item.numero}</span></b></Typography>
          </Box>
          <Typography variant='body2' sx={{ margin: '0 auto' }} textAlign={'center'} color={'black'}>Registro: {formatDateTime(item.datA_VENCIMENTO)}</Typography>
          <Divider light />
          <Typography variant='body2' sx={{ margin: '0 auto' }} textAlign={'center'} color={'black'}>Vencimento: {formatDateTime(item.datA_VENCIMENTO)}</Typography>
        </Box>
        ))
      }
    </>
  )
}
