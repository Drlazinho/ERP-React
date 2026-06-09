const formatPontoBarra = (date, subs = '.') => {
    if (!date) return '';
  
    // Divida a data em ano, mês e dia usando "-" como delimitador
    const parts = date.split('-');
  
    // Verifique se a data tem três partes (ano, mês e dia)
    if (parts.length !== 3) return '';
  
    // Extraia o ano, mês e dia
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
  
    // Verifique se o ano, mês e dia são numéricos
    if (isNaN(year) || isNaN(month) || isNaN(day)) return '';
  
    // Retorne a data formatada no formato "aaaa.mm.dd"
    return [year, month, day].join(subs);
  };
  
  export default formatPontoBarra;
  