<?php

namespace App\Bootstrap;

use Kucrut\Vite;

add_action('enqueue_block_assets', function (): void {
    if (! is_admin()) {
        Vite\enqueue_asset(
            get_stylesheet_directory() . '/dist',
            'resources/assets/js/app.ts',
            [
                'css-media' => 'all',
                'handle' => 'takt-app',
            ]
        );

        return;
    }

    Vite\enqueue_asset(
        get_stylesheet_directory() . '/dist',
        'resources/assets/js/editor.ts',
        [
            'handle' => 'takt-editor',
        ]
    );

    wp_enqueue_style('dashicons');
});
