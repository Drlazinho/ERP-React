import { HiUserGroup } from 'react-icons/hi';
import { ImEyePlus } from 'react-icons/im';
import { CgFileDocument } from 'react-icons/cg';

import {
  FaTruck,
  FaTruckLoading,
  FaFileInvoiceDollar,
  FaTools,
  FaBookOpen,
  FaBoxes,
} from 'react-icons/fa';
import InfoIcon from '@mui/icons-material/Info';
import { GrProductHunt } from 'react-icons/gr';
import {
  TbCash,
  TbFileInvoice,
  TbListCheck,
  TbNotebook,
  TbPackage,
  TbReportMoney,
  TbTableImport,
  TbPlaneInflight,
} from 'react-icons/tb';
import { MdNetworkCheck } from 'react-icons/md';
import {
  GiTakeMyMoney,
  GiFactory,
  GiHandTruck,
  GiSpikedDragonHead,
  GiExitDoor,
  GiVirtualMarker,
  GiCrossedChains,
  GiCargoShip,
  GiReturnArrow,
  GiBanknote,
} from 'react-icons/gi';
import { GoGlobe } from 'react-icons/go';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import { BsCashCoin, BsCashStack, BsHddNetworkFill } from 'react-icons/bs';
import { TfiDropboxAlt } from 'react-icons/tfi';
import { LuPackageSearch } from 'react-icons/lu';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import QrCodeIcon from '@mui/icons-material/QrCode';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DvrIcon from '@mui/icons-material/Dvr';
import BookIcon from '@mui/icons-material/Book';
import PrecisionManufacturingTwoToneIcon from '@mui/icons-material/PrecisionManufacturingTwoTone';
import AlignHorizontalRightIcon from '@mui/icons-material/AlignHorizontalRight';
import { FaHome } from 'react-icons/fa';
import { CiGrid42 } from 'react-icons/ci';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CheckIcon from '@mui/icons-material/Check';
import { BsFillMegaphoneFill } from 'react-icons/bs';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import StarRateIcon from '@mui/icons-material/StarRate';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PieChartOutlineIcon from '@mui/icons-material/PieChartOutline';
import { MdOutlineCampaign } from 'react-icons/md';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { TbShoppingCart } from 'react-icons/tb';
import { MdOutlineInventory2 } from 'react-icons/md';
import { MdOutlineDirectionsBoatFilled } from 'react-icons/md';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { MdSpeed } from 'react-icons/md';
import { MdOutlineDoorBack } from 'react-icons/md';
import { PiLightbulbBold } from 'react-icons/pi';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { MdConstruction } from 'react-icons/md';
import { MdMenuBook } from 'react-icons/md';
import { MdOutlineLocalShipping } from 'react-icons/md';
import { MdOutlineDashboard } from 'react-icons/md';
import { MdOutlineReceipt } from 'react-icons/md';
import { MdOutlineDescription } from 'react-icons/md';
import PinchIcon from '@mui/icons-material/Pinch';
import { SwitchAccessShortcutAdd } from '@mui/icons-material';

