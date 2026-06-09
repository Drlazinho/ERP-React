import React from 'react';
import formatDateTotvs from '@/utils/formatDataTotvs';
import { Button } from '@mui/material';
import { RiFileExcel2Fill } from 'react-icons/ri';
const ExcelJS = require('exceljs');

export default function ExcelNotasFiscaisEmitdasButton({
  dataApi = [],
  filtroNameFile,
}) {
  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('My Sheet');
    sheet.properties.defaultRowHeight = 20;

    sheet.columns = [
      {
        header: 'Nota Fiscal',
        key: 'nf',
        width: 15,
      },
      { header: 'Nome', key: 'nome', width: 60 },
      { header: 'Status', key: 'status', width: 30 },
      {
        header: 'Enviado',
        key: 'enviado',
        width: 20,
      },
      {
        header: 'Romaneio',
        key: 'romaneio',
        width: 10,
      },
      {
        header: 'Separado',
        key: 'separado',
        width: 10,
      },
      {
        header: 'Vol.',
        key: 'volume',
        width: 20,
      },
      {
        header: 'dtFat.',
        key: 'dtFat',
        width: 15,
      },
      {
        header: 'CNPJ.',
        key: 'cnpj',
        width: 20,
      },
      {
        header: 'Valor',
        key: 'valor',
        width: 20,
      },
      {
        header: 'Filial Separada',
        key: 'filial_Separad',
        width: 20,
      },
      {
        header: 'Endereço de Localização',
        key: 'endLoc_Separad',
        width: 30,
      },
    ];

    dataApi.map((item) => {
      const enviado = () => {
        if (item.enviada === 0) {
          return 'N';
        }
        if (item.enviada === 1) {
          return 'S';
        }
      };

      sheet.addRow({
        nf: item.nf,
        nome: item.nome,
        status: item.status,
        enviado: enviado(),
        romaneio: String(item.romaneio),
        separado: item.separado == 0 ? 'N' : 'S',
        volume: item.volumes,
        dtFat: formatDateTotvs(item.dataFaturamento),
        cnpj: item.cnpj,
        valor: item.valor,
        filial_Separad: item.filial_Separad,
        endLoc_Separad: item.endLoc_Separad,
      });

      return null;
    });

    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `Notas Emitidas desde - ${filtroNameFile}.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <Button
      size="small"
      variant="text"
      sx={{
        borderRadius: '4px',
        border: '1px solid rgba(204, 204, 204, 0.80)',
        boxShadow: '1px 1px 3px 1px rgb(0 0 0 / 0.25)',
        backgroundColor: '#FFF',
        color: 'black',
        marginTop: '15px',
        whiteSpace: 'nowrap',
        '&:hover': {
          backgroundColor: '#F0F0F0',
        },
      }}
      startIcon={<RiFileExcel2Fill size={20} />}
      onClick={exportExcelFile}
    >
      Exportar Para Excel
    </Button>
  );
}
