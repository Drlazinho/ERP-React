import HeaderAmvox from '@/components/HeaderAmvox';
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';
import { getDevolucao } from './kpiTransport.service';
import FreteSection from './Components/FreteSection';
import DevolucaoSection from './Components/DevolucaoSection';
import OtifSection from './Components/Otif';

export default function KpiTransporte() {
  const [status, setStatus] = useState('frete');

  const handleGetDevolucao = () => {
    getDevolucao().then(() => {});
  };

  useEffect(() => {
    handleGetDevolucao();
  }, []);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newStatus: string
  ) => {
    if (newStatus !== null) {
      setStatus(newStatus);
    }
  };

  const renderFrete = () => <FreteSection />;

  const renderDevolucao = () => <DevolucaoSection />;

  const renderOtif = () => <OtifSection />;

  const renderPage = () => {
    switch (status) {
      case 'frete':
        return renderFrete();
      case 'devolucao':
        return renderDevolucao();
      case 'otif':
        return renderOtif();
      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          '@media (max-width: 1300px)': {
            flexDirection: 'column',
            gap: 2,
          },
        }}
      >
        <HeaderAmvox title="Kpi's de Transporte" />
        <Box sx={{ display: 'flex', gap: '16px' }}>
          <ToggleButtonGroup
            color="primary"
            value={status}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            sx={{ height: '32px' }}
          >
            <ToggleButton value="frete">Frete</ToggleButton>
            <ToggleButton value="devolucao">Devolução</ToggleButton>
            <ToggleButton value="otif">OTIF</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      <Box>{renderPage()}</Box>
    </Box>
  );
}
