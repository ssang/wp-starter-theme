<?php

namespace App;

use App\Models\Block;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\View;

/**
 * Determine what blocks are available in the picker
 */
add_filter('allowed_block_types_all', function ($allowedBlocks, $editorContext) {
    $blockTypes = \WP_Block_Type_Registry::get_instance()->get_all_registered();

    $allowedBlocks = collect(array_keys(Arr::where($blockTypes, function ($block, $name) {
        return Str::before($name, '/') == 'crew';
    })));

    $postType = $editorContext->post->post_type ?? null;
    $postTypes = $allowedBlocks->filter(function ($value) {
        return Str::endsWith($value, '-meta');
    });

    foreach ($postTypes as $type) {
        if ($postType !== Str::between($type, 'crew/', '-meta')) {
            $allowedBlocks->forget($allowedBlocks->search($type));
        }
    }

    if ($postType === 'post') {
        $allowedBlocks = collect([
            'crew/content',
            'crew/post-header',
            'core/embed'
        ]);
    }

    if ($editorContext->name == 'core/edit-site') {
        $allowedBlocks->add('core/post-content');
        $allowedBlocks->add('core/navigation');
        $allowedBlocks->add('core/navigation-link');
        $allowedBlocks->add('core/navigation-submenu');
    }
    
    return array_merge($allowedBlocks->all(), [
        'core/paragraph',
        'core/heading',
        'core/quote',
        'core/list',
        'core/list-item',
        'core/block'
    ]);
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

    crew_register_all_blocks($blocks);
});

function crew_register_all_blocks($blocks)
{
    foreach ($blocks as $dir) {
        if (! file_exists($dir->getPathname() . '/block.json')) {
            continue;
        }

        crew_register_all_blocks(new \FilesystemIterator($dir->getPathname()));

        $block = register_block_type(
            $dir->getPathname(),
            [
                'render_callback' => function ($attributes, $content, $block) {
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

                        $block = new Block($block);

                        return View::first([
                            'content.' . Str::beforeLast($blockName, '-meta'),
                            'blocks.partials.' . $blockName,
                            'blocks.' . $blockName
                        ], compact('attributes', 'block', 'content'));
                    } catch (\Exception $e) {
                        if ($block->block_type->category != 'meta') {
                            return '<span style="text-align: center; font-size: 4rem">View does not exist for ' . $blockName . '</span>';
                        }
                    }
                },
            ]
        );
    }
}

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
