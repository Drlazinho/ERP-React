import React, { memo } from 'react';
import useSortableData from '../../../utils/sortable';
import './styles.css';
import { FaLock, FaLockOpen } from 'react-icons/fa';

import { TbPassword } from 'react-icons/tb';
import { CgPassword } from 'react-icons/cg';
import { RiLockUnlockFill } from 'react-icons/ri';
import { LockReset, Password } from '@mui/icons-material';
import { Tooltip } from '@mui/material';

const GerenciadorUserTabelaProps = ({ ...props }) => {
  const { items, requestSort, sortConfig } = useSortableData(props.userList);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const bloquearUsuario = (item) => {
    props.bloquearUsuario(item);
  };

  return (
    <table className="table table-hover">
      <thead className="table-dark mt-3 Thead-fixed">
        <tr>
          <th colSpan={2}>
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
              onClick={() => requestSort('email')}
              className={getClassNamesFor('email')}
            >
              email
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('setor')}
              className={getClassNamesFor('setor')}
            >
              setor
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('nivel')}
              className={getClassNamesFor('nivel')}
            >
              nivel
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('nivel')}
              className={getClassNamesFor('nivel')}
            >
              Status Perfil
            </button>
          </th>
          <th>
            <button type="button">Redefinir Senha</button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            className={`tr-data ${item.nivel.id === 0 && 'tr-bloqueada'}`}
            key={item.id}
          >
            <td>{item.id}</td>
            <td>{item.nome}</td>
            <td>{item.email}</td>
            <td>
              {item.setor.id} - {item.setor.setor}
            </td>
            <td>
              {item.nivel.id} - {item.nivel.nivel}
            </td>
            <td>
              <button
                className={`btn btn-sm me-2 ${
                  item.nivel.id === 0 ? 'btn-danger' : ' btn-warning'
                }`}
                onClick={() => props.handleModalUpdateUsuario(item)}
              >
                Atualizar
              </button>
              {item.nivel.id !== 0 ? (
                <Tooltip title="Usuário LIBERADO pra Gestão Web">
                  <button
                    className="btn btn-outline-dark me-2"
                    onClick={() => bloquearUsuario(item)}
                  >
                    <span>
                      <FaLockOpen />
                    </span>
                  </button>
                </Tooltip>
              ) : (
                <Tooltip title="Usuário BLOQUEADO pra Gestão Web">
                  <button className="btn">
                    <span>
                      <FaLock color="#e89e9e" />
                    </span>
                  </button>
                </Tooltip>
              )}
            </td>
            <td>
              <button
                className={`btn btn-sm me-2
                 ${
                   item.nivel.id === 0
                     ? 'btn-outline-danger'
                     : ' btn-outline-info'
                 }`}
                onClick={() => props.updateSenhaUsuario(item.email)}
              >
                <span>
                  <LockReset />
                </span>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const TabelaGerenciarUser = memo(
  GerenciadorUserTabelaProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
