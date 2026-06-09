import React from 'react';
import { Button } from '@mui/material';
import { RiFileExcel2Fill } from 'react-icons/ri';
const ExcelJS = require('exceljs');

export default function ExcelButton({ dataApi, filtroNameFile }) {
  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My Sheet");
    sheet.properties.defaultRowHeight = 20;

    // Crie um array fictício de dados
   

    // Adicione cabeçalhos às colunas (você pode personalizá-los)
    sheet.addRow(["CNPJ", "Chave Nota Fiscal", "CNPJ Emissor", "Nome Emissor", "Data Emissão", "Hora Emissão", "Data Autorização"]);

    dataApi.forEach(item => {
      // Adicione dados fictícios para cada linha
      sheet.addRow([item.cnpj, item.chaveNotaFiscal,item.cnpjEmissor, item.nomeEmissor, item.dataEmissao, item.horaEmissao, item.dataAutorizacao,   ]);
    });

    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `Notas Emitidas desde - ${filtroNameFile}.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  }

  return (
    <Button
      type='button'
      variant='contained'
      color='success'
      fullWidth
      size='medium'
      startIcon={<RiFileExcel2Fill size={20} />}
      onClick={exportExcelFile}
    >
      Excel
    </Button>
  );
}
