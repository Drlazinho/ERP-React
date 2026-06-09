import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 50%;
  display: block;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 1px;
  gap: 1rem;
  background-color: rgba(243, 239, 239, 0.959);

  @media (max-width: 500px) {
    flex-direction: column;
  }

label {
  font-weight: bold;
}

`;
