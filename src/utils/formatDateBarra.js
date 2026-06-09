const formatDataBarra = (date, subs = '/') => {
    if (!date) return '';
  
    // Remova todos os caracteres que não sejam dígitos
    const cleanedDate = date.replace(/\D/g, '');
  
    // Verifique se a data limpa tem pelo menos 8 dígitos
    if (cleanedDate.length !== 8) return '';
  
    // Extraia o ano, mês e dia da data limpa
    const year = cleanedDate.slice(0, 4);
    const month = cleanedDate.slice(4, 6);
    const day = cleanedDate.slice(6, 8);
  
    // Retorne a data formatada no formato dd/mm/aaaa
    return [day, month, year].join(subs);
  };
  
  export default formatDataBarra;
  