import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// --- Configuración ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, 'tokens.json');
const OUTPUT_FILE = path.join(__dirname, 'dist', 'tokens.css');
const FONTS_DIR = path.join(__dirname, 'dist', 'fonts');
// -------------------

// Utilidades de saneamiento y resolución de referencias
const sanitizeKey = (key) => key.toLowerCase().replace(/[\s/,\.]/g, '-');

// Dado un prefijo como "typescale-desktop-static-display-h1",
// devuelve la base hasta "-static" inclusive: "typescale-desktop-static"
const getStaticBasePrefix = (prefix) => {
  const idx = prefix.lastIndexOf('-static');
  if (idx === -1) return null;
  return prefix.slice(0, idx + '-static'.length);
};

// Resuelve referencias del estilo {Static.Font.Family} a var(--<scope>-static-font-family)
const resolveReference = (rawValue, prefix) => {
  if (typeof rawValue !== 'string') return rawValue;
  const trimmed = rawValue.trim();
  if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) return rawValue;
  const inner = trimmed.slice(1, -1).trim();
  // Solo soportamos referencias relativas que empiezan con Static.
  const parts = inner.split('.').map((p) => p.trim().toLowerCase());
  if (parts[0] !== 'static') return rawValue; // dejar tal cual si no es Static
  const base = getStaticBasePrefix(prefix);
  if (!base) return rawValue; // si no hay base, no podemos resolver
  const rest = parts.slice(1).join('-');
  const varName = `--${base}-${sanitizeKey(rest)}`;
  return `var(${varName})`;
};

// Función para aplanar el JSON y convertirlo a variables CSS
// Además, recolecta variables de color para generar utilidades.
function processTokens(obj, prefix = '', collect = { colorVars: new Map(), radiusVars: new Map() }) {
  let cssVariables = '';
  for (const key in obj) {
    // Clave saneada para CSS (ej. "Primitivas/Mode 1" -> "primitivas-mode-1")
    const newPrefix = prefix 
      ? `${prefix}-${sanitizeKey(key)}`
      : sanitizeKey(key);

    const value = obj[key];

    // Si encontramos una propiedad "value", es un token final
    if (typeof value === 'object' && value !== null && 'value' in value) {
      const outputValue = resolveReference(value.value, newPrefix);
      const varName = `--${newPrefix}`;
      cssVariables += `  ${varName}: ${outputValue};\n`;
      // Detectar variables de color por convención del nombre
      // Coincide tanto --colors-...-color-<suffix> como --color-<suffix>
      const colorIdx = varName.indexOf('-color-');
      if (colorIdx !== -1) {
        // suffix luego de "-color-"
        const suffix = varName.slice(colorIdx + '-color-'.length);
        // Preferir alias cortos (comienzan con --color-)
        const isAliasShort = varName.startsWith('--color-');
        const existing = collect.colorVars.get(suffix);
        if (!existing || (isAliasShort && !existing.startsWith('--color-'))) {
          collect.colorVars.set(suffix, varName);
        }
      }
      // Detectar variables de radius y recolectar sufijo
      const radiusMatch = varName.match(/^--.*-corner-radius-radius-(.+)$/);
      if (radiusMatch) {
        const radiusSuffix = radiusMatch[1]; // ej: extra-extra-large
        // Guardar el mapeo hacia el nombre largo para crear alias después
        if (!collect.radiusVars.has(radiusSuffix)) {
          collect.radiusVars.set(radiusSuffix, varName);
        }
      }
    } 
    // Si es otro objeto, seguimos explorando
    else if (typeof value === 'object' && value !== null) {
      cssVariables += processTokens(value, newPrefix, collect);
    }
  }
  return cssVariables;
}

