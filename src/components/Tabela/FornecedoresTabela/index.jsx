import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import formatDateTotvs from '../../../utils/formatDataTotvs';
import BasicRating from '../../RatingStars';
import bagActiveImg from '../../../assets/bag-active.png';
import factoryActiveImg from '../../../assets/factory-active.png';
import targetActiveImg from '../../../assets/target-active.png';
import truckActiveImg from '../../../assets/truck-active.png';
import bagInactiveImg from '../../../assets/bag-inactive.png';
import factoryInactiveImg from '../../../assets/factory-inactive.png';
import targetInactiveImg from '../../../assets/target-inactive.png';
import truckInactiveImg from '../../../assets/truck-inactive.png';
import useSortableData from '../../../utils/sortable';

import { Button, Buttonth, DadosFornecedorStyle } from './styles';
import { useEffect, useState } from 'react';

export function FornecedoresTabela({ ...props }) {
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
            <Buttonth
              type="button"
              onClick={() => requestSort('id')}
              className={getClassNamesFor('id')}
            >
              Fornecedor / ID
            </Buttonth>
          </th>
          <th>
            <Buttonth type="button" className='button-style-th'>Doc</Buttonth>
          </th>
          <th>
            <Buttonth type="button">Cod.</Buttonth>
          </th>
          <th>
            <Buttonth type="button">Produção</Buttonth>
          </th>
          <th>
            <Buttonth type="button">Inspeção</Buttonth>
          </th>
          <th>
            <Buttonth type="button">Previsão</Buttonth>
          </th>
          <th>
            <Buttonth type="button">Entrega</Buttonth>
          </th>
          <th>
            <Buttonth type="button">Pagamento</Buttonth>
          </th>
          <th>
            <Buttonth type="button">perPago</Buttonth>
          </th>
          <th>
            <Buttonth type="button">Quitado</Buttonth>
          </th>
          <th>
            <Buttonth type="button">Ranking</Buttonth>
          </th>
          <th>
            <Buttonth type="button">Opções</Buttonth>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            className="tr-data"
            key={item.id}
            onMouseEnter={(e) => {
              setInfoData({
                dataProducaoNewRender: item.dataProducao,
                dataCarregamentoNewRender: item.dataInspecao,
                dataTransporteNewRender: item.dataPrevisao,
                dataEntregueNewRender: item.dataEntrega,
              });
            }}
            onMouseLeave={(e) => props.restartRenderizacao(e)}
            onClick={(e) => props.eventScrollToBottom(e)}
          >
            {/* <td>{item.id}</td> */}
            <td>
              <DadosFornecedorStyle>
                {/* <img src={briefcaseImg} alt="" /> */}
                {item.fornecedor}
              </DadosFornecedorStyle>
            </td>
            <td>
              <p className="text-dark">{item.doc}</p>
            </td>
            <td>
              <p className="text-dark">{item.codFornecedor}</p>
            </td>
            <td>
              {item.dataProducao === '' ? (
                <Button>
                  <img src={factoryInactiveImg} alt="" width="32px" />
                  <p>--/--/----</p>
                </Button>
              ) : (
                <Button backgroundColorBlack>
                  <img src={factoryActiveImg} alt="" width="32px" />
                  <p className="text-dark">
                    {formatDateTotvs(item.dataProducao)}
                  </p>
                </Button>
              )}
            </td>
            <td>
              {item.dataInspecao === '' ? (
                <Button>
                  <img src={targetInactiveImg} alt="" width="32px" />
                  <p>--/--/----</p>
                </Button>
              ) : (
                <Button backgroundColorBlack>
                  <img src={targetActiveImg} alt="" width="32px" />
                  <p className="text-dark">
                    {formatDateTotvs(item.dataInspecao)}
                  </p>
                </Button>
              )}
            </td>
            <td>
              {item.dataPrevisao === '' ? (
                <Button>
                  <img src={truckInactiveImg} alt="" width="32px" />
                  <p>--/--/----</p>
                </Button>
              ) : (
                <Button backgroundColorBlack>
                  <img src={truckActiveImg} alt="" width="32px" />
                  <p className="text-dark">
                    {formatDateTotvs(item.dataPrevisao)}
                  </p>
                </Button>
              )}
            </td>
            <td>
              {item.dataEntrega === '' ? (
                <Button>
                  <img src={bagInactiveImg} alt="" width="32px" />
                  <p>--/--/----</p>
                </Button>
              ) : (
                <Button backgroundColorBlack>
                  <img src={bagActiveImg} alt="" width="32px" />
                  <p>{formatDateTotvs(item.dataEntrega)}</p>
                </Button>
              )}
            </td>
            <td>R$ {item.pagamento}</td>
            <td>{item.perPago} %</td>
            {item.quitado === 's' ? (
              <td>
                <RiMoneyDollarCircleLine size={32} style={{ color: 'green' }} />{' '}
                Pago
              </td>
            ) : (
              <td>
                <RiMoneyDollarCircleLine size={32} style={{ color: 'red' }} />{' '}
                Não pago
              </td>
            )}

            <td>
              <BasicRating rankingFinal result={item.rankingTotal} />
            </td>
            <td>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => props.telamodal(item)}
              >
                <i className="fas fa-pen me-2"></i>
                Avaliar
              </button>
              <button
                className="btn btn-sm btn-outline-info me-2"
                onClick={() => props.telamodal2(item)}
              >
                <i className="fas fa-pen me-2"></i>
                Detalhes
              </button>
              <button
                className="btn btn-sm btn-outline-danger me-2"
                onClick={() => props.handleModalDeleteFornecedores(item)}
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
}
