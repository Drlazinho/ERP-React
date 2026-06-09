import React, { useContext, createContext, useState, useCallback } from 'react';

import { useToast } from '../hooks/toast.hook';
import { apiFactory } from '../services/apis'

const ContratosContext = createContext();

export const ContratosProvider = ({ children }) => {

  const [showModal, setShowModal] = useState(false)

  const handleShowModalPostContrato = () => {
    setShowModal(!showModal)
  }

  const handleSubmit = useCallback((contrato, anexos, handleClose) => {
    const formData = new FormData();

    formData.append('usuarioId', contrato.usuarioId);
    formData.append('contratado', contrato.contratado);
    formData.append('emailContratante', contrato.emailContratante);
    formData.append('dataAssinatura', contrato.dataAssinatura);
    formData.append('dataVencimento', contrato.dataVencimento);
    formData.append('objetoContrato', contrato.objetoContrato);
    formData.append('valor', contrato.valor);
    formData.append('formaPgto', contrato.formaPgto);
    formData.append('indiceReajuste', contrato.indiceReajuste);
    formData.append('clausulaRescisoria', contrato.clausulaRescisoria);
    formData.append('aditivo', contrato.aditivo);
    formData.append('tipoContrato', contrato.tipoContrato);
    formData.append('distrativo', contrato.distrativo);

    anexos.forEach((a, i) => {
      formData.append(`anexos[${i}].arquivo`, a.arquivo);
      formData.append(`anexos[${i}].descricao`, a.descricao);
    });

    apiFactory.post(`ControleContratos`, formData).then().finally(() => handleShowModalPostContrato());
  }, []);

  return (
    <ContratosContext.Provider
      value={{
        handleSubmit, handleShowModalPostContrato, showModal
      }}
    >
      {children}
    </ContratosContext.Provider>
  );
};

export const useContratos = () => {
  const context = useContext(ContratosContext);

  if (!context) console.error('Erro!');

  return context;
};
