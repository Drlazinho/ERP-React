export const TOKEN_KEY = '@fabrica-Token'; // Nome do token para identificação

/**
 * Verifica se o usuário está autenticado.
 * @returns {boolean} - Retorna `true` se o token estiver armazenado, caso contrário `false`.
 */
export const isAuthenticated = (): boolean => localStorage.getItem(TOKEN_KEY) !== null;

/**
 * Obtém o token armazenado no localStorage.
 * @returns {string | null} - Retorna o token, ou `null` se ele não existir.
 */
export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

/**
 * Armazena o token no localStorage.
 * @param token - O token que será armazenado.
 */
export const login = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Remove o token do localStorage e redireciona para a página inicial.
 */
export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = '/';
};
