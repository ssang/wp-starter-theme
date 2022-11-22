/** @type {import('vite').UserConfig} */
var path = require('path');

import { defineConfig } from 'vite'

export default defineConfig({
    appType: 'mpa',
    base: './',
    build: {
        manifest: true,
        rollupOptions: {
            input: {
                app: 'resources/assets/js/app.js',
                editor: 'resources/assets/js/editor.js'
            },
            output: {
                entryFileNames: (entryInfo) => {
                    if (entryInfo.facadeModuleId.includes('editor')) {
                        return '[name].js';
                    }

                    return '[name].[hash].js';
                },
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.includes('editor')) {
                        return 'assets/[name][extname]';
                    }

                    return 'assets/[name].[hash][extname]';
                }
            }
        },
        watch: {
            exclude: 'node_modules/**',
            include: ['app/**/*.php', 'resources/**', 'tailwind.config.js']
        }
    },
    server: {
    },
    resolve: {
        alias: {
          '@': path.resolve(__dirname, 'resources'),
        }
    }
})