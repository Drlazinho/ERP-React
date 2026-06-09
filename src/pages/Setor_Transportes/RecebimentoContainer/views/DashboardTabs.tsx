import { Box, Grid2, useTheme } from '@mui/material';
import { useState } from 'react';
import { useRecebimentoContainerDashQuery } from '../hooks/useRecebContainerDashQuery';
import InfoCardAmvox from '@/components/InfoCardAmvox';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';
import GraficoLinhaTotalContainerDia from '../Components/GraficoLinhaPorDia';
import GraficoBarraTotalProdutos from '../Components/GraficoBarContainerProduto';

export default function DashboardTabs() {
  const [filtro, setFiltro] = useState({
    date: new Date().toLocaleDateString('en-CA'),
  });
  const { totalContainer, totalContainerProduto, containerDia } =
    useRecebimentoContainerDashQuery(filtro);
  const  theme  = useTheme();

  return (
    <div>
      <Box sx={{ display: 'flex', width: '25%' }}>
        <InputDateAmvox
          label="Data"
          format="YYYY-MM-DD"
          value={filtro.date || ''}
          onChange={(date) =>
            setFiltro({
              ...filtro,
              date: date,
            })
          }
        />
      </Box>

      <Grid2 spacing={1} container sx={{ my: 1}}>
        <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
          <InfoCardAmvox
            title="Total Mês"
            amount={totalContainer.totalContainerMes}
            type="quantity"
          />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
          <InfoCardAmvox
            title="Total Matriz Mês"
            amount={totalContainer.totalMatrizMes}
            type="quantity"
          />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 4, md: 3 }}>
          <InfoCardAmvox
            title="Total Matriz Dia"
            amount={totalContainer.totalMatrizDia}
            type="quantity"
          />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 3 }}>
          <InfoCardAmvox
            title="Total Cordebras Mês"
            amount={totalContainer.totalCordebrasMes}
            type="quantity"
          />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 4 }}>
          <InfoCardAmvox
            title="Total Cordebras Dia"
            amount={totalContainer.totalCordebrasdia}
            type="quantity"
          />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 4 }}>
          <InfoCardAmvox
            title="Total Logic Mês"
            amount={totalContainer.totalLogicMes}
            type="quantity"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <InfoCardAmvox
            title="Total Logic Dia"
            amount={totalContainer.totalLogicdia}
            type="quantity"
          />
        </Grid2>
      </Grid2>

      <GraficoLinhaTotalContainerDia apiContainer={totalContainerProduto} />
      <Box sx={{ background: theme.palette.background.default, p: 2 }}>
        <GraficoBarraTotalProdutos apiContainer={containerDia} />
      </Box>
    </div>
  );
}
