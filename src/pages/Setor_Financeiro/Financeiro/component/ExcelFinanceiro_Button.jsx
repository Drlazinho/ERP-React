import formatDateTotvs from "../../../../utils/formatDataTotvs";
import { ButtonExcel } from "@/components/ButtonAmvox/ButtonsAmvox"
const ExcelJS = require('exceljs');

export default function ExcelFinanceiro_Button({ dataApi = [] }) {
    const exportExcelFile = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('My Sheet');
        sheet.properties.defaultRowHeight = 20;

        sheet.columns = [
            {
                header: 'Nota Fiscal',
                key: 'documento',
                width: 15,
            },
            { header: 'Nome', key: 'nome', width: 60 },
            {
                header: 'Dest.',
                key: 'destino',
                width: 20,
            },
            {
                header: 'Emissão',
                key: 'emissao',
                width: 20,
            },
            {
                header: 'Produção.',
                key: 'saida',
                width: 15,
            },
            {
                header: 'Previsão',
                key: 'previsao',
                width: 10,
            },
            {
                header: 'Entregue',
                key: 'entregue',
                width: 10,
            },
            {
                header: 'Dias',
                key: 'dias',
                width: 10,
            },
            {
                header: 'Opção',
                key: 'opcao',
                width: 10,
            },
            {
                header: 'Cond. pgto',
                key: 'condPgto',
                width: 10,
            },
            {
                header: 'Exp.',
                key: 'expedido',
                width: 10,
            },
        ];

        dataApi.map((item) => {
            const opcao10 = (item) => {
                if (item.dias > 10) {
                    return '> 10 dias';
                }
                if (item.dias < 10) {
                    return '< 10 dias';
                }
            };
            const expedido = () => {
                if (item.expedido === 0) {
                    return 'Não';
                }
                if (item.enviada === 1) {
                    return 'Sim';
                }
            };

            sheet.addRow({
                documento: item.documento,
                nome: item.nome,
                destino: item.destino,
                emissao: formatDateTotvs(item.emissao), 
                saida: formatDateTotvs(item.saida),
                previsao: formatDateTotvs(item.previsao),
                entregue: formatDateTotvs(item.entregue),
                dias: item.dias,
                opcao: opcao10(item),
                condPgto: item.condPgto,
                expedido: expedido(item.expedido),
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
            anchor.download = `Financeiro.xlsx`;
            anchor.click();
            window.URL.revokeObjectURL(url);
        });
    };


    return (
        <ButtonExcel onClick={exportExcelFile}/>
    )
}
