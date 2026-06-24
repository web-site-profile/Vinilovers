import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  integrations: [
    tailwind({
      // Use our own global.css with @tailwind directives instead of the default
      applyBaseStyles: false,
    }),
  ],
});
