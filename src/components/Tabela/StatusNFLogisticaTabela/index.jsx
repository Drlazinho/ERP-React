import React, { memo } from 'react';
import useSortableData from '../../../utils/sortable';

import { Link } from 'react-router-dom';

import { AiFillDislike, AiFillLike } from 'react-icons/ai';


import './styles.css';
import formatDateTotvs from '../../../utils/formatDataTotvs';


const StatusNFLogisticaTabelaProps = ({ novaRenderizacao, ...props }) => {
  const { items, requestSort, sortConfig } = useSortableData(props.notasFiscaisEmitidas);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table className="table table-striped">
      <thead className="table-dark mt-3 Thead-fixed">
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('notafiscal')}
              className={getClassNamesFor('notafiscal')}
            >
              Nota fiscal
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('nome')}
              className={getClassNamesFor('nome')}
            >
              Nome
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('logistica')}
              className={getClassNamesFor('logistica')}
            >
              Log.
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort("vol")}
              className={getClassNamesFor("vol")}
            >
              vol.
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('emissao')}
              className={getClassNamesFor('emissao')}
            >
              dtfat.
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('romaneio')}
              className={getClassNamesFor('meta')}
            >
              Romaneio
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
        items.map((item) => (
          <tr className="tr-data" key={item.id}>
            <th>
              <Link
                to={`/notafiscal/${item.nf}`}
                title="Visualizar Espelho da Nota Fiscal"
              >
                {item.nf}
              </Link>
            </th>
            <td>{item.nome}</td>
            <td>
              <button onClick={() => props.statusEnviado(item)} className="button-interactive-table" disabled={item.enviada !== 0}>
                {item.enviada === 0 ? (
                  <AiFillDislike style={{ color: 'red' }} />
                ) : (
                  <AiFillLike style={{ color: 'green' }} />
                )}
              </button>
            </td>
            <td>{item.qtde}</td>
            <td>{formatDateTotvs(item.emissao)}</td>
            <td>
              {item.romaneio === 'S' ? (
                <AiFillLike style={{ color: 'green' }} />
              ) : (
                <AiFillDislike style={{ color: 'red' }} />
              )}
            </td>
          </tr>
        ))
        ) : (
          <tr className="text-dark text-center fs-1 text-capitalize">
          <td>Nota pesquisada não encontrada ou Notas não emitidas no Dia</td>
        </tr>
        )
        }
      </tbody>
    </table>
  );
};

export const StatusNFLogisticaTabela = memo(
  StatusNFLogisticaTabelaProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
