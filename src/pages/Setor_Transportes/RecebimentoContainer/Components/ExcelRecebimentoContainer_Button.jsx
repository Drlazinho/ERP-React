import React from 'react'
import formatDateTotvs from '@/utils/formatDataTotvs'
import { formatDateSendApi } from '@/utils/formatDateInput'
import { ButtonExcel } from '@/components/ButtonAmvox/ButtonsAmvox'
const ExcelJS = require('exceljs')

export default function ExcelRecebimentoContainer_Button({ data = [] }) {
   const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('My Sheet ');
    sheet.properties.defaultRowHeight = 20;

    sheet.columns = [
      {
        header: 'Local',
        key: 'local',
        width: 30,
      },
      {
        header: 'Conteiner',
        key: 'container',
        width: 25,
      },
      {
        header: 'Lacre',
        key: 'lacre',
        width: 25,
      },
      {
        header: 'BL',
        key: 'bl',
        width: 25,
      },
      {
        header: 'Declaração de Importação',
        key: 'declaracao_importacao',
        width: 25,
      },
      {
        header: 'Nota Fiscal',
        key: 'nf',
        width: 25,
      },
      {
        header: 'Data',
        key: 'data',
        width: 25,
      },
      {
        header: 'Data de Previsão Chegada',
        key: 'previsao_chegada',
        width: 25,
      },
      {
        header: 'Data Chegada',
        key: 'chegada',
        width: 25,
      },
      {
        header: 'Início OP',
        key: 'inicio_op',
        width: 25,
      },
      {
        header: 'Final OP',
        key: 'final_op',
        width: 25,
      },
      {
        header: 'Conhecimento',
        key: 'conhecimento',
        width: 25,
      },
      {
        header: 'Volumes Nota Fiscal',
        key: 'volume_nf',
        width: 25,
      },
      {
        header: 'Volumes Recebidos',
        key: 'volumes_recebidos',
        width: 25,
      },
      {
        header: 'Conforme',
        key: 'conforme',
        width: 25,
      },
      {
        header: 'Observação',
        key: 'observacao',
        width: 40,
      },
      {
        header: 'Descarregador',
        key: 'descarregador',
        width: 30,
      },
      {
        header: 'Motorista Nome',
        key: 'motorista',
        width: 30,
      },
      {
        header: 'Conferente',
        key: 'conferente',
        width: 30,
      },
      {
        header: 'Motorista CPF',
        key: 'motorista_cpf',
        width: 30,
      },
      {
        header: 'Motorista CNH',
        key: 'motorista_cnh',
        width: 30,
      },
    ];

    data.map((item) => {
      sheet.addRow({
        local: item.local,
        container: item.container,
        lacre: item.lacre,
        bl: item.bl,
        declaracao_importacao: item.declaracao_importacao,
        nf: item.nf,
        cod_produto: item.cod_produto,
        data: formatDateTotvs(item.data),
        previsao_chegada: item.previsao_chegada,
        chegada: item.chegada,
        inicio_op: item.inicio_op,
        final_op: item.final_op,
        conhecimento: item.conhecimento,
        volume_nf: item.volumes_nf,
        volumes_recebidos: item.volumes_recebidos,
        conforme: item.conforme,
        observacao: item.observacao,
        descarregador: item.descarregador,
        conferente: item.conferente,
        motorista: item.motorista,
        motorista_cpf: item.cpf,
        motorista_cnh: item.cnh,
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
      anchor.download = 'RecebimentoContainer.xlsx';
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
