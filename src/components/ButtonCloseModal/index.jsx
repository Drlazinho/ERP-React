import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IconButton, Tooltip } from '@mui/material';


import React from 'react'

export default function ButtonCloseModal({ onClick }) {
    return (
        <Tooltip title="Fechar/Cancelar">
            <IconButton sx={{ position: 'absolute', right: 20 }} size='small' onClick={onClick}>
                <CloseRoundedIcon fontSize='small' color='error' />
            </IconButton>
        </Tooltip>
    )
}
