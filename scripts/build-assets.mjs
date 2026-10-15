import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import products from '../src/data/products.json' with { type: 'json' };

const root = path.resolve(import.meta.dirname, '..');
const output = path.join(root, 'public', 'assets');
const dirs = (await fs.readdir(root, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && entry.name.startsWith('AXIA '));
const originals = [];
for (const dir of dirs) {
  const parent = path.join(root, dir.name);
  for (const inner of await fs.readdir(parent, { withFileTypes: true })) {
    if (!inner.isDirectory()) continue;
    for (const file of await fs.readdir(path.join(parent, inner.name))) {
      if (file.toLowerCase().endsWith('.png')) originals.push(path.join(parent, inner.name, file));
    }
  }
}

const used = new Set();
const jobs = [];
for (const product of products) {
  const matched = originals.filter((file) => product.photoPrefixes.some((prefix) => path.basename(file).startsWith(prefix)));
  if (matched.length !== product.imageCount) throw new Error(`${product.slug}: expected ${product.imageCount} images, found ${matched.length}`);
  const indexed = new Map();
  for (const file of matched) {
    const match = path.basename(file).match(/\((\d+)\)\.png$/i);
    if (!match) throw new Error(`Cannot read image index: ${file}`);
    const index = Number(match[1]);
    if (indexed.has(index) || used.has(file)) throw new Error(`Duplicate image: ${file}`);
    indexed.set(index, file);
    used.add(file);
  }
  for (let index = 1; index <= product.imageCount; index++) {
    const file = indexed.get(index);
    if (!file) throw new Error(`${product.slug}: missing angle ${index}`);
    jobs.push({ product, index, file });
  }
}
if (used.size !== originals.length) throw new Error(`${originals.length - used.size} source images were not assigned to a product`);

await fs.mkdir(output, { recursive: true });
const queue = [...jobs];
await Promise.all(Array.from({ length: 4 }, async () => {
  while (queue.length) {
    const job = queue.shift();
    const destination = path.join(output, 'catalog', job.product.slug);
    await fs.mkdir(destination, { recursive: true });
    const stem = String(job.index).padStart(2, '0');
    for (const width of [480, 1200]) {
      await Promise.all([
        sharp(job.file).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(destination, `${stem}-${width}.webp`)),
        sharp(job.file).rotate().resize({ width, withoutEnlargement: true }).avif({ quality: 48, effort: 2 }).toFile(path.join(destination, `${stem}-${width}.avif`)),
      ]);
    }
  }
}));

await sharp(path.join(root, 'brand', 'logo-axia-original.png'))
  .extract({ left: 1220, top: 390, width: 1450, height: 660 })
  .png()
  .toFile(path.join(output, 'logo-axia.png'));
await Promise.all([
  sharp(path.join(root, 'brand', 'hero-campaign-desktop.png'))
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 84 })
    .toFile(path.join(output, 'hero-campaign-desktop.webp')),
  sharp(path.join(root, 'brand', 'hero-campaign-mobile.png'))
    .resize({ width: 900, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(output, 'hero-campaign-mobile.webp')),
]);
console.log(`Prepared ${jobs.length} source images and ${jobs.length * 4} responsive catalog files.`);
