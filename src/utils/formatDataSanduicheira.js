const formatDataSanduicheira = (date, subs = '/') => {
    if (!date) return '';
  
    if (date.includes('T')) {
      
      const [datePart, timePart] = date.split('T');      
      const year = datePart.slice(0, 4);
      const month = datePart.slice(5, 7);
      const day = datePart.slice(8, 10);
      
      const time = timePart.split(':').slice(0, 2).join(':'); 
      
      return `${[day, month, year].join(subs)} ${time}`;
    }
  
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
  
    return [day, month, year].join(subs);
  };
  
  export default formatDataSanduicheira;
