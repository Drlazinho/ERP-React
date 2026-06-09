import { createTheme, ThemeOptions } from '@mui/material/styles';

// Tipagem estendida para temas customizados
// declare module '@mui/material/styles' {
//   interface CustomThemeOptions {
//     custom?: {
//       borderColor?: string;
//       hoverEffect?: string;
//     };
//   }
  
//   interface Theme extends CustomThemeOptions {}
//   interface ThemeOptions extends CustomThemeOptions {}
// }

// Configurações comuns para ambos os temas
const commonTheme: ThemeOptions = {
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '8px 16px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', // Remove gradiente padrão
        },
      },
    },
  },
//   custom: {
//     borderColor: '#e0e0e0',
//     hoverEffect: '0 3px 5px rgba(0,0,0,0.1)',
//   },
};

// Tema Claro
export const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
  },
});

// Tema Escuro
export const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#ce93d8',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
//   custom: {
//     borderColor: '#424242',
//     hoverEffect: '0 3px 5px rgba(255,255,255,0.1)',
//   },
});

export type AppTheme = typeof lightTheme;