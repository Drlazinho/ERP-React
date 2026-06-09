import React, { createContext, useEffect, useReducer, useState } from 'react'
import { useLocation } from 'react-router';

export const RestricaoContext = createContext()

const wordKeys = {
  desafiante: 'DESAFIANTE',
  graoMestre: 'GRAOMESTRE',
  mestre: 'MESTRE'
}

export default function AcessoRestritoTIProvider({ children }) {
  const [password, setPassword] = useState(localStorage.getItem('passwordTi') || '')
  const [showModalAccess, setShowModalAccess] = useState(true)
  const [error, setError] = useState(false);

  const [optionPassword, setOptionPassword] = useState({
    password1: null,
    password2: null,
    password3: null,
  })

  const passwordForRoute = (state, action) => {
    switch (action) {
      case '/dashboardapresentation':
        if (localStorage.getItem('passwordTi') === wordKeys.mestre) {
          setShowModalAccess(true)
        }
        setOptionPassword({
          password1: wordKeys.desafiante,
          password2: wordKeys.graoMestre,
          password3: wordKeys.desafiante
        })
        return
      case '/dashboard':
        if (localStorage.getItem('passwordTi') === wordKeys.mestre) {
          setShowModalAccess(true)
        }
        if (localStorage.getItem('passwordTi') === wordKeys.desafiante || localStorage.getItem('passwordTi') === wordKeys.graoMestre) {
          setShowModalAccess(false)
        }
        setOptionPassword({
          password1: wordKeys.desafiante,
          password2: wordKeys.graoMestre,
          password3: wordKeys.desafiante,
        })
        return
      case '/dashcomercial':
        if (localStorage.getItem('passwordTi') === wordKeys.desafiante || localStorage.getItem('passwordTi') === wordKeys.graoMestre || localStorage.getItem('passwordTi') === wordKeys.mestre) {
          setShowModalAccess(false)
        }
        setOptionPassword({
          password1: wordKeys.desafiante,
          password2: wordKeys.graoMestre,
          password3: wordKeys.mestre,
        })
        return
      case '/titulospagar':
        if (localStorage.getItem('passwordTi') === wordKeys.desafiante || localStorage.getItem('passwordTi') === wordKeys.graoMestre || localStorage.getItem('passwordTi') === wordKeys.mestre) {
          setShowModalAccess(false)
        }
        setOptionPassword({
          password1: wordKeys.desafiante,
          password2: wordKeys.graoMestre,
          password3: wordKeys.mestre
        })
        return
      case '/titulosreceber':
        if (localStorage.getItem('passwordTi') === wordKeys.desafiante || localStorage.getItem('passwordTi') === wordKeys.graoMestre || localStorage.getItem('passwordTi') === wordKeys.mestre) {
          setShowModalAccess(false)
        }
        setOptionPassword({
          password1: wordKeys.desafiante,
          password2: wordKeys.graoMestre,
          password3: wordKeys.mestre
        })
        return
      case '/financeiro':
        if (localStorage.getItem('passwordTi') === wordKeys.desafiante || localStorage.getItem('passwordTi') === wordKeys.graoMestre || localStorage.getItem('passwordTi') === wordKeys.mestre) {
          setShowModalAccess(false)
        }
        setOptionPassword({
          password1: wordKeys.desafiante,
          password2: wordKeys.graoMestre,
          password3: wordKeys.mestre
        })
        return
      case '/ordemservicos':
        if(localStorage.getItem('passwordTi') !== wordKeys.desafiante) {
          setShowModalAccess(true)
        }
        if(localStorage.getItem('passwordTi') === wordKeys.graoMestre || localStorage.getItem('passwordTi') === wordKeys.mestre ) {
          setShowModalAccess(true)
        }
        setOptionPassword({
          password1: wordKeys.desafiante,
          password2: wordKeys.desafiante,
          password3: wordKeys.desafiante,
        })
        return
      case '/listadeequipamentos':
        if(localStorage.getItem('passwordTi') !== wordKeys.desafiante) {
          setShowModalAccess(true)
        }
        if(localStorage.getItem('passwordTi') === wordKeys.graoMestre || localStorage.getItem('passwordTi') === wordKeys.mestre ) {
          setShowModalAccess(true)
        }
        setOptionPassword({
          password1: wordKeys.desafiante,
          password2: wordKeys.desafiante,
          password3: wordKeys.desafiante,
        })
        return
      case '/admin':
        if(localStorage.getItem('passwordTi') !== wordKeys.desafiante) {
          setShowModalAccess(true)
        }
        if(localStorage.getItem('passwordTi') === wordKeys.graoMestre || localStorage.getItem('passwordTi') === wordKeys.mestre ) {
          setShowModalAccess(true)
        }
        setOptionPassword({
          password1: wordKeys.desafiante,
          password2: wordKeys.desafiante,
          password3: wordKeys.desafiante,
        })
        return
      case '/gerenciamentoti':
        if(localStorage.getItem('passwordTi') !== wordKeys.desafiante) {
          setShowModalAccess(true)
        }
        if(localStorage.getItem('passwordTi') === wordKeys.graoMestre || localStorage.getItem('passwordTi') === wordKeys.mestre ) {
          setShowModalAccess(true)
        }
        setOptionPassword({
          password1: wordKeys.desafiante,
          password2: wordKeys.desafiante,
          password3: wordKeys.desafiante,
        })
        return
      case '/gerenciamentodechamado':
        if(localStorage.getItem('passwordTi') !== wordKeys.desafiante) {
          setShowModalAccess(true)
        }
        if(localStorage.getItem('passwordTi') === wordKeys.graoMestre || localStorage.getItem('passwordTi') === wordKeys.mestre ) {
          setShowModalAccess(true)
        }
        setOptionPassword({
          password1: wordKeys.desafiante,
          password2: wordKeys.desafiante,
          password3: wordKeys.desafiante,
        })
        return
      case '/inventario':
        if(localStorage.getItem('passwordTi') !== wordKeys.desafiante) {
          setShowModalAccess(true)
        }
        if(localStorage.getItem('passwordTi') === wordKeys.graoMestre || localStorage.getItem('passwordTi') === wordKeys.mestre ) {
          setShowModalAccess(true)
        }
        setOptionPassword({
          password1: wordKeys.desafiante,
          password2: wordKeys.desafiante,
          password3: wordKeys.desafiante,
        })
        return
      default:
        setOptionPassword({
          password1: wordKeys.desafiante,
          password2: wordKeys.desafiante,
          password3: wordKeys.desafiante,
        })
    }
  }

  const [routeName, setRouteName] = useReducer(passwordForRoute, null);

  useEffect(() => {
    passwordForRoute()
    localStorage.setItem('passwordTi', password);
    LiberarAcesso(password);
  }, [password])

  useEffect(() => {
    passwordForRoute()
  }, [])

  const LiberarAcesso = (value) => {

    if (value !== undefined) {
      if (value === optionPassword.password1 || value === optionPassword.password2 || value === optionPassword.password3) {
        setPassword(value)
        setShowModalAccess(false)
        setError(false)
      } else {
        setError(true)
      }
    }

  }

  return (
    <RestricaoContext.Provider value={{ showModalAccess, setPassword, LiberarAcesso, error, setRouteName }}>
      {children}
    </RestricaoContext.Provider>
  )
}
