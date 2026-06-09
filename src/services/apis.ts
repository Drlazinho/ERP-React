import axios, { AxiosInstance } from 'axios';
import { isAuthenticated, getToken } from './auth';

interface CreateApiInstanceOptions {
  baseURL: string;
  withAuth?: boolean;
}

const createApiInstance = ({
  baseURL,
  withAuth = true,
}: CreateApiInstanceOptions): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH',
    },
  });

  if (withAuth) {
    instance.interceptors.request.use((config) => {
      if (isAuthenticated() && config.headers) {
        config.headers.Authorization = `Bearer ${getToken()}`;
      }
      return config;
    });
  }

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        window.location.href = '/401';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const apiAlunos = createApiInstance({
  baseURL: import.meta.env.VITE_API_ALUNOS,
});
export const apiFabrica = createApiInstance({
  baseURL: import.meta.env.VITE_API_FABRICA,
});
export const apiFabrica_operacao = createApiInstance({
  baseURL: import.meta.env.VITE_API_FABRICA_OPERACAO,
});
export const apiLogin = createApiInstance({
  baseURL: import.meta.env.VITE_API_LOGIN_GESTAO,
});
export const apiFabrica_Posvenda = createApiInstance({
  baseURL: import.meta.env.VITE_API_POSVENDA,
});
export const apiFabricaADM = createApiInstance({
  baseURL: import.meta.env.VITE_API_FABRICAADM,
});
export const apiFabricaApoio = createApiInstance({
  baseURL: import.meta.env.VITE_API_APOIO,
});
export const apiFabricaDev = createApiInstance({
  baseURL: import.meta.env.VITE_API_FABRICADEV,
});
export const apiFactory = createApiInstance({
  baseURL: import.meta.env.VITE_API_FACTORY,
});
export const apiImportacao = createApiInstance({
  baseURL: import.meta.env.VITE_API_IMPORTACAO,
});
export const apiInteligencia = createApiInstance({
  baseURL: import.meta.env.VITE_API_INTELIGENCIA,
});
export const apiNotaFiscal = createApiInstance({
  baseURL: import.meta.env.VITE_API_NOTAFISCAL,
  withAuth: false,
});
export const apiCotacao = createApiInstance({
  baseURL: 'https://economia.awesomeapi.com.br/json',
  withAuth: false,
});
export const apiMunicipiosIBGE = createApiInstance({
  baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
  withAuth: false,
});

// API para testes locais
export const apiParaTestesDev = createApiInstance({
  baseURL: 'http://localhost:3333',
  withAuth: false,
});
