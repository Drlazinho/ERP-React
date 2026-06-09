const formatDate = (date) => {
  const dateFormatted = new Date(date);
  const year = dateFormatted.getFullYear();

  const day =
    dateFormatted.getDate() > 9
      ? dateFormatted.getDate()
      : `0${dateFormatted.getDate()}`;

  const month =
    dateFormatted.getMonth() + 1 > 9
      ? dateFormatted.getMonth() + 1
      : `0${dateFormatted.getMonth() + 1}`;

  return `${day}/${month}/${year}`;
};

export const formatDateToHtml = (date) => {
  return `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
};

export const formatMes = (date) => {
  return `${date.getFullYear()}-0${date.getMonth()}-${date.getDate()}`;
};

export const formatDateToHtmlMonth = (date) => {
  const data = {
    ano: date.getFullYear(),
    mes: date.getMonth() + 1,
  };

  const dataPrimeiroDia = {
    mes: date.getMonth()
  }

  if (date.getDate() !== 1) {
    return `${data.ano}-${data.mes && (data.mes.toString().length < 2 ? '0' + data.mes : data.mes)
      }`;
  }
  if (date.getDate() === 1) {
    return `${data.ano}-${dataPrimeiroDia.mes && (dataPrimeiroDia.mes.toString().length < 2 ? '0' + dataPrimeiroDia.mes : dataPrimeiroDia.mes)
    }`
  }
};

export default formatDate;

export const formatDatetoHtmlDay = (number = 0) => {
  const data = {
    ano: new Date().getFullYear(),
    mes: new Date().getMonth() + 1,
    dia: new Date().getDate() - number,
  };

  return `${data.ano}-${data.mes && (data.mes.toString().length < 2 ? '0' + data.mes : data.mes)
    }-${data.dia && (data.dia.toString().length < 2 ? '0' + data.dia : data.dia)}`;
}