import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from '../../routes/routes';
import PrintPage from '../PrintPage';
import AppLayout from '@/layout/AppLayout';
const MeiPdf = lazy(() => import('./MeiEstoque/components/PdfMei'));
const ChecagemNotaEstoque = lazy(() => import('./ChecagemDeNota'));
const EstoqueDeProdutos = lazy(() => import('./EstoqueDeProdutos'));
const MeiEstoque = lazy(() => import('./MeiEstoque'));
const KPIInventario = lazy(() => import('./KPIinventario'));
const TaxaDeOcupacao = lazy(() => import('./TaxaDeOcupacao'));
const GeradorQRcodeVivo = lazy(() => import('./GeradorQRcodeVivo'));
const VivoConferencia = lazy(() => import('./VivoConferencia'));

export function EstoqueRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          path="/taxaDeOcupacao"
          element={
            <RequireAuth path="taxaDeOcupacao">
              <TaxaDeOcupacao />
            </RequireAuth>
          }
        />
        <Route
          path="/meiEstoque"
          element={
            <RequireAuth path="meiEstoque">
              <MeiEstoque />
            </RequireAuth>
          }
        />
        <Route
          path="/kpiInventario"
          element={
            <RequireAuth path="kpiInventario">
              <KPIInventario />
            </RequireAuth>
          }
        />
        <Route
          path="/geradorQRcodeVivo"
          element={
            <RequireAuth path="geradorQRcodeVivo">
              <GeradorQRcodeVivo />
            </RequireAuth>
          }
        />
        <Route
          path="/estoqueDeProdutos"
          element={
            <RequireAuth
              path="estoque"
              //   id={8}
            >
              <EstoqueDeProdutos />
            </RequireAuth>
          }
        />

        <Route
          path="/printpdfmei"
          element={
            <RequireAuth path="printpdfmei">
              <PrintPage>
                <MeiPdf />
              </PrintPage>
            </RequireAuth>
          }
        />
        <Route
          path="/vivoConferencia"
          element={
            <RequireAuth path="vivoConferencia">
              <VivoConferencia />
            </RequireAuth>
          }
        />
      </Route>
      <Route
        path="/checagemDeNota"
        element={
          <RequireAuth path="checagemDeNota">
            <ChecagemNotaEstoque />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
