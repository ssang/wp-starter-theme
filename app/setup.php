<?php

/**
 * Theme setup.
 */

namespace App;

use Idleberg\WordpressViteAssets\WordpressViteAssets;

$viteAssets = new WordpressViteAssets(get_stylesheet_directory() . '/dist/manifest.json', get_stylesheet_directory_uri() . '/dist/assets');

add_action('wp_head', function () use ($viteAssets) {
    $scriptTag = $viteAssets->getScriptTag('resources/assets/js/app.js', [
        'integrity' => false,
        'crossorigin' => false
    ]);

    if ($scriptTag) {
        echo $scriptTag . PHP_EOL;
    }
}, 0, 1);

add_action('wp_head', function () use ($viteAssets) {
    $styleTags = $viteAssets->getStyleTags('resources/assets/js/app.js', [
        'integrity' => false,
        'crossorigin' => false
    ]);

    foreach ($styleTags as $styleTag) {
        echo $styleTag . PHP_EOL;
    }
}, 0, 1);

add_action( 'wp_enqueue_scripts', function () {
    wp_dequeue_style('wp-block-library');
});

/**
 * Register the theme assets with the block editor.
 *
 * @return void
 */
add_action('enqueue_block_editor_assets', function () {
    wp_enqueue_style('crew', get_stylesheet_directory_uri() . '/dist/assets/editor.css?' . filemtime(get_stylesheet_directory() . '/dist/assets/editor.css'));
}, 100);

/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action('after_setup_theme', function () {
    /**
     * Enable features from the Soil plugin if activated.
     *
     * @link https://roots.io/plugins/soil/
     */
    add_theme_support('soil', [
        'clean-up',
        'nav-walker',
        'nice-search',
        'relative-urls',
    ]);

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

