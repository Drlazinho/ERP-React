import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  background-color: #000;
  overflow: hidden;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  align-items: center;
  justify-content: center;

  .backgroundAbrirChamados {
    width: 100%;
    height: 100%;
    background-size: cover;
    clip-path: polygon(100% 0, 0 0, 0 100%, 95% 100%);
    background-repeat: no-repeat;
    object-fit: cover;
  }

  .backgroundTabelaChamados {
    clip-path: polygon(5% 0, 100% 0, 100% 100%, 0 100%);
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .buttonAbrirChamado {
    width: 80%;
    min-height: 150px;
    font-family: 'Nunito', sans-serif;
    font-size: 2rem;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 1.3px;
    font-weight: 700;
    color: #313133;
    background: rgba(208, 161, 113, 0.77);
    border: none;
    border-radius: 20px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    outline: none;
    position: absolute;
    padding: 10px;
    animation-name: translates;
    animation-iteration-count: 1;
    animation-duration: 0.75s;
    animation-fill-mode: forwards;

    &:before {
      content: '';
      border-radius: 20px;
      width: calc(100% + 10px);
      height: 160px;
      border: 6px solid #fee65d;
      box-shadow: 0 0 60px rgba(246, 242, 242, 0.996);
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: 0;
      transition: all 0.3s ease-in-out;
      transform: translate(-50%, -50%);
    }
    &:hover {
      color: '#fffff';
    }

    &:hover::before {
      opacity: 1;
    }

    &:after {
      content: '';
    }

    &:hover::after {
      animation: none;
      display: none;
    }

    @keyframes translates {
      0% {
        transform: translate(-50%, -50%);
      }
      100% {
        transform: translate(10%, 30%);
      }
    }
  }

  .buttonAbrirTelaChamados {
    width: 80%;
    min-height: 150px;
    font-family: 'Nunito', sans-serif;
    font-size: 2rem;
    letter-spacing: 1.3px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #313133;
    background: rgba(208, 161, 113, 0.67);
    backdrop-filter: blur(5px);
    border: none;
    border-radius: 20px;
    margin: 0 auto;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    outline: none;
    position: absolute;
    animation-name: translate;
    animation-iteration-count: 1;
    animation-duration: 0.75s;
    animation-fill-mode: forwards;

    @media (max-width: 500px) {
      animation: translateMobile 1 0.75s forwards;
      /* transform:translate(10%, 30%); */
    }

    &:before {
      content: '';
      border-radius: 20px;
      width: calc(100% + 10px);
      height: 160px;
      border: 6px solid #fee65d;
      box-shadow: 0 0 60px rgba(246, 242, 242, 0.996);
      position: absolute;
      top: 50%;
      left: 50%;
      opacity: 0;
      transition: all 0.3s ease-in-out;
      transform: translate(-50%, -50%);
    }

    &:hover {
      color: '#fffff';
    }

    &:hover::before {
      opacity: 1;
    }

    &:after {
      content: '';
    }

    &:hover::after {
      animation: none;
      display: none;
    }

    @keyframes translate {
      0% {
        transform: translate(50%, 80vh);
      }
      100% {
        transform: translate(10%, 58vh);
      }
    }

    @keyframes translateMobile {
      0% {
        transform: translate(0%, 100%);
      }
      100% {
        transform: translate(10%, 30%);
      }
    }
  }
`;
