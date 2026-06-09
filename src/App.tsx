import { IconContext } from 'react-icons';
import './App.css';
import ToastProvider from './hooks/toast.hook';
import Rotas from './routes/routes';
import { UsuarioProvider } from './hooks/usuario.hook';
import AcessoRestritoTIProvider from './hooks/acesso-restrito-ti.hook';
import NotaPdfFiscalProvider from './hooks/nota-fiscal-pdf.hook';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CotacaoProvider } from './hooks/cotacao.hook';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './libs/react-query';
import { CustomThemeProvider } from './context/ThemeContext';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <ToastProvider>
      <CustomThemeProvider>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <IconContext.Provider value={{ className: 'react-icons' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <CotacaoProvider>
                <UsuarioProvider>
                  <AcessoRestritoTIProvider>
                    <NotaPdfFiscalProvider>
                      <Rotas />
                    </NotaPdfFiscalProvider>
                  </AcessoRestritoTIProvider>
                </UsuarioProvider>
              </CotacaoProvider>
            </LocalizationProvider>
          </IconContext.Provider>
        </QueryClientProvider>
      </CustomThemeProvider>
    </ToastProvider>
  );
}

export default App;
