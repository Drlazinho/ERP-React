import styled from 'styled-components';
import amvox from '../../../../assets/amvox.png';

export const Container = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: space-around;
  border-radius: 8px;
  gap: 2rem;
  width: 100%;

  /* LINE CARD */
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    background-color: ${(props) => (props.checked ? '#25cf4a' : '#cccccc')};
    width: 100%;
    top: 1;
    left: 20%;
    height: 40%;
    z-index: 1;
  }

  @media (max-width: 770px) {
    &:not(:last-child)::after {
      content: '';
      position: absolute;
      width: 100%;
      transform: rotate(330deg);
      top: 100%;
      left: -55%;
      height: 15%;
      z-index: 1;
    }
  }
  @media (min-width: 1700px) {
    /* &:not(:last-child)::after {
      content: "";
      position: absolute;
      width: 20%;
      top: 80%;
      left: 45%;
      height: 50%;
      z-index: 1;
    } */

    &:not(:last-child)::after {
      content: '';
      position: absolute;
      width: ${(props) => (props.verticalStack ? '20%' : '100%')};
      top: ${(props) => (props.verticalStack ? '60%' : '1')};
      left: ${(props) => (props.verticalStack ? '45%' : '1')};
      height: ${(props) => (props.verticalStack ? '100%' : '35%')};
      z-index: 1;
    }
  }
`;

export const Content = styled.div`
  border-radius: 8px;
  width: 100%;
  height: 6.25rem;
  padding: 1.5rem 1rem;
  background-image: url(${amvox});
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-color: ${(props) => (props.checked ? '#000' : '#f4f4f4')};
  color: ${(props) => (props.checked ? '#00FF38' : '#cccccc')};
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-start;
  -webkit-box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.28);
  -moz-box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.28);
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.28);
  z-index: 2;

  .line-div {
    background-color: ${(props) => (props.checked ? '#00FF38' : '#cccccc')};
    height: 5rem;
    width: 2px;
    opacity: 1;
  }

  .interativeUser {
    display: flex;
    align-items: center;
    gap: 1rem;

    input {
      min-width: 20px;
      min-height: 20px;
    }
  }

  img {
    width: clamp(2.5rem, 25%, 7rem);
  }

  .descriptionBreadcrump {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    line-height: 1;
    font-size: 1.2rem;
    font-weight: bold;
  }

  @media (max-width: 1170px) {
    height: auto;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1px;

    .line-div {
      background-color: ${(props) => (props.checked ? '#00FF38' : '#cccccc')};
      height: 2px;
      width: 70%;
      opacity: 1;
    }

    img {
      width: 2.5rem;
    }
  }

  @media (max-width: 770px) {
    padding: 1rem 0.5rem;
  }

  @media (max-width: 500px) {
    color: ${(props) => (props.checked ? '#00FF38' : '#cccccc')};

    .interativeUser {
      gap: 0.5rem;
    }

    .descriptionBreadcrump {
      font-size: 1rem;
    }
  }
`;
