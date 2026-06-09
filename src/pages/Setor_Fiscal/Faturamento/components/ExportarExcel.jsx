import React from 'react';
import { Button } from '@mui/material';
import ExcelImage from '../../../../assets/excelimg.png';
const ExcelJS = require('exceljs');

export default function ExcelNotas({ dataApi = [], filtro }) {
  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Notas Faturadas');
    sheet.properties.defaultRowHeight = 20;

    sheet.columns = [
      { header: 'Data Emissão', key: 'dataEmissao', width: 15 },
      { header: 'UF', key: 'uf', width: 10 },
      { header: 'Cliente', key: 'cliente', width: 30 },
      { header: 'Vendedor', key: 'vendedor', width: 30 },
      { header: 'Pedido', key: 'pedido', width: 20 },
      { header: 'Valor Faturado', key: 'valorFaturado', width: 20 },
    ];

    dataApi.forEach((item) => {
      const dataConvert = item.dataEmissao.split(' ')[0];

      sheet.addRow({
        dataEmissao: dataConvert,
        uf: item.uf,
        pedido: item.pedido,
        cliente: item.cliente,
        vendedor: item.vendedor,
        valorFaturado: item.valorFaturado,
      });
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `Relatório de faturamento - ${filtro.dt_emissao_ini} / ${filtro.dt_emissao_fin}.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <Button
      size="small"
      variant="text"
      sx={{
        borderRadius: '8px',
        whiteSpace: 'nowrap',
        backgroundColor: '#fff',
        color: '#000',
        '&:hover': {
          backgroundColor: '#F0F0F0',
        },
      }}
      startIcon={<img src={ExcelImage} alt="Excel" width={25} height={25} />}
      onClick={exportExcelFile}
    >
      Excel
    </Button>
  );
}
