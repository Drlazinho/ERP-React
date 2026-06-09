export const converterParaHoras = (numero) => {
    if (!numero) return '00:00';

    let horas = Math.floor(numero / 60); // Obtém a parte inteira das horas
    let minutos = numero % 60; // Obtém os minutos restantes
  
    // Formatação para exibir sempre dois dígitos para os minutos
    minutos = minutos.toString().padStart(2, '0');
  
    return horas + ':' + minutos;
  }
  
  