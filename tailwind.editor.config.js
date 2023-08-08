const plugin = require('tailwindcss/plugin')
let config = require('./tailwind.config');

config.important = '.editor-styles-wrapper';

/** @type {import('tailwindcss').Config} */
module.exports = config