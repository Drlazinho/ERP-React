import React from 'react';

import LayoutNovo from '../../../components/LayoutNovo';
import TabelaChamadosSetor from './TabelaChamadosSetor';
import { Box } from '@mui/material';
import HeaderAmvox from '@/components/HeaderAmvox'

export default function ChamadosPorSetor() {
  return (
    <LayoutNovo setorColor={'fiscal'}>
      <Box sx={{zIndex: 1,}}>
        <HeaderAmvox title={'Chamados do Setor'} />
      </Box>
      <TabelaChamadosSetor />
    </LayoutNovo>
  );
}
