import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../../routes/routes';
const CustoDeRetorno = lazy(() => import('./CustoDeRetorno'));
const ColetaEntrega = lazy(() => import('./ColetaEntrega'));
const ColetaPosVenda = lazy(() => import('./ColetaEntrega/Coleta')); //
const EntregaPosVenda = lazy(() => import('./ColetaEntrega/Entrega'));
const KpisPosVenda = lazy(() => import('./KpisPosVenda'));
const HistoricoDoProduto = lazy(() => import('./HistoricoDoProduto'));
const KpisAtendimento = lazy(() => import('./KpisAtendimento'));
import { EmailAuthGuard } from './EmailAuthGuard';
import { authorizedEmails } from './authorizedEmails';

export function PosVendaRoutes() {
  return (
    <Routes>
      <Route
        path="/coletaEntrega"
        element={
          <RequireAuth path="coletaEntrega">
            <ColetaEntrega />
          </RequireAuth>
        }
      />
      <Route
        path="/coletaEntrega/coletaPosVenda"
        element={
          <RequireAuth path="coletaEntrega/coletaPosVenda">
            <ColetaPosVenda />
          </RequireAuth>
        }
      />
      <Route
        path="/coletaEntrega/entregaPosVenda"
        element={
          <RequireAuth path="coletaEntrega/entregaPosVenda">
            <EntregaPosVenda />
          </RequireAuth>
        }
      />
      <Route
        path="/kpisPosVenda"
        element={
          <RequireAuth path="kpisPosVenda">
            <KpisPosVenda />
          </RequireAuth>
        }
      />
      <Route
        path="/custoDeRetorno"
        element={
          <RequireAuth path="custoDeRetorno">
            <CustoDeRetorno />
          </RequireAuth>
        }
      />
      <Route
        path="/historicoDoProduto"
        element={
          <RequireAuth path="historicoDoProduto">
            <HistoricoDoProduto />
          </RequireAuth>
        }
      />
      <Route
        path="/kpisAtendimento"
        element={
          <RequireAuth path="kpisAtendimento">
            <EmailAuthGuard allowedEmails={authorizedEmails}>
              <KpisAtendimento />
            </EmailAuthGuard>
          </RequireAuth>
        }
      />
    </Routes>
  );
}
