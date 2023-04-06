/** @type {import('vite').UserConfig} */
var path = require('path');

import create_config from '@kucrut/vite-for-wp';

export default create_config(
  {
    app: './resources/assets/js/app.js',
    editor: './resources/assets/js/editor.js'
  },
  'dist',
  {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'resources'),
        '~': path.resolve(__dirname)
      }
    },
    optimizeDeps: {
      include: [
          'tailwind.config.js',
      ]
    },
    build: {
      commonjsOptions: {
        include: ['tailwind.config.js', 'node_modules/**'],
      },
    },
  }
);