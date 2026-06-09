import styled, { keyframes } from 'styled-components';

// interface IContainerProps {
//     color: string;
// }

const animate = keyframes`
    0%{
        transform: translateX(100px);
        opacity: 0;
    }
    50%{     
        opacity: .3;
    }
    100%{
        transform: translateX(0px);
        opacity: 1;
    }
`;

export const Container = styled.div`
  width: 100%;
  height: 6.875rem;

  background-color: ${(props) => props.backcolor || 'blue'};
  color: white;

  margin: 8px 0;

  border-radius: 9px;
  padding: 5px 10px;

  position: relative;
  overflow: hidden;

  animation: ${animate} 0.5s;

  .describe_link {
    position: absolute;
    width: calc(95%);
    bottom: 5%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    border: 2px solid #807e7e;
    background-image: linear-gradient(
      to bottom,
      rgb(0 0 0 / 75%),
      rgb(0 0 0 / 55%)
    );
    transform: translateY(55px);
    opacity: 0;
  }

  &:hover {
    transform: ${(props) => props.toLink && 'scale(1.05)'};
    transition: ${(props) => props.toLink && '0.2s linear'};
    border: ${(props) => props.toLink && '3px solid red'};
    background-color: ${(props) => props.toLink && '#000000'};

    /* .describe_link {
      transition: .2s ease-in-out;
      transform: translateY(5px);
      opacity: 1;
    } */
  }

  > img {
    height: 110%;

    position: absolute;
    top: -10px;
    right: -30px;

    opacity: 0.2;
  }

  > span {
    font-size: 1rem;
    font-weight: 500;
  }

  > h1 {
    font-size: 26px;
  }

  > small {
    font-size: 12px;
    position: absolute;
    bottom: 10px;
    z-index: 2;
  }

  @media (max-width: 1100px) {
    height: 6.5rem;
  }

  @media (max-width: 770px) {
    height: 4.5rem;
    padding: 10px 15px;

    > span {
      font-size: 0.925rem;
    }

    > h1 {
      word-wrap: break-word;
      font-size: 1.1rem;

      strong {
        width: 100%;
        font-size: 15px;
      }
    }
  }

  @media (max-width: 1280px) and (orientation: landscape) {
    height: 6.5rem;
  }

  @media (min-width: 1280px) and (orientation: landscape) {
    height: 5.8rem;
  }

  @media only screen and (min-device-width: 481px) and (orientation: portrait) {
    height: 5rem;
    > span {
      font-size: 0.925rem;
    }

    > h1 {
      word-wrap: break-word;
      font-size: 1.2rem;

      strong {
        width: 100%;
        font-size: 16px;
      }
    }
  }
  @media only screen and (min-device-width: 481px) and (orientation: landscape) {
    height: 4.8rem;
    > span {
      font-size: 0.925rem;
    }

    > h1 {
      word-wrap: break-word;
      font-size: 1.15rem;

      strong {
        width: 100%;
        font-size: 16px;
      }
    }
  }

  @media only screen and (min-device-width: 800px) and (orientation: landscape) {
    > h1 {
      word-wrap: break-word;
      font-size: 1rem;
    }
  }
  @media only screen and (min-device-width: 1600px) and (orientation: landscape) {
    > h1 {
      word-wrap: break-word;
      font-size: 1.7rem;
    }
    > span {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 420px) {
    height: ${(props) => (props.heightExtra ? '5.75rem' : '4.5rem')};

    > h1 {
      display: flex;

      strong {
        position: initial;
        width: auto;
      }

      strong:after {
        display: inline-block;
        content: '';
        width: 1px;
      }
    }
  }
  @media (max-width: 320px) {
    height: 6rem;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;

  > h1 {
    font-size: 1.125rem;
  }

  @media only screen and (min-device-width: 481px) and (orientation: landscape) {
    > h1 {
      word-wrap: break-word;
      font-size: 1.15rem;

      strong {
        width: 100%;
        font-size: 0.875rem;
      }
    }
  }

  @media only screen and (min-device-width: 1600px) and (orientation: landscape) {
    > h1 {
      word-wrap: break-word;
      font-size: 1.7rem;
    }
  }

  @media only screen and (min-device-width: 800px) and (orientation: landscape) {
    > h1 {
      word-wrap: break-word;
      font-size: 1.125rem;
    }
  }

  @media (max-width: 770px) {
    > h1 {
      word-wrap: break-word;
      font-size: 0.9rem;

      > strong {
        font-size: calc(0.9rem - 25%);
      }
    }
  }

  @media (max-width: 420px) {
    > h1 {
      display: flex;
    }
  }
`;

export const CaretVariant = styled.div`
  display: flex;
  justify-content: center;
  background-color: #00000080;
  border-radius: 5px;
  align-items: center;
  margin: 0;
  line-height: 0;

  > p {
    font-size: 0.875rem;
    margin: 0;
    padding: 0;
    line-height: 0;
  }
`;
