export function dateToTimestamp(dateString) {
    // Divide a string da data em dia, mês e ano
    const [day, month, year] = dateString.split("/");
  
    // Converte os componentes para números inteiros
    const dayInt = parseInt(day);
    const monthInt = parseInt(month);
    const yearInt = parseInt(year);
  
    // Cria um objeto Date
    const date = new Date(yearInt, monthInt - 1, dayInt);
  
    // Converte o objeto Date para um timestamp (milissegundos desde 1º de janeiro de 1970 em UTC)
    const timestamp = date.getTime();
  
    return timestamp;
  }