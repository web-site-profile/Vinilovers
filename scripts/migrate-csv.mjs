// scripts/migrate-csv.mjs
// Lee el CSV de Airtable y genera archivos .md en src/content/productos/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const CSV_PATH = path.join(ROOT, 'Productos-Grid view.csv');
const OUTPUT_DIR = path.join(ROOT, 'src', 'content', 'productos');

// Asegurar que el directorio de salida existe
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ── Parser CSV robusto (maneja campos con comas entre comillas) ────────────
function parseCSV(text) {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const headers = parseLine(lines[0]);
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const values = parseLine(line);
    const row = {};
    headers.forEach((h, idx) => { row[h.trim()] = (values[idx] || '').trim(); });
    rows.push(row);
  }
  return rows;
}

function parseLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

// ── Conversiones ───────────────────────────────────────────────────────────

// "$161,00" → 161.00
function parsePrecio(str) {
  const clean = str.replace(/\$/, '').replace(/\./g, '').replace(',', '.').trim();
  return parseFloat(clean) || 0;
}

// "checked" / "" → true / false
function parseBool(str) {
  return str.trim().toLowerCase() === 'checked';
}

// Extraer solo el nombre del archivo de imagen (antes del espacio + URL)
// Ej: "DV00001 - DISCO VINIL KANY GARCIAS.webp (https://...)" → "DV00001 - DISCO VINIL KANY GARCIAS.webp"
function parseImageName(str) {
  const match = str.match(/^(.+?\.(webp|jpg|jpeg|png))\s*(?:\(|$)/i);
  return match ? match[1].trim() : str.trim();
}

// Generar slug de nombre de archivo
function toSlug(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quitar acentos
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// ── Ejecutar migración ─────────────────────────────────────────────────────
const csvText = fs.readFileSync(CSV_PATH, 'utf-8');
const rows = parseCSV(csvText);

let created = 0;
let skipped = 0;
const log = [];

for (const row of rows) {
  const nombre = row['Nombre']?.trim();
  if (!nombre) { skipped++; continue; }

  const title    = nombre;
  const artista  = (row['Artista'] || '').trim();
  const precio   = parsePrecio(row['Precio'] || '0');
  const categoria = (row['Categoría'] || 'DISCO').trim();
  const activo   = parseBool(row['Activo']);
  const destacado = parseBool(row['Destacado']);
  const stock    = (row['Stock'] || 'Disponible').trim() || 'Disponible';
  const desc     = (row['Descripción'] || '').trim();
  const notas    = (row['Notas internas'] || '').trim();
  const body     = [desc, notas].filter(Boolean).join('\n\n');

  // Imagen
  const imageName = parseImageName(row['Imagen'] || '');
  const image = imageName ? `/images/uploads/${imageName}` : '/images/uploads/placeholder.jpg';

  // Slug del archivo = ID del producto en minúsculas (robusto y único)
  const idProducto = (row['ID del producto'] || '').trim().replace(/\s/g, '');
  const slug = idProducto ? idProducto.toLowerCase() : toSlug(nombre);
  const filePath = path.join(OUTPUT_DIR, `${slug}.md`);

  // Generar frontmatter YAML
  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `artista: "${artista.replace(/"/g, '\\"')}"`,
    `precio: ${precio}`,
    `categoria: "${categoria}"`,
    `image: "${image}"`,
    `activo: ${activo}`,
    `destacado: ${destacado}`,
    `stock: "${stock}"`,
    '---',
    '',
    body,
  ].join('\n');

  fs.writeFileSync(filePath, frontmatter, 'utf-8');
  log.push(`✅ ${slug}.md — ${title} (${artista})`);
  created++;
}

console.log(`\n🎵 Migración completada: ${created} productos generados, ${skipped} omitidos.\n`);
log.forEach(l => console.log(l));
