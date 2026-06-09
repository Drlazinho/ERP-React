export const formatMembroNome = (value) => {
    if(!value) return '---';
    
    const newNome = value.replaceAll('/', ' | ');
    return newNome;

}

