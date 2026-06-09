import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../../routes/routes';
import { VerificaNotaPortariaProvider } from '@/hooks/nota-fiscal-verifica-portaria.hook';
const NotasSaida = lazy(() => import('./NotasSaida'));

export function PortariaRoutes() {
  return (
    <Routes>
      <Route
        path="/notasSaida"
        element={
          <VerificaNotaPortariaProvider>
            <RequireAuth path="notasSaida">
              <NotasSaida />
            </RequireAuth>
          </VerificaNotaPortariaProvider>
        }
      />
    </Routes>
  );
}
