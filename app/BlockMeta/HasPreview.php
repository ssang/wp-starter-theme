<?php

namespace App\BlockMeta;

/**
 * Allow for Section Header Component
 */
add_filter('block_type_metadata', function ($metadata) {
    $metadata['attributes']['isPreview'] = [
        'type' => 'boolean',
        'default' => false
    ];

    $metadata['example']['viewportWidth'] = $metadata['example']['viewportWidth'] ?? 800;
    
    return $metadata;
}, 10, 2 );