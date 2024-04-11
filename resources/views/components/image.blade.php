<img {{ $attributes->merge([
    'src' => ! empty($attachment = wp_get_attachment_image_src($image['id'], $size)) ? $attachment[0] : $image['url'],
    'alt' => get_post_meta($image['id'], '_wp_attachment_image_alt', TRUE),
    'style' => Arr::toCssStyles($style)
]) }}>