const fs = require('fs');
const pdfParse = require('pdf-parse');

// Lee y extrae texto de un PDF local
export async function extraerTextoPDF(rutaPDF) {
    const dataBuffer = fs.readFileSync(rutaPDF);
    const data = await pdfParse(dataBuffer);
    return data.text;
}
