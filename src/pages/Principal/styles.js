import styled from 'styled-components';

const hoverButtonPage = `
transform: scale(1.1);
    -webkit-transition: all 0.25s ease-out;
    -moz-transition: all 0.25s ease-out;
    -ms-transition: all 0.25s ease-out;
    -o-transition: all 0.25s ease-out;
    transition: all 0.25s ease-out;
    filter:  brightness(130%)
`;

export const PatchNotes = styled.div`
  position: absolute;
  top: 10;
  right: 13rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &:hover {
    transition: all 0.2s;
    transform: scale(1.15);
  }

  @media (max-width: 500px) {
    background-color: #9f9f9f;
    border-radius: 15px;
    padding: 0.2rem;

    strong {
      font-size: 0.7rem;
    }
  }
`;

export const BackgroundFundo = styled.div`
  color: #000000;
  background-color: #fff;
`;

export const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  text-align: left;
  padding: 2rem;
  margin-left: 2rem;

  .header-top {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    img {
      margin-right: 1rem;
    }

    h4 {
      margin: 0;
    }
  }

  p {
    margin: 0;
  }
`;

export const ContainerGeral = styled.div`
  display: flex;
  margin: 0 auto;
  position: relative;
  min-width: 230px;
  gap: 2rem;
  justify-content: center;
  border-radius: 50% 50% 0 0;
  padding: 0rem 20px;

  @media (max-width: 1640px) {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 200px));
  }

  @media (max-width: 1460px) {
    gap: 1rem;
  }

  @media (max-width: 1020px) {
    gap: 0.2rem;
  }

  @media (max-width: 960px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 87%;
    // flex-wrap: wrap;
  }
`;

export const ButtonGeral = styled.button`
  border: 2px solid #f2f2f2;
  display: flex;
  display: ${(props) => (props.setorNivel ? 'flex' : 'none')};
  align-items: center;
  gap: 1rem;
  padding: 0 0.5rem;
  border-radius: 10px;
  place-content: center;
  background-color: #ffffff;
  box-shadow: 0 4px 5px rgb(0 0 0 / 0.3);

  .react-icons {
    font-size: 1.875rem;
    stroke-dasharray: 700;
    stroke-dashoffset: 700;
    stroke-linecap: butt;
  }

  &:hover {
    background-color: #f2f2f2;
    color: #000;
    transform: scale(1.05);
    transition: 0.25s linear;
  }
`;

export const ContainerPrincipal = styled.section`
  display: grid;
  place-content: center;
  grid-template-columns: repeat(auto-fill, minmax(130px, auto));
  gap: 1rem;
  padding: 1rem;
  border-radius: 0 0 8px 8px;

  @media (max-width: 700px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, auto));
  }
`;

export const SetorContent = styled.div`
  display: ${(props) => (props.setorNivel ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  margin-top: 1.3rem;
  gap: 0.765rem;
  border-radius: 1rem;
  padding: 1rem;
  -webkit-box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.28);
  -moz-box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.28);
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.28);
  background: ${(props) => props.setorNivel && '#000'};
  color: ${(props) => props.setorNivel && '#fff'};

  h5 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  @media (max-width: 500px) {
    display: ${(props) => (props.setorNivel ? 'flex' : 'none')};
  }
`;

export const Button = styled.div`
  background: ${(props) => (props.setorAcesso ? '#a10303' : '#fff')};
  color: ${(props) => (props.setorAcesso ? '#fff' : '#6E6E6E')};
  pointer-events: ${(props) => (props.setorAcesso ? 'auto' : 'none')};
  filter: brightness(80%);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    clip-path: polygon(53% 0, 100% 0, 50% 100%, 0% 100%);
    background: ${(props) =>
      props.setorAcesso ? props.polygonColor : 'transparent'};
    height: 100%;
    top: 0;
    left: 0;
    width: 15%;
  }

  .react-icons {
    font-size: 2rem;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.6rem;
  padding: 0.5rem;
  border: 1px solid ${(props) => !props.setorAcesso && 'white'};
  border-radius: 8px;
  min-width: 100%;
  max-width: 100%;
  min-height: 4.5rem;

  cursor: ${(props) => (props.setorAcesso ? 'pointer' : 'not-allowed')};
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.28);
  animation: 0.7s ease-out surgimento;
  transition: all 0.7s ease-out;

  &:hover {
    ${(props) => props.setorAcesso && hoverButtonPage}
  }

  @keyframes surgimento {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const ButtonToPage = styled(Button)`
  background: ${(props) => (props.setorAcesso ? '#420101' : '#fff')};
  margin-bottom: 0.5rem;

  &::before {
    display: none;
  }
`;

export const GridPopover = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
