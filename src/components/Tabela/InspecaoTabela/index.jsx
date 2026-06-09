import React from 'react';

import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import formatDateTotvs from '../../../utils/formatDataTotvs';
import BasicRating from '../../RatingStars';
import bagActiveImg from '../../../assets/bag-active.png';
import factoryActiveImg from '../../../assets/factory-active.png';
import targetActiveImg from '../../../assets/target-active.png';
import truckActiveImg from '../../../assets/truck-active.png';
import bagInactiveImg from '../../../assets/bag-inactive.png';
import factoryInactiveImg from '../../../assets/factory-inactive.png';
import briefcaseImg from '../../../assets/briefcase-ranking.png';
import phoneImg from '../../../assets/phone-ranking.png';
import shoppingCartImg from '../../../assets/shopping-cart-ranking.png';
import userGearRanking from '../../../assets/user-gear-ranking.png';
import targetInactiveImg from '../../../assets/target-inactive.png';
import truckInactiveImg from '../../../assets/truck-inactive.png';
import useSortableData from '../../../utils/sortable';
import { Button, DadosFornecedorStyle } from './styles';
import { useEffect, useState } from 'react';

export function InspecaoTabela({ ...props }) {
  const { items, requestSort, sortConfig } = useSortableData(props.inspecao);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const [infoData, setInfoData] = useState({
    notaFiscal: null,
    dataProducaoNewRender: null,
    dataCarregamentoNewRender: null,
    dataTransporteNewRender: null,
    dataEntregueNewRender: null,
  });
  useEffect(() => {
    props.novaRenderizacao(infoData);
  }, [infoData]);

  return (
    <table className="table table-striped table-hover">
      <thead className="table-dark mt-3 position-sticky top-0">
        <tr>
          {/* <th>
            <button type="button">ID</button>
          </th> */}
          <th>
            <button type="button">Fornecedor</button>
          </th>
          <th>
            <button type="button">Pro forma</button>
          </th>
          <th>
            <button type="button">Produção</button>
          </th>
          <th>
            <button type="button">Inspeção</button>
          </th>
          <th>
            <button type="button">Previsão</button>
          </th>
          <th>
            <button type="button">Entrega</button>
          </th>
          {/* <th>
            <button
            // type="button"
            // onClick={() => requestSort("sugestao")}
            // className={getClassNamesFor("sugestao")}
            >
              Data Prevista
            </button>
          </th> */}
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            className="tr-data"
            key={item.id}
            onMouseEnter={(e) => {
              setInfoData({
                dataProducaoNewRender: item.dateProducao,
                dataCarregamentoNewRender: item.dateInspecao,
                dataTransporteNewRender: item.datePrevisao,
                dataEntregueNewRender: item.dateEntrega,
              });
            }}
            onMouseLeave={(e) => props.restartRenderizacao(e)}
          >
            {/* <td>{item.id}</td> */}
            <td>
              <DadosFornecedorStyle>
                {/* <img src={briefcaseImg} alt="" /> */}
                {item.fornecedor}
              </DadosFornecedorStyle>
              <DadosFornecedorStyle>
                {/* <img src={userGearRanking} alt="" /> */}
                {item.name}
              </DadosFornecedorStyle>
            </td>
            <td>
              <p className="text-dark">{item.proforma}</p>
            </td>
            <td title='click'>
              {item.dateProducao === '' ? (
                <Button onClick={() => props.handleModalProcessProducao(item)}>
                  <img src={factoryInactiveImg} alt="" width="32px" />
                  <p>--/--/----</p>
                  <p>Update Date / 更新日期</p>
                </Button>
              ) : (
                <Button backgroundColorBlack>
                  <img src={factoryActiveImg} alt="" width="32px" />
                  <p className="text-dark">
                    {formatDateTotvs(item.dateProducao)}
                  </p>
                </Button>
              )}
            </td>
            <td>
              {item.dateInspecao === '' ? (
                <Button title='click' onClick={() => props.handleModalProcessInspecao(item)}>
                  <img src={targetInactiveImg} alt="" width="32px" />
                  <p>--/--/----</p>
                  <p>Update Date / 更新日期</p>
                </Button>
              ) : (
                <Button backgroundColorBlack>
                  <img src={targetActiveImg} alt="" width="32px" />
                  <p className="text-dark">
                    {formatDateTotvs(item.dateInspecao)}
                  </p>
                </Button>
              )}
            </td>
            <td>
              {item.datePrevisao === '' ? (
                <Button title='click' onClick={() => props.handleModalProcessPrevisao(item)}>
                  <img src={truckInactiveImg} alt="" width="32px" />
                  <p>--/--/----</p>
                  <p>Update Date / 更新日期</p>
                </Button>
              ) : (
                <Button backgroundColorBlack>
                  <img src={truckActiveImg} alt="" width="32px" />
                  <p className="text-dark">
                    {formatDateTotvs(item.datePrevisao)}
                  </p>
                </Button>
              )}
            </td>
            <td>
              {item.dateEntrega === '' ? (
                <Button title='click' onClick={() => props.handleModalProcessEntrega(item)}>
                  <img src={bagInactiveImg} alt="" width="32px" />
                  <p>--/--/----</p>
                  <p>Update Date / 更新日期</p>
                </Button>
              ) : (
                <Button backgroundColorBlack>
                  <img src={bagActiveImg} alt="" width="32px" />
                  <p>{formatDateTotvs(item.dateEntrega)}</p>
                </Button>
              )}
            </td>

            {/* <td>
                <img src={bagInactiveImg} alt="" width="32px" />
              </td>
              <td>
                <img src={truckInactiveImg} width="32px" />
              </td>
              <td>
                <img src={targetInactiveImg} width="32px" />
              </td> */}
            {/* <td>
              {formatDateTotvs(item.dataPrevista)}
              {/* {String(item.saldo).replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  '.'
                )} *
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
