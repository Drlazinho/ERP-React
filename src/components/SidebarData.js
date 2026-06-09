import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BsIcons from 'react-icons/bs';
import * as GiIcons from 'react-icons/gi';

export const SidebarData = [
  {
    title: 'VisaoGeral',
    path: '/visaogeral',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Usuarios',
        path: '/visaogeral/usuarios',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Novo Usuario',
        path: '/visaogeral/novousuario',
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: 'Relatorios',
    path: '/relatorios',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Relatorios',
        path: '/relatorios/relatorios1',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Relatorios 2',
        path: '/relatorios/relatorios2',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Relatorios 3',
        path: '/relatorios/relatorios3',
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: 'Produtos',
    path: '/produtos',
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Estoque (P.U)',
        path: '/produtos/estoque',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Margem (R$)',
        path: '/produtos/margem',
        icon: <FaIcons.FaMoneyCheck />,
      },
      {
        title: 'Movimentacao',
        path: '/produtos/movimentacao',
        icon: <FaIcons.FaTruckMoving />,
      },
      {
        title: 'QrCode',
        path: '/produtos/qrcode',
        icon: <AiIcons.AiOutlineQrcode />,
      },
    ],
  },
  {
    title: 'Cubagem',
    path: '/cubagem',
    icon: <BsIcons.BsCalculator />,
  },
  {
    title: 'Producao Realtime',
    path: '/producaorealtime',
    icon: <GiIcons.GiFactory />,
  },
  {
    title: 'Graficos',
    path: '/graficos',
    icon: <AiIcons.AiFillSignal />,
  },
  {
    title: 'Autorizadas',
    path: '/autorizadas',
    icon: <IoIcons.IoMdPeople />,
  },
  {
    title: 'Messagens',
    path: '/messagens',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Message 1',
        path: '/messages/message1',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'Message 2',
        path: '/messages/message2',
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: 'Suporte',
    path: '/suporte',
    icon: <IoIcons.IoMdHelpCircle />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Contato',
        path: '/contato/telefones',
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: 'E-mail',
        path: '/contato/email',
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
];
