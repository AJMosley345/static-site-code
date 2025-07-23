// @ts-check
import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';

import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    markdoc(), 
    starlight({ 
      title: 'Personal Site',
      sidebar: [
        {
          label: 'Backend',
          autogenerate: { directory: 'backend' }
        }
      ]

    })
  ]
});