// https://tailwindcss.com/docs/configuration

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./index.php",
    "./app/**/*.php",
    "./resources/**/*.{php,vue,js}",
    "!./resources/blocks/*.js",
    "./config/acf.php"
  ],
  theme: {
    extend: {
      colors: {}, // Extend Tailwind's default colors
    },
  },
  plugins: [
    plugin(require('./tw-forms.config.js')),
    plugin(function({ addVariant }) {
      addVariant('menu', [
        '& .wp-block-navigation__container',
        '& .wp-block-navigation > ul'
      ])
      addVariant('menu-item', '& > .wp-block-navigation > ul > .wp-block-navigation-link')
      addVariant('menu-link', [
        '& > .wp-block-navigation > ul > .wp-block-navigation-link > a',
        '& .wp-block-navigation-item__content > div'
      ])
    }),
  ],
};
