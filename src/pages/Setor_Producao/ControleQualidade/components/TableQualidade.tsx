import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import Loader from '@/components/Loader';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModalEditarAvaliacao from './ModalEditarAvaliacao';

const formatDate = (dateString: string): string => {
  if (!dateString) return '-';

  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return dateString;
  }
};

type Column = {
  label: string;
  key: string;
  format?: (value: any) => string | React.ReactNode;
};

type TableData = {
  id: number;
  dataInspecao: string;
  nomeInspetor: string;
  codigoDoProduto: string;
  nomeProduto: string;
  quantidadeDeDefeitos: number;
  tipoDeDefeito: number;
  nomeEsteira: string;
  nomeDefeito: string;
  observacao: string;
  origem: string;
  origemId: number;
  armazemDeDestino: string;
  linhaId: number;
};

type FormValues = {
  id: number;
  dataInspecao: string;
  inspertor: string;
  linhaId: { esteiraID: number; nomeGalpaoLinha: string };
  codigoItem: { codigo: string; nome: string };
  quantidade: number;
  tipoDeDefeito: { id: number; nomeDefeito: string };
  observacao?: string;
  armazem: { local: string; localiz: string };
  origemId: { nomeOrigem: string; id: number };
};

const columns: Column[] = [
  {
    label: 'Data',
    key: 'dataInspecao',
    format: (value) => formatDate(value),
  },
  { label: 'Linha', key: 'nomeEsteira' },
  { label: 'Inspetor', key: 'nomeInspetor' },
  { label: 'Código', key: 'codigoDoProduto' },
  { label: 'Descrição', key: 'nomeProduto' },
  { label: 'Quantidade', key: 'quantidadeDeDefeitos' },
  { label: 'Descrição Defeito', key: 'nomeDefeito' },
  { label: 'Observação', key: 'observacao' },
  { label: 'Origem', key: 'origem' },
  { label: 'Armazem', key: 'armazemDeDestino' },
];

interface TableQualidadeProps {
  data: TableData[];
  loading?: boolean;
  ListaProdutos: Array<{ codigo: string; nome: string }>;
  LinhasProducao: Array<{ esteiraID: number; nomeGalpaoLinha: string }>;
  Armazens: Array<{ local: string; localiz: string }>;
  Origem: Array<{ nomeOrigem: string; id: number }>;
  Defeitos: Array<{ id: number; nomeDefeito: string }>;
}

const TableQualidade = ({
  data,
  loading = false,
  ListaProdutos,
  LinhasProducao,
  Armazens,
  Origem,
  Defeitos,
}: TableQualidadeProps) => {
  const [openModal, setOpenModal] = useState(false);

  const [selectedData, setSelectedData] = useState<FormValues | null>(null);

  const handleEdit = (rowData: TableData) => {
    const selectedLinha = LinhasProducao.find(
      (linha) => linha.esteiraID === rowData.linhaId
    );
    const selectedProduto = ListaProdutos.find(
      (produto) => produto.codigo === rowData.codigoDoProduto
    );
    const selectedDefeito = Defeitos.find(
      (defeito) => defeito.id === rowData.tipoDeDefeito
    );
    const selectedArmazem = Armazens.find(
      (armazem) => armazem.local === rowData.armazemDeDestino
    );
    const selectedOrigem = Origem.find(
      (origem) => origem.id === rowData.origemId
    );

    const transformedData: FormValues = {
      id: rowData.id,
      dataInspecao: rowData.dataInspecao,
      inspertor: rowData.nomeInspetor,
      quantidade: rowData.quantidadeDeDefeitos,
      observacao: rowData.observacao,

      linhaId: selectedLinha || { esteiraID: 0, nomeGalpaoLinha: '' },
      codigoItem: selectedProduto || { codigo: '', nome: '' },
      tipoDeDefeito: selectedDefeito || { id: 0, nomeDefeito: '' },
      armazem: selectedArmazem || { local: '', localiz: '' },
      origemId: selectedOrigem || { nomeOrigem: '', id: 0 },
    };

    setSelectedData(transformedData);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedData(null);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          fontFamily: 'Poppins',
          maxHeight: 580,
          overflowY: 'auto',
          borderRadius: '10px',
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
      >
        <Table
          stickyHeader
          aria-label="tabela de WhatsApp"
          sx={{ bgcolor: '#FFFFFF' }}
        >
          <TableHead sx={{ zIndex: 1 }}>
            <TableRow>
              <TableCell
                sx={{ fontWeight: 'bold', backgroundColor: '#FFFFFF' }}
              >
                Ação
              </TableCell>

              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align="center"
                  sx={{ fontWeight: 'bold', backgroundColor: '#FFFFFF' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <Loader />
                </TableCell>
              </TableRow>
            ) : !data || data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">
                  <Typography variant="body2">
                    Nenhum dado encontrado
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                      <ModeEditIcon />
                    </IconButton>
                  </TableCell>
                  {columns.map((column) => (
                    <TableCell key={column.key} align="center">
                      {column.format
                        ? column.format(row[column.key as keyof TableData])
                        : row[column.key as keyof TableData]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {openModal && selectedData && (
        <ModalEditarAvaliacao
          open={openModal}
          onClose={handleCloseModal}
          data={selectedData}
          ListaProdutos={ListaProdutos}
          LinhasProducao={LinhasProducao}
          Armazens={Armazens}
          Origem={Origem}
          Defeitos={Defeitos}
        />
      )}
    </>
  );
};

export default TableQualidade;
