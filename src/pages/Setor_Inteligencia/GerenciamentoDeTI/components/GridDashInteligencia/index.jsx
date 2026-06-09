import { Grid, Paper } from '@mui/material';
import React from 'react';
import CardTI from '../CardTI';
import CardTIOnlyInfo from '../CardTIOnlyInfo';
import PersonIcon from '@mui/icons-material/Person';
import { BsFillMegaphoneFill } from 'react-icons/bs';
import { CgFileDocument } from 'react-icons/cg';
import { GiCrossedChains, GiExitDoor, GiHandTruck } from 'react-icons/gi';
import { TbListCheck, TbNotebook, TbPackage } from 'react-icons/tb';
import { LuPackageSearch } from 'react-icons/lu';

export default function GridDashInteligencia({ data }) {
  return (
    <Grid container spacing={2} rowSpacing={5} paddingY={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={5} sx={{ borderRadius: 5 }}>
          <CardTI
            bgColor={'#7D92FF'}
            yearData={data?.qtdLoginsAno}
            monthData={data?.qtdLoginsMes}
            dayData={data?.qtdLoginsDia}
            endpointRef={'Logins'}
            setor={'Inteligência'}
            color={'#fff'}
            icon={<PersonIcon />}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={5} sx={{ borderRadius: 5 }}>
          <CardTI
            bgColor={'#b3362d'}
            yearData={data?.qtdChamadosAno}
            monthData={data?.qtdChamadosMes}
            dayData={data?.qtdChamadosDia}
            endpointRef={'Chamados'}
            setor={'Inteligência'}
            color={'#fff'}
            icon={<BsFillMegaphoneFill size={24} />}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={5} sx={{ borderRadius: 5 }}>
          <CardTIOnlyInfo
            bgColor={'#b3362d'}
            infoDois={'Aberto'}
            infoUm={'Fechado'}
            qtdInfoDois={data?.qtdChamadosAberto}
            qtdInfoUm={data?.qtdChamadosFechado}
            endpointRef={'Chamados'}
            setor={'Inteligência'}
            color={'#fff'}
            icon={<BsFillMegaphoneFill size={24} />}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={5} sx={{ borderRadius: 5 }}>
          <CardTIOnlyInfo
            bgColor={'#999999'}
            infoDois={'DIRETORIA'}
            infoUm={'PRODUÇÃO'}
            qtdInfoDois={data?.qtdContratosDiretoria}
            qtdInfoUm={data?.qtdContratosProducao}
            endpointRef={'Contratos'}
            setor={'Secretariado'}
            color={'#fff'}
            icon={<CgFileDocument size={24} />}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={5} sx={{ borderRadius: 5 }}>
          <CardTI
            bgColor={'#2D2D2D'}
            yearData={data?.qtdNotaPortariaAno}
            monthData={data?.qtdNotaPortariaMes}
            dayData={data?.qtdNotaPortariaDia}
            endpointRef={'Nota Portaria'}
            setor={'Portaria'}
            color={'#fff'}
            icon={<GiExitDoor size={24} />}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={5} sx={{ borderRadius: 5 }}>
          <CardTI
            bgColor={'#845EC2'}
            yearData={data?.qtdPosVendaColetaAno}
            monthData={data?.qtdPosVendaColetaMes}
            dayData={data?.qtdPosVendaColetaDia}
            endpointRef={'Pós-venda Coleta'}
            setor={'Pós-Venda'}
            color={'#fff'}
            icon={<GiHandTruck size={24} />}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={5} sx={{ borderRadius: 5 }}>
          <CardTI
            bgColor={'#845EC2'}
            yearData={data?.qtdPosVendaEntregaAno}
            monthData={data?.qtdPosVendaEntregaMes}
            dayData={data?.qtdPosVendaEntregaDia}
            endpointRef={'Pós-venda Entrega'}
            setor={'Pós-Venda'}
            color={'#fff'}
            icon={<GiHandTruck size={24} />}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={5} sx={{ borderRadius: 5 }}>
          <CardTI
            bgColor={'#2491ff'}
            yearData={data?.qtdRecebimentoContainerAno}
            monthData={data?.qtdRecebimentoContainerMes}
            dayData={data?.qtdRecebimentoContainerDia}
            endpointRef={'Recebimento Container'}
            setor={'Logística'}
            color={'#fff'}
            icon={<TbPackage size={24} />}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={5} sx={{ borderRadius: 5 }}>
          <CardTI
            bgColor={'#8A4601'}
            yearData={data?.qtdCheckExpedicaoEstoqueAno}
            monthData={data?.qtdCheckExpedicaoEstoqueMes}
            dayData={data?.qtdCheckExpedicaoEstoqueDia}
            endpointRef={'Check Expedição Estoque'}
            setor={'Estoque'}
            color={'#fff'}
            icon={<LuPackageSearch size={24} />}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={5} sx={{ borderRadius: 5 }}>
          <CardTI
            bgColor={'#FF8C00'}
            yearData={data?.qtdMovimentacaoCorrenteAno}
            monthData={data?.qtdMovimentacaoCorrenteMes}
            dayData={data?.qtdMovimentacaoCorrenteDia}
            endpointRef={'Movimentação Corrente'}
            setor={'Produção'}
            color={'#fff'}
            icon={<GiCrossedChains size={24} />}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={5} sx={{ borderRadius: 5 }}>
          <CardTI
            bgColor={'#333D29'}
            yearData={data?.qtdProtocoloNotasAno}
            monthData={data?.qtdProtocoloNotasMes}
            dayData={data?.qtdProtocoloNotasDia}
            endpointRef={'Protocolo de Notas'}
            setor={'Financeiro'}
            color={'#fff'}
            icon={<TbNotebook size={24} />}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
