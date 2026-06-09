import styled from 'styled-components';

export const TabelaResponsiva = styled.div`
  .card_fornecedor {
    margin: 1rem 0 ;
    background-color: #fff;
    padding: 0.5rem;
    padding-bottom: 1rem;
     width: auto;
     border-radius: 8px;
     border: 2px solid #c3c3c3
  }

  .title {
    text-align: center;
  }


  
  .description {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0.5rem;
    p {
      color: #000;
    }
  }

  .grid_button {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    .item_phase{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

    }
    .title_phase{
      text-align: center;
      color: #000;
    }
  }

  @media (max-width: 700px) {
    table {
      display: none;
    }
  }

  @media (min-width: 700px) {
    .card_fornecedor {
      display: none;
    }
  }
`;

export const Buttonth = styled.button`
  background-color: #212529;
  color: #c59600;
  border: none;
  font-weight: bold;
`;


export const Button = styled.button`
  background-color: #424242;
  background-color: ${(props) =>
    props.backgroundColorBlack ? '#000000' : '#424242'};
  border: 1px solid red;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0;
  width: 100%;
  height: 100%;

  @media (max-width: 700px) {
   
  }

  p {
    color: ${(props) =>
      props.backgroundColorBlack ? '#00ff00' : '#ff0000'} !important;
  }

  &:hover {
    background-color: #000;
  }
`;

export const DadosFornecedorStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  gap: 0;
  align-items: center;

  img {
    width: 1.5rem;
  }
`;

export const Data = styled.p`
  font-size: 13px;
`;
