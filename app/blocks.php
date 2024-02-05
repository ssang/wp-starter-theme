<?php

namespace App;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\View;

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

/**
 * Add a new category for custom blocks
 */
add_filter('block_categories_all' , function($categories) {
    return array_merge([
        [
            'slug'  => 'custom',
            'title' => 'Crew'
        ],
        [
            'slug' => 'meta',
            'title' => 'Metadata',
            'description' => 'Just a block to house post metadata'
        ]
    ], $categories);
});

/**
 * Add a new category for block patterns
 */
add_action('init', function () {
    register_block_pattern_category(
        'custom',
        ['label' => __('Crew', 'crew')]
    );
});

/**
 * Register all available custom blocks
 */
add_action('init', function () {

    if (! file_exists($path = get_stylesheet_directory() . '/dist/blocks')) {
        return;
    }

    $blocks = new \FilesystemIterator($path);

    foreach ($blocks as $dir) {
        if (! file_exists($dir->getPathname() . '/block.json')) {
            continue;
        }

        $block = register_block_type(
            $dir->getPathname(),
            [
                'render_callback' => function ($attributes, $content, $block) {
                    if ($block->block_type->category == 'meta') {
                        return "";
                    }
                    
                    $blockName = Str::after($block->name, '/');
                    
                    try {
                        if (Str::startsWith($blockName, 'site-')) {
                            $section = Str::of($blockName)->after('site-');

                            return View::first([
                                $section
                                    ->prepend('sections.')
                                    ->append('-' . ($block->context['postType'] ?? ''))
                                    ->toString(),
                                $section
                                    ->prepend('sections.')
                                    ->toString(),
                                ], compact('attributes', 'block', 'content')
                            );
                        }

                        return View::first([
                            'blocks.partials.' . $blockName,
                            'blocks.' . $blockName
                        ], compact('attributes', 'block', 'content'));
                    } catch (\Exception $e) {
                        return 'View does not exist for ' . $blockName;
                    }
                },
            ]
        );
    }
});

/**
 * Find and import all block meta files
 */
if (file_exists($path = __DIR__ . '/BlockMeta')) {
    $BlockMeta = new \FilesystemIterator($path);

    foreach ($BlockMeta as $meta) {
        if ($meta->isFile()) {
            require_once($meta->getRealPath());
        }
    }
}
