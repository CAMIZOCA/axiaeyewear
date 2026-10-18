import fs from 'node:fs/promises';
import path from 'node:path';
import products from '../src/data/products.json' with { type: 'json' };

const dist = path.resolve(import.meta.dirname, '..', 'dist');
async function filesIn(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const full = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(full) : [full];
  }));
  return nested.flat();
}
const files = await filesIn(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const missing = [];
for (const htmlFile of htmlFiles) {
  const html = await fs.readFile(htmlFile, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="(\/[^"#?]+)(?:[?#][^"]*)?"/g)) {
    const url = decodeURIComponent(match[1]);
    const candidate = path.join(dist, url, url.endsWith('/') ? 'index.html' : '');
    try { await fs.access(candidate); }
    catch { missing.push(`${path.relative(dist, htmlFile)} → ${url}`); }
  }
}
if (missing.length) throw new Error(`Missing local routes/assets:\n${missing.join('\n')}`);
const catalog = files.filter((file) => file.includes(`${path.sep}assets${path.sep}catalog${path.sep}`));
const expectedImages = products.flatMap((product) => Array.from({ length: product.imageCount }, (_, index) =>
  [480, 1200].flatMap((width) => ['avif', 'webp'].map((format) =>
    path.join(dist, 'assets', 'catalog', product.slug, `${String(index + 1).padStart(2, '0')}-${width}.${format}`)
  ))
)).flat();
if (catalog.length !== expectedImages.length || expectedImages.some((file) => !catalog.includes(file))) {
  throw new Error(`Catalog variants must match the assigned product images exactly; expected ${expectedImages.length}, found ${catalog.length}`);
}
for (const product of products) {
  const html = await fs.readFile(path.join(dist, 'productos', product.slug, 'index.html'), 'utf8');
  const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const schema = schemas.find((item) => item['@type'] === 'Product');
  if (!schema || schema.name !== `AXIA ${product.title}` || schema.image.length !== product.imageCount || schema.image.some((url) => !url.includes(`/catalog/${product.slug}/`))) {
    throw new Error(`${product.slug}: product page metadata does not match its own catalog images`);
  }
  if (product.imageCount === 1 && html.includes('Desliza para ver más fotos')) {
    throw new Error(`${product.slug}: a single-image product must not suggest more gallery images`);
  }
}
console.log(`Verified ${htmlFiles.length} HTML pages and ${catalog.length} catalog image files; all local links resolve.`);
