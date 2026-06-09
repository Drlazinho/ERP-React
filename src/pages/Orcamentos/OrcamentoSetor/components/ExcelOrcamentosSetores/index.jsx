import React from 'react';
import { Button, useTheme, useMediaQuery } from '@mui/material';
import { RiFileExcel2Fill } from 'react-icons/ri';
const ExcelJS = require('exceljs');

const ExcelOrcamentosSetores = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Button
      type="button"
      variant="contained"
      sx={{
        backgroundColor: 'white',
        textTransform: 'capitalize',
        color: 'green',
        border: '1px solid green',
        '&:hover': {
          backgroundColor: '#c9d9c1',
        },
        padding: '8px 16px',
        justifyContent: isSmallScreen ? 'center' : 'flex-start',
        width: isSmallScreen ? '40px' : 'auto',
      }}
      startIcon={<RiFileExcel2Fill size={20} />}
      //onClick={exportExcelFile}
    >
      {!isSmallScreen && 'Exportar'}{' '}
    </Button>
  );
};

export default ExcelOrcamentosSetores;
