import React, { memo, useEffect, useState } from 'react';
import useSortableData from '../../../../utils/sortable';
import './styles.css';
import formatDateTotvs from '../../../../utils/formatDataTotvs';

function ImportacaoTabelaProps({ ...props }) {
  const { items, requestSort, sortConfig } = useSortableData(props.entregas);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <>
      <div className="lastUpdateTable_Box">
        <div className="lastUpdateTable">
          {' '}
          <h6>
            <span>last Updt: </span>
            <span>{formatDateTotvs(items[0]?.dtUltimaAtualizacao)}</span>
            <span>|{items[0]?.hrUltimaAtualizacao}</span>
          </h6>
        </div>
      </div>
      <table className="table table-striped">
        <thead className="table-dark mt-3">
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort('notafiscal')}
                className={getClassNamesFor('notafiscal')}
              >
                PO_EIC
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('venc_Armazem')}
                className={getClassNamesFor('venc_Armazem')}
              >
                Venc.Armazen
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('data_Registro')}
                className={getClassNamesFor('data_Registro')}
              >
                Data Registro.
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('qtde')}
                className={getClassNamesFor('qtde')}
              >
                qtde.
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('prazo_Registro')}
                className={getClassNamesFor('prazo_Registro')}
              >
                Prazo Registro.
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('atracacao')}
                className={getClassNamesFor('atracacao')}
              >
                Atracação.
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr className="tr-data" key={item.id}>
                <td colSpan={6}>
                  <div className="w-100 border border-2 rounded-2 p-2 m-2 d-flex flex-row justify-content-between">
                    <div>
                      <p className="mb-0">
                        <b>Agente</b>: {item.agente}
                      </p>
                      <p className="mb-0">
                        <b>Posicao</b>: {item.posicao}
                      </p>
                      <p className="mb-0">
                        <b>Invoice</b>: {item.invoice}
                      </p>
                      <p className="mb-0">
                        <b>Navio</b>: {item.navio}
                      </p>
                      <p className="mb-0">
                        <b>Hawb</b>: {item.hawb}
                      </p>
                      <p className="mb-0">
                        <b>Modelo</b>: {item.modelo}
                      </p>
                      <p className="mb-0">
                        <b>Armazen</b>: {item.armazem}
                      </p>
                      <p className="mb-0">
                        <b>qtd_Cntr</b>: {item.qtd_Cntr}
                      </p>
                      <p className="mb-0">
                        <b>cif_Aprox_Cofins</b>: {item.cif_Aprox_Cofins}
                      </p>
                      <p className="mb-0">
                        <b>cif_Aprox_Brl</b>: R$ {item.cif_Aprox_BrL}
                      </p>
                      <p className="mb-0">
                        <b>cif_Aprox_II</b> : R$ {item.cif_Aprox_II}
                      </p>
                      <p className="mb-0">
                        <b>cif_Aprox_Ipi</b>: R$ {item.cif_Aprox_Ipi}
                      </p>
                      <p className="mb-0">
                        <b>cif_Aprox_Pis</b>: R$ {item.cif_Aprox_Pis}
                      </p>
                      <p className="mb-0">
                        <b>cif_Aprox_Usd</b>: $ {item.cif_Aprox_Usd}
                      </p>
                      <p className="mb-0">
                        <b>taxa_Usd</b>: $ {item.taxa_Usd}
                      </p>
                    </div>
                    <div>
                      <p className="mb-0">
                        <b>cntr</b>: {item.cntr}
                      </p>
                      <p className="mb-0">
                        <b>da_Di</b>: {item.da_Di}
                      </p>
                      <p className="mb-0">
                        <b>Data Registro</b>:{' '}
                        {formatDateTotvs(item.data_Registro)}
                      </p>
                      <p className="mb-0">
                        <b>Demurrage</b>: {formatDateTotvs(item.demurrage)}
                      </p>
                      <p className="mb-0">
                        <b>Tempo Demurrage</b>: {item.tempo_Demurrage}
                      </p>
                      <p className="mb-0">
                        <b>transi Time</b>: {item.transiTime} dias
                      </p>
                      <p className="mb-0">
                        <b>Devolução do cntr</b>: {item.devolucao_Cntr}
                      </p>
                      <p className="mb-0">
                        <b>Entrega</b>: {item.entrega}
                      </p>
                      <p className="mb-0">
                        <b>Estimativa AFRMM:</b> R$ {item.estimativa_Afrmm}
                      </p>
                      <p className="mb-0">
                        <b>Estimativa AFRMM Pago:</b> R$ {item.estimativa_Afrmm}
                      </p>
                      <p className="mb-0">
                        <b>ETA:</b> {formatDateTotvs(item.eta)}
                      </p>
                      <p className="mb-0">
                        <b>ETA AMVOX:</b> {item.eta_Amvox}
                      </p>
                      <p className="mb-0">
                        <b>Fornecedor:</b> {item.fornecedor}
                      </p>
                      <p className="mb-0">
                        <b>Frete:</b> R$ {item.frete}
                      </p>
                      <p className="mb-0">
                        <b>Frete Por Cntr:</b>
                        R$ {item.frete_Por_Cntr}
                      </p>
                    </div>
                    <div>
                      <p className="mb-0">
                        <b>NF</b>: {item.nf}
                      </p>
                      <p className="mb-0">
                        <b>nro_BL</b>: {item.nro_BL}
                      </p>
                      <p className="mb-0">
                        <b>nro_Po</b>: {item.nro_Po}
                      </p>
                      <p className="mb-0">
                        <b>numero_Nic</b>: {item.numero_Nic}
                      </p>
                      <p className="mb-0">
                        <b>p_De_Carga</b>: {item.p_De_Carga}
                      </p>
                      <p className="mb-0">
                        <b>Periodo_Armazem</b> : {item.periodo_Armazem}
                      </p>
                      <p className="mb-0">
                        <b>prazo_Registro:</b>{' '}
                        {formatDateTotvs(item.prazo_Registro)}
                      </p>
                      <p className="mb-0">
                        <b>venc_Armazem:</b>
                        {formatDateTotvs(item.venc_Armazem)}
                      </p>
                      <p className="mb-0">
                        <b>valor_Total_Produtos_Nf:</b>
                        R$ {item.valor_Total_Produtos_Nf}
                      </p>
                      <p className="mb-0">
                        <b>vlr_Invoice_Brl</b>: R$ {item.vlr_Invoice_Brl}
                      </p>
                      <p className="mb-0">
                        <b>vlr_Invoice_Brl_Por_Cntr</b>: R${' '}
                        {item.vlr_Invoice_Brl_Por_Cntr}
                      </p>
                      <p className="mb-0">
                        <b>vlr_Invoice_Usd</b>: $ {item.vlr_Invoice_Usd}
                      </p>
                      <p className="mb-0">
                        <b>vlr_Invoice_Usd_Por_Cntr</b>: ${' '}
                        {item.vlr_Invoice_Usd_Por_Cntr}
                      </p>
                      <p className="mb-0">
                        <b>Atracação</b>: {formatDateTotvs(item.atracacao)}
                      </p>
                      <p className="mb-0">
                        <b>Última Atualização</b>:{' '}
                        {formatDateTotvs(item.dtUltimaAtualizacao)} |{' '}
                        {item.hrUltimaAtualizacao}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-dark text-center fs-1 text-capitalize">
              <td>Sem dados no momento</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export const ImportacaoTabela = memo(
  ImportacaoTabelaProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
