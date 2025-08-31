// IA/ia.js
import { Mistral } from '@mistralai/mistralai';
import recetas from './json.json'; // Importa el archivo JSON

// Configuración inicial
const apiKey = process.env.MISTRAL_API_KEY || process.env.HUGGINGFACE_API_KEY;
const client = new Mistral({ apiKey });
const textoPDF = recetas.texto;

/**
 * Genera recetas de conservas usando una IA a partir de un ingrediente y un texto de referencia.
 * @param {string} verdura - El ingrediente principal para las recetas.
 * @returns {Promise<object | null>} Un objeto con las recetas en formato JSON o null si hay un error.
 */
export const TextIA = async (verdura) => {
  const userPrompt = `A partir del siguiente texto extraído de un PDF:
<PDF_CONTENT>
${textoPDF}
</PDF_CONTENT>

INSTRUCCIONES:
**Tarea:** Generar 4 recetas de conservas variadas y tradicionales comunes y, si es posible, dame una para celiacos y ponelo en el titulo.

**Condiciones de la receta:**
* El ingrediente principal debe ser **únicamente** "${verdura}". Si no hay información en el texto del PDF, usa tu conocimiento general gastronómico.
* Las recetas deben pertenecer a **categorías de conserva reconocidas**, como: 
  - mermeladas
  - confituras
  - almíbares
  - escabeches
  - encurtidos en vinagre
  - salsas en conserva
  - deshidratados en conserva
* ❌ No inventar recetas poco realistas o no tradicionales (ejemplo: "yerba mate en escabeche", "yerba mate confitada"), prefiero que me digas "No se encontraron recetas para {verduras}". 
* Cada receta debe tener un **paso a paso detallado y claro** (mínimo 6 pasos) e incluir un criterio para verificar si la preparación está terminada.
* Indica si la receta es apta para celíacos.
* En confituras, usar **azúcar invertido** en los pasos, pero no en el título y explicar que es y como se hace.
* En almíbares, detallar el proceso para **3 concentraciones diferentes** (baja, media, alta), explicando la diferencia de cantidad de azúcar y cómo afecta el paso a paso. No incluir las concentraciones en el título.

**Formato de salida:**
* La respuesta debe ser **únicamente** un objeto JSON válido.
* No incluir texto adicional, formato de negrita, o cualquier otro tipo de salida fuera del JSON.

**Información de seguridad y validación:**
* En el campo "cuidados", incluir la frase:  
  "En la escuela Los Corralitos-4025 se hacen análisis de: brix o pH, según la receta. No en todas las recetas hace falta medir Bx°."
* Además, explicar los riesgos de seguridad alimentaria más comunes (ej. **botulismo**) y cómo la receta los previene, detallando las soluciones (uso de ácido, tratamiento térmico adecuado, sellado hermético).

FORMATO JSON:
{
  "recetas": [
    {
      "imagen": {
        "url": "..."      
      },
      "id": "número_único",
      "nombre": "título_de_la_receta",
      "descripcion": "descripción_corta",
      "tabla_nutricional": {
        "calorias": "...",
        "grasas": "...",
        "proteinas": "...",
        "carbohidratos": "..."
      },
      "ingredientes": {
        "ingrediente_1": "cantidad",
        "ingrediente_2": "cantidad",
        "...": "..."
      },
      "pasos": {
        "1": "paso_1_detallado",
        "2": "paso_2_detallado",
        "...": "..."
      },
      "Cuidados": {
        "pH": "Cómo cuidarlo, medirlo en casa, a cuánto debe estar según la conserva y por qué",
        "Otros": "..."
      }  
    }
  ]
}

`;

  try {
    const chatResponse = await client.chat.complete({
      model: 'mistral-small-2506',
      messages: [{ role: 'user', content: userPrompt }],
    });

    const rawContent = chatResponse.choices[0].message.content;

    try {
      let jsonString = rawContent.trim();
      // Elimina el bloque de código markdown si existe
      if (jsonString.startsWith('```json')) {
        jsonString = jsonString.substring(7, jsonString.lastIndexOf('```')).trim();
      }

      // Limpia cualquier carácter de control no deseado
      const cleanedString = jsonString.replace(/[\u0000-\u001F]/g, '');

      // Intenta parsear el JSON
      const data = JSON.parse(cleanedString);
      return data;
    } catch (jsonError) {
      console.error('Error al parsear el JSON de la IA:', jsonError);
      return null;
    }
  } catch (error) {
    console.error('Error durante la conversación con la IA:', error);
    return null;
  }
};

/**
 * Analiza una imagen para identificar un alimento.
 * @param {string} imageUrl - URL de la imagen a analizar.
 * @returns {Promise<string | null>} El nombre del alimento o null si no se detecta.
 */
export const analizarImagen = async (imageUrl) => {
  try {
    const chatResponse = await client.chat.complete({
      model: 'pixtral-12b',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text:'Instrucciones: Analiza la imagen proporcionada. Identifica el ingrediente principal y determina si es carne de conejo, cerdo, vaca o un tipo de verdura. Si es una verdura, nombra el tipo (ej. "tomate", "lechuga", "zapallo italiano", "manzana verde", "manzana roja").La respuesta debe ser una sola palabra y no debe contener texto adicional ni explicaciones.Considera que la calidad de la imagen puede no ser óptima.'

            },
            {
              type: 'image_url',
              imageUrl: imageUrl,
            },
          ],
        },
      ],
    });

    const description = chatResponse.choices[0].message.content;
   // console.log('Descripción de la IA:', description);
    return description;
  } catch (error) {
    console.error('Error durante el análisis de imagen con la IA:', error);
    return null;
  }
};