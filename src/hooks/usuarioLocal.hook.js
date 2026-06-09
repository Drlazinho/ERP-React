import { useCallback, useEffect, useState } from 'react';
import { buscarUsuarioPorFiltro } from '../services/usuarios.service';

export default function useUsuarioLocal() {
  const usuarioString = localStorage.getItem('@fabrica-user');
  const usuario = usuarioString ? JSON.parse(usuarioString) : {};

  const { email, setor, nivel, nome, id } = usuario;

  return {
    id,
    nome,
    setor,
    nivel,
    email,
  };
}
