// Run with Node + sharp (development tool only). Originals remain untouched.
import sharp from 'sharp';
import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const output = path.join(root, 'public/images/optimized');
await mkdir(output, { recursive: true });
const sources = (await readdir(path.join(root, 'public/images')))
  .filter(name => /\.(png|jpe?g)$/.test(name) && name !== 'social.png');
for (const name of await readdir(path.join(root, 'public/images/score-counter'))) {
  if (name.startsWith('score-') && name.endsWith('.png')) sources.push(`score-counter/${name}`);
}
const manifest = {};
for (const name of sources.sort()) {
  const input = path.join(root, 'public/images', name);
  const { width, height } = await sharp(input).metadata();
  const widths = name.startsWith('exp_') ? [224, 448, 672] : name.includes('score-counter/score-') && !name.endsWith('score-value.png') && !name.endsWith('score-reviews-hero.png') ? [160, 320, 480] : [576, 1152, 1728];
  const variants = { avif: [], webp: [] };
  for (const format of Object.keys(variants)) {
    for (const size of [...new Set(widths.map(w => Math.min(w, width)))]) {
      const pipeline = sharp(input).resize({ width: size, withoutEnlargement: true });
      const data = await (format === 'avif' ? pipeline.avif({ quality: 65, effort: 6, chromaSubsampling: '4:4:4' }) : pipeline.webp({ quality: 88, effort: 6 })).toBuffer();
      const hash = createHash('sha256').update(data).digest('hex').slice(0, 10);
      const file = `${path.parse(name).name}-${size}-${hash}.${format}`;
      await writeFile(path.join(output, file), data);
      variants[format].push({ src: `/images/optimized/${file}`, width: size, bytes: data.length });
    }
  }
  manifest[`/images/${name}`] = { width, height, ...variants };
}
await writeFile(path.join(root, 'src/data/responsive-images.json'), JSON.stringify(manifest, null, 2) + '\n');
// Keep the original 256px icon for source use; deliver appropriately sized icons.
await sharp(path.join(root, 'public/favicon.png')).resize(48, 48).png({ palette: true, effort: 10 }).toFile(path.join(root, 'public/favicon-48.png'));
await sharp(path.join(root, 'public/favicon.png')).resize(180, 180).png({ palette: true, effort: 10 }).toFile(path.join(root, 'public/apple-touch-icon.png'));
console.log(`Encoded ${sources.length} images with responsive AVIF/WebP variants.`);
