import React, { useMemo } from 'react';
import CountUp from 'react-countup';

import dolarImg from '../../assets/dolar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';
import realImg from '../../assets/real.svg';
import dollarRounded from '../../assets/dollarRounded.svg';
import produto from '../../assets/produto.svg';
import saldoVencimentoImg from '../../assets/vencimentoSaldo.svg';

import CircularProgress from '@mui/material/CircularProgress';
import { Tooltip } from '@mui/material';
import pedidosImg from '../../assets/pedidos.svg';
import financeiroImg from '../../assets/financeiro.svg';
import shipImg from '../../assets/shipImg.svg';
import { CaretVariant, Container, Content } from './styles';
import estoqueImg from '../../assets/Estoqueind2.png';
import faturamentoImg from '../../assets/faturamento.svg';
import { BiCaretDown, BiCaretUp, BiMinus } from 'react-icons/bi';
import porcetagem from '@/assets/porcetagem.svg';

const WalletBoxPorcetagem = ({
  title,
  amount,
  footerlabel,
  loader,
  icon,
  status,
  backcolor,
  heightExtra,
  toLink,
  value,
  textColor = '#000',
  imgColor = 'inherit',
}) => {
  const iconSelected = useMemo(() => {
    switch (icon) {
      case 'dolar':
        return dollarRounded;
      case 'real':
        return realImg;
      case 'arrowUp':
        return arrowUpImg;
      case 'arrowDown':
        return arrowDownImg;
      case 'titulosSomados':
        return saldoVencimentoImg;
      case 'dollarRounded':
        return dollarRounded;
      case 'estoque':
        return estoqueImg;
      case 'produto':
        return produto;
      case 'pedidos':
        return pedidosImg;
      case 'financeiro':
        return financeiroImg;
      case 'ship':
        return shipImg;
      case 'faturamento':
        return faturamentoImg;
      case 'porcetagem':
        return porcetagem;
      default:
        return undefined;
    }
  }, [icon]);

  return (
    <>
      {toLink ? (
        <Tooltip title={toLink} placement="top" arrow>
          <Container
            backcolor={backcolor}
            heightExtra={heightExtra}
            toLink={toLink}
          >
            <span style={{ color: textColor }}>{title}</span> <br />
            {loader ? (
              <CircularProgress color="light" />
            ) : (
              <>
                <Content>
                  <h1 style={{ color: amount > 100 ? 'red' : textColor }}>
                    <CountUp
                      end={amount}
                      separator="."
                      decimal=","
                      decimals={2}
                    />
                    %
                  </h1>
                </Content>
                <img
                  src={iconSelected}
                  alt={title}
                  style={{ filter: `invert(${imgColor})` }}
                />
                <div className="describe_link">
                  <p>Ir para {toLink}</p>
                </div>
              </>
            )}
          </Container>
        </Tooltip>
      ) : (
        <Container
          backcolor={backcolor}
          heightExtra={heightExtra}
          toLink={toLink}
        >
          <span style={{ color: textColor }}>{title}</span>
          <h1 style={{ color: amount > 100 ? 'red' : textColor }}>
            <CountUp end={amount} separator="." decimal="," decimals={2} />%
          </h1>
          <img
            src={iconSelected}
            alt={title}
            style={{ filter: `invert(${imgColor})` }}
          />
        </Container>
      )}
    </>
  );
};

export default WalletBoxPorcetagem;
