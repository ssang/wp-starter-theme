// https://tailwindcss.com/docs/configuration
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
  plugins: [],
};
