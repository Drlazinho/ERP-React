import { formatDateTime } from '@/utils/formatDateInput'
import { ButtonExcel } from '@/components/ButtonAmvox/ButtonsAmvox'
import ExcelJS from 'exceljs';

export default function ExcelSaldoInsumos_Button({ dados } ) {
   const exportExcelFile = () => {
     const workbook = new ExcelJS.Workbook();
     const sheet = workbook.addWorksheet('My Sheet ');
     sheet.properties.defaultRowHeight = 20;
 
     sheet.columns = [
       {
         header: 'Tipo',
         key: 'tipo',
         width: 25,
       },
       {
         header: 'Fornecedor',
         key: 'fornecedor',
         width: 30,
       },
       {
         header: 'CodProduto',
         key: 'codProduto',
         width: 15,
       },
       {
         header: 'Produto',
         key: 'nome',
         width: 30,
       },
       {
         header: 'Saldo',
         key: 'saldo',
         width: 10,
       },
       {
         header: 'Custo',
         key: 'custo',
         width: 15,
       },
       {
         header: 'Um',
         key: 'um',
         width: 15,
       },
       {
         header: 'Quantidade de Unidade de Medida',
         key: 'qtd_UM',
         width: 10,
       },
     ];
 
     dados.map((item) => {
       sheet.addRow({
         tipo: item.tipo,
         fornecedor: item.fornecedor,
         codProduto: item.codProduto,
         nome: item.nome,
         saldo: item.saldo,
         custo: item.custo,
         um: item.um,
         qtd_UM: item.qtd_UM,
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
       anchor.download = 'Insumos.xlsx';
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
