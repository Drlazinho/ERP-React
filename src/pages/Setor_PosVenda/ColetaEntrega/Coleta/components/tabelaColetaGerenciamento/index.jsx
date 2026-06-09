import React, { memo, useEffect, useState } from 'react';
import { BsCheckAll, BsClock } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';
import { TbWallpaperOff } from 'react-icons/tb';
import { FaTruckFast } from 'react-icons/fa6';

import useSortableData from '@/utils/sortable';
import formatDateTotvs from '@/utils/formatDataTotvs';
import './styles.css';
import { Box, Button } from '@mui/material';

function TabelaColetaGerenciamentoProps({ eventScrollToBottom, ...props }) {
  const { items, requestSort, sortConfig } = useSortableData(
    props.posVendaColetaLista
  );

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const itemAtualizarRegistro = (value) => {
    props.itemAtualizarRegistro(value);
  };

  const itemRegistroImagem = (value) => {
    props.itemRegistroImagem(value);
  };

  const aguardandoSituacoes = [
    'AGUARDANDO COLETA',
    'AGUARDANDO FATURAMENTO',
    'AGUARDANDO EMBARQUE',
    'AGUARDANDO CADASTRO NA TOTVS',
  ];
  const transladoSituacoes = [
    'EM TRANSLADO PARA O CLIENTE',
    'EM TRANSLADO PARA A FÁBRICA',
    'EM TRANSLADO PARA CD SP',
    'EM TRANSLADO PARA O POSTO',
  ];

  return (
    <div className="table-container">
      <table className="table table-striped">
        <thead className="table-grey mt-3">
          <tr>
            <th>
              <button type="button">Atualizar imagens/dados</button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('protocolo')}
                className={getClassNamesFor('protocolo')}
              >
                Protocolo
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
                onClick={() => requestSort('notaFiscal')}
                className={getClassNamesFor('notaFiscal')}
                style={{ whiteSpace: 'nowrap' }}
              >
                Nota Fiscal
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('notaFiscal')}
                className={getClassNamesFor('notaFiscal')}
              >
                Cidade
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('notaFiscal')}
                className={getClassNamesFor('notaFiscal')}
              >
                UF
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('dataRegistro')}
                className={getClassNamesFor('dataRegistro')}
                style={{ whiteSpace: 'nowrap' }}
              >
                Data de Registro
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('dataAtualizacao')}
                className={getClassNamesFor('dataAtualizacao')}
                style={{ whiteSpace: 'nowrap' }}
              >
                Atualizado em
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('dataAutoriz')}
                className={getClassNamesFor('dataAutoriz')}
                style={{ whiteSpace: 'nowrap' }}
              >
                Autorizado em
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('dataPrevisao')}
                className={getClassNamesFor('dataPrevisao')}
                style={{ whiteSpace: 'nowrap' }}
              >
                Prev. Coleta
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('dataColeta')}
                className={getClassNamesFor('dataColeta')}
                style={{ whiteSpace: 'nowrap' }}
              >
                Data Coleta
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('dataPrevisaoEntrega')}
                className={getClassNamesFor('dataPrevisaoEntrega')}
                style={{ whiteSpace: 'nowrap' }}
              >
                Data Entrega
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('situacao')}
                className={getClassNamesFor('situacao')}
              >
                Situação
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort('transportadora')}
                className={getClassNamesFor('transportadora')}
              >
                Transportadora
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {items?.length > 0 ? (
            items?.map((item) => (
              <tr
                key={item.id}
                className={
                  item.situacao === 'CANCELADO' && 'coletaEntregaTachado'
                }
              >
                <td>
                  {props.loader ? (
                    <>
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '10px',
                          paddingLeft: '8px',
                        }}
                      >
                        <Button
                          onClick={() => itemAtualizarRegistro(item)}
                          variant="outlined"
                          sx={{
                            color: '#0288d1',
                            borderColor: '#81d4fa',
                            borderRadius: '12px',
                            fontWeight: '400',
                            position: 'relative',
                            zIndex: 1,
                            '&:hover': {
                              borderColor: '#81d4fa',
                              backgroundColor: '#e1f5fe',
                            },
                          }}
                        >
                          Atualizar
                        </Button>
                        <Button
                          onClick={() => itemRegistroImagem(item)}
                          variant="outlined"
                          sx={{
                            color: '#0288d1',
                            borderColor: '#81d4fa',
                            borderRadius: '12px',
                            fontWeight: '400',
                            position: 'relative',
                            zIndex: 1,
                            '&:hover': {
                              borderColor: '#81d4fa',
                              backgroundColor: '#e1f5fe',
                            },
                          }}
                        >
                          Imagens
                        </Button>
                      </Box>
                    </>
                  )}
                </td>
                <td>{item.protocolo}</td>
                <td>
                  <b>{item.cliente}</b>
                </td>
                <td>{item.notaFiscal}</td>
                <td>{item.municipio.toUpperCase()}</td>
                <td>{item.uf}</td>
                <td>{formatDateTotvs(item.dataRegistro)}</td>
                <td>{formatDateTotvs(item.dataAtualizacao)}</td>
                <td>{formatDateTotvs(item.dataAutoriz)}</td>
                <td>{formatDateTotvs(item.dataPrevisao)}</td>
                <td>{formatDateTotvs(item.dataColeta)}</td>
                <td>{formatDateTotvs(item.dataPrevisaoEntrega)}</td>
                {item.situacao === 'FINALIZADO' ? (
                  <td style={{ color: '#129712', fontWeight: 'bold' }}>
                    {item.situacao} <BsCheckAll color="#129712" size={24} />
                  </td>
                ) : aguardandoSituacoes.includes(item.situacao) ? (
                  <td style={{ color: '#f39c12', fontWeight: 'bold' }}>
                    {item.situacao} <BsClock color="#f39c12" size={24} />
                  </td>
                ) : item.situacao === 'CANCELADO' ? (
                  <td style={{ color: 'red', fontWeight: 'bold' }}>
                    {item.situacao} <MdCancel color="red" size={24} />
                  </td>
                ) : item.situacao === 'SEM REGISTRO' ? (
                  <td style={{ color: '#2ba8ef', fontWeight: 'bold' }}>
                    {item.situacao} <TbWallpaperOff color="#2ba8ef" size={24} />
                  </td>
                ) : transladoSituacoes.includes(item.situacao) ? (
                  <td style={{ color: '#2ba8ef', fontWeight: 'bold' }}>
                    {item.situacao} <FaTruckFast color="#2ba8ef" size={24} />
                  </td>
                ) : (
                  <td style={{ fontWeight: 'bold' }}>{item.situacao}</td>
                )}
                <td>{item.transportadora}</td>
              </tr>
            ))
          ) : (
            <tr className="text-dark text-center fs-1 text-capitalize">
              <td colSpan="14">Sem Registro de Coleta até o momento</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export const TabelaColetaGerenciamento = memo(
  TabelaColetaGerenciamentoProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
