import React from 'react';
import formatDateTotvs from '../../../../utils/formatDataTotvs';
import { Button } from '@mui/material';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { formatDateSendApi } from '../../../../utils/formatDateInput';
const ExcelJS = require('exceljs');

export default function ExcelVirtaulSupplyButton({ dadosApi = [], title }) {
  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('My Sheet');
    sheet.properties.defaultRowHeight = 20;

    sheet.columns = [
      {
        header: 'Código',
        key: 'codigo',
        width: 15,
      },
      { header: 'Descrição', key: 'descricao', width: 60 },
      {
        header: 'Dias Stk',
        key: 'diasEstoque',
        width: 20,
      },
      {
        header: 'Mais de 90D',
        key: 'diasEstoque90',
        width: 20,
      },
      {
        header: 'Disponível',
        key: 'disponivel',
        width: 15,
      },
      {
        header: 'Qtd. Terceiro',
        key: 'qtdTerceiro',
        width: 15,
      },
      {
        header: 'Pendente',
        key: 'pendente',
        width: 10,
      },
      {
        header: 'Reserva',
        key: 'reserva',
        width: 10,
      },
      {
        header: 'Saldo',
        key: 'saldo',
        width: 10,
      },
      {
        header: 'Custo Inv',
        key: 'custo',
        width: 10,
      },
      {
        header: 'Sugestão',
        key: 'sugestao',
        width: 10,
      },
      {
        header: 'Vendas-90D',
        key: 'vendasTri',
        width: 10,
      },
      {
        header: 'Vendas-360D',
        key: 'vendasAno',
        width: 10,
      },
      {
        header: 'Invoices',
        key: 'invoice',
        width: 10,
      },
      {
        header: 'Invoice Valor Desconsiderado',
        key: 'invoiceValorDesconsiderado',
        width: 10,
      },
      {
        header: 'Invoice Valor Parcial',
        key: 'invoiceValorParcial',
        width: 10,
      },
      {
        header: 'Local',
        key: 'local',
        width: 10,
      },
    ];

    dadosApi.map((item) => {
      const diasEstoque90 = () => {
        if (item.diasEstoque > 90) {
          return 'S';
        } else {
          return 'N';
        }
      };

      const sugestao = () => {
        if ((item.sugestaoTri - item.invoice).toFixed(0) > 0) {
          return (item.sugestaoTri - item.invoice).toFixed(0);
        }
        return 0;
      };

      sheet.addRow({
        codigo: item.codigo,
        descricao: item.descricao,
        diasStk: item.diasEstoque,
        diasEstoque90: diasEstoque90(),
        disponivel: item.disponivel,
        qtdTerceiro: item.qtdTerceiro,
        pendente: item.pendente,
        reserva: item.reserva,
        saldo: item.saldo,
        custo: `R$ ${item.custo}`,
        sugestao: sugestao(),
        vendasTri: item.vendasTri,
        vendasAno: item.vendasAno,
        invoice: item.invoice,
        invoiceValorDesconsiderado: item.invoiceValorDesconsiderado,
        invoiceValorParcial: item.invoiceValorParcial,
        local: item.local,
      });

      return null;
    });
    workbook.xlsx.writeBuffer().then(function (dados) {
      const blob = new Blob([dados], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `VirtualSupply.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <Button
      type="button"
      variant="contained"
      sx={{
        backgroundColor: 'white',
        color: 'green',
        '&:hover': {
          backgroundColor: '#c9d9c1',
        },
      }}
      startIcon={<RiFileExcel2Fill size={20} />}
      onClick={exportExcelFile}
    >
      Exportar Para Excel
    </Button>
  );
}
