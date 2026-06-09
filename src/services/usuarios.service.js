import { apiFactory, apiLogin } from './apis';

export const buscarUsuarioPorFiltro = async (filtro) => {
  try {
    const result = await apiFactory.get(`Usuarios`, { params: filtro });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUsuario = async (data) => {
  const { idUsuario, idNivel, idSetor, nome, email } = data;

  try {
    const result = await apiFactory.put(
      `Usuarios?IdUsuario=${idUsuario}&IdNivel=${idNivel}&IdSetor=${idSetor}&Nome=${nome}&Email=${email}&SetorReal=${idSetor}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const trocarSenha = async (email, pass) => {
  try {
    const result = await apiLogin.put(
      `Usuarios/NovaSenha?email=${email}&password=${pass}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarUsuarioPorSetor = async (email) => {
  try {
    const result = await apiFactory.get(`Usuarios/GETALL?email=${email}`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
