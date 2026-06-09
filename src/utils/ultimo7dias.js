export const Ultimo7Dias = () => {
  const data7dias = [];

  for (let i = 0; i < 7; i++) {
    const formatter = Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
    });

    const hoje = new Date();
    const diasAnteriores = new Date(hoje.getTime());
    diasAnteriores.setDate(hoje.getDate() - i);
    data7dias.unshift(formatter.format(diasAnteriores));
  }
};


//função para trazer valores do último mês
export const UltimoMes = () => {
  const dataMesAnterior= [];

  for (let i=0; i < 12; i++){
    const formatter = Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'long',
    });
    
    const hoje = new Date();
    const mesesAnteriores = new Date(hoje.getTime());
    mesesAnteriores.setDate(hoje.getDate()-i);
    dataMesAnterior.unshift(formatter.format(mesesAnteriores));

  }
};
