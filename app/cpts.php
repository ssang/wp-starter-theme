<?php

namespace App;

/**
 * Find and import all post type files
 */

if (!file_exists($path = __DIR__ . '/PostTypes')) {
    return;
}

$postTypes = new \FilesystemIterator($path);

foreach ($postTypes as $postType) {
    if ($postType->isFile()) {
        require_once $postType->getRealPath();
    }
}

/**
 * Highlight certain pages with states
 */
add_filter(
    'display_post_states',
    function ($post_states, $post) {
        $postTypes = [];

        foreach ($postTypes as $postType) {
            $postTypeObject = get_post_type_object($postType);

            if ($post->post_name === $postTypeObject->has_archive) {
                $post_states['crew_cpt_archive'] =
                    $postTypeObject->labels->name . ' Page';
            }
        }

        return $post_states;
    },
    10,
    2
);
