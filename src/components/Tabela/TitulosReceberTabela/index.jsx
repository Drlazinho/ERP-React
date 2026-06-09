import React, { memo, useEffect, useState } from 'react';
import useSortableData from '../../../utils/sortable';

import { Link } from 'react-router-dom';

import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { ImHappy2 } from 'react-icons/im';
import { RiEmotionUnhappyFill } from 'react-icons/ri';

import './styles.css';
import formatDateTotvs from '../../../utils/formatDataTotvs';

function TitulosReceberTabelaProps({ ...props }) {
  const { items, requestSort, sortConfig } = useSortableData(
    props.titulosReceber
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
            <button
              type="button"
              onClick={() => requestSort('valor_Orig')}
              className={getClassNamesFor('valor_Orig')}
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
              onClick={() => requestSort('dias_Atraso')}
              className={getClassNamesFor('dias_Atraso')}
            >
              Dias Atraso
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('avencer')}
              className={getClassNamesFor('avencer')}
            >
              A Vencer
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('vencido')}
              className={getClassNamesFor('vencido')}
            >
              Vencido
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('dtUltimaAtualizacao')}
              className={getClassNamesFor('dtUltimaAtualizacao')}
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
              <td className={item.saldo !== item.valor_Orig && 'fw-bold'}>
                {item.valor_Orig}
              </td>
              <td className={item.saldo !== item.valor_Orig && 'fw-bold'}>
                {item.saldo}
              </td>
              <td>{item.emissao}</td>
              <td>{item.vencto_Real}</td>
              <td>{item.historico}</td>
              <td>{item.portador}</td>
              <td>{item.numBco}</td>
              <td>{item.dias_Atraso}</td>
              <td>{item.avencer}</td>
              <td>{item.vencido}</td>
              <td>
                {formatarData(item.dtUltimaAtualizacao)}
                {' - '}
                {formatarHora(item.hrUltimaAtualizacao)}
              </td>
            </tr>
          ))
        ) : (
          <tr className="text-dark text-center fs-1 text-capitalize">
            <td>Títulos a Receber sem registro no mês</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export const TitulosReceberTabela = memo(
  TitulosReceberTabelaProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
