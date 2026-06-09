import { Container, Content } from './styles';
import React, { useState } from 'react';

import bagActiveImg from '../../../../assets/bag-active.png';
import factoryActiveImg from '../../../../assets/factory-active.png';
import targetActiveImg from '../../../../assets/target-active.png';
import truckActiveImg from '../../../../assets/truck-active.png';

import bagInactiveImg from '../../../../assets/bag-inactive.png';
import factoryInactiveImg from '../../../../assets/factory-inactive.png';
import targetInactiveImg from '../../../../assets/target-inactive.png';
import truckInactiveImg from '../../../../assets/truck-inactive.png';
import { Checkbox } from '../Checkbox';
import ModalCheck from '../Modal';

export default function Card({
  name,
  date,
  idImage,
  modalResolution,
  breadToInpecao,
  readOnly,
}) {
  function renderSwitchActive(number) {
    switch (number) {
      case 1 || '1': {
        return factoryActiveImg;
      }
      case 2 || '2': {
        return targetActiveImg;
      }
      case 3 || '3': {
        return truckActiveImg;
      }
      case 4 || '4': {
        return bagActiveImg;
      }
      default:
        break;
    }
  }
  function renderSwitchInactive(number) {
    switch (number) {
      case 1 || '1': {
        return factoryInactiveImg;
      }
      case 2 || '2': {
        return targetInactiveImg;
      }
      case 3 || '3': {
        return truckInactiveImg;
      }
      case 4 || '4': {
        return bagInactiveImg;
      }
      default:
        break;
    }
  }

  const [checked, setChecked] = useState(false);

  function checkedState() {
    setChecked(!checked);
  }

  return (
    <>
      <Container checked={checked} breadToInpecao>
        {date && (
          <Content checked={checked} backgroundColorBlack>
            <div className="interativeUser">
              <Checkbox ischecked />
              <img className="img" src={renderSwitchActive(idImage)} alt="" />
            </div>

            <hr className="line-div" />

            <div className="descriptionBreadcrump">
              <p>{name}</p>
              <p>{date}</p>
              {(modalResolution !== 0) | null | undefined && (
                <ModalCheck
                  titleStageModal={name}
                  dateStageModal={date}
                  checkedState={checkedState}
                  readOnly={readOnly}
                />
              )}
            </div>
          </Content>
        )}
        {!date && (
          <Content checked={checked}>
            <div className="interativeUser">
              <Checkbox />
              <img className="img" src={renderSwitchInactive(idImage)} alt="" />
            </div>

            <hr className="line-div" />

            <div className="descriptionBreadcrump">
              <p>{name}</p>
              <p>processing</p>
              {modalResolution && (
                <ModalCheck
                  titleStageModal={name}
                  dateStageModal={date}
                  checkedState={checkedState}
                  readOnly={readOnly}
                />
              )}
            </div>
          </Content>
        )}
      </Container>
    </>
  );
}
