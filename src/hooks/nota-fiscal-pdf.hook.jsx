import React, { createContext, useEffect, useReducer, useState } from 'react'
import { Base64 } from 'js-base64';
import xml2js from 'xml2js';
import { BuscarXmlNota, GerarBarCode } from '../services/fiscal.Service'

export const NotaPdfFiscal = createContext()

export default function NotaPdfFiscalProvider({ children }) {
  const [infoNota, setInfoNota] = useState({});

  const [nota, setNota] = useState(null);
  const [decodificado, setDecodificado] = useState(null);
  const [barCode, setBarCode] = useState('')

  const decodificar = (value) => {
    const X = Base64.decode(value);
    setDecodificado(X);
    // convertXmlToPdf();
  };

  // Codigo corrigido
  const convertXmlToPdf = () => {
    if (decodificado) {
      xml2js.parseString(decodificado, (err, result) => {
        if (err) {
          console.error("Erro ao analisar XML:", err);
          return;
        }
        setNota(result);
      });
    }
  };

  // const convertXmlToPdf = () => {
  //   // Analisar o XML para obter os dados
  //   xml2js.parseString(decodificado, (err, result) => {
  //     // Cookies.set('Objeto', result);
  //     setNota(result);
  //   });
  // };

  const consultarNotaPdf = (value) => {
    BuscarXmlNota(value)
    .then((data) => {
      decodificar(data.arquivo);
      convertXmlToPdf();
    })
    .catch((error) => { }).finally(() => {
    });
    GerarBarCode(value).then((data) => {
      setBarCode(data.url)
    })
  }

  useEffect(() => {
    convertXmlToPdf();
  }, [decodificado])

  return (
    <NotaPdfFiscal.Provider value={{ infoNota, nota, consultarNotaPdf, barCode }}>
      {children}
    </NotaPdfFiscal.Provider>
  )
}
