import { useCallback, useState } from 'react';
import { apiFabrica } from '../../../../../../services/apis';
import formatDateTotvs from '../../../../../../utils/formatDataTotvs';

import { Button } from '@mui/material';

export const TableRow = ({
  rowData,
  expandRow,
  handleExpand,
  expanded,
  subData,
  tableRowId,
}) => {
  const statusColor = (valor) => {
    switch (valor) {
      case 'AGUARDANDO': {
        return 'warning';
      }
      case 'COMPLETO': {
        return 'success';
      }
      case 'INCOMPLETO': {
        return 'danger';
      }
      default:
        return 'light';
    }
  };

  // const [expanded, setExpanded] = useState(false);
  // const [subData, setSubData] = useState([]);

  // const handleExpand = useCallback((value) => {
  //   if (!expanded && !subData) {
  //     buscarImportAcompanharFiltro(value).then((res) => {
  //         setExpanded(true)
  //         setSubData(res)
  //       })
  //   } else {
  //     setExpanded(!expanded);
  //   }
  // }, []);

  return (
    <>
      <tr
        className={`td-data ${
          rowData.c7_QUANT !== rowData.c7_QUJE && 'marcador-linha-tabela'
        }`}
      >
        <td>{rowData.c7_PRODUTO}</td>
        <td>{rowData.c7_QUANT}</td>
        <td>{rowData.c7_QUJE}</td>
        <td>{rowData.c7_LOCAL}</td>
        <td>{rowData.c7_NUM}</td>
        <td>{formatDateTotvs(rowData.c7_EMISSAO)}</td>
        <td>{rowData.c7_PO_EIC}</td>
        <td>$ {rowData.c7_TXMOEDA}</td>
        <td>$ {rowData.c7_PRECO}</td>
        <td>$ {rowData.c7_TOTAL}</td>
        <td>{rowData.c7_DESCRI}</td>
        <td>{rowData.qtd_Cntr_Produto}</td>
        <td>{rowData.status_Cntr}</td>
        <td>
          <Button onClick={() => handleExpand(rowData.c7_PO_EIC)}>
            {tableRowId === rowData.c7_PO_EIC && expanded ? '-' : '+'}
          </Button>
        </td>
      </tr>
      {tableRowId === rowData.c7_PO_EIC && expanded && (
        <tr>
          <td colSpan="14">
            {subData.map((item, index) => (
              <>
                <div className="w-100 border border-2 rounded-2 p-2 m-2">
                  <div className="d-flex flex-row justify-content-between">
                    <p>Agente: {item.agente}</p>
                    <p>Posicao: {item.posicao}</p>
                    <p>Invoice: {item.invoice}</p>
                    <p>Navio: {item.navio}</p>
                    <p>Modelo: {item.modelo}</p>
                    <p>Armazen: {item.armazem}</p>
                    <p>qtd_Cntr: {item.qtd_Cntr}</p>
                    <p>Atracação: {formatDateTotvs(item.atracacao)}</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <p>cif_Aprox_Brl: R$ {item.cif_Aprox_BrL}</p>
                    <p>cif_Aprox_Cofins: {item.cif_Aprox_Cofins}</p>
                    <p>cif_Aprox_II : {item.cif_Aprox_II}</p>
                    <p>cif_Aprox_Ipi: R$ {item.cif_Aprox_Ipi}</p>
                    <p>cif_Aprox_Pis: R$ {item.cif_Aprox_Pis}</p>
                    <p>cif_Aprox_Usd: $ {item.cif_Aprox_Usd}</p>
                    <p>taxa_Usd: $ {item.taxa_Usd}</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <p>cntr: {item.cntr}</p>
                    <p>da_Di: {item.da_Di}</p>
                    <p>Data Registro: {formatDateTotvs(item.data_Registro)}</p>
                    <p>Demurrage: {formatDateTotvs(item.demurrage)}</p>
                    <p>Tempo Demurrage: {item.tempo_Demurrage}</p>
                    <p>transi Time: {item.transiTime}</p>
                    <p>Devolução do cntr: {item.devolucao_Cntr}</p>
                    <p>
                      Última Atualização:{' '}
                      {formatDateTotvs(item.dtUltimaAtualizacao)} |{' '}
                      {item.hrUltimaAtualizacao}
                    </p>
                    <p>Entrega: {item.entrega}</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column gap-0 m-0">
                      <p className="m-0">
                        Estimativa AFRMM: R$ {item.estimativa_Afrmm}
                      </p>
                      <p className="m-0">
                        Estimativa AFRMM Pago: R$ {item.estimativa_Afrmm}
                      </p>
                    </div>
                    <div className="d-flex flex-column gap-0 m-0">
                      <p className="m-0">ETA: {formatDateTotvs(item.eta)}</p>
                      <p className="m-0">ETA AMVOX: {item.eta_Amvox}</p>
                    </div>
                    <div className="d-flex flex-column gap-0 m-0">
                      <p className="m-0">Fornecedor: {item.fornecedor}</p>
                      <p className="m-0">Frete: R$ {item.frete}</p>
                    </div>
                    <div className="d-flex flex-column gap-0 m-0">
                      <p className="m-0">
                        Frete Por Cntr: R$ {item.frete_Por_Cntr}
                      </p>
                      <p className="m-0">Hawb: {item.hawb}</p>
                    </div>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <p>NF: {item.nf}</p>
                    <p>nro_BL: {item.nro_BL}</p>
                    <p>nro_Po: {item.nro_Po}</p>
                    <p>numero_Nic: {item.numero_Nic}</p>
                    <p>p_De_Carga: {item.p_De_Carga}</p>
                    <p>Periodo_Armazem : {item.periodo_Armazem}</p>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <p>
                      prazo_Registro: {formatDateTotvs(item.prazo_Registro)}
                    </p>
                  </div>

                  <div className="d-flex flex-row justify-content-between">
                    <div className="d-flex flex-column gap-0 m-0">
                      <p className="m-0">
                        venc_Armazem: {formatDateTotvs(item.venc_Armazem)}
                      </p>
                      <p className="m-0">
                        valor_Total_Produtos_Nf: R${' '}
                        {item.valor_Total_Produtos_Nf}
                      </p>
                    </div>

                    <div className="d-flex flex-column gap-0 m-0">
                      <p className="m-0">
                        vlr_Invoice_Brl: R$ {item.vlr_Invoice_Brl}
                      </p>
                      <p className="m-0">
                        vlr_Invoice_Brl_Por_Cntr: R${' '}
                        {item.vlr_Invoice_Brl_Por_Cntr}
                      </p>
                    </div>

                    <div className="d-flex flex-column gap-0 m-0">
                      <p className="m-0">
                        vlr_Invoice_Usd: $ {item.vlr_Invoice_Usd}
                      </p>
                      <p className="m-0">
                        vlr_Invoice_Usd_Por_Cntr : ${' '}
                        {item.vlr_Invoice_Usd_Por_Cntr}
                      </p>
                    </div>
                  </div>
                </div>
                <div></div>
              </>
            ))}
            {/* {subData ? subData.map((item, index) => {
                <div>
                  <p>{item.hawb}</p>
                  <p>teste</p>
                </div>
              })(
                
              ) : (
                <p>Carregando subdados...s</p>
              )} */}
          </td>
        </tr>
      )}
    </>
  );
};
