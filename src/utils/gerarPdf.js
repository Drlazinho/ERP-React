import html2canvas from 'html2canvas';
import jsPdf from 'jspdf';

export const gerarPdf = (html, nome) => {
  exportAsPdf(`${nome} ${new Date().toLocaleDateString()}`, html);
};

const exportAsPdf = (pdfName, html) => {
  html2canvas(html, {
    logging: true,
    letterRendering: 1,
    useCORS: true,
    scale: 1.5,
  }).then((canvas) => {
    const imgWidth = 200;
    const pageHeight = 297; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const imgData = canvas.toDataURL('image/png', 1.0);

    const pdf = new jsPdf('p', 'mm', 'a4');
    let position = 0;

    if (imgHeight > pageHeight) {
      let y = 0;
      while (y < imgHeight) {
        pdf.addImage(imgData, 'PNG', 5, position - y, imgWidth, imgHeight);
        y += pageHeight;
        if (y < imgHeight) {
          pdf.addPage();
        }
      }
    } else {
      pdf.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
    }

    pdf.save(pdfName);
  });
};
