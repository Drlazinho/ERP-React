import React, { memo, useEffect, useState } from 'react';
import useSortableData from '../../../utils/sortable';
import './styles.css';
import formatDateTotvs from '../../../utils/formatDataTotvs';

function TitulosPagarTabelaProps({ ...props }) {
  const { items, requestSort, sortConfig } = useSortableData(
    props.titulosPagar
  );
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  function formatarData(data) {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  const formatarHora = (hora) => {
    if (!hora) return '';
    return hora.replace(/-/g, ':');
  };

  return (
    <table className="table table-striped">
      <thead className="table-dark mt-3">
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('filial')}
              className={getClassNamesFor('filial')}
            >
              Filial
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('cliente')}
              className={getClassNamesFor('cliente')}
            >
              Cliente
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('prefixo')}
              className={getClassNamesFor('prefixo')}
            >
              Prefixo
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('numero')}
              className={getClassNamesFor('numero')}
            >
              Nº
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('parcela')}
              className={getClassNamesFor('parcela')}
            >
              Parcela
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('tipo')}
              className={getClassNamesFor('tipo')}
            >
              Tipo
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('natureza')}
              className={getClassNamesFor('natureza')}
            >
              Natureza
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('moeda')}
              className={getClassNamesFor('moeda')}
            >
              Moeda
            </button>
          </th>
          <th>
            <button>Cotação</button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('valororiginal')}
              className={getClassNamesFor('valororiginal')}
            >
              Valor Original
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('saldo')}
              className={getClassNamesFor('saldo')}
            >
              Saldo
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('emissao')}
              className={getClassNamesFor('emissao')}
            >
              Emissao
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('vencimento')}
              className={getClassNamesFor('vencimento')}
            >
              Vencto. Real
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('historico')}
              className={getClassNamesFor('historico')}
            >
              Historico
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('portador')}
              className={getClassNamesFor('portador')}
            >
              Portador
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('numBco')}
              className={getClassNamesFor('numBco')}
            >
              numBco
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('atraso')}
              className={getClassNamesFor('atraso')}
            >
              Dias Atraso
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('atualizacao')}
              className={getClassNamesFor('atualizacao')}
            >
              Ultima Atualização
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((item) => (
            <tr
              className={`td-data ${
                item.saldo !== item.valor_Orig && 'marcador-linha-tabela'
              }`}
              key={item.id}
              title={
                item.saldo !== item.valor_Orig &&
                'O saldo difere do valor original'
              }
            >
              <th>{item.filial}</th>
              <td>
                {item.cliente}
                <br />
                {item.nome_Cliente}
              </td>
              <td>{item.prefixo}</td>
              <td>{item.numero}</td> <td>{item.parcela}</td>
              <td>{item.tipo}</td> <td>{item.natureza}</td>
              <td>{item.moeda}</td>
              <td>{item.cotacao}</td>
              <td className={item.saldo !== item.valor_Orig && 'fw-bold'}>
                R$ {item.valor_Orig}
              </td>
              <td className={item.saldo !== item.valor_Orig && 'fw-bold'}>
                R$ {item.saldo}
              </td>
              <td>{item.emissao}</td>
              <td>{item.vencto_Real}</td>
              <td>{item.historico}</td>
              <td>{item.portador}</td>
              <td>{item.numBco}</td>
              <td>{item.dias_atraso}</td>
              <td>
                {formatarData(item.dtUltimaAtualizacao)}
                {' - '}
                {formatarHora(item.hrUltimaAtualizacao)}
              </td>
            </tr>
          ))
        ) : (
          <tr className="text-dark text-center fs-1 text-capitalize">
            <td>Títulos a Pagar sem registro no dia</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export const TitulosPagarTabela = memo(
  TitulosPagarTabelaProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
