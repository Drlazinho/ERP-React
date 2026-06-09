import { Box, Paper, Typography } from '@mui/material';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import FactoryIcon from '@mui/icons-material/Factory';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import React, { useMemo } from 'react'
import CountUp from 'react-countup';

export default function CardV4({ title, data, icon, colorPrimary }) {

    const iconSelected = useMemo(() => {
        switch (icon) {
          case 'engrenagens':
            return <MiscellaneousServicesIcon sx={{ fontSize: 30, color: '#fff' }} color='#fff' />;
          case 'braçoMecanico' || 'bracoMecanico' || 'bracoMecânico' || 'braçoMecânico':
            return <PrecisionManufacturingIcon sx={{ fontSize: 30, color: '#fff' }} color='#fff' />;
          case 'fabrica':
            return <FactoryIcon sx={{ fontSize: 30, color: '#fff' }} color='#fff' />;
          default:
            return undefined;
        }
      }, [icon]);


  return (
    <Paper sx={{ display: 'flex', p: 2, borderRadius: 4, border: 1, borderColor: colorPrimary, background: '#fff', justifyContent: 'space-between', gap: 4 }}>
    <Box>
      <Typography component='p' variant='body2' fontWeight={700} color={'#67748e'}>{title}</Typography>
      <Typography component='p' variant='h6' fontWeight={700}>
      <CountUp end={data} separator="." decimal="," decimals={0} />        
        </Typography>
    </Box>
    <Paper elevation={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: colorPrimary, borderRadius: 3, p: 1 }}>
      {iconSelected}
    </Paper>
  </Paper>
  )
}
