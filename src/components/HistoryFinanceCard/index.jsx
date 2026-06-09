import React from 'react';

import { Container, Tag } from './styles';
// import { FcApproval } from 'react-icons/fc';
import { GiCancel } from 'react-icons/gi';
import { BsCheckCircleFill } from 'react-icons/bs';

// interface IHistoryFinanceCardProps {
//     tagColor: string;
//     title: string;
//     subtitle: string;
//     amount: string;
// }

const HistoryFinanceCard = ({
  tagColor,
  title,
  subtitle,
  amount,
  qtd,
  isok,
  hrr
}) => {
  return (
    <>
      {title !== null && title !== undefined ? (
        <Container>
          <Tag color={tagColor} />
          <div>
            <span>{title}</span>
            <small>{subtitle}</small>
          </div>
          {/* {isok ? (
            <BsCheckCircleFill style={{ color: 'green' }} size={48} />
          ) : (
            <GiCancel style={{ color: 'red' }} size={48} />
          )} */}

          <div style={{ textAlign: 'right' }}>
            <span>Qtde: {qtd}</span>
            <small>R$ {amount}</small>
            <small>hora {hrr}</small>
          </div>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default HistoryFinanceCard;
