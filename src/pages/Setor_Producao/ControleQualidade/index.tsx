//import { useState } from 'react';
import HeaderAmvox from '@/components/HeaderAmvox';
import ControleQualidade_View from './views/ControleQualidade';
import {
  Box,
  //Tab,
  //Tabs
} from '@mui/material';
//import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
//import SearchIcon from '@mui/icons-material/Search';
//import Avaliacao_View from './views/Avaliacao';

const ControleQualidade = () => {
  //   const [tabIndex, setTabIndex] = useState(0);

  // const handleTabChange = (_event: unknown, newValue: number) => {
  //   setTabIndex(newValue);
  // };

  return (
    <Box sx={{ px: 2 }}>
      <HeaderAmvox title="Controle de Qualidade" />
      <ControleQualidade_View />

      {/* Ocultando página de avaliação para fase 2 */}
      {/* <Box
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
          <Tab label="Controle de Qualidade" icon={<PlaylistAddCheckIcon />} />
          <Tab label="Avaliação Semanal" icon={<SearchIcon />} />
        </Tabs>
      </Box>
      {tabIndex === 0 && <ControleQualidade_View />}
      {tabIndex === 1 && <Avaliacao_View />} */}
    </Box>
  );
};

export default ControleQualidade;
