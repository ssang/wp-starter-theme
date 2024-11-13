<?php

namespace App\Bootstrap;

use Kucrut\Vite;

add_action('wp_enqueue_scripts', function (): void {
    Vite\enqueue_asset(
        get_stylesheet_directory() . '/dist',
        'resources/assets/js/app.ts',
        [
            'css-media' => 'all',
            'handle' => 'crew-app',
            'module' => true,
            // 'dependencies' => ['@wordpress/interactivity'],
        ]
    );

    wp_localize_script('crew-app', 'wpApiSettings', [
        'root' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest'),
    ]);
});

add_action('enqueue_block_assets', function (): void {
    Vite\enqueue_asset(
        get_stylesheet_directory() . '/dist',
        'resources/assets/js/editor.ts',
        [
            'handle' => 'crew-editor',
            'dependencies' => ['wp-blocks', 'wp-dom-ready', 'wp-edit-post'],
        ]
    );

    wp_localize_script('crew-editor', 'wpApiSettings', [
        'root' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest'),
    ]);

    wp_enqueue_style('dashicons');
});
