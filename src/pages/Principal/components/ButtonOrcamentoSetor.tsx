import React from 'react';
import { ButtonGeral } from '../styles';
import PinchIcon from '@mui/icons-material/Pinch';
import { Link } from 'react-router';

interface ButtonOrcamentoSetorProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  setor: string;
}

export default function ButtonOrcamentoSetor({
  id,
  ...rest
}: ButtonOrcamentoSetorProps) {
  const userMaster = [
    {
      id: 3,
      email: 'artur@amvox.com.br',
    },
    {
      id: 107,
      email: 'tidesenvolvimento5@amvox.com.br',
    },
    {
      id: 33,
      email: 'tidesenvolvimento4@amvox.com.br',
    },
    {
      id: 160,
      email: 'tidesenvolvimento7@amvox.com.br',
    },
    {
      id: 32,
      email: 'tidesenvolvimento3@amvox.com.br',
    },
    {
      id: 219,
      email: 'tidesenvolvimento9@amvox.com.br',
    },
    {
      id: 31,
      email: 'tidesenvolvimento@amvox.com.br',
    },
    {
      id: 149,
      email: 'tidesenvolvimento6@amvox.com.br',
    },
    {
      id: 171,
      email: 'tidesenvolvimento1@amvox.com.br',
    },
    {
      id: 199,
      email: 'tidesenvolvimento2@amvox.com.br',
    },
    {
      id: 202,
      email: 'tidesenvolvimento8@amvox.com.br',
    },
    {
      id: 37,
      email: 'suporteti@amvox.com.br',
    },
    {
      id: 198,
      email: 'controladoria@amvox.com.br',
    },
    {
      id: 17,
      email: 'rodrigo@amvox.com.br',
    },
    {
      id: 124,
      email: 'contabilidade1@amvox.com.br',
    },
    {
      id: 36,
      email: 'guilherme@amvox.com.br',
    },
  ];

  const userComercial = [
    {
      id: 68,
      nome: 'Victor Ribeiro',
      email: 'gerentecomercial@amvox.com.br',
      setor: { id: 1, setor: 'Comercial' },
      nivel: { id: 8, nivel: 'Administrador' },
      idSetor: 1,
    },
    {
      id: 18,
      nome: 'Maciel Vasconcelos',
      email: 'maciel@amvox.com.br',
      setor: { id: 2, setor: 'Diretoria' },
      nivel: { id: 8, nivel: 'Administrador' },
      idSetor: 2,
    },
  ];

  const userFinanceiro = [
    {
      id: 97,
      nome: 'Charline Leite',
      email: 'gerentefinanceiro@amvox.com.br',
      setor: { id: 7, setor: 'Inteligencia' },
      nivel: { id: 8, nivel: 'Administrador' },
      idSetor: 4,
    },
    {
      id: 35,
      nome: 'Valdir Scoriza',
      email: 'valdir@amvox.com.br',
      setor: { id: 7, setor: 'Inteligencia' },
      nivel: { id: 8, nivel: 'Administrador' },
      idSetor: 2,
    },
  ];

  function redirectUser(id: number) {
    if (userComercial.some((user) => user.id === id)) {
      return '/orcamentoSetor/112/2025';
    } else if (userFinanceiro.some((user) => user.id === id)) {
      return '/orcamentoSetor/111/2025';
    } else if (userMaster.some((user) => user.id === id)) {
      return '/orcamentosSetores';
    }
    return '/principal';
  }

  return (
    <Link to={redirectUser(Number(id))}>
      <ButtonGeral {...rest}>
        <PinchIcon />
        <strong>Orçamento do Setor</strong>
      </ButtonGeral>
    </Link>
  );
}
