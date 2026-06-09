import React from 'react';
import useSortableData from '../../../utils/sortable';

import { AiFillDislike, AiFillLike } from 'react-icons/ai';

import { TbHandStop } from 'react-icons/tb';
import { FcApproval } from 'react-icons/fc';

import './styles.css';
import Badge from '@mui/material/Badge';

const MargensTabela = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.margens);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table className="table table-striped table-hover">
      <thead className="table-dark mt-3 Thead-fixed">
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('codigo')}
              className={getClassNamesFor('codigo')}
            >
              Código
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('descricao')}
              className={getClassNamesFor('descricao')}
            >
              Descrição
            </button>
          </th>
          <th style={{ margin: 'auto' }}>
            <button
              type="button"
              onClick={() => requestSort('diasEstoque')}
              className={getClassNamesFor('diasEstoque')}
              style={{ textAlign: 'center' }}
            >
              Dias Stk
            </button>
          </th>
          {/* <th>
            <button
            // type="button"
            // onClick={() => requestSort("diasEstoque")}
            // className={getClassNamesFor("diasEstoque")}
            >
              Icon
            </button>
          </th> */}
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
              onClick={() => requestSort('preco')}
              className={getClassNamesFor('preco')}
            >
              Preço
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('precoMedio')}
              className={getClassNamesFor('precoMedio')}
            >
              Preço Medio
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('custo')}
              className={getClassNamesFor('custo')}
            >
              Custo Inv.
            </button>
          </th>
          {/* <th>
            <button
              type="button"
              onClick={() => requestSort("fator")}
              className={getClassNamesFor("fator")}
            >
              Fator
            </button>
          </th> */}
          {/* <th>
            <button
              type="button"
              onClick={() => requestSort("pos")}
              className={getClassNamesFor("pos")}
            >
              Pos.
            </button>
          </th> */}
          <th coldSpan={2}>
            <button
              type="button"
              onClick={() => requestSort('sugestaoTri')}
              className={getClassNamesFor('sugestaoTri')}
            >
              Sugestão
            </button>
          </th>
          {/* <th>
            
          </th> */}
          <th>
            <button
              type="button"
              onClick={() => requestSort('vendastri')}
              className={getClassNamesFor('vendastri')}
            >
              Vendas-90D
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('invoices')}
              className={getClassNamesFor('invoices')}
            >
              Invoices
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('local')}
              className={getClassNamesFor('local')}
            >
              Local
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.codigo}</td>
            <td>{item.descricao}</td>
            <td>
              {item.diasEstoque <= 90 && (
                <>
                  <Badge badgeContent="A" color="success" />{' '}
                  <b>{item.diasEstoque.toFixed(0)}</b>
                </>
              )}
              {item.diasEstoque > 90 && item.diasEstoque <= 120 && (
                <>
                  <Badge badgeContent="B" color="warning" />{' '}
                  <b>{item.diasEstoque.toFixed(0)}</b>
                </>
              )}
              {item.diasEstoque > 120 && (
                <>
                  <Badge badgeContent="C" color="error" />{' '}
                  <b>{item.diasEstoque.toFixed(0)}</b>
                </>
              )}
            </td>
            {/* <td></td> */}
            <td>{String(item.saldo).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
            <td>R${item.preco}</td>
            <td>R${item.precoMedio}</td>
            <td>R${item.custo}</td>
            {/* <td>{item.fator.toFixed(2)}</td> */}
            {/* <td>
              {item.fator > 2.0 ? (
                <BsFillArrowUpCircleFill style={{ color: "green" }} size={20} />
              ) : (
                <BsFillArrowDownCircleFill style={{ color: "red" }} size={20} />
              )}
            </td> */}
            <td>
              {(item.sugestaoTri - item.invoice).toFixed(0) > 0 ? (
                <>
                  <FcApproval style={{ color: 'green' }} size={24} />
                </>
              ) : (
                <TbHandStop style={{ color: 'red' }} size={24} />
              )}{' '}
              <b>
                {(item.sugestaoTri - item.invoice).toFixed(0) > 0
                  ? String(item.sugestaoTri - item.invoice).replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      '.'
                    )
                  : 0}
              </b>
            </td>
            <td>
              {String(item.vendasTri).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </td>
            <td>
              {String(item.invoice).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </td>
            <td>{item.local}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MargensTabela;
