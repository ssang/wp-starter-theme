<?php

/**
 * Theme setup.
 */

namespace App;

use Kucrut\Vite;

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
});

add_action('enqueue_block_editor_assets', function (): void { 
    Vite\enqueue_asset(
        get_stylesheet_directory() . '/dist',
        'resources/assets/js/editor.js',
        [
            'handle' => 'crew-editor',
            'in-footer' => true,
            'dependencies' => ['wp-blocks', 'wp-dom-ready', 'wp-edit-post']
        ]
    );
    
    Vite\enqueue_asset(
        get_stylesheet_directory() . '/dist',
        'resources/assets/js/app.js',
        [
            'handle' => 'crew-app',
            'css-only' => true
        ]
    );
});

add_action('wp_enqueue_scripts', function () {
    wp_dequeue_style('wp-block-library');
});

/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action('after_setup_theme', function () {

    /**
     * Disable full-site editing support.
     *
     * @link https://wptavern.com/gutenberg-10-5-embeds-pdfs-adds-verse-block-color-options-and-introduces-new-patterns
     */
    remove_theme_support('block-templates');

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
     * Enable plugins to manage the document title.
     *
     * @link https://developer.wordpress.org/reference/functions/add_theme_support/#title-tag
     */
    add_theme_support('title-tag');

    /**
     * Enable post thumbnail support.
     *
     * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
     */
    add_theme_support('post-thumbnails');

    /**
     * Enable responsive embed support.
     *
     * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/themes/theme-support/#responsive-embedded-content
     */
    add_theme_support('responsive-embeds');

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
}, 20);

