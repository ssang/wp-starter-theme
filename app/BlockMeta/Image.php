<?php

namespace App\BlockMeta;

use Illuminate\Support\Arr;

/**
 * Setup Image Support
 */

\WP_Block_Supports::get_instance()->register(
	'image',
	[
		'register_attribute' => function ($block_type) {
            if (! $block_type->attributes) {
                $block_type->attributes = [];
            }

            if (Arr::has($block_type->attributes, 'image.default')) {
                return;
            }

            if (block_has_support($block_type, ['image'], false)) {
                $block_type->attributes['image'] = [
                    'type' => 'object',
                    'default' => [
                        'id' => null,
                        'url' => null
                    ]
                ];
            }

            if (block_has_support($block_type, ['image', 'imagePosition'], false)) {
                Arr::add($block_type->attributes, 'image.default.imagePosition', '50% 50%');
            }

            if (block_has_support($block_type, ['image', 'imageSize'], false)) {
                Arr::add($block_type->attributes, 'image.default.imageSize', 'cover');
                Arr::add($block_type->attributes, 'image.default.imagePosition', '50% 50%');
            }
        },
    ]
);

add_filter('render_block_data', function ($block) {
    $blockType = \WP_Block_Type_Registry::get_instance()->get_registered($block['blockName']);

    if (! block_has_support($blockType, ['image'], false)) {
        return $block;
    }

    $blockAttributes = Arr::has($block, 'attrs') ? $block['attrs'] : [];

    $blockAttributes = Arr::add($blockAttributes, 'image.id', 0);
    $blockAttributes = Arr::add($blockAttributes, 'image.url', '');

    

    if (block_has_support($blockType, ['image', 'imagePosition'], false)) {
        $blockAttributes = Arr::add($blockAttributes, 'image.imagePosition', '50% 50%');
    }

    if (block_has_support($blockType, ['image', 'imageSize'], false)) {
        $blockAttributes = Arr::add($blockAttributes, 'image.imageSize', 'cover');
        $blockAttributes = Arr::add($blockAttributes, 'image.imagePosition', '50% 50%');
    }

    $block['attrs'] = $blockAttributes;

    return $block;
}, 10);
