import HeaderAmvox from '@/components/HeaderAmvox';
import { consultaExpedicaoCarga } from '@/services/recebimentoPermanenciaContainer.service';
import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Expedicao,
  TabelaExpedicaoHistorico,
} from './TabelaHistoricoExpedicao';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';
import InputAmvox from '@/components/InputAmvox';
import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox';

export default function HistoricoPartidas() {
  const hoje = new Date();
  const formatarData = (dataIso: Date | string): string => {
    const data = new Date(dataIso);
    return data.toISOString().split('T')[0];
  };
  const [filtro, setFiltro] = useState({
    dataChegada: formatarData(hoje),
    doca: '',
    status: '',
  });

  const [data, setData] = useState<Expedicao[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      consultaExpedicaoCarga(filtro).then((res) => {
        setData(res);
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [filtro]);

  const handleClear = () => {
    setFiltro({
      dataChegada: formatarData(hoje),
      doca: '',
      status: '',
    });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box>
        <HeaderAmvox title="Histórico de Partidas" />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          bgcolor: 'white',
          borderRadius: '8px',
          padding: '12px',
          boxShadow: '10px 3px 10px #ccc',
          mb: '20px',
        }}
      >
        <Typography variant="body1">Filtros:</Typography>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <InputDateAmvox
            label="Data de Chegada"
            sx={{ width: '10%' }}
            value={filtro.dataChegada}
            onChange={(novaData: string | Date) => {
              setFiltro({
                ...filtro,
                dataChegada: formatarData(novaData),
              });
            }}
          />
          <InputAmvox
            label="Doca"
            sx={{ width: '10%' }}
            value={filtro.doca}
            onChange={(e) => {
              setFiltro({
                ...filtro,
                doca: e.target.value,
              });
            }}
          />
          <InputAmvox
            label="Status"
            sx={{ width: '15%' }}
            value={filtro.status}
            onChange={(e) => {
              setFiltro({
                ...filtro,
                status: e.target.value,
              });
            }}
          />
          <ButtonClear
            sx={{ width: '15%', bgcolor: '#ccc', color: 'black' }}
            onClick={handleClear}
          />
        </Box>
      </Box>
      <TabelaExpedicaoHistorico data={data} />
    </Box>
  );
}
