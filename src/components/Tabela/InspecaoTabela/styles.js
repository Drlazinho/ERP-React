import styled from 'styled-components';

export const Button = styled.button`
  background-color: #424242;
  background-color: ${(props) =>
    props.backgroundColorBlack ? '#000000' : '#424242'};
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  height: 100%;

  p {
    color: ${(props) => props.backgroundColorBlack ? '#00ff00' : '#ff0000'} !important;
  }

  &:hover {
    background-color: #000;
  }
`;

export const DadosFornecedorStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  gap: 0.5rem;
  align-items: center;

  img {
    width: 1.5rem;
  }
`;
