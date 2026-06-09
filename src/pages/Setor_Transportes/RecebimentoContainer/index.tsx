import HeaderAmvox from '@/components/HeaderAmvox';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import TabelaTabs from './views/TabelaTabs';
import DashboardTabs from './views/DashboardTabs';

export default function RecebimentoPermanenciaContainer() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_event: unknown, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ px: 2 }}>
      <HeaderAmvox title="Recebimento e Permanencia de Container" />
      <Box
        sx={{
          width: '100%',
          margin: '20px 0',
          border: '1px solid #ccc',
          borderRadius: '8px',
          backgroundColor: '#fff',
          boxShadow: '0px 1px 3px 0px #ccc',
        }}
      >
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            width: '100%',
            '& .MuiTab-root': {
              flexDirection: 'row',
              alignItems: 'center',
              gap: '8px',
              minHeight: 'auto',
              padding: '8px 16px',
              fontSize: '0.875rem',
              textTransform: 'none',
              color: '#666',
              '&.Mui-selected': {
                color: 'red',
                fontWeight: 'bold',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'red',
            },
            '& .MuiTab-iconWrapper': {
              margin: 0,
              fontSize: '1.5rem',
              '&.Mui-selected': {
                color: 'red',
              },
            },
          }}
        >
          <Tab label="Tabela" />
          <Tab label="Total Container" />
        </Tabs>
      </Box>

      {tabIndex === 0 && <TabelaTabs />}
      {tabIndex === 1 && <DashboardTabs />}
    </Box>
  );
}
