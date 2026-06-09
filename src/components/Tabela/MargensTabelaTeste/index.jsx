import React from 'react';
import useSortableData from '../../../utils/sortable';

import { VirtualTable } from '../../../context/VirtualTable/VirtualTableContext';

import './styles.css';

const MargensTabelaTeste = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.margens);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  function Row() {
    return (
      <tr>
        {/** Make sure your table rows are the same height as what you passed into the list... */}
        <td style={{ height: '36px' }}></td>
        <td>Col 2</td>
        <td>Col 3</td>
        <td>Col 4</td>
      </tr>
    );
  }

  return (
    <table className="table table-striped table-hover">
      <VirtualTable
        height={300}
        width="100%"
        itemCount={1000}
        itemSize={36}
        header={
          <thead className="table-dark mt-3">
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
              <th>
                <button
                  type="button"
                  onClick={() => requestSort('diasEstoque')}
                  className={getClassNamesFor('diasEstoque')}
                >
                  Dias Stk
                </button>
              </th>
              <th>
                <button
                // type="button"
                // onClick={() => requestSort("diasEstoque")}
                // className={getClassNamesFor("diasEstoque")}
                >
                  Icon
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
                  Custo Medio Inv.
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
              <th>
                <button
                // type="button"
                // onClick={() => requestSort("pos")}
                // className={getClassNamesFor("pos")}
                >
                  Icon
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort('sugestao')}
                  className={getClassNamesFor('sugestao')}
                >
                  Sugestão
                </button>
              </th>
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
        }
        row={Row}
      />
      {/* <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.codigo}</td>
            <td>{item.descricao}</td>
            <td>{item.diasEstoque}</td>
            <td>
              {item.diasEstoque > 90 ? (
                <>
                  <AiFillLike style={{ color: 'green' }} size={20} />
                </>
              ) : (
                <>
                  <AiFillDislike style={{ color: 'red' }} size={20} />
                </>
              )}
            </td>
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
           {/* } <td>
              {(item.sugestaoTri - item.invoice).toFixed(0) > 0 ? (
                <>
                  <FcApproval style={{ color: 'green' }} size={24} />
                </>
              ) : (
                <TbHandStop style={{ color: 'red' }} size={24} />
              )}
            </td>
            <td>
              {(item.sugestaoTri - item.invoice).toFixed(0) > 0
                ? (item.sugestaoTri - item.invoice).toFixed(0)
                : 0}
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
      </tbody> */}
    </table>
  );
};

export default MargensTabelaTeste;
