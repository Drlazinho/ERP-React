import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../../routes/routes';
import { NotasEmitidasProvider } from '../../hooks/notas-emitidas.hook';
import PrintPage from '../PrintPage';
import ModalCubagem from './Pedidos/components/modalCubagem';
import Faturamento from '../Setor_Fiscal/Faturamento';
import Calendario from './Calendario';
const Pedidos = lazy(() => import('./Pedidos'));
const Cubagem = lazy(() => import('./Cubagem'));
const NotasFiscaisEmitidas = lazy(() => import('./NotasFiscaisEmitidas'));
const DashboardNotasFiscaisEmitidas = lazy(
  () => import('./NotasFiscaisEmitidas/dashboard')
);

export function ComercialRoutes() {
  return (
    <Routes>
      <Route
        path="/Cubagem"
        element={
          <RequireAuth path="Cubagem" setorAccess={[1, 2, 7]}>
            <Cubagem />
          </RequireAuth>
        }
      />
      <Route
        path="/pedidos"
        element={
          <RequireAuth path="pedidos" setorAccess={[1, 2, 7]}>
            <Pedidos />
          </RequireAuth>
        }
      />
      <Route
        path="/calendario"
        element={
          <RequireAuth path="calendario" setorAccess={[1, 2, 7]}>
            <Calendario />
          </RequireAuth>
        }
      />
      <Route
        path="/faturamento"
        element={
          <RequireAuth path="Faturamento" setorAccess={[1, 2, 7]}>
            <Faturamento />
          </RequireAuth>
        }
      />
      <Route
        path="/dashboardnotasfiscais"
        element={
          <RequireAuth path="dashboardnotasfiscais">
            <DashboardNotasFiscaisEmitidas />
          </RequireAuth>
        }
      />
      <Route
        path="/notasfiscaisemitidas"
        element={
          <RequireAuth
            path="notasfiscaisemitidas"
            setorAccess={[1, 3, 4, 2, 7, 9]}
          >
            <NotasEmitidasProvider>
              <NotasFiscaisEmitidas />
            </NotasEmitidasProvider>
          </RequireAuth>
        }
      />
      <Route
        path="/ModalCubagem"
        element={
          <RequireAuth path="ModalCubagem">
            <PrintPage>
              <ModalCubagem />
            </PrintPage>
          </RequireAuth>
        }
      />
    </Routes>
  );
}
