import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '@/routes/routes';
import { EntregasProvider } from '@/hooks/entregas-provider.hook';
const HistoricoPartidas = lazy(() => import('./HistoricoPartidas'));
const AgendamentoCarga = lazy(() => import('./AgendamentoCarga'));
const CheckDeExpedicao = lazy(() => import('./CheckDeExpedicao'));
const Entregas = lazy(() => import('./Entregas'));
const PainelAeroporto = lazy(() => import('./PainelAeroporto'));
const RecebimentoContainer = lazy(() => import('./RecebimentoContainer'));
const KpiTransporte = lazy(() => import('./KpiTransporte'));

export function TransportesRoutes() {
  return (
    <Routes>
      <Route
        path="/agendamentoCarga"
        element={
          <RequireAuth path="agendamentoCarga">
            <AgendamentoCarga />
          </RequireAuth>
        }
      />
      <Route
        path="/checkDeExpedicao"
        element={
          <RequireAuth path="checkDeExpedicao">
            <CheckDeExpedicao />
          </RequireAuth>
        }
      />
      <Route
        path="/entregas"
        element={
          <RequireAuth path="entregas">
            <EntregasProvider>
              <Entregas />
            </EntregasProvider>
          </RequireAuth>
        }
      />
      <Route
        path="/painelAeroporto"
        element={
          <RequireAuth path="painelAeroporto">
            <PainelAeroporto />
          </RequireAuth>
        }
      />
      <Route
        path="/historicoPartidas"
        element={
          <RequireAuth path="historicoPartidas">
            <HistoricoPartidas />
          </RequireAuth>
        }
      />
      <Route
        path="/recebimentoContainer"
        element={
          <RequireAuth path="recebimentoContainer">
            <RecebimentoContainer />
          </RequireAuth>
        }
      />
      <Route
        path="/kpiTransporte"
        element={
          <RequireAuth path="kpiTransporte">
            <KpiTransporte />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
