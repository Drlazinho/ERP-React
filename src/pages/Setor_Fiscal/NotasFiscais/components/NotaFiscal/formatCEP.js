const formatCEP = (value) => {
    if (!value) return '';
  
    // Extrai os grupos de dígitos do CNPJ
    const part1 = value.slice(0, 2);
    const part2 = value.slice(2, 5);
    const part3 = value.slice(5, 8);
  
    // Retorna o CNPJ formatado no formato XX.XXX.XXX/XXXX-XX
    return `${part1}.${part2}-${part3}`;
  };
  
  export default formatCEP;