import React, { useState } from 'react';

import PropTypes from 'prop-types';

import formatDateTotvs from '../../../utils/formatDataTotvs';
import bagActiveImg from '../../../assets/bag-active.png';
import factoryActiveImg from '../../../assets/factory-active.png';
import targetActiveImg from '../../../assets/target-active.png';
import truckActiveImg from '../../../assets/truck-active.png';
import bagInactiveImg from '../../../assets/bag-inactive.png';
import factoryInactiveImg from '../../../assets/factory-inactive.png';
import targetInactiveImg from '../../../assets/target-inactive.png';
import truckInactiveImg from '../../../assets/truck-inactive.png';

import { useToast } from '../../../hooks/toast.hook';
import FasesModal from '../../../pages/Setor_ComprasInt/Inspecao/FasesModal';

import { Button, Buttonth, DadosFornecedorStyle, Data, TabelaResponsiva } from './styles';

import { HiCursorClick } from 'react-icons/hi';
import { BsCalendar2Check } from 'react-icons/bs';

CardInspecao.propTypes = {
  data: PropTypes.any,
  imgActive: PropTypes.any,
  imgInactive: PropTypes.any,
  showModal: PropTypes.func,
};

function CardInspecao({ data, imgActive, imgInactive, showModal }) {
  if (!data)
    return (
      <Button onClick={() => showModal()}>
        <img src={imgInactive} width="32px" />
        <Data>--/--/----</Data>
        <Data>
          Date / 更新日期 <HiCursorClick color='#bdbd00' size={16}/>
        </Data>
      </Button>
    );
  else
    return (
      <Button backgroundColorBlack>
        <img src={imgActive} width="32px" />
        <Data>{formatDateTotvs(data)}</Data>
        <Data><BsCalendar2Check color='#00ff00'  size={16}/></Data>
      </Button>
    );
}

InspetorTabela.propTypes = {
  inspecao: PropTypes.any,
  setCurrent: PropTypes.func,
};

