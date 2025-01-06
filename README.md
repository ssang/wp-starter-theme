# Takt Starter Theme

## Development

Use [DDEV](https://ddev.readthedocs.io/en/stable/) for development environment. Plugins are likely out of date so it would be better to synchronize with production.

### Templating
Uses [Sage](https://docs.roots.io/sage/10.x/installation/) with [ACFComposer](https://github.com/Log1x/acf-composer) for a [Blade](https://laravel.com/docs/master/blade) based templating system.

### Asset Bundling
Run `npm install` or `bun install` to install all dependencies

Run `npm run build` or `bun run build` to bundle assets.

All files in the `dist` folder must be uploaded because the file name hashing.