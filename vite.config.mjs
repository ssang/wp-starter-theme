import { v4wp } from '@kucrut/vite-for-wp';
import { wp_scripts } from '@kucrut/vite-for-wp/plugins';
import { resolve } from 'node:path';

export default {
  plugins: [
    v4wp({
      input: {
        app: './resources/assets/js/app.ts',
        editor: './resources/assets/js/editor.ts'
      },
      outDir: 'dist'
    }),
    wp_scripts()
  ],
  server: {
    watch: {
      ignored: ['**/vendor/**']
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'resources'),
      '~': resolve(__dirname),
      'tailwind.config.ts': resolve(__dirname, 'tailwind.config.ts')
    }
  },
  optimizeDeps: {
    include: ['tailwind.config.ts']
  },
  build: {
    commonjsOptions: {
      include: ['./tailwind.config.ts', /node_modules/]
    }
  }
};
