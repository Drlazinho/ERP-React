import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../../routes/routes';
const EntradaDeImportacao = lazy(() => import('./EntradaDeImportacao'));
const AcompanhamentoDeNavios = lazy(() => import('./AcompanhamentoDeNavios'));
const RetornoImportacao = lazy(() => import('./RetornoImportacao'));

export function ImportacaoRoutes() {
  return (
    <Routes>
      <Route
        path="/entradaDeImportacao"
        element={
          <RequireAuth
            path="entradaDeImportacao"
            //    id={17}
          >
            <EntradaDeImportacao />
          </RequireAuth>
        }
      />
      <Route
        path="/acompanhamentoDeNavios"
        element={
          <RequireAuth
            path="acompanhamentoDeNavios"
            //   id={24}
          >
            <AcompanhamentoDeNavios />
          </RequireAuth>
        }
      />
      <Route
        path="/retornoImportacao"
        element={
          <RequireAuth
            path="retornoImportacao"
          >
            <RetornoImportacao />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
