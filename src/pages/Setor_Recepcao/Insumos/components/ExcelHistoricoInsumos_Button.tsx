import { formatDateTime } from '@/utils/formatDateInput'
import { ButtonExcel } from '@/components/ButtonAmvox/ButtonsAmvox'
import ExcelJS from 'exceljs';
import { IInsumosMovimentacaoItem } from '../insumosMovimentacao.service'


interface ExcelProps {
  dados: IInsumosMovimentacaoItem[]
}

export default function ExcelHistoricoInsumos_Button({ dados }: ExcelProps ) {
    const exportExcelFile = () => {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet('My Sheet ');
      sheet.properties.defaultRowHeight = 20;
  
      sheet.columns = [
        {
          header: 'Produto',
          key: 'produto',
          width: 30,
        },
        {
          header: 'Tipo Movimentação',
          key: 'tipoMovimentacao',
          width: 25,
        },
        {
          header: 'Saldo Anterior',
          key: 'saldoAnterior',
          width: 25,
        },
        {
          header: 'Quantidade Movimentada',
          key: 'qtdMov',
          width: 25,
        },
        {
          header: 'Novo Saldo',
          key: 'saldoNovo',
          width: 25,
        },
        {
          header: 'Data da Movimentação',
          key: 'dataMov',
          width: 25,
        },
        {
          header: 'Setor',
          key: 'setor',
          width: 25,
        },
        {
          header: 'Destino',
          key: 'descricao',
          width: 25,
        },
        {
          header: 'Usuario',
          key: 'usuario',
          width: 25,
        },
      ];
  
      dados?.map((item) => {
        sheet.addRow({
          produto: item.produto,
          tipoMovimentacao: item.tipoMovimentacao,
          saldoAnterior: item.saldoAnterior,
          qtdMov: item.qtdMov,
          saldoNovo: item.saldoNovo,
          dataMov: formatDateTime(item.dataMov),
          setor: item.setor,
          descricao: item.descricao,
          usuario: item.usuario,
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
        anchor.download = 'InsumosMovimentacao.xlsx';
        anchor.click();
        window.URL.revokeObjectURL(url);
      });
    };
  return (
    <ButtonExcel
      onClick={exportExcelFile}
    />
  )
}
