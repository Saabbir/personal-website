// Recompresses the raw images in public/images in place. Everything here is
// tracked in git, so the originals are recoverable with `git checkout`.
//
//   node scripts/optimize-images.mjs          # report only
//   node scripts/optimize-images.mjs --write  # actually rewrite
import sharp from 'sharp';
import { readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const WRITE = process.argv.includes('--write');
const ROOT = 'public/images';
// Screenshots are shown at most ~1000px wide in the case study layout;
// anything past 1800 is invisible detail the visitor still downloads.
const MAX_WIDTH = 1800;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

let before = 0;
let after = 0;

for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
  if (file.includes('/og/')) continue; // generated separately, already small

  const original = (await stat(file)).size;
  const image = sharp(file);
  const meta = await image.metadata();

  let pipeline = image;
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  pipeline = ext === '.png'
    ? pipeline.png({ compressionLevel: 9, palette: true, quality: 82 })
    : pipeline.jpeg({ quality: 78, mozjpeg: true });

  const buf = await pipeline.toBuffer();
  before += original;

  // Never write a file that got bigger.
  if (buf.length < original) {
    after += buf.length;
    const pct = Math.round((1 - buf.length / original) * 100);
    console.log(
      `${pct.toString().padStart(3)}%  ${(original / 1024).toFixed(0).padStart(5)}K -> ${(buf.length / 1024).toFixed(0).padStart(5)}K  ${file}`,
    );
    if (WRITE) await writeFile(file, buf);
  } else {
    after += original;
  }
}

console.log(
  `\n${WRITE ? 'Rewrote' : 'Would save'}: ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB`,
);
if (!WRITE) console.log('Dry run. Pass --write to apply.');
