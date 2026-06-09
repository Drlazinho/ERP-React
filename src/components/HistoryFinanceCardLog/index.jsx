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

const HistoryFinanceCardLog = ({
  tagColor,
  title,
  subtitle,
  amount,
  qtde,
  isok,
}) => {
  return (
    <Container>
      <Tag color={tagColor} />
      <div>
        <span>{title}</span>
        <small>{subtitle}</small>
      </div>
      {isok ? (
        <BsCheckCircleFill style={{ color: 'green' }} size={48} />
      ) : (
        <GiCancel style={{ color: 'red' }} size={48} />
      )}

      <div style={{ textAlign: 'right' }}>
        <span>Qtde: {qtde}</span>
        <small>R$ {amount}</small>
      </div>
    </Container>
  );
};

export default HistoryFinanceCardLog;
