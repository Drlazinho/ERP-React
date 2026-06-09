import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../../routes/routes';
import { ContratosProvider } from '@/hooks/contrato-provider.hook';
const Contratos = lazy(() => import('./Contratos'));

export function SecretariadoRoutes() {
  return (
    <Routes>
      <Route
        path="/contratos"
        element={
          <RequireAuth path="Contratos">
            <ContratosProvider>
              <Contratos />
            </ContratosProvider>
          </RequireAuth>
        }
      />
    </Routes>
  );
}
