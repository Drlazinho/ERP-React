import React, {
  useContext,
  lazy,
  Suspense,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router';

import { isAuthenticated } from '../services/auth';
import { Usuario } from '../hooks/usuario.hook';
import useUsuarioLocal from '../hooks/usuarioLocal.hook';
import { buscarParametrizacaoPage } from '../pages/Setor_Inteligencia/GerenciamentoDeInformacoes/gerenciamentoDeInformacoes.service';
import { ContratosProvider } from '../hooks/contrato-provider.hook';
import { NotasEmitidasProvider } from '../hooks/notas-emitidas.hook';
import { VerificaNotaPortariaProvider } from '../hooks/nota-fiscal-verifica-portaria.hook';
import { EntregasProvider } from '../hooks/entregas-provider.hook';

const Login = lazy(() => import('../pages/Login'));
const NaoLogado = lazy(() => import('../pages/NaoLogado'));
const Principal = lazy(() => import('../pages/Principal'));
const DashComercial = lazy(() => import('../pages/DashComercial'));
const DashboardNovo = lazy(() => import('../pages/DashboardNovo'));
const PrintPage = lazy(() => import('../pages/PrintPage'));
const NotaFiscal = lazy(() => import('../pages/NotaFiscal'));

const OrcamentoSetor = lazy(() => import('../pages/Orcamentos/OrcamentoSetor'));
const OrcamentosSetores = lazy(() =>
  import('../pages/Orcamentos/OrcamentosSetores')
);
const AprovadorProtocoloDeNotasPagina = lazy(() =>
  import('../pages/AprovadorProtocoloDeNotas')
);

const MeusChamadosRemake = lazy(() => import('../pages/ContatoRemake/index'));
const EntradaProtocoloNotas = lazy(() =>
  import('../pages/EntradaProtocoloNotas')
);
const CadastroProtocolodeNotas = lazy(() =>
  import('../pages/Setor_Financeiro/ProtocoloDeNotas/cadastro')
);
const Manutencao = lazy(() => import('../pages/Manutenção'));
const RedefinirSenha = lazy(() => import('../pages/RedefinirSenha'));
const TelaChamados = lazy(() => import('../pages/TelaChamadosGeral'));
const ChamadosPorSetor = lazy(() =>
  import('../pages/TelaChamadosGeral/ChamadosSetor')
);
import { Catalogo } from '@/pages/Catalogo';
import UsuarioBloqueado from '../pages/UsuarioBloqueiado';
import Loading from '../components/Loading';
import ControleCubagemTemplate from '../components/TemplatesPdf/Cubagem/ControleCubagemTemplate';
import NotaFiscalTemplate from '../components/TemplatesPdf/NotaFiscal';
import ControleRPCTemplate from '../components/TemplatesPdf/ControleRecebimentoPermanenciaContainer';
// SubRotas-------------------------------------------------
import { ComercialRoutes } from '../pages/Setor_Comercial/routes';
import { ComprasIntRoutes } from '../pages/Setor_ComprasInt/routes';
import { EstoqueRoutes } from '@/pages/Setor_Estoque/routes';
import { ImportacaoRoutes } from '@/pages/Setor_Importacao/routes';
import { FiscalRoutes } from '@/pages/Setor_Fiscal/routes';
import { FinanceiroRoutes } from '@/pages/Setor_Financeiro/routes';
import { ProducaoRoutes } from '@/pages/Setor_Producao/routes';
import { PosVendaRoutes } from '@/pages/Setor_PosVenda/routes';
import { InteligenciaRoutes } from '@/pages/Setor_Inteligencia/routes';
import { SecretariadoRoutes } from '@/pages/Setor_Secretariado/routes';
import { PortariaRoutes } from '@/pages/Setor_Portaria/routes';
import { RecepcaoRoutes } from '@/pages/Setor_Recepcao/routes';
import { TransportesRoutes } from '@/pages/Setor_Transportes/routes';
import DashOperacao from '@/pages/DashOperacao';
import AppLayout from '@/layout/AppLayout';
import AppFinanceLayout from '@/layout/AppFinanceLayout';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/401" element={<NaoLogado />} />
          <Route path="/noaccess" element={<UsuarioBloqueado />} />

          <Route element={<AppFinanceLayout />}>
            <Route
              path="/dashcomercial"
              element={
                <RequireAuth path="dashcomercial" id={21}>
                  <DashComercial />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth path="dashboard" id={1}>
                  <DashboardNovo />
                </RequireAuth>
              }
            />
          </Route>

          <Route element={<AppLayout />}>
            <Route path="/fiscal/*" element={<FiscalRoutes />} />
            <Route path="/importacao/*" element={<ImportacaoRoutes />} />
            <Route path="/transporte/*" element={<TransportesRoutes />} />
            <Route path="/comercial/*" element={<ComercialRoutes />} />
            <Route path="/comprasint/*" element={<ComprasIntRoutes />} />
            <Route path="/financeiro/*" element={<FinanceiroRoutes />} />
            <Route path="/posVenda/*" element={<PosVendaRoutes />} />
            <Route path="/secretariado/*" element={<SecretariadoRoutes />} />
            <Route path="/recepcao/*" element={<RecepcaoRoutes />} />
            <Route path="/portaria/*" element={<PortariaRoutes />} />
            <Route path="/inteligencia/*" element={<InteligenciaRoutes />} />
            <Route path="/producao/*" element={<ProducaoRoutes />} />
            <Route
              path="/principal"
              element={
                <RequireAuth path="principal" id={null}>
                  <Principal />
                </RequireAuth>
              }
            />
            <Route
              path="/dashboardOperacao"
              element={
                <RequireAuth path="dashboardOperacao">
                  <DashOperacao />
                </RequireAuth>
              }
            />
            <Route
              path="/cadastroprotocolodenotas"
              element={
                <RequireAuth path="cadastroprotocolodenotas" id={31}>
                  <CadastroProtocolodeNotas />
                </RequireAuth>
              }
            />

            <Route
              path="/orcamentoSetor/:id/:ano/*"
              element={
                <RequireAuth
                  path="orcamentoSetor/:id/:ano/*"
                  id={null}
                  setorAccess={[2, 4, 7, 15]}
                >
                  <OrcamentoSetor />
                </RequireAuth>
              }
            />

            <Route
              path="/orcamentosSetores"
              element={
                <RequireAuth
                  path="orcamentosSetores"
                  id={null}
                  setorAccess={[2, 4, 7, 15]}
                >
                  <OrcamentosSetores />
                </RequireAuth>
              }
            />
          </Route>

          <Route path="/estoque/*" element={<EstoqueRoutes />} />

          <Route
            path="/entradaprotocolonotas"
            element={
              <RequireAuth path="entradaprotocolonotas" id={null}>
                <EntradaProtocoloNotas />
              </RequireAuth>
            }
          />

          <Route
            path="/manutencao"
            element={
              <RequireAuth path="manutencao" id={null}>
                <Manutencao />
              </RequireAuth>
            }
          />
          <Route
            path="/printpdf/:documento"
            element={
              <RequireAuth path="printpdf/:documento" id={null}>
                <PrintPage>
                  <NotaFiscalTemplate />
                </PrintPage>
              </RequireAuth>
            }
          />
          <Route
            path="/printrpc/:documento"
            element={
              <RequireAuth path="printrpc/:documento" id={null}>
                <PrintPage>
                  <ControleRPCTemplate />
                </PrintPage>
              </RequireAuth>
            }
          />
          <Route
            path="/printcubagem/:documento"
            element={
              <RequireAuth path="printcubagem/:documento" id={null}>
                <PrintPage>
                  <ControleCubagemTemplate />
                </PrintPage>
              </RequireAuth>
            }
          />
          <Route
            path="/notafiscal/:documento"
            element={
              <RequireAuth path="notafiscal/:documento" id={19}>
                <NotaFiscal />
              </RequireAuth>
            }
          />

          <Route
            path="/aprovadorprotocolodenotas"
            element={
              <RequireAuth path="aprovadorprotocolodenotas" id={31}>
                <AprovadorProtocoloDeNotasPagina />
              </RequireAuth>
            }
          />

          {/* <Route
            path="/xcontato"
            element={
              <RequireAuth path="xcontato" id={null}>
                <XContato />
              </RequireAuth>
            }
          /> */}
          <Route
            path="/xcontato"
            element={
              <RequireAuth path="xcontato" id={null}>
                <MeusChamadosRemake />
              </RequireAuth>
            }
          />
          <Route
            path="/redefinirsenha"
            element={
              <RequireAuth path="redefinirsenha" id={47}>
                <RedefinirSenha />
              </RequireAuth>
            }
          />
          <Route
            path="/chamadosporsetor"
            element={
              <RequireAuth path="chamadosporsetor" id={23}>
                <ChamadosPorSetor />
              </RequireAuth>
            }
          />
          <Route
            path="/telachamados"
            element={
              <RequireAuth path="telachamados" id={23}>
                <TelaChamados />
              </RequireAuth>
            }
          />
          <Route
            path="/catalogo"
            element={
              <RequireAuth path="catalogo">
                <Catalogo />
              </RequireAuth>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// type RequireAuthType = {
//   id?: number | null,
//   children: ReactNode,
//   path: string
//   setorAccess?: number[]
// }

export function RequireAuth({
  children,
  path,
  setorAccess = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28,
  ],
}) {
  const { loading } = useContext(Usuario);
  const [statusPage, setStatusPage] = useState([]);
  const { setor } = useUsuarioLocal();
  const navigateHook = useNavigate();

  // useEffect(() => {
  //   buscarParametrizacaoPage().then((res) => {
  //     setStatusPage(res);
  //   });
  // }, [path]);

  // useEffect(() => {
  //   let pathUper = path ? path.toUpperCase() : '';
  //   let resultado = pathUper
  //     ? statusPage.find((item) => item.descricao === pathUper)
  //     : '';

  //   if (resultado?.status === 0) {
  //     navigateHook('/manutencao');
  //   }
  //   if (statusPage === '') {
  //     return children;
  //   }
  // }, [statusPage]);

  if (loading) {
    return <Loading />;
  }

  // const setorPermitido = setorAccess.includes(setor);

  // if (!setorPermitido) {
  //   return <Navigate to="/401" />;
  // }

  // if (!isAuthenticated()) {
  //   return <Navigate to="/401" />;
  // }
  return children;
}
