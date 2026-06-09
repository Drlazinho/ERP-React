import { Box, Button, Typography } from '@mui/material';
import React from 'react';

export default function CardDetalheDaNota({
  nota,
  registro,
  atualizacao,
  setor,
  usuario,
  status,
  observacao,
  openModalUpdate,
}) {
  function formatarDataPTBR(isoDate) {
    if (!isoDate) return '';

    try {
      const data = new Date(isoDate);

      if (isNaN(data.getTime())) {
        return 'Data inválida';
      }

      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      const horas = String(data.getHours()).padStart(2, '0');
      const minutos = String(data.getMinutes()).padStart(2, '0');
      const segundos = String(data.getSeconds()).padStart(2, '0');

      return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Erro ao formatar data';
    }
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          padding: 2,
          border: '1px solid #000',
          borderRadius: 2,
          position: 'relative',
          color: '#000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box mb={2}>
          <Typography sx={{ mb: 1 }} textAlign={'center'}>
            <b>
              Setor:
              <br />
            </b>
            {setor}
          </Typography>
          <br />
          <Typography sx={{ mb: 1 }} textAlign={'center'}>
            <b>
              Nota Fiscal:
              <br />
            </b>
            {nota.substring(25, 34)}
          </Typography>
          <Typography sx={{ mb: 1 }} textAlign={'center'}>
            <b>
              Registro:
              <br />
            </b>
            {formatarDataPTBR(registro) ?? '-'}
          </Typography>
          <Typography sx={{ mb: 1 }} textAlign={'center'}>
            <b>
              Atualização:
              <br />
            </b>
            {formatarDataPTBR(atualizacao) ?? '-'}
          </Typography>
          <Typography sx={{ mb: 1 }} textAlign={'center'}>
            <b>
              Usuário:
              <br />
            </b>
            {usuario ?? '-'}
          </Typography>
          <Typography sx={{ mb: 1 }} textAlign={'center'}>
            <b>
              Status:
              <br />
            </b>
            {status ?? '-'}
          </Typography>
          <Typography sx={{ mb: 1 }} textAlign={'center'}>
            <b>
              Obs
              <br />
            </b>
            {observacao ?? '-'}
          </Typography>
        </Box>
        <Button variant="outlined" onClick={() => openModalUpdate()}>
          Atualizar
        </Button>
      </Box>
    </>
  );
}
