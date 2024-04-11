<?php

namespace App;

add_filter('upload_mimes', function ($mimes) {
    $mimes['svg'] = 'image/svg+xml'; 
    $mimes['json'] = 'text/plain';
    $mimes['jfif'] = "image/jpeg";
    
    return $mimes;
});

/**
 * This is to fix SVG uploads not having an inherent dimensions so we make them zero
 */
add_filter('wp_get_attachment_metadata', function ($data, $attachment_id ) {
    $data['width'] = $data['width'] ?? 0;
    $data['height'] = $data['height'] ?? 0;

    return $data;
}, 10, 2);