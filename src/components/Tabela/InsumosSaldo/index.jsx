import React, { memo } from 'react';
import useSortableData from '../../../utils/sortable';
import './style.css';
import { Buttonth } from '../../Tabela/InspetorTabela/styles';
import { Button, Box } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const ConsultarInsumosSaldoTabelaProps = ({ ...props }) => {
  const { items, requestSort, sortConfig } = useSortableData(
    props.consultarInsumosSaldo
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
            <Buttonth
              type="button"
              onClick={() => requestSort('tipo')}
              className={getClassNamesFor('tipo')}
            >
              Tipo
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('fornecedor')}
              className={getClassNamesFor('fornecedor')}
            >
              Fornecedor
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('codProduto')}
              className={getClassNamesFor('codProduto')}
            >
              CodProduto
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('nome')}
              className={getClassNamesFor('nome')}
            >
              Nome
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('custo')}
              className={getClassNamesFor('custo')}
            >
              Custo
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('um')}
              className={getClassNamesFor('um')}
            >
              Unidade de Medida
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('qtd_UM')}
              className={getClassNamesFor('qtd_UM')}
            >
              Quantidade UM
            </Buttonth>
          </th>

          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('saldo')}
              className={getClassNamesFor('saldo')}
            >
              Saldo
            </Buttonth>
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr className="tr-data" key={item.id}>
            <td>{item.tipo}</td>
            <td>{item.fornecedor}</td>
            <td>{item.codProduto}</td>
            <td>{item.nome}</td>
            <td>R$ {item.custo}</td>
            <td>{item.um}</td>
            <td>{item.qtd_UM}</td>
            <td>{item.saldo}</td>
            <td>
              <Box sx={{ gap: 1, display: 'flex' }}>
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  onClick={() => props.editarValorInsumos(item.id)}
                  startIcon={<ExitToAppIcon />}
                >
                  Saída
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => props.editarInsumos(item)}
                  startIcon={<CreateIcon />}
                >
                  Editar valor
                </Button>
              </Box>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const ConsultarInsumosSaldoTabela = memo(
  ConsultarInsumosSaldoTabelaProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
