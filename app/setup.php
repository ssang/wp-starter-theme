<?php

/**
 * Theme setup.
 */

namespace App;

use Kucrut\Vite;

add_filter('vite_for_wp__production_assets', function ($assets, $manifest, $entry, $options) {
    if (empty($manifest->data->{$entry}->imports)) return $assets;

    foreach ($manifest->data->{$entry}->imports as $import) {
        Vite\enqueue_asset(
            get_stylesheet_directory() . '/dist',
            $import,
            [
                'handle' => 'crew-app-imports',
                'css-only' => true
            ]
        );
    }

    return $assets;

}, 10, 4);

add_action('wp_enqueue_scripts', function (): void {
    Vite\enqueue_asset(
        get_stylesheet_directory() . '/dist',
        'resources/assets/js/app.js',
        [
            'css-media' => 'all',
            'handle' => 'crew-app',
            'in-footer' => true,
        ]
    );

    wp_localize_script('crew-app', 'wpApiSettings', [
        'root' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest')
    ]);
});

add_action('enqueue_block_assets', function (): void { 
    if (is_admin()) {
        Vite\enqueue_asset(
            get_stylesheet_directory() . '/dist',
            'resources/assets/js/editor.js',
            [
                'handle' => 'crew-editor',
                'in-footer' => false,
                'dependencies' => ['wp-blocks', 'wp-dom-ready', 'wp-edit-post']
            ]
        );

        wp_localize_script('crew-editor', 'wpApiSettings', [
            'root' => esc_url_raw(rest_url()),
            'nonce' => wp_create_nonce('wp_rest')
        ]);
    }

    wp_enqueue_style('dashicons');
});

/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action('after_setup_theme', function () {

    /**
     * Register the navigation menus.
     *
     * @link https://developer.wordpress.org/reference/functions/register_nav_menus/
     */
    register_nav_menus([
        'primary_navigation' => __('Primary Navigation', 'sage'),
    ]);

    /**
     * Disable the default block patterns.
     *
     * @link https://developer.wordpress.org/block-editor/developers/themes/theme-support/#disabling-the-default-block-patterns
     */
    remove_theme_support('core-block-patterns');

    /**
     * Enable post thumbnail support.
     *
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    /**
     * Enable HTML5 markup support.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#html5
     */
    add_theme_support('html5', [
        'caption',
        'comment-form',
        'comment-list',
        'gallery',
        'search-form',
        'script',
        'style',
    ]);

    /**
     * Enable selective refresh for widgets in customizer.
     *
     * @link https://developer.wordpress.org/themes/advanced-topics/customizer-api/#theme-support-in-sidebars
     */
    add_theme_support('customize-selective-refresh-widgets');

    /**
     * Enable plugins to manage the document title.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
     */
    add_theme_support('title-tag');
}, 20);

add_action('admin_menu', function () {
    remove_submenu_page('themes.php', 'nav-menus.php');
});
