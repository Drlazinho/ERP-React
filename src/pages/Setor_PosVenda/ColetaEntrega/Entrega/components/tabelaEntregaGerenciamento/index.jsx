import React, { memo, useEffect, useState } from 'react';
import { BsCheckAll, BsClock } from 'react-icons/bs';
import formatDateTotvs from '@/utils/formatDataTotvs';
import { Box, Button } from '@mui/material';
import { MdCancel } from 'react-icons/md';
import { TbWallpaperOff } from 'react-icons/tb';
import { FaTruckFast } from 'react-icons/fa6';

import useSortableData from '@/utils/sortable';
import './styles.css';

function TabelaEntregasGerenciamentoProps({ eventScrollToBottom, ...props }) {
  const { items, requestSort, sortConfig } = useSortableData(
    props.posVendaEntregaLista
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
    <table className="table table-striped">
      <thead className="table-grey mt-3">
        <tr>
          <th>
            <button type="button">Atualizar</button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('ordemServico')}
              className={getClassNamesFor('ordemServico')}
              style={{ whiteSpace: 'nowrap' }}
            >
              Ordem de Serviço
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
              onClick={() => requestSort('origem')}
              className={getClassNamesFor('origem')}
            >
              Origem
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('dataRegistro')}
              className={getClassNamesFor('dataRegistro')}
              style={{ whiteSpace: 'nowrap' }}
            >
              Data Registro
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('dataAtualizacao')}
              className={getClassNamesFor('dataAtualizacao')}
              style={{ whiteSpace: 'nowrap' }}
            >
              Data Atualização
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('dataSaida')}
              className={getClassNamesFor('dataSaida')}
            >
              Programação
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('dataPrevisao')}
              className={getClassNamesFor('dataPrevisao')}
              style={{ whiteSpace: 'nowrap' }}
            >
              Data Previsão
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('dataEntrega')}
              className={getClassNamesFor('dataEntrega')}
              style={{ whiteSpace: 'nowrap' }}
            >
              Data Entrega
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('classificacao')}
              className={getClassNamesFor('classificacao')}
            >
              Classificação
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
          items
            ?.map((item) => (
              <tr
                key={item.id}
                className={
                  item.situacao === 'CANCELADO' && 'coletaEntregaTachado'
                }
              >
                <td>
                  {props.loader ? (
                    <>
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
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
                          onClick={() => props.itemAtualizarRegistro(item)}
                          variant="outlined"
                          sx={{
                            color: '#0288d1',
                            borderColor: '#81d4fa',
                            borderRadius: '12px',
                            fontWeight: '400',
                            '&:hover': {
                              borderColor: '#81d4fa',
                              backgroundColor: '#e1f5fe',
                            },
                          }}
                        >
                          Atualizar
                        </Button>
                      </Box>
                    </>
                  )}
                </td>
                <td>{item.ordemServico}</td>

                <td style={{ whiteSpace: 'nowrap' }}>
                  <b>{item.cliente}</b>
                </td>
                <td>{item.notaFiscal}</td>
                <td>{item.municipio.toUpperCase()}</td>
                <td>{item.uf}</td>
                <td>{item.origem}</td>
                <td>{formatDateTotvs(item.dataRegistro)}</td>
                <td>{formatDateTotvs(item.dataAtualizacao)}</td>
                <td>{formatDateTotvs(item.dataSaida)}</td>
                <td>{formatDateTotvs(item.dataPrevisao)}</td>
                <td>{formatDateTotvs(item.dataEntrega)}</td>
                <td>{item.classificacao}</td>
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
            .reverse()
        ) : (
          <tr className="text-dark text-center fs-1 text-capitalize">
            <td colSpan="14">Sem Registro de Entrega até o momento</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export const TabelaEntregasGerenciamento = memo(
  TabelaEntregasGerenciamentoProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
