const formatDateInput = (value) => {
    const newDateFormatString = value.replace(/-/g, "")

    return newDateFormatString;
}

export default formatDateInput;

export const formatCondPgto = (value) => {
    const newFormatCondPgto = value.replace(/,/g, "  ")

    return newFormatCondPgto;
}

export const formatDateVisualFixColetaEntrega = (value) => {
    if (!value) return '0001-01-01';
    if (value.charAt(4) === '-') return value

    const year = value.slice(0, 4);
    const month = value.slice(4, 6);
    const day = value.slice(6, 8);

    return [year, month, day].join('-');
}

export const formatDateSendApi = (value) => {
    const formatado = value.toISOString().split('T')[0];

    return formatado;
}

export const formatDateVisual = (value) => {
    if (!value) return '';
    if (value.charAt(4) === '-') return value

    const year = value.slice(0, 4);
    const month = value.slice(4, 6);
    const day = value.slice(6, 8);

    return [year, month, day].join('-');
}

export const formatDateTime = (value) => {
    if (!value) return '';

    const year = value.slice(0, 4);
    const month = value.slice(5, 7);
    const day = value.slice(8, 10);

    const hours = value.slice(11, undefined);

    const date = [day, month, year].join('-')

    return date;
}

export const formatDatewithHour = (value) => {
    if (!value) return '';

    const year = value.slice(0, 4);
    const month = value.slice(5, 7);
    const day = value.slice(8, 10);

    const hours = value.slice(11, 16);

    const date = [day, month, year, hours].join('-')

    return date;
}

export const formatHourTime = (value) => {
    if (!value) return '';
    const hours = value.slice(11, 16);

    return hours;
};

export const formatDateBr = (value) => {
    if (!value) return '';

    const day = value.slice(0, 2);
    const month = value.slice(3, 5);
    const year = value.slice(6, 10);

    const date = [year, month, day].join('-')

    return date
}

export const formatDateToGraph = (value) => {
    const month = value.slice(5, 7);
    const day = value.slice(8, 10);

    const date = [day, month].join('-');
    return date
}

// Data para o Gerador de QrCode
export const formatDateBrNumber = (value) => {
    if (!value) return '';

    const day = value.slice(0, 2);
    const month = value.slice(2, 4);
    const year = value.slice(4, 8);

    const date = [day, month, year].join('-')

    return date
}