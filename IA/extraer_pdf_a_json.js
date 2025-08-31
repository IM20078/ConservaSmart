import { promises as fs } from "fs";
import { createRequire } from "module";
import path from "path";

// Usar require dentro de ESM para importar librería CommonJS
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

async function extraerYGuardarComoJson(rutaPDF, rutaJson) {
  try {
    const pdfPath = path.resolve(rutaPDF);
    const jsonPath = path.resolve(rutaJson);

    console.log("📂 Leyendo PDF desde:", pdfPath);

    const dataBuffer = await fs.readFile(pdfPath);
    const data = await pdfParse(dataBuffer);

    await fs.writeFile(jsonPath, JSON.stringify({ texto: data.text }, null, 2));
    console.log("✅ Texto extraído en:", jsonPath);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

const rutaPDF = "../assets/receta.pdf";  // 👈 cambia si querés otro PDF
const rutaJson = "./json.json";

extraerYGuardarComoJson(rutaPDF, rutaJson);
