export const formatCurrencyBRL = (current) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(current);
};
export const formatCurrencyEUR = (current) => {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(current);
};
export const formatCurrencyUSD = (current) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(current);
};
export const formatCurrencyCNY = (current) => {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(current);
};
export const formatCurrencyBRLnocifr = (current) => {

  const value = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(current);
  
  return value.split('').slice(3).join("")
};

