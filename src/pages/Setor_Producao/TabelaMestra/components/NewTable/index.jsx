import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Tooltip,
  styled,
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModalEditar from '../ModalEditar';
import foto from '@/assets/produtos/sem-foto.png';

// Célula de cabeçalho estilizada
const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '0.8rem',
  padding: '8px 10px',
  textAlign: 'center',
  maxWidth: '160px',
  whiteSpace: 'normal',
  wordWrap: 'break-word',
  lineHeight: '1.2',
  backgroundColor: theme.palette.background.paper,
  position: 'sticky',
  top: 0,
  zIndex: 2,
  cursor: 'pointer',
}));

// Célula de corpo estilizada
const StyledBodyCell = styled(TableCell)({
  fontSize: '0.8rem',
  padding: '4px',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '& img': {
    display: 'block',
    margin: '0 auto 4px',
  },
});

const columns = [
  { label: 'PRODUTO', key: 'imagem', width: '120px' },
  { label: 'DESCRIÇÃO', key: 'descricao', width: '200px' },
  { label: 'EAN', key: 'ean', width: '120px' },
  { label: 'DUN', key: 'dun', width: '120px' },
  { label: 'STATUS', key: 'statusProducao', width: '100px' },
  { label: 'COMODITE', key: 'comodite', width: '100px' },
  { label: 'TAMANHO', key: 'porteProduto', width: '80px' },
  { label: 'PESO BRUTO(KG)', key: 'pesoBruto', width: '90px' },
  { label: 'TIPO PRODUÇÃO', key: 'tpProducao', width: '100px' },
  { label: 'FORNECEDOR', key: 'fornecedor', width: '120px' },
  { label: 'QTD. OPERADORES', key: 'operadores', width: '100px' },
  { label: 'META HORA', key: 'produtoMetaHora', width: '80px' },
  { label: 'TX APROV.', key: 'taxaAproveitamento', width: '100px' },
  { label: 'OBSERVAÇÕES', key: 'observacoes', width: '250px' },
  { label: 'QTDE PÇS NO PALETE', key: 'qtdProdutosPalet', width: '90px' },
  { label: 'QTDE PÇS/MASTER', key: 'qtdPecaMaster', width: '90px' },
  { label: 'QTD VOLUME/H', key: 'qtdVolumes', width: '90px' },
  { label: 'PESO PALETE', key: 'pesoPalet', width: '90px' },
];

const mapeamentoInsumos = {
  'FILME STRECH': 'FILME STRECH',
  'FITA ADESIVA TRANSPARENTE 48X100MM': 'FITA TRANS.',
  'ETIQUETA LACRE REISTAR': 'ETQ. REISTAR',
  'ETIQUETA 20X20X4 QR CODE': 'ETQ. QR CODE',
  'ETIQUETA 100X60 CQ/LP/RECEBIMENTO': 'ETQ. CQ/LP',
  'ETIQUETA VOLTAGEM 110v': 'ETQ. VOLTAGEM 110v',
  'ETIQUETA VOLTAGEM 220v': 'ETQ. VOLTAGEM 220v',
  'ETIQUETA 15X10X4 FONE E VOLTAGEM': 'ETQ. FONE/VOLT',
  'ETIQUETA 50X25X2': 'ETQ. 50X25X2',
  'ETIQUETA 60X40X1 ARF / BAGVOX': 'ETQ. ARF/BAG',
  'ETIQUETA 100X80': 'ETQ. 100X80',
  //'FITA ADESIVA HM TR 02 CORES 48MM X 200MM': 'FITA 2 CORES',
};

const simplificarNomeInsumo = (nomeCompleto) => {
  const chave = Object.keys(mapeamentoInsumos).find((key) =>
    nomeCompleto.toUpperCase().includes(key.toUpperCase())
  );
  return chave ? mapeamentoInsumos[chave] : nomeCompleto;
};

