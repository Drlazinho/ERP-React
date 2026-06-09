import React, { memo } from 'react';
import useSortableData from '../../../utils/sortable';
import './style.css';
import { Buttonth } from '../../Tabela/InspetorTabela/styles';
import formarDate from '../../../utils/formatDataTotvs';
import { formatDateTime } from '../../../utils/formatDateInput';

const HistoricoMovInsumosTabelaProps = ({ ...props }) => {
  const { items, requestSort, sortConfig } = useSortableData(
    props.listaInsumosMovimentacao
  );
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table className="table table-striped table hover">
      <thead className="table-dark mt-3 position-sticky top 0">
        <tr>
          <th>
            {''}
            <th>
              <Buttonth
                type="button"
                onClick={() => requestSort('idProduto')}
                className={getClassNamesFor('idProduto')}
              >
                Produto
              </Buttonth>
            </th>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('tipoMovimentacao')}
              className={getClassNamesFor('tipoMovimentacao')}
            >
              Movimentação
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('dataMov')}
              className={getClassNamesFor('dataMov')}
            >
              Dt.Movimentacao
            </Buttonth>
          </th>


          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('quantidadeMov')}
              className={getClassNamesFor('quantidadeMov')}
            >
              qtd. Mov.
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('saldoNovo')}
              className={getClassNamesFor('saldoNovo')}
            >
              SaldoNovo
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('saldoAnterior')}
              className={getClassNamesFor('saldoAnterior')}
            >
              SaldoAnterior
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('setor')}
              className={getClassNamesFor('setor')}
            >
              Setor
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('descricao')}
              className={getClassNamesFor('descricao')}
            >
              Destino
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('usuario')}
              className={getClassNamesFor('usuario')}
            >
              Usuario
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('usuarioSistema')}
              className={getClassNamesFor('usuarioSistema')}
            >
              UsuarioSistema
            </Buttonth>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr className="tr-data" key={item.id}>
            <td>{item.produto}</td>
            <td>{item.tipoMovimentacao}</td>
            <td>
              {item.dataMov === ''
                ? '--/--/----'
                : formatDateTime(item.dataMov)}
            </td>
            <td>{item.qtdMov}</td>
            <td>{item.saldoNovo}</td>
            <td>{item.saldoAnterior}</td>
            <td>{item.setor}</td>
            <td>{item.descricao === null ? '-----' : item.descricao}</td>
            <td>{item.usuario}</td>
            <td>{item.usuarioSistema}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const HistoricoMovInsumosTabela = memo(
  HistoricoMovInsumosTabelaProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
