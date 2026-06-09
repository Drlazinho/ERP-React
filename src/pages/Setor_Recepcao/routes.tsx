import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '@/routes/routes';
const InsumosSaldo = lazy(() => import('./Insumos'));

export function RecepcaoRoutes() {
  return (
    <Routes>
      <Route
        path="insumos/insumosSaldo"
        element={
          <RequireAuth path="insumosSaldo">
            <InsumosSaldo />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