const Row = ({ row, headers, GetDados, orderedInsumosKeys }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [dataEdicao, setDataEdicao] = useState(null);
  const [expandirObs, setExpandirObs] = useState(false);
  const [expandirDescricao, setExpandirDescricao] = useState(false);
  const [expandirFornecedor, setExpandirFornecedor] = useState(false);

  const handleOpenModal = (rowData) => {
    setDataEdicao(rowData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDataEdicao(null);
  };

  return (
    <>
      <TableRow sx={{ height: '36px' }}>
        <TableCell align="center" sx={{ padding: '4px', width: '50px' }}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleOpenModal(row)}
            sx={{ padding: '2px' }}
          >
            <ModeEditIcon sx={{ fontSize: '1.25rem' }} />
          </IconButton>
        </TableCell>

        {headers.map((column) => (
          <StyledBodyCell
            key={column.key}
            align="center"
            sx={{
              maxWidth: column.width,
              whiteSpace:
                (column.key === 'observacoes' && !expandirObs) ||
                (column.key === 'descricao' && !expandirDescricao) ||
                (column.key === 'fornecedor' && !expandirFornecedor)
                  ? 'nowrap'
                  : 'normal',
              cursor:
                column.key === 'observacoes' ||
                column.key === 'descricao' ||
                column.key === 'fornecedor'
                  ? 'pointer'
                  : 'default',
              display: column.key === 'imagem' ? 'flex' : 'table-cell',
              flexDirection: column.key === 'imagem' ? 'column' : 'row',
              alignItems: column.key === 'imagem' ? 'center' : 'inherit',
              justifyContent: column.key === 'imagem' ? 'center' : 'inherit',
              color:
                column.key === 'statusProducao'
                  ? row[column.key]
                    ? 'green'
                    : 'red'
                  : 'inherit',
            }}
            onClick={() => {
              if (column.key === 'observacoes') {
                setExpandirObs(!expandirObs);
              } else if (column.key === 'descricao') {
                setExpandirDescricao(!expandirDescricao);
              } else if (column.key === 'fornecedor') {
                setExpandirFornecedor(!expandirFornecedor);
              }
            }}
          >
            {/* Lógica para exibir conteúdo da célula */}
            {column.key === 'observacoes' ? (
              <Tooltip title={row[column.key] || ''} arrow>
                <span>
                  {row[column.key]
                    ? expandirObs
                      ? row[column.key]
                      : row[column.key].length > 20
                      ? `${row[column.key].substring(0, 20)}...`
                      : row[column.key]
                    : ''}
                </span>
              </Tooltip>
            ) : column.key === 'descricao' ? (
              <Tooltip title={row[column.key] || ''} arrow>
                <span>
                  {row[column.key]
                    ? expandirDescricao
                      ? row[column.key]
                      : row[column.key].length > 20
                      ? `${row[column.key].substring(0, 20)}...`
                      : row[column.key]
                    : ''}
                </span>
              </Tooltip>
            ) : column.key === 'fornecedor' ? (
              <Tooltip title={row[column.key] || ''} arrow>
                <span>
                  {row[column.key]
                    ? expandirFornecedor
                      ? row[column.key]
                      : row[column.key].length > 20
                      ? `${row[column.key].substring(0, 20)}...`
                      : row[column.key]
                    : ''}
                </span>
              </Tooltip>
            ) : column.key === 'statusProducao' ? (
              row[column.key] ? (
                'ATIVO'
              ) : (
                'INATIVO'
              )
            ) : column.key === 'imagem' ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Tooltip
                  title={
                    <div
                      style={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <img
                        src={row[column.key] || foto}
                        alt="Produto"
                        style={{
                          maxHeight: '150px',
                          maxWidth: '150px',
                          marginBottom: '8px',
                          borderRadius: '4px',
                        }}
                      />
                      <div
                        style={{
                          fontWeight: 'bold',
                          marginTop: '8px',
                          padding: '4px 8px',
                          backgroundColor: '#f5f5f5',
                          borderRadius: '4px',
                          display: 'inline-block',
                          color: '#333',
                        }}
                      >
                        Código: {row.codigo || ''}
                      </div>
                    </div>
                  }
                  arrow
                >
                  <img
                    src={row[column.key] || foto}
                    alt="Produto"
                    style={{
                      height: '40px',
                      width: 'auto',
                      maxWidth: '80px',
                      objectFit: 'contain',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      marginBottom: '4px',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    }}
                  />
                </Tooltip>
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    color: '#555',
                    textAlign: 'center',
                  }}
                >
                  {row.codigo || ''}
                </div>
              </div>
            ) : row[column.key] !== undefined && row[column.key] !== null ? (
              row[column.key]
            ) : (
              ''
            )}
          </StyledBodyCell>
        ))}

        {orderedInsumosKeys.map((simplifiedName) => {
          const originalInsumoKey = Object.keys(mapeamentoInsumos).find(
            (key) => mapeamentoInsumos[key] === simplifiedName
          );

          const insumoCorrespondente = row.listaInsumosUtilizados?.find(
            (insumo) =>
              insumo.insumo?.nome
                ?.toUpperCase()
                .includes(originalInsumoKey?.toUpperCase())
          );

          return (
            <StyledBodyCell key={simplifiedName} align="center">
              {insumoCorrespondente?.qtdInsumosUsados ?? ''}
            </StyledBodyCell>
          );
        })}
      </TableRow>

      {isModalOpen && (
        <ModalEditar
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          row={dataEdicao}
          GetDados={GetDados}
        />
      )}
    </>
  );
};

export default function NewTable({ data, GetDados }) {
  const [expandedInsumo, setExpandedInsumo] = useState(null);
  const orderedInsumosKeys = useMemo(
    () => Object.values(mapeamentoInsumos),
    []
  );

  const handleInsumoHeaderClick = (simplifiedName) => {
    const originalName = Object.keys(mapeamentoInsumos).find(
      (key) => mapeamentoInsumos[key] === simplifiedName
    );
    setExpandedInsumo(originalName === expandedInsumo ? null : originalName);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: '70vh', overflow: 'auto' }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <StyledHeaderCell sx={{ width: '50px' }}>AÇÕES</StyledHeaderCell>

            {columns.map((column) => (
              <StyledHeaderCell key={column.key} sx={{ width: column.width }}>
                <Tooltip title={column.label} arrow>
                  <span>
                    {column.label.length > 18
                      ? column.label
                          .split(' ')
                          .map((word) => word[0])
                          .join('')
                      : column.label}
                  </span>
                </Tooltip>
              </StyledHeaderCell>
            ))}

            {orderedInsumosKeys.map((simplifiedName) => {
              const originalInsumoKey = Object.keys(mapeamentoInsumos).find(
                (key) => mapeamentoInsumos[key] === simplifiedName
              );

              const nomeCompletoTooltip = originalInsumoKey || simplifiedName;
              const exibirNomeCompleto = expandedInsumo === originalInsumoKey;

              return (
                <StyledHeaderCell
                  key={`header-${simplifiedName}`}
                  onClick={() => handleInsumoHeaderClick(simplifiedName)}
                >
                  <Tooltip title={nomeCompletoTooltip} arrow>
                    <span>
                      {exibirNomeCompleto ? originalInsumoKey : simplifiedName}
                    </span>
                  </Tooltip>
                </StyledHeaderCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((item) => (
              <Row
                key={item.id}
                row={item}
                headers={columns}
                GetDados={GetDados}
                orderedInsumosKeys={orderedInsumosKeys}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
