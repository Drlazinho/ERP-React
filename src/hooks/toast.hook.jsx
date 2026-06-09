import React, { createContext, useCallback, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import { v4 as uuid } from 'uuid';
import ToastContainer from '../components/ToastContainer'
import { Alert } from '@mui/material'


ToastProvider.propTypes = {
  children: PropTypes.element
}

const ToastContext = createContext();

export default function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const addToast = useCallback(({ type, title, description, descriptionEnglish, descriptionChinese }) => {
    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description,
      descriptionEnglish, 
      descriptionChinese,
    };

    setMessages((oldMessages) => [...oldMessages, toast]);
  }, []);

  const removeToast = useCallback((id) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }} >
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    <Alert severity="error">useToast must be used within a ToastProvider</Alert>
  }

  return context;
}

export { ToastProvider, useToast };
