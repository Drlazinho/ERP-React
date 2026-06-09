export const formatToPonto = (subs = '.') => {
  const dataAtual = new Date();
  const dia = dataAtual.getDate().toString().padStart(2, '0');
  const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0'); // Adicionei +1 para o mês, pois ele é base 0
  const ano = dataAtual.getFullYear();

  return `${ano}.${mes && (mes.toString().length < 2 ? '0' + mes : mes)}.${dia}`;
};

export const reverseFormatToPonto = (value) => {
  if (value === null) {
    return ''
  }

  const year = value.slice(0, 4);
  const month = value.slice(5, 7);
  const day = value.slice(8, 10);

  return `${year}-${month && (month.toString().length < 2 ? '0' + month : month)}-${day}`;
 
};
