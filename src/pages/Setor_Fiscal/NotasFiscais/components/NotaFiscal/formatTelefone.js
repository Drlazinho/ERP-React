const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
  
    // Remove todos os caracteres que não sejam dígitos
   
    // Verifica se o número de telefone limpo tem pelo menos 10 dígitos
   
    // Extrai os grupos de dígitos do número de telefone
    const part1 = phoneNumber[0].slice(0, 2);
    const part2 = phoneNumber[0].slice(2, 7);
    const part3 = phoneNumber[0].slice(7);
  
    // Retorna o número de telefone formatado no formato "(xx) xxxx xxxx"
    return `(${part1}) ${part2} - ${part3}`;
  };
  
  export default formatPhoneNumber;
  