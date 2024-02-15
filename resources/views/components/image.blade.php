@props([
    'id' => 0,
    'url' => ''
])

<img {{ $attributes->merge([
    'src' => $url,
    'alt' => get_post_meta($id, '_wp_attachment_image_alt', TRUE)
]) }}>