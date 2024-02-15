<?php

namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use Roots\Acorn\Sage\SageServiceProvider;

class ThemeServiceProvider extends SageServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        parent::register();
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        if ($this->app->bound('blade.compiler')) {
            $this->registerDirectives();
        }
    }

    protected function registerDirectives(): void
    {
        Blade::directive('parseblocks', static fn () => "<?php if (\Roots\use_fse()): ob_start(); ?>");
        Blade::directive('endparseblocks', static fn () => '<?php $block_content = ob_get_clean(); echo do_blocks($block_content); endif; ?>');

        Blade::directive('part', static fn ($block) => "<?php block_template_part({$block}); ?>");
    }
}