export const ButtonsPagesPrincipal = [
  // Cards exclusivos do side bar
  {
    id: 2,
    img: <FaHome />,
    setorNome: 'Inicio',
    to: 'principal',
    setorAcesso: [1, 2, 9, 15, 7],
    nivelAcesso: [1, 6, 7, 8, 9],
    paginasDoSetor: [],
    notSeePrincipal: true,
  },
  {
    id: 3,
    img: <MdOutlineDashboard />,
    setorNome: 'Dashboard Geral',
    to: 'dashboard',
    setorAcesso: [1, 2, 9, 15, 7],
    paginasDoSetor: [],
    notSeePrincipal: true,
  },
  {
    id: 4,
    img: <PieChartOutlineIcon />,
    setorNome: 'Dashboard Comercial',
    to: 'dashComercial',
    setorAcesso: [1, 2, 9, 15, 7],
    paginasDoSetor: [],
    notSeePrincipal: true,
  },
  {
    id: 5,
    img: <BsHddNetworkFill />,
    setorNome: 'Dashboard da Operação',
    to: 'dashboardOperacao',
    setorAcesso: [1, 2, 9, 15, 7],
    paginasDoSetor: [],
    notSeePrincipal: true,
  },
  {
    id: 6,
    img: <FaTools />,
    setorNome: 'Dashboard da Inteligência',
    to: 'inteligencia/dashboardInteligencia',
    setorAcesso: [1, 2, 9, 15, 7],
    paginasDoSetor: [],
    notSeePrincipal: true,
  },
  {
    id: 7,
    img: <PinchIcon />,
    setorNome: 'Orçamentos Setores',
    to: 'orcamentosSetores',
    setorAcesso: [2, 4, 5, 7, 15, 25, 26],
    nivelAcesso: [1, 6, 7, 8, 9],
    paginasDoSetor: [],
    notSeePrincipal: true,
  },
  {
    id: 41,
    img: <ReceiptIcon />,
    setorNome: 'Cadastro de Notas',
    to: 'cadastroprotocolodenotas',
    setorAcesso: [1, 2, 4, 5, 8, 9, 7, 12, 15],
    nivelAcesso: [1, 6, 7, 8, 9],
    paginasDoSetor: [],
    notSeePrincipal: true,
  },

  {
    id: 1,
    img: <MdOutlineCampaign />,
    setorNome: 'Meus Chamados',
    to: 'xcontato',
    setorAcesso: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
    ],
    paginasDoSetor: [],
    notSeePrincipal: true,
  },
  // Fim Cards exclusivos do side bar

  {
    id: 2,
    img: <StorefrontIcon />,
    setorNome: 'Comercial',
    idNome: 'comercial',
    setorAcesso: [3, 1, 2, 4, 5, 7, 15, 9, 13],
    color: '#F6D258',
    paginasDoSetor: [
      {
        id: 1,
        img: <FaFileInvoiceDollar />,
        to: 'comercial/pedidos',
        label: 'Pedidos',
        setorAcesso: [1, 2, 5, 4, 7, 15],
      },
      {
        id: 2,
        to: 'comercial/faturamento',
        label: 'Notas Faturadas',
        setorAcesso: [3, 1, 4, 2, 7, 15, 9, 13],
      },
      {
        id: 3,
        to: 'comercial/calendario',
        label: 'Calendário',
        setorAcesso: [3, 1, 4, 2, 7, 15, 9, 13],
      },
      {
        id: 4,
        img: <FaTruckLoading />,
        to: 'comercial/notasfiscaisemitidas',
        label: 'Notas Fiscais Emitidas',
        setorAcesso: [3, 1, 4, 2, 7, 15, 9, 13],
      },
      {
        id: 5,
        img: <DashboardIcon />,
        to: 'comercial/dashboardnotasfiscais',
        label: 'Dashboard Notas Fiscais',
        setorAcesso: [3, 4, 1, 2, 7, 15, 9, 13],
      },
      {
        id: 6,
        img: <BsFillMegaphoneFill />,
        to: 'comercial/cubagem',
        label: 'Cubagem',
        setorAcesso: [3, 4, 1, 2, 7, 15, 9, 13],
      },
    ],
  },
  {
    id: 4,
    img: <TbShoppingCart />,
    setorNome: 'Compra Int.',
    idNome: 'comercialInt',
    setorAcesso: [3, 2, 4, 8, 7, 9, 10, 11, 15, 18, 13],
    nivelAcesso: [1, 6, 7, 8, 9],
    color: '#54F070',
    paginasDoSetor: [
      {
        id: 1,
        img: <GiTakeMyMoney />,
        to: 'comprasint/margens',
        label: 'Margens',
        setorAcesso: [3, 2, 8, 7, 15, 18, 13],
        nivelAcesso: [6, 7, 8],
      },
      {
        id: 2,
        img: <GiVirtualMarker />,
        to: 'comprasint/virtualsupply',
        label: 'Virtual Supply',
        setorAcesso: [2, 3, 8, 7, 15, 18, 13],
      },
      // {
      //   id: 3,
      //   img: <ShoppingBasketIcon />,
      //   to: 'registrofornecedoreschina',
      //   label: 'Registro Fornecedores',
      //   setorAcesso: [2, 8, 7, 15, 11, 18],
      //   nivelAcesso: [6, 7, 8, 9],
      // },
      {
        id: 4,
        img: <ImEyePlus />,
        to: 'comprasint/inspecao',
        label: 'Inspeção',
        setorAcesso: [2, 8, 7, 15, 18],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 5,
        img: <StarRateIcon />,
        to: 'comprasint/fornecedores',
        label: 'Ranking de Fornecedores',
        setorAcesso: [2, 10, 9, 4, 8, 7, 15, 11],
        nivelAcesso: [6, 7, 8],
      },
      {
        id: 4,
        img: <SwitchAccessShortcutAdd />,
        to: 'comprasint/geradorInovacao',
        label: 'Gerador Inovacao',
        setorAcesso: [2, 8, 7, 15, 18],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
    ],
  },
  {
    id: 6,
    img: <MdOutlineInventory2 />,
    setorNome: 'Estoque',
    idNome: 'estoque',
    setorAcesso: [1, 3, 5, 7, 9, 15, 2, 10, 13],
    color: '#8A4601',
    paginasDoSetor: [
      {
        id: 1,
        img: <FaBoxes />,
        to: 'estoque/estoqueDeProdutos',
        label: 'Estoque de produtos',
        setorAcesso: [1, 3, 5, 7, 9, 15, 2, 10, 13],
      },
      {
        id: 2,
        img: <LuPackageSearch />,
        to: 'estoque/checagemDeNota',
        label: 'Checagem de Nota',
        setorAcesso: [3, 2, 9, 15, 7, 13],
      },
      {
        id: 2,
        img: <LocalParkingIcon />,
        to: 'estoque/taxaDeOcupacao',
        label: 'Taxa De Ocupação',
        setorAcesso: [3, 1, 2, 7, 9, 15, 13],
      },
      {
        id: 2,
        img: <DvrIcon />,
        to: 'estoque/meiEstoque',
        label: 'Mei Estoque',
        setorAcesso: [3, 1, 2, 7, 9, 15, 13],
      },
      {
        id: 2,
        img: <BookIcon />,
        to: 'estoque/kpiInventario',
        label: 'KPI Inventario',
        setorAcesso: [3, 1, 2, 7, 9, 15, 13],
      },
      {
        id: 3,
        img: <BookIcon />,
        to: 'estoque/geradorQRcodeVivo',
        label: 'Gerador QR Code Vivo',
        setorAcesso: [3, 1, 2, 7, 9, 15, 13],
      },
      {
        id: 3,
        img: <BookIcon />,
        to: 'estoque/vivoConferencia',
        label: 'Vivo Conferência',
        setorAcesso: [3, 1, 2, 7, 9, 15, 13],
      },
    ],
  },
  {
    id: 9,
    img: <TbReportMoney />,
    setorNome: 'Financeiro',
    idNome: 'financeiro',
    setorAcesso: [1, 2, 4, 5, 8, 9, 7, 15],
    nivelAcesso: [1, 6, 7, 8, 9],
    color: '#333D29',
    paginasDoSetor: [
      {
        id: 1,
        img: <TbReportMoney />,
        to: 'financeiro/financeiro',
        label: 'Financeiro',
        setorAcesso: [2, 4, 7, 15],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 2,
        img: <HiUserGroup />,
        to: 'financeiro/posicaoDeClientes',
        label: 'Posição de Clientes',
        setorAcesso: [1, 2, 4, 5, 8, 9, 7, 12, 15],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 3,
        img: <BsCashStack />,
        to: 'financeiro/titulosPagar',
        label: 'Títulos a Pagar',
        setorAcesso: [2, 4, 7, 15],
        nivelAcesso: [6, 7, 8, 9],
      },
      {
        id: 4,
        img: <BsCashCoin />,
        to: 'financeiro/titulosReceber',
        label: 'Títulos a Receber',
        setorAcesso: [2, 4, 7, 15],
        nivelAcesso: [6, 7, 8, 9],
      },
      {
        id: 5,
        img: <TbNotebook />,
        to: 'financeiro/protocoloDeNotas',
        label: 'Protocolo de Notas',
        setorAcesso: [1, 2, 4, 5, 7, 11, 15],
        nivelAcesso: [1, 6, 7, 8],
      },
      {
        id: 6,
        img: <TbReportMoney />,
        to: 'financeiro/controleDeEmprestimo',
        label: 'Controle de Empréstimos',
        setorAcesso: [2, 4, 7, 15],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 6,
        img: <TbReportMoney />,
        to: 'financeiro/grupoEconomico',
        label: 'Grupo Economico',
        setorAcesso: [2, 4, 7, 15],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
    ],
  },
  {
    id: 16,
    img: <MdOutlineReceipt />,
    setorNome: 'Fiscal',
    idNome: 'fiscal',
    setorAcesso: [3, 4, 5, 7, 6, 8, 9],
    nivelAcesso: [1, 6, 7, 8, 9],
    color: '#0088A3',
    paginasDoSetor: [
      {
        id: 1,
        img: <AttachMoneyIcon />,
        to: 'fiscal/faturamento',
        label: 'Notas Fiscais',
        setorAcesso: [4, 5, 7, 6, 8, 9],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 2,
        img: <GiBanknote />,
        to: 'fiscal/notasFiscais',
        label: 'Notas Fiscais Contra Amvox',
        setorAcesso: [3, 4, 5, 7, 6, 8, 9],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 3,
        img: <GiBanknote />,
        to: 'fiscal/fiscalIOxProtheus',
        label: 'Notas Fiscais Emitidas Contra Amvox X Protheus',
        setorAcesso: [3, 4, 5, 7, 6, 8, 9],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
    ],
  },
  {
    id: 15,
    img: <MdOutlineDirectionsBoatFilled />,
    setorNome: 'Importação',
    idNome: 'importacao',
    setorAcesso: [2, 8, 7, 15, 18],
    nivelAcesso: [1, 6, 7, 8, 9],
    color: '#ffffff',
    paginasDoSetor: [
      // {
      //   id: 1,
      //   img: <GoGlobe />,
      //   to: 'importacao/acompanhamentoDeNavios',
      //   label: 'Acomp. de Navios',
      //   setorAcesso: [2, 8, 7, 15, 18],
      //   nivelAcesso: [1, 6, 7, 8, 9],
      // },
      // {
      //   id: 2,
      //   img: <TbTableImport />,
      //   to: 'importacao/entradaDeImportacao',
      //   label: 'Entrada de Importação',
      //   setorAcesso: [2, 8, 7, 15, 18],
      //   nivelAcesso: [1, 6, 7, 8, 9],
      // },
      {
        id: 1,
        img: <TbTableImport />,
        to: 'importacao/retornoImportacao',
        label: 'Planilha BI Importação',
        setorAcesso: [2, 8, 7, 15, 18],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
    ],
  },
  {
    id: 1,
    img: <MdOutlineLocalShipping />,
    setorNome: 'Transporte',
    idNome: 'Transporte',
    setorAcesso: [1, 2, 8, 9, 15, 7, 11],
    nivelAcesso: [1, 6, 7, 8, 9],
    color: '#56A0F5',
    paginasDoSetor: [
      {
        id: 1,
        img: <FaTruck />,
        to: 'transporte/entregas',
        label: 'Entregas',
        setorAcesso: [1, 2, 8, 9, 15, 7, 11],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 2,
        img: <TbListCheck />,
        to: 'transporte/checkDeExpedicao',
        label: 'Check de Expedição',
        setorAcesso: [2, 9, 8, 15, 7, 11],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 4,
        img: <ViewInArIcon />,
        to: 'transporte/recebimentoContainer',
        label: 'Recebimento Container',
        setorAcesso: [1, 2, 9, 8, 15, 7, 11],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 5,
        img: <TbPlaneInflight />,
        to: 'transporte/painelAeroporto',
        label: 'Painel Aeroporto',
        setorAcesso: [1, 2, 9, 8, 15, 7, 11],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 6,
        img: <TextSnippetIcon />,
        to: 'transporte/agendamentoCarga',
        label: 'Agendamento de Carga',
        setorAcesso: [1, 2, 7, 8, 9, 15, 11],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 6,
        // img: <TextSnippetIcon />,
        to: 'transporte/kpiTransporte',
        label: 'Kpi Transporte',
        setorAcesso: [1, 2, 7, 8, 9, 15, 11],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
    ],
  },
  {
    id: 5,
    img: <MdOutlineSupportAgent />,
    setorNome: 'Pós-venda',
    idNome: 'posvenda',
    setorAcesso: [2, 11, 15, 7, 9, 13],
    nivelAcesso: [1, 6, 7, 8, 9],
    color: '#845EC2',
    paginasDoSetor: [
      {
        id: 1,
        img: <GiHandTruck />,
        to: 'posVenda/coletaEntrega',
        label: 'Coleta Entrega',
        setorAcesso: [2, 11, 15, 7, 9, 13],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 2,
        img: <GiReturnArrow />,
        to: 'posVenda/custoDeRetorno',
        label: 'Custo de Retorno',
        setorAcesso: [2, 11, 15, 7, 9, 13],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 3,
        img: <DataUsageIcon />,
        to: 'posVenda/kpisPosVenda',
        label: `KPI's Pós-Venda `,
        setorAcesso: [2, 11, 15, 7, 9, 13],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 4,
        img: <DataUsageIcon />,
        to: 'posVenda/kpisAtendimento',
        label: `KPI's Atendimento `,
        setorAcesso: [2, 11, 15, 7, 9, 13],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 5,
        img: <PrecisionManufacturingTwoToneIcon />,
        to: 'posVenda/historicoDoProduto',
        label: 'Histórico do produto',
        setorAcesso: [2, 11, 15, 7, 9, 13],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
    ],
  },
  {
    id: 8,
    img: <MdSpeed />,
    setorNome: 'Produção',
    idNome: 'producao',
    setorAcesso: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 20],
    nivelAcesso: [1, 6, 7, 8, 9],
    color: '#FF8C00',
    paginasDoSetor: [
      {
        id: 1,
        img: <ListAltIcon />,
        to: 'producao/planejamentoProducao',
        label: 'Planejamento Produção',
        setorAcesso: [2, 20, 10, 7, 15],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 2,
        img: <SpaceDashboardIcon />,
        to: 'producao/dashProducao',
        label: 'Dashboard Produção',
        setorAcesso: [2, 20, 10, 7, 15],
        nivelAcesso: [1, 6, 7, 8, 9],
      },

      {
        id: 3,
        img: <GrProductHunt />,
        to: 'producao/produtos',
        label: 'Produtos',
        setorAcesso: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20],
        nivelAcesso: [1, 6, 8, 9],
      },
      {
        id: 4,
        img: <BackupTableIcon />,
        to: 'producao/tabelaMestra',
        label: 'Tabela Mestra',
        setorAcesso: [2, 20, 10, 7, 15],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 5,
        img: <BackupTableIcon />,
        to: 'producao/controleQualidade',
        label: 'Controle de Qualidade',
        setorAcesso: [2, 20, 10, 7, 15],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
      {
        id: 6,
        img: <QrCodeIcon />,
        to: 'producao/rastreabilidadeSanduicheira',
        label: 'Rastreabilidade da Sanduicheira',
        setorAcesso: [2, 20, 10, 7, 15],
        nivelAcesso: [1, 6, 7, 8, 9],
      },

      {
        id: 7,
        img: <DvrIcon />,
        to: 'estoque/meiEstoque',
        label: 'Movimentacao Corrente',
        setorAcesso: [2, 20, 10, 7, 15],
        nivelAcesso: [1, 6, 7, 8, 9],
      },
    ],
  },

  {
    id: 10,
    img: <MdOutlineDoorBack />,
    setorNome: 'Portaria',
    idNome: 'portaria',
    setorAcesso: [2, 6, 7, 15],
    nivelAcesso: [1, 8],
    color: '#000000',
    paginasDoSetor: [
      {
        id: 1,
        img: <GiExitDoor />,
        to: 'portaria/notasSaida',
        label: 'Notas de Saída',
        setorAcesso: [2, 16, 7, 15],
        nivelAcesso: [1, 8],
      },
    ],
  },

  // {
  //   id: 40,
  //   img: <PiLightbulbBold />,
  //   setorNome: 'Protótipo',
  //   idNome: 'prototipo',
  //   setorAcesso: [2, 6, 7, 15],
  //   nivelAcesso: [1, 8],
  //   color: '#f542dd',
  //   paginasDoSetor: [
  //     {
  //       id: 1,
  //       img: <TextSnippetIcon />,
  //       to: 'expedicaologistica',
  //       label: 'Remessa de Notas',
  //       setorAcesso: [1, 2, 7, 9, 15],
  //       nivelAcesso: [1, 6, 7, 8, 9],
  //     },
  //   ],
  // },
  {
    id: 14,
    img: <MdOutlineNotificationsNone />,
    setorNome: 'Recepção',
    idNome: 'recepcao',
    setorAcesso: [2, 6, 7, 8, 9],
    nivelAcesso: [1, 8],
    color: '#FF8FAB',
    paginasDoSetor: [
      {
        id: 1,
        img: <TfiDropboxAlt />,
        to: 'recepcao/insumos/insumosSaldo',
        label: 'Insumos',
        setorAcesso: [2, 6, 7, 8, 9],
        nivelAcesso: [1, 6, 7, 8],
      },
    ],
  },
  {
    id: 12,
    img: <MdOutlineDescription />,
    setorNome: 'Secretariado',
    idNome: 'secretariado',
    setorAcesso: [2, 15, 7],
    nivelAcesso: [6, 7, 8],
    color: '#999999',
    paginasDoSetor: [
      {
        id: 1,
        img: <CgFileDocument />,
        to: 'secretariado/contratos',
        label: 'Contratos',
        setorAcesso: [2, 15, 7],
        nivelAcesso: [6, 7, 8],
      },
    ],
  },
  {
    id: 30,
    img: <MdConstruction />,
    setorNome: 'Inteligência',
    idNome: 'inteligencia',
    setorAcesso: [6, 7, 8, 9],
    nivelAcesso: [8],
    color: '#001E3F',
    paginasDoSetor: [
      {
        id: 1,
        img: <FaTools />,
        to: 'inteligencia/kpisInteligencia',
        label: 'KPIs Inteligência',
        setorAcesso: [6, 7, 8, 9],
        nivelAcesso: [8],
      },
      {
        id: 2,
        img: <FaTools />,
        to: 'inteligencia/geral',
        label: 'Geral',
        setorAcesso: [6, 7, 8, 9],
        nivelAcesso: [8],
      },
      {
        id: 3,
        img: <InfoIcon />,
        to: 'inteligencia/patchNotes',
        label: 'Patch Notes',
        setorAcesso: [6, 7, 8, 9],
        nivelAcesso: [8],
      },
    ],
  },
  {
    id: 31,
    img: <MdMenuBook />,
    setorNome: 'Catálogo Amvox',
    idNome: 'catalogo',
    setorAcesso: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    ],
    nivelAcesso: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    color: '#45B39D',
    paginasDoSetor: [
      {
        id: 1,
        img: <FaBookOpen />,
        to: 'catalogo',
        label: 'Catálogo',
        setorAcesso: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20,
        ],
        nivelAcesso: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    ],
  },
];
