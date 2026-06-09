import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../../routes/routes';
const NotasFiscais = lazy(() => import('./NotasFiscais'));
const FiscalIOxProtheus = lazy(() => import('./FiscalIOxProtheus'));
const Faturamento = lazy(() => import('./Faturamento'));

export function FiscalRoutes() {
  return (
    <Routes>
      <Route
        path="/fiscalIOxProtheus"
        element={
          <RequireAuth path="FiscalIOxProtheus">
            <FiscalIOxProtheus />
          </RequireAuth>
        }
      />
      <Route
        path="/notasFiscais"
        element={
          <RequireAuth path="NotasFiscais" >
            <NotasFiscais />
          </RequireAuth>
        }
      />
      <Route
        path="/faturamento"
        element={
          <RequireAuth path="Faturamento" >
            <Faturamento />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
