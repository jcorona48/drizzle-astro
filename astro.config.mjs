// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  adapter: vercel(),
  output: 'server',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      strategy: 'pathname',
      prefixDefaultLocale: true,
    },
  },
});
