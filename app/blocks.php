<?php

namespace App;

add_filter('allowed_block_types_all', function ($allowed_blocks, $editor_context) {
    return [
        'crew/hero',
        // 'core/paragraph',
        // 'core/button',
        // 'core/buttons',
        // 'core/heading',
        // 'core/quote',
        // 'core/list',
        // 'core/list-item'
    ];
}, 25, 2);

add_filter('block_categories_all' , function($categories) {
    return array_merge([
        [
            'slug'  => 'custom',
            'title' => '4 Refuel'
        ]
    ], $categories);
});

add_action('init', function () {
    $blocks = new \FilesystemIterator(get_stylesheet_directory() . '/dist/blocks');

    foreach ($blocks as $dir) {
        if (! file_exists($dir->getPathname() . '/block.json')) {
            continue;
        }

        register_block_type($dir->getPathname() . '/block.json');
    }
});

function crew_block_render_callback($block, $content)
{
    $blockName = explode('/', $block['name'])[1];
    
    if (! file_exists(get_stylesheet_directory() . '/resources/views/blocks/' . $blockName . '.blade.php')) {
        echo '';
    }

    echo view('blocks.' . $blockName, compact('block', 'content'));
}
