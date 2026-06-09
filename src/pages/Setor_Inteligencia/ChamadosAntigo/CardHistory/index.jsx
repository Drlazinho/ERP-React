import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDateTime } from '@/utils/formatDateInput';
import { DeleteChamadosDetalheId } from '@/services/chamadosDetalhe/chamadosDetalhe.service';

export default function CardDetalheChamada({ idDetalhe = '', idChamado = '', descricao = '', previsaoEntrega = '', previsaoInicio = '', responsavelAprovacao = '', responsavelExecucao = '', observacao = '', handleGetChamadoDet, handleDeleteChamadoDet }) {
  return (
    <Box sx={{ border: '1px solid #000', p: 3 , wordBreak: 'break-word', whiteSpace: 'pre-wrap'}}>
        <Box sx={{ display:'flex', gap: 3 }}>
        <Typography sx={{ color:"#000" }}>ID Detalhe: {idDetalhe}</Typography>
        <Typography sx={{ color:"#000" }}>ID Chamado: {idChamado}</Typography>
        </Box>
        <hr></hr>
        <Box sx={{ display:'flex', gap: 3 }}>
        <Typography sx={{ color:"#000" }}>Previsão de Entrega: {formatDateTime(previsaoEntrega)}</Typography>
        <Typography sx={{ color:"#000" }}>Previsão de Início: {formatDateTime(previsaoInicio)}</Typography>
        </Box>
        <Typography sx={{ color:"#000" }}>Responsável por Aprovação: {responsavelAprovacao}</Typography>
        <Typography sx={{ color:"#000" }}>Responsável por Execução: {responsavelExecucao}</Typography>
        <Typography sx={{ color:"#000" }}>Descrição: {descricao}</Typography>
        <Typography sx={{ color:"#000", wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>Observação: {observacao}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', gap: 2 }}>
            <Button variant='contained' color='warning' endIcon={<CreateIcon/>} onClick={() => handleGetChamadoDet(idDetalhe)}>Editar</Button>
            <Button variant='contained' color='error' startIcon={<DeleteIcon />} onClick={() => handleDeleteChamadoDet(idDetalhe, idChamado)}>Apagar</Button>
        </Box>
    </Box>
  )
}
