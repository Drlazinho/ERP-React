const formatCnpj = (cnpj) => {
    if (!cnpj) return '';
  
    // Remove todos os caracteres que não sejam dígitos
    const cleanedCNPJ = cnpj.replace(/\D/g, '');
  
    // Verifica se o CNPJ limpo tem pelo menos 14 dígitos
    if (cleanedCNPJ.length !== 14) return '';
  
    // Extrai os grupos de dígitos do CNPJ
    const part1 = cleanedCNPJ.slice(0, 2);
    const part2 = cleanedCNPJ.slice(2, 5);
    const part3 = cleanedCNPJ.slice(5, 8);
    const part4 = cleanedCNPJ.slice(8, 12);
    const part5 = cleanedCNPJ.slice(12);
  
    // Retorna o CNPJ formatado no formato XX.XXX.XXX/XXXX-XX
    return `${part1}.${part2}.${part3}/${part4}-${part5}`;
  };
  
  export default formatCnpj;