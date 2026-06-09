import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../../routes/routes';
const VirtualSupply = lazy(() => import('./VirtualSupply'));
const RankingDeFornecedores = lazy(() => import('./RankingDeFornecedores'));
const Margens = lazy(() => import('./Margens'));
const GeradorInovacao = lazy(() => import('./GeradorInovacao'));
const Inspecao = lazy(() => import('./Inspecao'));

export function ComprasIntRoutes() {
  return (
    <Routes>
      <Route
        path="/fornecedores"
        element={
          <RequireAuth
            path="fornecedores"
          >
            <RankingDeFornecedores />
          </RequireAuth>
        }
      />
      <Route
        path="/virtualsupply"
        element={
          <RequireAuth
            path="virtualsupply"
          >
            <VirtualSupply />
          </RequireAuth>
        }
      />
      <Route
        path="/inspecao"
        element={
          <RequireAuth
            path="inspecao"
          >
            <Inspecao />
          </RequireAuth>
        }
      />
      <Route
        path="/margens"
        element={
          <RequireAuth
            path="margens"
          >
            <Margens />
          </RequireAuth>
        }
      />
      <Route
        path="/geradorInovacao"
        element={
          <RequireAuth
            path="geradorInovacao"
          >
            <GeradorInovacao />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
