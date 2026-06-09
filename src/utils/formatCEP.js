const formatCEP = (valor) => {
    if (!valor) return '';
  
    const primeiro = valor.slice(0, 5);
    const segundo = valor.slice(5, 8);
  
    return [`${primeiro}-${segundo}`];
    // return [primeiro, segundo, terceiro, quarto,quinto ].join(subs);
    // return [primeiro + "." + segundo + "." + terceiro + "/" + quarto + "-" + quinto];
  };
  
  export default formatCEP;
  