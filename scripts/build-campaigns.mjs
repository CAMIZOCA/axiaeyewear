import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export async function buildCampaigns(root) {
  const destination = path.join(root, 'public/assets/campaigns');
  await fs.mkdir(destination, { recursive: true });
  for (const name of ['sunglasses', 'screen', 'clips', 'apparel']) {
    const source = path.join(root, 'brand/collection-campaigns', `${name}.png`);
    // Separate mobile framing preserves the face and leaves space for live HTML copy.
    for (const variant of ['desktop', 'mobile']) {
      const pipeline = sharp(source).rotate();
      if (variant === 'mobile') pipeline.resize(900, 500, { fit: 'cover', position: 'centre' });
      else pipeline.resize({ width: 1600, withoutEnlargement: true });
      await Promise.all([
        pipeline.clone().webp({ quality: 80 }).toFile(path.join(destination, `${name}-${variant}.webp`)),
        pipeline.clone().avif({ quality: 48, effort: 3 }).toFile(path.join(destination, `${name}-${variant}.avif`)),
      ]);
    }
  }
}
