import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// astro:content isn't importable from the config, so read the frontmatter
// dates straight off disk to give each content URL a real <lastmod>.
function contentLastmods(siteUrl) {
  const map = new Map();
  const collections = [
    ['articles', 'blog'],
    ['work', 'work'],
    ['snippets', 'snippets'],
  ];

  for (const [collection, prefix] of collections) {
    const dir = path.join('src', 'content', collection);
    if (!fs.existsSync(dir)) continue;

    for (const file of fs.readdirSync(dir)) {
      if (!/\.mdx?$/.test(file)) continue;
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!match) continue;

      const dateLine = match[1].match(/^createdAt:\s*(.+)$/m);
      if (!dateLine) continue;

      const iso = frontmatterDateToIso(dateLine[1].trim().replace(/^['"]|['"]$/g, ''));
      if (!iso) continue;

      const slug = file.replace(/\.mdx?$/, '');
      map.set(`${siteUrl}/${prefix}/${slug}/`, iso);
    }
  }

  return map;
}

// Frontmatter dates come in three shapes: "01/09/2021", "12 January 2026"
// and ISO. Mirrors toIsoDate() in src/utils/seo.ts.
function frontmatterDateToIso(value) {
  const dmy = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dmy) {
    const [, day, month, year] = dmy;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString().slice(0, 10);
}

function isIndexablePathname(pathname) {
  const normalized = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  if (normalized === '404' || normalized === '404.html') return false;
  if (normalized.endsWith('.xml')) return false;
  return true;
}

function toSitemapUrl(siteUrl, pathname) {
  const cleaned = pathname.replace(/^\/+/, '');
  if (!cleaned || cleaned === 'index.html') return `${siteUrl}/`;
  const withSlash = cleaned.endsWith('/') ? cleaned : `${cleaned}/`;
  return `${siteUrl}/${withSlash}`;
}

function customSitemapIntegration() {
  return {
    name: 'custom-sitemap',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const siteUrl = 'https://saabbir.com';

        const lastmods = contentLastmods(siteUrl);

        const pageUrls = [...new Set(
          pages
            .map((p) => p.pathname || '')
            .filter(isIndexablePathname)
            .map((pathname) => toSitemapUrl(siteUrl, pathname))
        )].sort();

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pageUrls.map((url) => {
  const lastmod = lastmods.get(url);
  return lastmod
    ? `  <url><loc>${url}</loc><lastmod>${lastmod}</lastmod></url>`
    : `  <url><loc>${url}</loc></url>`;
}).join('\n')}
</urlset>
`;

        const distDir = fileURLToPath(dir);
        fs.writeFileSync(path.join(distDir, 'sitemap-index.xml'), xml);
        console.log(`[sitemap] Generated sitemap-index.xml with ${pageUrls.length} pages`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://saabbir.com',
  output: 'static',
  integrations: [
    mdx(),
    customSitemapIntegration(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  vite: {
    // Avoid the root-owned leftover in node_modules/.vite that crashes Astro's logger.
    cacheDir: 'node_modules/.astro-vite',
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
});
