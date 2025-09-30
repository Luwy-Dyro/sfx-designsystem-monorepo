import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Configuración ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, 'tokens.json');
const OUTPUT_FILE = path.join(__dirname, 'dist', 'tokens.css');
// -------------------

// Función para aplanar el JSON y convertirlo a variables CSS
function processTokens(obj, prefix = '') {
  let cssVariables = '';
  for (const key in obj) {
    // Clave saneada para CSS (ej. "Primitivas/Mode 1" -> "primitivas-mode-1")
    const newPrefix = prefix 
      ? `${prefix}-${key.toLowerCase().replace(/[\s/]/g, '-')}`
      : key.toLowerCase().replace(/[\s/]/g, '-');

    const value = obj[key];

    // Si encontramos una propiedad "value", es un token final
    if (typeof value === 'object' && value !== null && 'value' in value) {
      cssVariables += `  --${newPrefix}: ${value.value};\n`;
    } 
    // Si es otro objeto, seguimos explorando
    else if (typeof value === 'object' && value !== null) {
      cssVariables += processTokens(value, newPrefix);
    }
  }
  return cssVariables;
}

// --- Script Principal ---
async function buildTokens() {
  try {
    // 1. Asegurarse que el directorio de salida exista
    await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });

    // 2. Leer y parsear el archivo JSON de tokens
    const jsonContent = await fs.readFile(INPUT_FILE, 'utf-8');
    const tokens = JSON.parse(jsonContent);

    // 3. Procesar los tokens para generar las variables
    const cssContent = processTokens(tokens);

    // 4. Escribir el archivo CSS final
    const finalCss = `:root {\n${cssContent}}\n`;
    await fs.writeFile(OUTPUT_FILE, finalCss);
    
    console.log('✅ Tokens CSS generados con éxito en', OUTPUT_FILE);
  } catch (error) {
    console.error('❌ Error generando los tokens CSS:', error);
  }
}

buildTokens();