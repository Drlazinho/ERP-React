import {
    useContext,
    createContext,
    useEffect,
    useState,
    useCallback,
  } from 'react';
  
  export const Usuario = createContext({
    token: '',
    expiration: '',
    nivel: 0,
    setor: 0,
    nome: '',
    id: 0,
    refreshToken: '',
    email: '',
  });
  
  export const UsuarioProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState({
      token: '',
      expiration: '',
      nivel: 0,
      setor: 0,
      nome: '',
      id: 0,
      refreshToken: '',
      email: '',
    });
  
    const definirUsuarioSistema = (usuario) => {
      localStorage.setItem('@fabrica-user', JSON.stringify(usuario));
    };
  
    useEffect(() => {
      const usuario = localStorage.getItem('@fabrica-user');
  
      if (usuario) {
        setUsuario(JSON.parse(usuario));
      }
      setLoading(false);
    }, []);
  
    return (
      <Usuario.Provider value={{ definirUsuarioSistema, usuario, loading }}>
        {children}
      </Usuario.Provider>
    );
  };
  
  export const useUsuario = (props) => {
    const context = useContext(Usuario);
    if (!context) console.error('Erro na cotacao');
    return context;
  };
  