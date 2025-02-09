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
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {}, // Extend Tailwind's default colors
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(require('./tw-forms.config.js')),
    plugin(function({ addVariant }) {
      addVariant('menu', [
        '& .wp-block-navigation__container',
        '& .wp-block-navigation > ul'
      ])
      addVariant('submenu', [
        '& .wp-block-navigation-submenu'
      ])
      addVariant('submenu', [
        '& .wp-block-navigation-submenu'
      ])
      addVariant('menu-item', '& li.wp-block-navigation-link')
      addVariant('menu-link', [
        '& .wp-block-navigation-link > a',
        '& .wp-block-navigation-item__content > div'
      ])
    }),
  ],
};
