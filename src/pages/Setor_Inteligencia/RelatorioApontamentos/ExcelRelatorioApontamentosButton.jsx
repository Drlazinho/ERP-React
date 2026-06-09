import React from 'react';
import { Button, useTheme, useMediaQuery } from '@mui/material';
import { RiFileExcel2Fill } from 'react-icons/ri';
const ExcelJS = require('exceljs');

export default function ExcelRelatorioApontamentosButton({
  dadosApi = [],
  dataTotal,
}) {
  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('RelatorioApontamentos');
    sheet.properties.defaultRowHeight = 20;

    sheet.columns = [
      { header: 'Descrição', key: 'descricao', width: 60 },
      { header: 'Quantidade', key: 'quantidade', width: 20 },
      { header: 'Receita Bruta', key: 'receitaBruta', width: 20 },
      { header: 'Receita Liquida', key: 'receitaLiquida', width: 20 },
      { header: 'Devoluções', key: 'devolucoes', width: 20 },
      { header: 'Média s/IPI', key: 'mediaSemIpi', width: 20 },
      { header: 'Média c/IPI', key: 'mediaComIpi', width: 20 },
    ];

    dadosApi.map((item) => {
      sheet.addRow({
        descricao: item.descricao,
        quantidade: item.quantidade,
        receitaBruta: item.receitaBruta,
        receitaLiquida: item.receitaLiquida,
        devolucoes: item.devolucoes,
        mediaSemIpi: item.mediaSemIpi,
        mediaComIpi: item.mediaComIpi,
      });
    });

    sheet.addRow({});
    // sheet.addRow({
    //   descricao: 'Totais',
    //   quantidade: dataTotal.totalQuantidade,
    //   receitaBruta: dataTotal.totalReceitaBruta,
    //   receitaLiquida: dataTotal.totalReceitaLiquida,
    //   devolucoes: dataTotal.totalDevolucoes,
    //   mediaSemIpi: dataTotal.totalMediaSemIpi,
    //   mediaComIpi: dataTotal.totalMediaComIpi,
    // });

    workbook.xlsx.writeBuffer().then((dados) => {
      const blob = new Blob([dados], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `RelatorioApontamentos.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Button
      type="button"
      variant="contained"
      color="success"
      size="large"
      sx={{
        textTransform: 'capitalize',
        color: '#fff',
        flex: '1 3',
        fontWeight: 'bold',
        justifyContent: isSmallScreen ? 'flex-start' : 'center',
        width: isSmallScreen ? '40px' : 'auto',
      }}
      startIcon={<RiFileExcel2Fill size={20} color="white" />}
      onClick={exportExcelFile}
    >
      {!isSmallScreen && 'EXPORTAR PARA EXCEL'}{' '}
    </Button>
  );
}
