import ExcelJS from 'exceljs';
import { ButtonExcel } from '@/components/ButtonAmvox/ButtonsAmvox'
import formatDateTotvs from '@/utils/formatDataTotvs'
import { IGetTitulosReceberResponse } from '../titulosReceber.service'

type ExcelTitulosReceberProps = {
  dados?: IGetTitulosReceberResponse | null
}

export default function ExcelTitulosReceber_Button({
  dados,
}: ExcelTitulosReceberProps) {
    const exportExcelFile = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('My Sheet');
        sheet.properties.defaultRowHeight = 20;
    
        sheet.columns = [
          {
            header: 'Filial',
            key: 'filial',
            width: 15,
          },
          {
            header: 'Cliente',
            key: 'cliente',
            width: 50,
          },
          {
            header: 'Prefixo',
            key: 'prefixo',
            width: 10,
          },
          {
            header: 'Nº',
            key: 'numero',
            width: 15,
          },
          {
            header: 'Parcela',
            key: 'parcela',
            width: 10,
          },
          {
            header: 'Tipo',
            key: 'tipo',
            width: 10,
          },
          {
            header: 'Natureza',
            key: 'natureza',
            width: 30,
          },
          {
            header: 'Moeda',
            key: 'moeda',
            width: 10,
          },
          {
            header: 'Valor Original',
            key: 'valor_Orig',
            width: 15,
          },
          {
            header: 'Saldo',
            key: 'saldo',
            width: 15,
          },
          {
            header: 'Emissao',
            key: 'emissao',
            width: 15,
          },
          {
            header: 'Vencto. Real',
            key: 'vencto_Real',
            width: 15,
          },
          {
            header: 'Historico',
            key: 'historico',
            width: 40,
          },
          {
            header: 'Portador',
            key: 'portador',
            width: 10,
          },
          {
            header: 'NumBco',
            key: 'numBco',
            width: 15,
          },
          {
            header: 'Dias Atraso',
            key: 'dias_atraso',
            width: 10,
          },
          {
            header: 'Ultima Atualizacao',
            key: 'dtUltimaAtualizacao',
            width: 15,
          },
        ];
    
        dados?.titulos.map((item) => {
          sheet.addRow({
            filial: item.filial,
            cliente: item.cliente + ' ' + item.nome_Cliente,
            prefixo: item.prefixo,
            numero: item.numero,
            parcela: item.parcela,
            tipo: item.tipo,
            natureza: item.natureza,
            moeda: item.moeda,
            valor_Orig: item.valor_Orig,
            saldo: item.saldo,
            emissao: formatDateTotvs(item.emissao),
            vencto_Real: formatDateTotvs(item.vencto_Real),
            historico: item.historico,
            portador: item.portador,
            numBco: item.numBco,
            dias_atraso: item.dias_Atraso,
            dtUltimaAtualizacao:
              formatDateTotvs(item.dtUltimaAtualizacao) +
              ' - ' +
              item.hrUltimaAtualizacao,
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
          anchor.download = `Titulo A Receber - ${dados?.titulos[0].emissao}.xlsx`;
          anchor.click();
          window.URL.revokeObjectURL(url);
        });
      };
    
  return (
    <ButtonExcel onClick={exportExcelFile}/>
  );
}
