import { Edit } from '@mui/icons-material';
import { Box, Button, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react'
import { formatDateTime } from '../../../utils/formatDateInput';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';

export default function CardDetalheDaNota({ nota, registro, atualizacao, setor, usuario, status, observacao, openModalUpdate }) {
    return (
        <>
            <Box sx={{ width: '100%', padding: 2, border: '1px solid #000', borderRadius: 2, position: 'relative', color: '#000', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box mb={2}>

                    <Typography textAlign={'center'}><b>Setor: <span style={{ fontWeight: 'bolder' }}></span><br /></b>{setor}</Typography>
                    <br/>
                    <Typography textAlign={'center'}><b>Nota Fiscal: <span style={{ fontWeight: 'bolder' }}></span><br /></b>{nota.substring(25, 34)}</Typography>
                    <Typography textAlign={'center'}><b>Registro: <span style={{ fontWeight: 'bolder' }}></span><br /></b>{registro?? '-'}</Typography>
                    <Typography textAlign={'center'}><b>Atualizacao: <span style={{ fontWeight: 'bolder' }}></span><br /></b>{atualizacao?? '-'}</Typography>
                    <Typography textAlign={'center'}><b>Usuario: <span style={{ fontWeight: 'bolder' }}></span><br /></b>{usuario?? '-'}</Typography>
                    <Typography textAlign={'center'}><b>Status: <span style={{ fontWeight: 'bolder' }}></span><br /></b>{status?? '-'}</Typography>
                    <Typography textAlign={'center'}><b>Obs:<span style={{ fontWeight: 'bolder' }}></span><br /></b>{observacao?? '-'}</Typography>
                </Box>
                <Button variant='outlined' onClick={() => openModalUpdate()}>Atualizar</Button>
            </Box>
        </>
    )
}
