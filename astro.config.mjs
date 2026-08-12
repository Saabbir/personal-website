import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function customSitemapIntegration() {
  return {
    name: 'custom-sitemap',
    hooks: {
      'astro:build:done': async ({ dir, pages }) => {
        const siteUrl = 'https://saabbir.github.io';
        const pageUrls = pages.map((p) => {
          const pathname = p.pathname.startsWith('/') ? p.pathname.slice(1) : p.pathname;
          return `${siteUrl}/${pathname}`;
        });
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pageUrls.map((url) => `  <url><loc>${url}</loc><lastmod>${new Date().toISOString().split('T')[0]}</lastmod></url>`).join('\n')}
</urlset>`;

        const distDir = fileURLToPath(dir);
        const sitemapPath = path.join(distDir, 'sitemap-index.xml');
        fs.writeFileSync(sitemapPath, xml);
        console.log(`[sitemap] Generated sitemap-index.xml with ${pageUrls.length} pages`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://saabbir.github.io',
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