export function InspetorTabela({ inspecao }) {
  const [showModal, setShowModal] = useState(false);
  const [item, setItem] = useState({});
  const [alteracao, setAlteracao] = useState('');

  const { addToast } = useToast();

  return (
    <>
      <FasesModal
        show={showModal}
        alteracao={alteracao}
        closeModal={() => setShowModal(false)}
        data={item}
      />
      <TabelaResponsiva>
        <table className="table table-striped table-hover">
          <thead className="table-dark mt-3 position-sticky top-0">
            <tr>
              <th scope="col">
                <Buttonth type="button">Fornecedor</Buttonth>
              </th>
              <th scope="col">
                <Buttonth type="button">Pro forma</Buttonth>
              </th>
              <th scope="col">
                <Buttonth type="button">生产 / Production</Buttonth>
              </th>
              <th scope="col">
                <Buttonth type="button">检查 / Inspection</Buttonth>
              </th>
              <th scope="col">
                <Buttonth type="button">预报 / Forecast</Buttonth>
              </th>
              <th scope="col">
                <Buttonth type="button">送货 / Delivery</Buttonth>
              </th>
            </tr>
          </thead>
          <tbody>
            {inspecao.map((item) => (
              <tr
                className="tr-data"
                key={item.proforma}
              >
                <td>
                  <DadosFornecedorStyle>{item.fornecedor}</DadosFornecedorStyle>
                </td>
                <td>
                <DadosFornecedorStyle>{item.doc}</DadosFornecedorStyle>
                </td>
                <td>
                  <CardInspecao
                    showModal={() => {
                      setShowModal(true);
                      setAlteracao('dataProducao');
                      setItem(item);
                    }}
                    data={item.dataProducao}
                    imgActive={factoryActiveImg}
                    imgInactive={factoryInactiveImg}
                  />
                </td>
                <td>
                  <CardInspecao
                    showModal={() => {
                      if (item.dataProducao) {
                        setShowModal(true);
                        setAlteracao('dataInspecao');
                        setItem(item);
                      } else
                        addToast({
                          type: 'warning',
                          description: 'Data de produção não foi definida !',
                          descriptionEnglish: 'Production date has not been set!',
                          descriptionChinese: '生产日期尚未确定',
                          title: 'Alteração de Data',
                        });
                    }}
                    // showModal={() => {
                    //     setShowModal(true);
                    //     setAlteracao('dataInspecao');
                    //     setItem(item);
                    // }}
                    data={item.dataInspecao}
                    imgActive={targetActiveImg}
                    imgInactive={targetInactiveImg}
                  />
                </td>

                <td>
                  <CardInspecao
                    showModal={() => {
                      if (item.dataInspecao) {
                        setShowModal(true);
                        setAlteracao('dataPrevista');
                        setItem(item);
                      } else
                        addToast({
                          type: 'warning',
                          description: 'Data inspeção não foi definida!',
                          descriptionEnglish: 'Inspection date has not been set!',
                          descriptionChinese: '检查日期尚未确定',
                          title: 'Alteração de Data',
                        });
                    }}
                    data={item.dataPrevista}
                    imgActive={truckActiveImg}
                    imgInactive={truckInactiveImg}
                  />
                </td>
                <td>
                  <CardInspecao
                    showModal={() => {
                      if (item.dataPrevista) {
                        setShowModal(true);
                        setAlteracao('dataEntrega');
                        setItem(item);
                      } else
                        addToast({
                          type: 'warning',
                          description: 'Data de previsão não foi definida !',
                          descriptionEnglish: 'Forecast date has not been set',
                          descriptionChinese: '预测日期尚未设定',
                          title: 'Alteração de Data',
                        });
                    }}
                    data={item.dataEntrega}
                    imgActive={bagActiveImg}
                    imgInactive={bagInactiveImg}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {inspecao.map((item) => (
          <div key={item.proforma} className="card_fornecedor">
            <h4 className="title">Fornecedor: {item.fornecedor}</h4>
            <div className="description">
              <p>Nº Container: 1234</p>
              <p>Pro forma: {item.proforma}</p>
            </div>
            <div className="grid_button">
              <div className="item_phase">
                <p className="title_phase">
                  生產
                  <br />
                  Production
                </p>
                <CardInspecao
                  showModal={() => {
                    setShowModal(true);
                    setAlteracao('dataProducao');
                    setItem(item);
                  }}
                  data={item.dataProducao}
                  imgActive={factoryActiveImg}
                  imgInactive={factoryInactiveImg}
                />
              </div>

              <div className="item_phase">
                <p className="title_phase">
                  檢查
                  <br />
                  Inspection
                </p>
                <CardInspecao
                  showModal={() => {
                    if (item.dataProducao) {
                      setShowModal(true);
                      setAlteracao('dataInspecao');
                      setItem(item);
                    } else
                      addToast({
                        type: 'warning',
                        description: 'Data de produção não foi definida !',
                        title: 'Alteração de Data',
                      });
                  }}
                  // showModal={() => {
                  //     setShowModal(true);
                  //     setAlteracao('dataInspecao');
                  //     setItem(item);
                  // }}
                  data={item.dataInspecao}
                  imgActive={targetActiveImg}
                  imgInactive={targetInactiveImg}
                />
              </div>

              <div className="item_phase">
                <p className="title_phase">
                  预报
                  <br />
                  forecast
                </p>
                <CardInspecao
                  showModal={() => {
                    if (item.dataInspecao) {
                      setShowModal(true);
                      setAlteracao('dataPrevista');
                      setItem(item);
                    } else
                      addToast({
                        type: 'warning',
                        description: 'Data inspeção não foi definida !',
                        title: 'Alteração de Data',
                      });
                  }}
                  data={item.dataPrevista}
                  imgActive={truckActiveImg}
                  imgInactive={truckInactiveImg}
                />
              </div>
              <div className="item_phase">
                <p className="title_phase">
                  正在加載
                  <br />
                  Delivery
                </p>
                <CardInspecao
                  showModal={() => {
                    if (item.dataPrevista) {
                      setShowModal(true);
                      setAlteracao('dataEntrega');
                      setItem(item);
                    } else
                      addToast({
                        type: 'warning',
                        description: 'Data de previsão não foi definida !',
                        title: 'Alteração de Data',
                      });
                  }}
                  data={item.dataEntrega}
                  imgActive={bagActiveImg}
                  imgInactive={bagInactiveImg}
                />
              </div>
            </div>
          </div>
        ))}
      </TabelaResponsiva>
    </>
  );
}
