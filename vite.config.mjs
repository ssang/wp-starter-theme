import { resolve } from 'node:path'
import { v4wp } from '@kucrut/vite-for-wp'

export default {
  plugins: [
    v4wp({
      input: {
        app: './resources/assets/js/app.js',
        editor: './resources/assets/js/editor.js'
      },
      outDir: 'dist'
    })
  ],
  server: {
    watch: {
      ignored: ["**/vendor/**"],
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'resources'),
      '~': resolve(__dirname),
      'tailwind.config.js': resolve(__dirname, 'tailwind.config.js'),
    }
  },
  optimizeDeps: {
    include: [
      'tailwind.config.js',
    ]
  },
  build: {
    commonjsOptions: {
      include: ['./tailwind.config.js', /node_modules/],
    },
  }
}
