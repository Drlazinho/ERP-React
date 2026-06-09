import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../../routes/routes';
const CentralTI = lazy(() => import('./Geral'));
const PatchNotes = lazy(() => import('./PatchNotes'));
const ListaDeEquipamentos = lazy(() => import('./ListaDeEquipamentos'));
const AdministracaoDeUsuario = lazy(() => import('./AdministracaoDeUsuario'));
const GerenciadorDeUsers = lazy(() => import('./GerenciadorDeUsers'));
const GerenciamentoDeInformacoes = lazy(
  () => import('./GerenciamentoDeInformacoes')
);
const KpisInteligencia = lazy(() => import('./KpisInteligencia'));
const GerenciamentoDeTI = lazy(() => import('./GerenciamentoDeTI'));
const DashboardTi = lazy(() => import('./GerenciamentoDeTI/DashboardTi'));
// const ChamadosNovo = lazy(() => import('./ChamadosNovo'));
const ChamadosAntigo = lazy(() => import('./ChamadosAntigo'));
const ChamadosRemake = lazy(() => import('./ChamadosRemake'));
const Inventario = lazy(() => import('./Inventario'));
const HistoricoInventario = lazy(() => import('./HistoricoInventario'));
const LogDeServicos = lazy(() => import('./LogDeServicos'));
const ControleDeEstoqueTI = lazy(() => import('./ControleDeEstoqueTI'));
const HistoricoDeMovimentacaoTI = lazy(
  () => import('./HistoricoDeMovimentacaoTI')
);
const ApontamentosWeb = lazy(() => import('./ApontamentosWeb'));
const ApontamentosChamados = lazy(() => import('./ApontamentosChamados'));
const DashboardChamados = lazy(() => import('./DashboardChamados'));
const RelatorioApontamentos = lazy(() => import('./RelatorioApontamentos'));
const DashboardQualidade = lazy(() => import('./DashboardQualidade'));
const DashboardInteligencia = lazy(() => import('./DashboardInteligencia'));
const TelaMonitoramento = lazy(() => import('./TelaMonitoramento'));

export function InteligenciaRoutes() {
  return (
    <Routes>
      <Route
        path="/geral"
        element={
          <RequireAuth path="geral">
            <CentralTI />
          </RequireAuth>
        }
      />
      <Route
        path="/patchNotes"
        element={
          <RequireAuth path="patchNotes">
            <PatchNotes />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/telaMonitoramento"
        element={
          <RequireAuth path="telaMonitoramento">
            <TelaMonitoramento />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/listaDeEquipamentos"
        element={
          <RequireAuth path="listaDeEquipamentos">
            <ListaDeEquipamentos />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/administracaoDeUsuario/gerenciadorDeUsers"
        element={
          <RequireAuth path="gerenciadorDeUsers">
            <GerenciadorDeUsers />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/administracaoDeUsuario"
        element={
          <RequireAuth path="administracao">
            <AdministracaoDeUsuario />
          </RequireAuth>
        }
      />
      <Route
        path="/kpisInteligencia"
        element={
          <RequireAuth path="KpisInteligencia">
            <KpisInteligencia />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboardInteligencia"
        element={
          <RequireAuth path="dashboardInteligencia">
            <DashboardInteligencia />
          </RequireAuth>
        }
      />

      <Route path="/geral/gerenciamentoDeTI">
        <Route
          index
          element={
            <RequireAuth path="gerenciamentoDeTI">
              <GerenciamentoDeTI />
            </RequireAuth>
          }
        />
        <Route
          path="dashboardTi"
          element={
            <RequireAuth path="dashboardTi">
              <DashboardTi />
            </RequireAuth>
          }
        />
      </Route>
      <Route
        path="/geral/gerenciamentoDeInformacoes"
        element={
          <RequireAuth path="gerenciamentoDeInformacoes">
            <GerenciamentoDeInformacoes />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/gerenciamentoDeInformacoes"
        element={
          <RequireAuth path="gerenciamentoDeInformacoes">
            <GerenciamentoDeInformacoes />
          </RequireAuth>
        }
      />
      {/* <Route
        path="/geral/chamadosNovo"
        element={
          <RequireAuth path="chamadosNovo">
            <ChamadosNovo />
          </RequireAuth>
        }
      /> */}
      <Route
        path="/geral/chamadosAntigo"
        element={
          <RequireAuth path="chamadosAntigo">
            <ChamadosAntigo />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/chamadosNovo"
        element={
          <RequireAuth path="chamadosNovo">
            <ChamadosRemake />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/inventario"
        element={
          <RequireAuth path="inventario">
            <Inventario />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/inventario/historicoDeInventario"
        element={
          <RequireAuth path="historicoDeInventario">
            <HistoricoInventario />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/logDeServicos"
        element={
          <RequireAuth path="logDeServicos">
            <LogDeServicos />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/controleDeEstoqueTI"
        element={
          <RequireAuth path="controleDeEstoqueTI">
            <ControleDeEstoqueTI />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/controleDeEstoqueTI/historicoDeMovimentacaoTI"
        element={
          <RequireAuth path="historicoDeMovimentacaoTI">
            <HistoricoDeMovimentacaoTI />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/apontamentosWeb"
        element={
          <RequireAuth path="ApontamentosWeb">
            <ApontamentosWeb />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/apontamentosChamados"
        element={
          <RequireAuth path="ApontamentosChamados">
            <ApontamentosChamados />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/dashboardChamados"
        element={
          <RequireAuth path="DashboardChamados">
            <DashboardChamados />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/relatorioApontamentos"
        element={
          <RequireAuth path="RelatorioApontamentos">
            <RelatorioApontamentos />
          </RequireAuth>
        }
      />
      <Route
        path="/geral/dashboardQualidade"
        element={
          <RequireAuth path="dashboardQualidade">
            <DashboardQualidade />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
