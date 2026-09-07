import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
        const pageUrls = [...new Set(
          pages
            .map((p) => p.pathname || '')
            .filter(isIndexablePathname)
            .map((pathname) => toSitemapUrl(siteUrl, pathname))
        )].sort();

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pageUrls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
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
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
});
