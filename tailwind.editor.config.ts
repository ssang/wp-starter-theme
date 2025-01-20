module.exports = {
  content: ['./resources/{blocks,assets}/**/*.{js,tsx,ts}'],
  important:
    ':is(.block-editor-block-inspector, .is-root-container, .components-popover)',
  presets: [require('./tailwind.config.ts')]
};
