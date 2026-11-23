import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tanches.gg',
  trailingSlash: 'never',
  build: { format: 'file' },
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: (item) => ({ ...item, url: item.url.replace(/\.html$/, '').replace(/\/index$/, '/') }),
    }),
  ],
});
