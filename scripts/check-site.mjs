import fs from 'node:fs/promises';
import path from 'node:path';

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
if (catalog.length !== 404) throw new Error(`Expected 404 responsive catalog images, found ${catalog.length}`);
console.log(`Verified ${htmlFiles.length} HTML pages and ${catalog.length} catalog image files; all local links resolve.`);
