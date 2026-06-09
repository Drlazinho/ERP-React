import styled from 'styled-components';

export const ContainerCheckList = styled.div`
  background-color: #ffff;
`;
export const ContainerSeletorUnidades = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  align-items: center;
  background-color: #000;
  height: 100vh;
  padding-top: 1.5rem;

  .button_back_to_principal {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: end;

    span {
      text-decoration: none;
      color: #fcc203;
    }
  }

  .boxSelectedUnidade{
    min-width: 80%;
    border: 3px solid;
    border-color: #ff0000; //Props??
    border-radius: 20px;
    transition: .2s linear;
    flex-direction: column;
    padding: .8rem;
    cursor: pointer;
  }

  .boxSelectUnidade {
    min-width: 80%;
    border: 3px solid;
    border-color: #666666; //Props??
    border-radius: 20px;
    transition: .2s linear;
    flex-direction: column;
    padding: 1rem;

    &:hover {
        border-color: #ff0000;
        transition: .2s linear;
    }
  }

  .inputSelectUnidades {
    cursor: pointer;
  }
`;
export const ContainerProdutos = styled.form``;
export const ContainerProdutosFormulario = styled.form``;
export const ContainerCheckListaProdutos = styled.div``;

export const TabelaCheckList = styled.table`
    overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  height: 100%;

  th {
    font-size: 10px;
  }

  td {
    font-size: 10px;
  }
`;

export const ContainerConferencia = styled.div``;
