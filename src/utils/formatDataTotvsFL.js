const formatDateTotvsFL = (date, subs = '/') => {
    if (!date) return '';
  
    const year = date.slice(0, 4);
    const month = date.slice(6, 8);
    const day = date.slice(4, 6);
  
    return [month, day,  year].join(subs);
  };
  
  export default formatDateTotvsFL;
  
  
  