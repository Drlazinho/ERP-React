const converterDateCatoBr = (value) => {
    const year = value.substring(0,4) 
    const day = value.substring(8,10)
    const month = value.substring(5,7)
    const newDateFormatString = day+'/'+month+'/'+year

    return newDateFormatString;
}

export default converterDateCatoBr;
