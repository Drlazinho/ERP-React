import { memo } from 'react';
import useSortableData from '../../../utils/sortable';
import { Buttonth } from './styles';
import formatDateTotvs from '../../../utils/formatDataTotvs';
import { GrDocumentPdf } from 'react-icons/gr';

function ContratadosTabelaProps({ ...props }) {
  const { items, requestSort, sortConfig } = useSortableData(props.contratos);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <table className="table table-striped table-hover">
      <thead className="table-dark mt-3">
        <tr>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('cidade')}
              className={getClassNamesFor('cidade')}
            >
              Contratado
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('pais')}
              className={getClassNamesFor('pais')}
            >
              Email Contratante
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('email')}
              className={getClassNamesFor('email')}
            >
              Data Assinatura
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('responsavel')}
              className={getClassNamesFor('responsavel')}
            >
              Data Vencimento
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('responsavel')}
              className={getClassNamesFor('responsavel')}
            >
              Valor R$
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('responsavel')}
              className={getClassNamesFor('responsavel')}
            >
              forma Pgto
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('responsavel')}
              className={getClassNamesFor('responsavel')}
            >
              Ind. de Reajuste
            </Buttonth>
          </th>

          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('responsavel')}
              className={getClassNamesFor('responsavel')}
            >
              Editar
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('responsavel')}
              className={getClassNamesFor('responsavel')}
            >
              Arquivo
            </Buttonth>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr className="tr-data" key={item.id}>
            <td>{item.contratado}</td>
            <td>
              <p className="text-dark">{item.emailContratante}</p>
            </td>
            <td>
              <p className="text-dark">
                {formatDateTotvs(item.dataAssinatura)}
              </p>
            </td>
            <td>
              <p className="text-dark">
                {formatDateTotvs(item.dataVencimento)}
              </p>
            </td>
            <td>
              <p className="text-dark">R$ {item.valor}</p>
            </td>
            <td>
              <p className="text-dark">{item.formaPgto}</p>
            </td>
            <td>
              <p className="text-dark">% {item.indiceReajuste}</p>
            </td>
            <td>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => props.atualizarContrato(item)}
              >
                <i className="fas fa-pen me-2"></i>
                Editar
              </button>
            </td>
            <td>
              <button
                className="btn btn-sm btn-outline-primary me-2 border-0"
                onClick={() => props.baixarContrato(item.id)}
              >
                <GrDocumentPdf size={24} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export const ContratadosTabela = memo(
  ContratadosTabelaProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
