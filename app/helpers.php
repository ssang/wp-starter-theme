<?php

use Illuminate\Support\Arr;

if (! function_exists('vite')) {
    function vite($source)
    {
        $manifest = json_decode(
            file_get_contents(get_template_directory() . '/dist/manifest.json'),
            true
        );

        return isset($manifest[$source])
            ? get_template_directory_uri() . '/dist/' . $manifest[$source]['file']
            : false;
    }
}

if (! function_exists('option') && function_exists('get_field')) {
    function option($key, $default = false)
    {
        if (! str_contains($key, '.')) {
            return get_field($key, 'options') ?: $default;
        }

        $key = explode('.', $key, 2);
        $group = get_field($key[0], 'options') ?: $default;

        if (! is_array($group)) {
            return $default;
        }

        return Arr::get($group, $key[1]);
    }
}

/**
 * Function to remove the paragraph tags from a WYSIWYG
 */
if (! function_exists('get_wysiwyg_text') && function_exists('get_field')) {
    function get_wysiwyg_text($field, $post = null)
    {
        remove_filter('acf_the_content', 'wpautop');

        $value = get_field($field, $post);

        add_filter('acf_the_content', 'wpautop');

        return $value;
    }
}

if (! function_exists('new_custom_post_type')) {
    function new_custom_post_type($handle, $singular, $plural, $args = [], $position = 0) {

		$defaults = [
			'label'         => $singular,
			'description'   => '',
			'public'        => true,
			'show_ui'       => true,
			'show_in_menu'  => true,
			'show_in_rest' => true,
			'map_meta_cap'  => true,
			'menu_icon'     => 'dashicons-admin-page',
			'menu_position' => $position,
			'hierarchical'  => true,
			'rewrite'       => ['slug' => $handle, 'with_front' => false],
			'query_var'     => true,
			'has_archive'   => false,
			'supports'      => ['title', 'revisions', 'thumbnail', 'page-attributes'],
			'labels'        => [
				'name'               => $plural,
				'singular_name'      => $singular,
				'menu_name'          => $plural,
                'archives'           => 'Archive: ' . $plural,
				'add_new'            => 'Add ' . $singular,
				'add_new_item'       => 'Add New ' . $singular,
				'edit'               => 'Edit',
				'edit_item'          => 'Edit ' . $singular,
				'new_item'           => 'New ' . $singular,
				'view'               => 'View ' . $plural,
				'view_item'          => 'View ' . $singular,
				'search_items'       => 'Search ' . $plural,
				'not_found'          => 'No ' . $plural . ' Found',
				'not_found_in_trash' => 'No ' . $plural . ' found in Trash',
				'parent'             => 'Parent',
            ]
        ];

		$r = wp_parse_args($args, $defaults);

		register_post_type($handle, $r);
	}
}

if (! function_exists('get_image_alt')) {
    function get_image_alt($id)
    {
        return get_post_meta($id, '_wp_attachment_image_alt', TRUE);
    }
}

if (! function_exists('hexToRgb')) {
    function hexToRgb($hex, $alpha = false)
    {
        $hex      = str_replace('#', '', $hex);
        $length   = strlen($hex);
        $rgb['r'] = hexdec($length == 6 ? substr($hex, 0, 2) : ($length == 3 ? str_repeat(substr($hex, 0, 1), 2) : 0));
        $rgb['g'] = hexdec($length == 6 ? substr($hex, 2, 2) : ($length == 3 ? str_repeat(substr($hex, 1, 1), 2) : 0));
        $rgb['b'] = hexdec($length == 6 ? substr($hex, 4, 2) : ($length == 3 ? str_repeat(substr($hex, 2, 1), 2) : 0));

        if ($alpha) {
            $rgb['a'] = $alpha;
        }

        return $rgb;
    }
}

if (! function_exists('posts_url')) {
    function posts_url($category = '') {
        $url = get_permalink(get_option( 'page_for_posts'));

        if (! empty($category)) {
            $url = add_query_arg('category', $category, $url);
        }

        return $url;
    }
}