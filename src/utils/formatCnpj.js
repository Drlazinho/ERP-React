const formatCnpj = (valor) => {
  if (!valor) return '';

  const primeiro = valor.slice(0, 2);
  const segundo = valor.slice(2, 5);
  const terceiro = valor.slice(5, 8);
  const quarto = valor.slice(8, 12);
  const quinto = valor.slice(12, 14);

  return [`${primeiro}.${segundo}.${terceiro}/${quarto}-${quinto}`];
  // return [primeiro, segundo, terceiro, quarto,quinto ].join(subs);
  // return [primeiro + "." + segundo + "." + terceiro + "/" + quarto + "-" + quinto];
};

export default formatCnpj;
