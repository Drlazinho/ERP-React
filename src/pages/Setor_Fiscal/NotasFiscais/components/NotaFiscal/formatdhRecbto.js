const formatdhRecbto = (value) => {
    if (!value) return '';   
    // Extrai os grupos de dígitos do CNPJ
    const ano = value.slice(0, 4);
    const mes = value.slice(5, 7);
    const dia = value.slice(8, 10);
    const hora = value.slice(11, 13);
    const minutos = value.slice(14, 16);
    const segundo = value.slice(17, 19);
  
    // Retorna o CNPJ formatado no formato XX.XXX.XXX/XXXX-XX
    return `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundo}`;
  };
  
  export default formatdhRecbto;
