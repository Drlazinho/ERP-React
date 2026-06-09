import styled from 'styled-components';

export const tabelaEntregasMobileToPC = styled.div`
  height: 600px;
  width: 100%;
  overflow: scroll;
  flex-grow: 3;

  
  @media (max-width: 700px) {
    .tabelaEntregasMobileToPC {
      height: 300px !important;

    }
  }
`;
