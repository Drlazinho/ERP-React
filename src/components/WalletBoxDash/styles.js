import styled from 'styled-components';

export const FooterCard = styled.p`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translate(-50%);
  background: ${(props) => props.color};
  filter: saturate(02);
  z-index: 2;
  color: #ffffff;
  border-radius: 10px 10px 0 0;
  width: max-content;
  min-width: 150px;
  margin: 0 auto;
  padding: .15rem 0.8rem;
  -webkit-box-shadow: 0px -1px 10px -2px rgba(0,0,0,0.28);
  -moz-box-shadow: 0px -1px 10px -2px rgba(0,0,0,0.28);
  box-shadow: 0px -1px 10spx -2px rgba(0,0,0,0.28);

  text-align: center;
  font-size: ${(props) => props.cardGraphic ? '1rem' : '0.8rem'};
`;
