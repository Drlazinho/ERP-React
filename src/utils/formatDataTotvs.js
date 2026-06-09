const formatDateTotvs = (date, subs = '/') => {
  if (!date) return '';

  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6, 8);

  return [day, month, year].join(subs);
};

export const formatDateTotvsFromDate = (date) => {
  if (!date) return '';

  return date.replaceAll('-','');
};

export default formatDateTotvs;
