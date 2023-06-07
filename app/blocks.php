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
            'title' => 'Crew'
        ]
    ], $categories);
});

add_action('init', function () {

    if (! file_exists($path = get_stylesheet_directory() . '/dist/blocks')) {
        return;
    }

    $blocks = new \FilesystemIterator($path);

    foreach ($blocks as $dir) {
        if (! file_exists($dir->getPathname() . '/block.json')) {
            continue;
        }

        register_block_type(
            $dir->getPathname(),
            [
                'render_callback' => function ($attributes, $content, $block) {
                    $blockName = Str::after($block->name, '/');
                    $postType = $block->context['postType'];

                    if (isset($block->attributes['className'])) {
                        $block->style = Str::of($block->attributes['className'])
                            ->after('is-style-')
                            ->before(' ');
                    }
                    
                    try {
                        return View::first([
                            'blocks.' . $postType . '.' . $blockName,
                            'blocks.partials.' . $blockName,
                            'blocks.' . $blockName
                        ], compact('attributes', 'block', 'content'));
                    } catch (ViewException $e) {
                        return '';
                    }
                },
                'uses_context' => ['postType', 'postId']
            ]
        );
    }
});
