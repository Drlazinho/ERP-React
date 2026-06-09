import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircularProgress from '@mui/material/CircularProgress';
import formatDateTotvs from '@/utils/formatDataTotvs';
import CircularProgressWithColor from '@/components/CircularProgressWithColor';
import RegistrarQuantidadeProduzida from './ModalQTProduzido';
import ModalEdit from './ModalEditTable';
import { update } from 'react-spring';

function Row({
  row,
  fetchSubRowData,
  subRowData,
  handleAtt,
  produtosLista,
  filtro,
}) {
  const [open, setOpen] = useState(false);

  const handleToggleOpen = () => {
    setOpen(!open);
    if (!open && !subRowData[row.id]) {
      fetchSubRowData(row.id, filtro);
    }
  };

  const subRow = subRowData[row.id];

  const formatarData = (data) => {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const filtrarDetalhes = (detalhes, nomeFiltro) => {
    if (!nomeFiltro) return detalhes;
    const nomeLower = nomeFiltro.toLowerCase();
    return detalhes.filter(
      (item) =>
        item.nome?.toLowerCase().includes(nomeLower) ||
        item.descricaoProduto?.toLowerCase().includes(nomeLower)
    );
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={handleToggleOpen}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <ModalEdit
            data={row}
            subRowData={subRow || {}}
            rowId={row.id}
            fetchSubRowData={fetchSubRowData}
            produtosLista={produtosLista}
            update={handleAtt}
          />
        </TableCell>
        <TableCell align="center">{row.semana_Ano}</TableCell>
        <TableCell>{formatarData(row.periodoInicio)}</TableCell>
        <TableCell>{formatarData(row.periodoFim)}</TableCell>
        <TableCell align="center">
          {row.quantidadeProgramacao.toLocaleString('pt-BR')}
        </TableCell>
        <TableCell align="center">{row.horasNecessarias}</TableCell>
        <TableCell align="right">{row.horasdisponiveis}</TableCell>
        <TableCell align="right">{row.capacidadeutilizada}</TableCell>
        <TableCell align="right">{row.horasDisponiveisDiariamente}</TableCell>
        <TableCell align="center">{row.linhasDisponiveis}</TableCell>
        <TableCell align="center">{row.diasDisponiveis}</TableCell>
        <TableCell align="right">
          {row.quantidadeProduzida.toLocaleString('pt-BR')}
        </TableCell>
        <TableCell align="right">{row.observacao || '-'}</TableCell>
        <TableCell align="right">
          <CircularProgressWithColor
            value={row.porcentagemExecutado}
            cor="#219C90"
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={15}
          style={{ padding: 0, backgroundColor: '#F4F4F4' }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6">Detalhes</Typography>
              {subRowData[row.id] ? (
                subRowData[row.id].detalhes?.length > 0 ? (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ fontWeight: 'bold' }}>
                          Código
                        </TableCell>
                        <TableCell style={{ fontWeight: 'bold' }}>
                          Descrição
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          Peças/Hora
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          Total horas necessárias
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          Prioridade
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          Qtd Planejada
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          Saldo Pendente
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ fontWeight: 'bold' }}
                        >
                          Qtd Realizada
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          Nº OP
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          Observações
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: 'bold' }}>
                          Pendência
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filtrarDetalhes(
                        subRowData[row.id].detalhes,
                        filtro.NomeProduto
                      ).map((detalhes, index) => (
                        <TableRow key={index}>
                          <TableCell>{detalhes.codigo || '-'}</TableCell>
                          <TableCell>
                            {detalhes.descricaoProduto || detalhes.nome || '-'}
                          </TableCell>
                          <TableCell align="right">
                            {detalhes.metaHora || '-'}
                          </TableCell>
                          <TableCell align="right">
                            {detalhes.horasNecessarias || '-'}
                          </TableCell>
                          <TableCell align="right">
                            {detalhes.prioridade || '-'}
                          </TableCell>
                          <TableCell align="right">
                            {detalhes.qtdPlanejada || '-'}
                          </TableCell>
                          <TableCell align="right">
                            {detalhes.saldoPendente || '-'}
                          </TableCell>
                          <TableCell align="center">
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignContent: 'center',
                                flexDirection: 'column',
                              }}
                            >
                              {detalhes.qtdRealizada}
                              <RegistrarQuantidadeProduzida
                                value={detalhes.qtdRealizada}
                                id={detalhes.id}
                                prioridade={detalhes.prioridade}
                                codigo={detalhes.codigo}
                                observacao={detalhes.observacaoProduto}
                                handlePut={handleAtt}
                              />
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            {detalhes.op || '-'}
                          </TableCell>
                          <TableCell align="right">
                            {detalhes.observacaoProduto || '-'}
                          </TableCell>
                          <TableCell align="right">
                            {detalhes.pendencia || '-'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding={2}
                  >
                    Nenhum detalhe encontrado
                  </Box>
                )
              ) : (
                <Box display="flex" justifyContent="center" padding={2}>
                  <CircularProgress />
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function TabelaPlanejamento({
  listaPlanejamento,
  fetchSubRowData,
  subRowData,
  handleAtt,
  produtosLista,
  filtro,
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 540,
        overflowY: 'auto',
        borderRadius: '16px',
      }}
    >
      <Table aria-label="collapsible table" sx={{ bgcolor: '#F4F4F4' }}>
        <TableHead sx={{ bgcolor: '#F4F4F4' }}>
          <TableRow>
            <TableCell />
            <TableCell />
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Semanas
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Período Início
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Período Fim
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Quantidade Programada
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Hrs Prod. Necessárias
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Hrs. Disp.
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Capacidade Utilizada
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Horas Disp./Dia
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Linhas Disponíveis
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Dias Disponíveis
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Quantidade Produzida
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Observação
            </TableCell>
            <TableCell align="right" style={{ fontWeight: 'bold' }}>
              Porcentagem(%)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(listaPlanejamento) && listaPlanejamento.length > 0 ? (
            listaPlanejamento.map((row) => (
              <Row
                key={row.id}
                row={row}
                fetchSubRowData={fetchSubRowData}
                subRowData={subRowData}
                handleAtt={handleAtt}
                produtosLista={produtosLista}
                filtro={filtro}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={15} align="center">
                Nenhum dado encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
