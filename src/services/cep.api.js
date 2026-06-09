// import axios from 'axios';
import axios from 'axios';

export const apiCep = axios.create({
  baseUrl: 'https://viacep.com.br/ws/',
});

apiCep.defaults.baseURL = 'https://viacep.com.br/ws/';
