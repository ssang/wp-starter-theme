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
            }
        }
    }
);