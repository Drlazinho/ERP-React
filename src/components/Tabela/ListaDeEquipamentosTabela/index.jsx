import React, { memo } from 'react';
import useSortableData from '../../../utils/sortable';
import './styles.css';
import { FaLock, FaLockOpen } from 'react-icons/fa';

const ListaDeEquipamentosTabelaProps = ({ ...props }) => {
  const { items, requestSort, sortConfig } = useSortableData(
    props.ListaDeEquipamentos
  );

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
              onClick={() => requestSort('filial')}
              className={getClassNamesFor('filial')}
            >
              Filial
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('placaPatrimonio')}
              className={getClassNamesFor('placaPatrimonio')}
            >
              Placa de Patrimônio
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('descricao')}
              className={getClassNamesFor('descricao')}
            >
              Descriçao
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('responsavel')}
              className={getClassNamesFor('responsavel')}
            >
              Responsável
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('setor')}
              className={getClassNamesFor('setor')}
            >
              Setor
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('observacao')}
              className={getClassNamesFor('observacao')}
            >
              Observacao
            </button>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.equipamentoId}>
            <td>{item.filial}</td>
            <td>{item.placaPatrimonio}</td>
            <td>{item.descricao}</td>
            <td>{item.responsavel}</td>
            <td>{item.setor}</td>
            <td>{item.observacao}</td>
            <td>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => props.updatePatrimonio(item)}
              >
                <i className="fas fa-pen me-2"></i>
                Editar
              </button>

              <button
                className="btn btn-sm btn-outline-danger me-2"
                onClick={() => props.deletePatrimonio(item)}
              >
                <i className="fas fa-pen me-2"></i>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const ListaDeEquipamentosTabela = memo(
  ListaDeEquipamentosTabelaProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
