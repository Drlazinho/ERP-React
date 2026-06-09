import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../../routes/routes';
const RastreabilidadeSanduicheira = lazy(
  () => import('./RastreabilidadeSanduicheira')
);
const Producoes = lazy(() => import('./Producoes'));
const Produtos = lazy(() => import('./Produtos'));
const Apontamentos = lazy(() => import('./Apontamentos'));
const TabelaMestra = lazy(() => import('./TabelaMestra'));
const PlanejamentoProducao = lazy(() => import('./PlanejamentoProducao'));
const DashProducao = lazy(() => import('./DashProducao'));
const EficienciaWeb = lazy(() => import('./EficienciaWeb'));
import ParadaLinha from './ParadaLinha';
const ControleQualidade = lazy(() => import('./ControleQualidade'));

// Página de Movimentação Corrente é o mesmo que o MEI ESTOQUE.
// Página de Mov. Corrente está sendo gerenciado pelo setor de ESTOQUE

export function ProducaoRoutes() {
  return (
    <Routes>
      <Route
        path="/rastreabilidadeSanduicheira"
        element={
          <RequireAuth path="rastreabilidadeSanduicheira">
            <RastreabilidadeSanduicheira />
          </RequireAuth>
        }
      />
      <Route
        path="/producoes"
        element={
          <RequireAuth path="producoes">
            <Producoes />
          </RequireAuth>
        }
      />
      <Route
        path="/produtos"
        element={
          <RequireAuth path="produtos">
            <Produtos />
          </RequireAuth>
        }
      />
      <Route
        path="/apontamentos"
        element={
          <RequireAuth path="apontamentos">
            <Apontamentos />
          </RequireAuth>
        }
      />
      <Route
        path="/tabelaMestra"
        element={
          <RequireAuth path="tabelaMestra">
            <TabelaMestra />
          </RequireAuth>
        }
      />
      <Route
        path="/planejamentoProducao"
        element={
          <RequireAuth path="planejamentoProducao">
            <PlanejamentoProducao />
          </RequireAuth>
        }
      />

      <Route
        path="/dashProducao"
        element={
          <RequireAuth path="dashProducao">
            <DashProducao />
          </RequireAuth>
        }
      />
      <Route
        path="/eficienciaWeb"
        element={
          <RequireAuth path="eficienciaWeb">
            <EficienciaWeb />
          </RequireAuth>
        }
      />
      <Route
        path="/paradaLinha"
        element={
          <RequireAuth path="paradaLinha">
            <ParadaLinha />
          </RequireAuth>
        }
      />
      <Route
        path="/controleQualidade"
        element={
          <RequireAuth path="controleQualidade">
            <ControleQualidade />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
