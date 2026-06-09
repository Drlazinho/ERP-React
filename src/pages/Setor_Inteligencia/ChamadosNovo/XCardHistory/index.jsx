import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { formatDateTime } from '@/utils/formatDateInput';
import { formatarImagem } from '@/utils/formatarImagem';
import { DeleteChamadosDetalheId } from '@/services/chamadosDetalhe/chamadosDetalhe.service';
import { GetChamadosDetalhe } from '@/services/chamadosDetalhe/chamadosDetalheX.service';

const initialChamado = {
  imagemDetalhe: null,
};

export default function CardDetalheChamadaX({
  idDetalhe,
  idChamado,
  descricao,
  previsaoEntrega,
  previsaoInicio,
  responsavelAprovacao,
  responsavelDemandado,
  observacao,
  handleGetChamadoDet,
  handleDeleteChamadoDet,
  imagemDetalhe,
}) {
  const [formData, setFormData] = React.useState(initialChamado);
  const [mostraImage, setMostraImage] = useState(false);

  return (
    <Box
      sx={{
        border: '1px solid #000',
        p: 3,
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
      }}
    >
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Typography sx={{ color: '#000' }}>ID Detalhe: {idDetalhe}</Typography>
        <Typography sx={{ color: '#000' }}>ID Chamado: {idChamado}</Typography>
      </Box>
      <hr></hr>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Typography sx={{ color: '#000' }}>
          Previsão de Entrega: {formatDateTime(previsaoEntrega)}
        </Typography>
        <Typography sx={{ color: '#000' }}>
          Previsão de Início: {formatDateTime(previsaoInicio)}
        </Typography>
      </Box>
      <Typography sx={{ color: '#000' }}>
        Responsável por Aprovação: {responsavelAprovacao}
      </Typography>
      <Typography sx={{ color: '#000' }}>
        Responsável por Execução: {responsavelDemandado}
      </Typography>
      <Typography sx={{ color: '#000' }}>Descrição: {descricao}</Typography>
      <Typography
        sx={{ color: '#000', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
      >
        Observação: {observacao}
      </Typography>

      {/* Botao para mostrar imagem */}
      {imagemDetalhe && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setMostraImage(!mostraImage);
            }}
          >
            {mostraImage ? 'Esconder Imagem' : 'Mostrar Imagem'}
          </Button>
          {mostraImage && (
            <img
              src={formatarImagem(imagemDetalhe)}
              alt="Detalhe do chamado"
              width={'60%'}
            />
          )}
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'end',
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="warning"
          endIcon={<CreateIcon />}
          onClick={() => handleGetChamadoDet(idChamado, idDetalhe)}
        >
          Editar
        </Button>
      </Box>
    </Box>
  );
}