// --- Script Principal ---
async function buildTokens() {
  try {
    // 1. Asegurarse que el directorio de salida exista
    await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
    await fs.mkdir(FONTS_DIR, { recursive: true });

    // 2. Leer y parsear el archivo JSON de tokens
    const jsonContent = await fs.readFile(INPUT_FILE, 'utf-8');
    const tokens = JSON.parse(jsonContent);

  // 3. Procesar los tokens para generar las variables y recolectar colores
  const collect = { colorVars: new Map(), radiusVars: new Map() };
  const cssVarsContent = processTokens(tokens, '', collect);

    // 3.1. Copiar fuentes desde @fontsource/poppins hacia dist/fonts
    // Usaremos la versión variable si está disponible; si no, caemos a pesos fijos comunes
  const nodeModules = path.resolve(__dirname, '..', '..', 'node_modules');
    const fontsourceBase = path.join(nodeModules, '@fontsource', 'poppins');
    let fontFaceCss = '';
    try {
      // Intentar variable font
      const varDir = path.join(nodeModules, '@fontsource-variable', 'poppins');
      const varFile = path.join(varDir, 'files', 'poppins-latin-wght-normal.woff2');
      const varTarget = path.join(FONTS_DIR, 'poppins-variable-latin-wght-normal.woff2');
      await fs.copyFile(varFile, varTarget);
      fontFaceCss += `@font-face{font-family:"Poppins";font-style:normal;font-weight:100 900;src:local("Poppins"),url("./fonts/poppins-variable-latin-wght-normal.woff2") format("woff2");font-display:swap;}
`;
    } catch {
      // Fallback a pesos fijos 400,500,600,700
      const weights = [400, 500, 600, 700];
      for (const w of weights) {
        const file = path.join(fontsourceBase, 'files', `poppins-latin-${w}-normal.woff2`);
        const target = path.join(FONTS_DIR, `poppins-latin-${w}-normal.woff2`);
        try {
          await fs.copyFile(file, target);
          fontFaceCss += `@font-face{font-family:"Poppins";font-style:normal;font-weight:${w};src:local("Poppins"),url("./fonts/poppins-latin-${w}-normal.woff2") format("woff2");font-display:swap;}
`;
        } catch {
          // si falta algún peso, lo omitimos silenciosamente
        }
      }
    }

    // 3.2. Generar alias de color y radius para DX simplificada
    let aliasVars = '';
    for (const [suffix, longVar] of collect.colorVars) {
      aliasVars += `  --color-${suffix}: var(${longVar});\n`;
    }
    for (const [suffix, longVar] of collect.radiusVars) {
      aliasVars += `  --radius-${suffix}: var(${longVar});\n`;
    }

    // 3.3. Generar utilidades de color (text/bg/border) + variantes de opacidad
    const opacities = [10,20,30,40,50,60,70,80,90];
  let utilities = '';
    for (const [suffix] of collect.colorVars) {
      // Clases base
      utilities += `.text-${suffix}{color:var(--color-${suffix});}\n`;
      utilities += `.bg-${suffix}{background-color:var(--color-${suffix});}\n`;
      utilities += `.border-${suffix}{border-color:var(--color-${suffix});}\n`;
      // Variantes de opacidad mediante color-mix con transparente
      for (const o of opacities) {
        const esc = `\\/${o}`; // escapar la barra para el selector CSS
        utilities += `.text-${suffix}${esc}{color:color-mix(in srgb,var(--color-${suffix}) ${o}%, transparent);}\n`;
        utilities += `.bg-${suffix}${esc}{background-color:color-mix(in srgb,var(--color-${suffix}) ${o}%, transparent);}\n`;
        utilities += `.border-${suffix}${esc}{border-color:color-mix(in srgb,var(--color-${suffix}) ${o}%, transparent);}\n`;
      }
    }

    // 3.4. Generar utilidades de radius (.rounded-*) mapeadas a alias --radius-*
    // Mapeo sugerido: xs, sm, md, lg, xl, 2xl, 3xl, full
    const radiusMap = [
      'none',
      'extra-small:xs',
      'small:sm',
      'medium:md',
      'large:lg',
      'extra-large:xl',
      'extra-large-increased:2xl',
      'extra-extra-large:3xl',
      'full:full',
    ];
    for (const entry of radiusMap) {
      const [tokenSuffix, classSuffix = tokenSuffix] = entry.split(':');
      utilities += `.rounded-${classSuffix}{border-radius:var(--radius-${tokenSuffix});}\n`;
    }

    // 4. Escribir el archivo CSS final: primero @font-face, luego :root con variables + alias, y después utilidades
    const finalCss = `${fontFaceCss}:root {\n${cssVarsContent}${aliasVars}}\n\n/* Utilities generated from tokens */\n${utilities}`;
    await fs.writeFile(OUTPUT_FILE, finalCss);
    
    console.log('✅ Tokens CSS generados con éxito en', OUTPUT_FILE);
  } catch (error) {
    console.error('❌ Error generando los tokens CSS:', error);
  }
}

buildTokens();