<?php

namespace App\Bootstrap;

/**
 * Theme settings.
 */

add_action('init', function () {
    register_setting('options', 'Social Links', [
        'description' => 'Social Links',
        'type' => 'array',
        'default' => [],
        'show_in_rest' => [
            'schema' => [
                'type' => 'array',
                'items' => [
                    'type' => 'object',
                    'properties' => [
                        'title' => [
                            'type' => 'string',
                        ],
                        'url' => [
                            'type' => 'string',
                        ],
                        'icon' => [
                            'type' => 'object',
                            'properties' => [
                                'src' => [
                                    'type' => 'string',
                                ],
                                'id' => [
                                    'type' => 'integer',
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
        'sanitize_callback' => null,
    ]);
});
