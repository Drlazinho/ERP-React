// export const avaliadoresAMVOX = [
//    {
//     setor: "China",
//     nome: 'Victor/Marina',
//     quest: {
//       quest1: 'Comunicação',
//       quest3: 'Capacidade Prod.',
//       quest4: 'Pontualidade Emb.',
//     },
//    },
//   {
//     setor: 'Logística',
//     nome: 'Alexandre',
//     quest: {
//       quest1: 'Qualidade Cont',
//       quest3: 'Qualidade Arrum.',
//       quest4: 'Qualidade Emb.',
//     },
//   },
//   {
//     setor: 'Produção',
//     nome: 'Arthur',
//     quest: {
//       quest1: 'Qualidade Prod.',
//       quest3: 'Qualidade Est.',
//       quest4: 'Qualidade Emb.',
//     },
//   },
//   {
//     setor: 'Financeiro',
//     nome: 'Calebe',
//     quest: {
//       quest1: 'Condicao Pagto',
//       quest3: 'Flexibilidade',
//       quest4: 'Renegociacao',
//     },
//   },
//   {
//     setor: 'Pos-venda',
//     nome: 'Lucas',
//     quest: {
//       quest1: 'Agilidade Envio Pecas',
//       quest3: 'Flexibilidade',
//       quest4: 'Retorno Vendas',
//     },
//   },
// ];

// DADOS SEPARADOS
export const setoresInspecao = [
  'Financeiro',
  'Pós-venda',
  'Produção',
  'Logística',
  'China',
];

export const avaliadoresInspecao = [
  'Arthur',
  'Lucas',
  'Victor/Marina',
  'Alexandre',
  'Calebe',
];

export const questsInspecao = [
  {
    // 0 - LUCAS -POS
    quests: {
      quest1: 'Agilidade Envio Peças',
      quest3: 'Flexibilidade',
      quest2: 'Retorno Vendas',
    },
  },
  {
    // 1 - VICTOR/MARINA - CHINA
    quests: {
      quest1: 'Comunicação',
      quest3: 'Capacidade Prod.',
      quest2: 'Pontualidade Emb.',
    },
  },
  {
    // 2 - CALEBE - FINANCEIRO
    quests: {
      quest1: 'Condição Pagto',
      quest3: 'Flexibilidade',
      quest2: 'Renegociação',
    },
  },
  {
    // 3 - Arthur - PRODUCAO
    quests: {
      quest1: 'Qualidade Prod.',
      quest3: 'Qualidade Est.',
      quest2: 'Qualidade Emb.',
    },
  },
  {
    // 4 - Alexandre - LOGISTICA
    quests: {
      quest1: 'Comunicação',
      quest3: 'Capacidade Prod.',
      quest2: 'Pontualidade Emb.',
    },
  },
];
