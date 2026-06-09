import { Container, Content } from './styles';
import React from 'react';

import bagActiveImg from '../../../../assets/bag-active.png';
import factoryActiveImg from '../../../../assets/factory-active.png';
import targetActiveImg from '../../../../assets/target-active.png';
import truckActiveImg from '../../../../assets/truck-active.png';

import bagInactiveImg from '../../../../assets/bag-inactive.png';
import factoryInactiveImg from '../../../../assets/factory-inactive.png';
import targetInactiveImg from '../../../../assets/target-inactive.png';
import truckInactiveImg from '../../../../assets/truck-inactive.png';
import { Checkbox } from '../Checkbox';

export default function Card({
  name,
  date,
  idImage,
  verticalStack,
  breadToInspecao,
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

  return (
    <>
      {date !== '' && date !== 0 && date !== null ? (
        <Container
          checked
          verticalStack={verticalStack}
          breadToInspecao={breadToInspecao}
        >
          <Content checked>
            <div className="interativeUser">
              <Checkbox ischecked />
              <img className="img" src={renderSwitchActive(idImage)} alt="" />
            </div>
            <hr className="line-div" />
            <div className="descriptionBreadcrump">
              <p>{name}</p>
              <p>{date}</p>
            </div>
          </Content>
        </Container>
      ) : (
        <Container
          verticalStack={verticalStack}
          breadToInspecao={breadToInspecao}
        >
          <Content>
            <div className="interativeUser">
              <Checkbox />
              <img className="img" src={renderSwitchInactive(idImage)} alt="" />
            </div>
            <hr className="line-div" />
            <div className="descriptionBreadcrump">
              <p>{name}</p>
              <p>{'Sem Data'}</p>
            </div>
          </Content>
        </Container>
      )}
    </>
  );
}
