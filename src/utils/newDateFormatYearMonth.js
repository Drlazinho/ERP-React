const newDateFormatYearMonth = () => {
    const year =  new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const dateFormat = `${year}-${month}`
    return dateFormat
}

export default newDateFormatYearMonth;