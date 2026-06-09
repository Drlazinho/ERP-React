const formatInvertPonto = (date) => {
    if (!date) return '';

    // Divida a data em mês, dia e ano usando "/" como delimitador
    const parts = date.split('/');

    // Verifique se a data tem três partes (mês, dia e ano)
    if (parts.length !== 3) return '';

    // Extraia o mês, dia e ano
    const month = parts[0];
    const day = parts[1];
    const year = parts[2];

    // Verifique se o mês, dia e ano são numéricos
    if (isNaN(day) || isNaN(month) || isNaN(year)) return '';

    // Retorne a data formatada no formato "dd/mm/aaaa"
    return [day, month, year].join('/');
};

export default formatInvertPonto;
