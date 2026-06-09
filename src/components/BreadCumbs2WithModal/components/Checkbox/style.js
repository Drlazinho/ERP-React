import styled from "styled-components";

export const InputCheckbox = styled.input`
  .labelCheck {
    height: 1rem;
    width: 1rem;
  }

  .checkContainer {
    height: 14px;
    width: 14px;
    border: 2px solid blue;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const LabelCheck = styled.label`
  border-radius: 50%;
  background: #000;
  height: 1.8rem;
  width: 1.8rem;

  .checkContainer {
    /* border: 2px solid #00ff38; */
    border: 2px solid ${(props) => props.ischecked ? "#00ff38" : "#ededed55"};
    background: ${(props) => props.ischecked ? "#000" : "#ededed55"};
    border-radius: 50%;
    height: 1.8rem;
    width: 1.8rem;
    display: flex;
    align-items: center;
  }

  img {
    width: 1.5rem;
  }

  @media (max-width: 480px) {
    height: 1.4rem;
    width: 1.4rem;

    .checkContainer {
      height: 1.4rem;
      width: 1.4rem;
    }

    img {
      width: 1.1rem;
    }
  }
`;
