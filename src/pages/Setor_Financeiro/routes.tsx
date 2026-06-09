import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../../routes/routes';
const Financeiro = lazy(() => import('./Financeiro'));
const ControleDeEmprestimo = lazy(() => import('./ControleDeEmprestimo'));
const PosicaoDeClientes = lazy(() => import('./PosicaoDeClientes'));
const ProtocoloDeNotas = lazy(() => import('./ProtocoloDeNotas'));
const TitulosPagar = lazy(() => import('./TitulosPagar'));
const TitulosReceber = lazy(() => import('./TitulosReceber'));
const GrupoEconomico = lazy(() => import('./GrupoEconomico'));

export function FinanceiroRoutes() {
  return (
    <Routes>
      <Route
        path="/controleDeEmprestimo"
        element={
          <RequireAuth path="/controleDeEmprestimo" setorAccess={[2, 4, 7, 15]}>
            <ControleDeEmprestimo />
          </RequireAuth>
        }
      />
      <Route
        path="/financeiro"
        element={
          <RequireAuth path="financeiro" setorAccess={[2, 4, 7, 15]}>
            <Financeiro />
          </RequireAuth>
        }
      />

      <Route
        path="/posicaoDeClientes"
        element={
          <RequireAuth path="posicaoDeClientes">
            <PosicaoDeClientes />
          </RequireAuth>
        }
      />
      <Route
        path="/protocoloDeNotas"
        element={
          <RequireAuth path="protocoloDeNotas">
            <ProtocoloDeNotas />
          </RequireAuth>
        }
      />
      <Route
        path="/titulosPagar"
        element={
          <RequireAuth path="titulosPagar">
            <TitulosPagar />
          </RequireAuth>
        }
      />
      <Route
        path="/titulosReceber"
        element={
          <RequireAuth path="titulosReceber">
            <TitulosReceber />
          </RequireAuth>
        }
      />
      <Route
        path="/grupoEconomico"
        element={
          <RequireAuth path="grupoEconomico">
            <GrupoEconomico />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
