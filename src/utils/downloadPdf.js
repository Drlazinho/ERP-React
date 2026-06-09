
export const donwloadPDF = (pdf, name) => {
  const arquivo = `data:application/pdf;base64,${pdf}`;
  const link = document.createElement('a');
  const fileName = `${name}`;
  link.href = arquivo;
  link.download = fileName;
  link.click();
};

export const donwloadGzipPDF = (pdf, name) => {
  const arquivo = `data:application/gzip;base64,${pdf}`;
  const link = document.createElement('a');
  const fileName = `${name}`;
  link.href = arquivo;
  link.download = fileName;
  link.click();
};
