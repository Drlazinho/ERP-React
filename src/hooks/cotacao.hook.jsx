import { useContext, useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { apiCotacao } from '../services/apis';

const Cotacao = createContext({
  dollar: 0,
  euro: 0,
  bitcoin: 0,
  yuan: 0,
  bitcoinUSD: 0,
  bvsp: 0,
});

export const CotacaoProvider = (props) => {
  const [dollar, setDollar] = useState(0);
  const [euro, setEuro] = useState(0);
  const [bitcoin, setBitcoin] = useState(0);
  const [yuan, setYuan] = useState(0);
  const [selic, setSelic] = useState(0);
  const [bitcoinUSD, setBitcoinUSD] = useState(0);
  const [ipca, setIpca] = useState(0);
  const [bvsp, setBvsp] = useState(0);

  const fetchCotacao = async () => {
    try {
      const response = await apiCotacao.get(
        '/api-cotacao/json/last/USD,EUR,BTC,CNY,BTC-USD'
      );

      setDollar(response.data.USDBRL?.high || 0);
      setEuro(response.data.EURBRL?.high || 0);
      setBitcoin(response.data.BTCBRL?.high || 0);
      setYuan(response.data.CNYBRL?.high || 0);
      setBitcoinUSD(response.data.BTCUSD?.high || 0);
    } catch (error) {
      try {
        const fallbackResponse = await axios.get(
          'https://economia.awesomeapi.com.br/json/last/USD,EUR,BTC,CNY,BTC-USD'
        );

        setDollar(fallbackResponse.data.USDBRL?.high || 0);
        setEuro(fallbackResponse.data.EURBRL?.high || 0);
        setBitcoin(fallbackResponse.data.BTCBRL?.high || 0);
        setYuan(fallbackResponse.data.CNYBRL?.high || 0);
        setBitcoinUSD(fallbackResponse.data.BTCUSD?.high || 0);
      } catch (fallbackError) {
        console.error('Erro na requisição direta:', fallbackError);
      }
    }
  };

  useEffect(() => {
    fetchCotacao();
    const timer = setInterval(fetchCotacao, 300000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Cotacao.Provider
      value={{ dollar, euro, yuan, bitcoin, selic, ipca, bvsp, bitcoinUSD }}
    >
      {props.children}
    </Cotacao.Provider>
  );
};

export const useCotacao = () => {
  const context = useContext(Cotacao);
  if (!context) console.error('Erro na cotação');
  return context;
};
