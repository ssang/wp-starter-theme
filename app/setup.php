<?php

/**
 * Theme setup.
 */

namespace App;

use Illuminate\Support\Facades\Blade;

/**
 * Find and import all setup files
 */

if (file_exists($path = __DIR__ . '/bootstrap')) {
    $filters = new \FilesystemIterator($path);

    foreach ($filters as $filter) {
        if ($filter->isFile()) {
            require_once $filter->getRealPath();
        }
    }
}

/**
 * Register the initial theme setup.
 *
 * @return void
 */
add_action('after_setup_theme', function () {
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

    add_theme_support('disable-layout-styles');
}, 20);

add_action('admin_menu', function () {
    remove_submenu_page('themes.php', 'nav-menus.php');
    remove_menu_page('edit-comments.php');
});

add_action('wp_head', function () {
    echo view('sections.head')->render();
});

/**
 * Livewire
 */
add_filter('wp_footer', function () {
    echo Blade::render('@livewireScriptConfig');
});
