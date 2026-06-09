import React, { useCallback, useState } from 'react';
import useSortableData from '../../../../../utils/sortable';
import './styles.css';
import formatDateTotvs from '../../../../../utils/formatDataTotvs';

import { TableRow } from './TableRow';
import ModalLoading from '../../../../../components/ModalLoading';
import { useToast } from '../../../../../hooks/toast.hook';
import { buscarImportAcompanharFiltro } from '@/pages/Setor_Importacao/AcompanhamentoDeNavios/acompanhamentoDeNavios.service';

const TabelaEntradaDeImportacao = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.entrada);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const [expanded, setExpanded] = useState(false);
  const [subData, setSubData] = useState([]);
  const [tableRowId, setTableRowId] = useState();
  const [removeLoading, setRemoveLoading] = useState(true);

  const { addToast } = useToast();

  const handleExpand = (value) => {
    if (expanded === false) {
      setRemoveLoading(false);
      buscarImportAcompanharFiltro(value)
        .then((res) => {
          setExpanded(!expanded);
          setSubData(res);
          setTableRowId(value);
        })
        .catch(() => {
          addToast({
            type: 'danger',
            title: 'Erro ao Listar as Entradas Invoice',
            description:
              'Erro ao Listar Entradas Invoice - por favor tente novamente dentre de instantes !',
          });
        })
        .finally(() => {
          setRemoveLoading(true);
        });
    }
    if (expanded === true) {
      setExpanded(!expanded);
      setSubData([]);
    }
  };

  return (
    <>
      <ModalLoading show={removeLoading} />
      <table className="table table-striped table-hover">
        <thead className="table-dark mt-3 position-sticky">
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort('c7_PRODUTO')}
                className={getClassNamesFor('c7_PRODUTO')}
              >
                Produto
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('c7_QUANT')}
                className={getClassNamesFor('c7_QUANT')}
              >
                Solicitado
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('c7_QUJE')}
                className={getClassNamesFor('c7_QUJE')}
              >
                Entregue
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('c7_LOCAL')}
                className={getClassNamesFor('c7_LOCAL')}
              >
                Local
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('c7_NUM')}
                className={getClassNamesFor('c7_NUM')}
              >
                Num
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('c7_EMISSAO')}
                className={getClassNamesFor('c7_EMISSAO')}
              >
                Emissão
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('c7_PO_EIC')}
                className={getClassNamesFor('c7_PO_EIC')}
              >
                PO_EIC
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('c7_TXMOEDA')}
                className={getClassNamesFor('c7_TXMOEDA')}
              >
                Tx. Moeda
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('c7_PRECO')}
                className={getClassNamesFor('c7_PRECO')}
              >
                Preço
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('c7_TOTAL')}
                className={getClassNamesFor('c7_TOTAL')}
              >
                Total
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('c7_DESCRI')}
                className={getClassNamesFor('c7_DESCRI')}
              >
                Descrição
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('qtd_Cntr_Produto')}
                className={getClassNamesFor('qtd_Cntr_Produto')}
              >
                Qtd_Cntr
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('status_Cntr')}
                className={getClassNamesFor('status_Cntr')}
              >
                Status
              </button>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <TableRow
              key={index}
              rowData={item}
              handleExpand={handleExpand}
              expanded={expanded}
              subData={subData}
              tableRowId={tableRowId}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TabelaEntradaDeImportacao;
