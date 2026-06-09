const formatDataPonto = (date, subs = '/') => {
  if (!date) return '';

  // Remova os pontos da data
  const cleanedDate = date.replaceAll('.', '');

  // Verifique se a data limpa tem pelo menos 8 dígitos
  if (cleanedDate.length < 8) return '';

  // Extraia o ano, mês e dia da data limpa
  const year = cleanedDate.slice(0, 4);
  const month = cleanedDate.slice(4, 6);
  const day = cleanedDate.slice(6, 8);

  // Verifique se o ano, mês e dia são válidos
  if (year.length !== 4 || month.length !== 2 || day.length !== 2) return '';

  // Retorne a data formatada no formato dd/mm/aaaa
  return [day, month, year].join(subs);
};

export default formatDataPonto;
