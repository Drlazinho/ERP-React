import { formatCurrencyBRLnocifr } from '@/utils/formatCurrency';
import { EstoqueExcelResponseType } from '../types';
import ExcelJS from 'exceljs';
import { ButtonExcel } from '@/components/ButtonAmvox/ButtonsAmvox';

type ExcelButtonEstoqueDeProdutosProps = {
  dados?: EstoqueExcelResponseType | null;
};

export default function ExcelEstoque_Button({
  dados,
}: ExcelButtonEstoqueDeProdutosProps) {
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
        width: 15,
      },
      {
        header: 'Reserva',
        key: 'reserva',
        width: 15,
      },
      {
        header: 'Saldo',
        key: 'saldo',
        width: 15,
      },
      {
        header: 'Custo Inv',
        key: 'custo',
        width: 15,
      },
      {
        header: 'Sugestão',
        key: 'sugestao',
        width: 15,
      },
      {
        header: 'Icon',
        key: 'icon',
        width: 15,
      },
      {
        header: 'Vendas-90D',
        key: 'vendasTri',
        width: 15,
      },
      {
        header: 'Vendas-360D',
        key: 'vendasAno',
        width: 15,
      },
      {
        header: 'Invoices',
        key: 'invoice',
        width: 15,
      },
      {
        header: 'Local',
        key: 'local',
        width: 15,
      },
    ];

    dados?.estoque?.map((item) => {
      const icon = () => {
        if (Number((item.sugestaoTri - item.invoice).toFixed(0)) > 0) {
          return '+';
        } else {
          return '-';
        }
      };

      const diasEstoque90 = () => {
        if (item.diasEstoque > 90) {
          return 'S';
        } else {
          return 'N';
        }
      };

      const sugestao = () => {
        if (Number((item.sugestaoTri - item.invoice).toFixed(0)) > 0) {
          return (item.sugestaoTri - item.invoice).toFixed(0);
        }
        return 0;
      };

      sheet.addRow({
        codigo: item.codigo,
        descricao: item.descricao,
        diasEstoque: item.diasEstoque.toFixed(0),
        diasEstoque90: diasEstoque90(),
        disponivel: formatCurrencyBRLnocifr(item.disponivel),
        qtdTerceiro: formatCurrencyBRLnocifr(item.qtdTerceiro),
        pendente: formatCurrencyBRLnocifr(item.pendente),
        reserva: item.reserva,
        saldo: formatCurrencyBRLnocifr(item.saldo),
        custo: `${formatCurrencyBRLnocifr(item.custo)}`,
        sugestao: sugestao(),
        icon: icon(),
        vendasTri: item.vendasTri,
        vendasAno: item.vendasAno,
        invoice: item.invoice,
        local: item.local,
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
      anchor.download = `Estoque.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return <ButtonExcel onClick={exportExcelFile} />;
}
