const formatDateApi = (value)  => {
    const newDateFormatString = value.substring(0,4)+"-"+value.substring(4,6)+"-"+value.substring(6)
    return newDateFormatString;
}

export default formatDateApi;