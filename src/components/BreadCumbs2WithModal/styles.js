import styled from "styled-components";

export const Container = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: space-around;
  border-radius: 8px;
  gap: 2rem;
  width: 100%;

  @media (max-width: 900px) {
    gap: .5rem;
  }

  @media (max-width:  500px) {
    flex-direction: column;
    gap: 2rem;
  }
`;
