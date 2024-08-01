<img
    {{
        $attributes->merge([
            'src' => $src,
            'srcset' => wp_get_attachment_image_srcset($image['id'] ?? 0),
            'alt' => get_post_meta($image['id'], '_wp_attachment_image_alt', true),
            'style' => Arr::toCssStyles($style),
        ])
    }}
/>
