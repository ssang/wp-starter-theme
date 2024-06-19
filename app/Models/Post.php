<?php

namespace App\Models;

use \WP_Post;
use Carbon\Carbon;
use App\Models\Taxonomy;
use App\Models\ExtendsWP;
use Illuminate\Support\Str;

class Post
{
    use ExtendsWP;

    public function __construct(WP_Post|int $post)
    {
        $this->base = $post instanceof WP_Post ? $post : WP_Post::get_instance($post);

        if (is_bool($this->base)) {
            return $this->exists = false;
        }
    }

    protected function getPublishedAt()
    {
        return Carbon::parse($this->base->post_date);
    }

    protected function getTitle()
    {
        return $this->base->post_title;
    }

    protected function getAuthor()
    {
        return get_the_author_meta('display_name', $this->base->post_author);
    }

    protected function getPermalink()
    {
        return get_permalink($this->base);
    }

    protected function getFeaturedImage()
    {
        return [
            'url' => get_the_post_thumbnail_url($this->base->ID, 'full'),
            'id' => get_post_thumbnail_id($this->base->ID)
        ];
    }

    protected function getCategory($single = true)
    {
        if (! has_category('', $this->base)) {
            return false;
        }

        return new Taxonomy(get_the_category($this->base)[0]);
    }

    protected function getCategories()
    {
        if (! has_category('', $this->base)) {
            return false;
        }

        return array_map(
            fn ($category) => new Taxonomy($category),
            get_the_category($this->base)
        );
    }

    protected function getTag($single = true)
    {
        if (! has_tag('', $this->base)) {
            return false;
        }

        return new Taxonomy(get_the_tags($this->base)[0]);
    }

    protected function getTags()
    {
        if (! has_tag('', $this->base)) {
            return false;
        }

        return array_map(
            fn ($category) => new Taxonomy($category),
            get_the_tags($this->base)
        );
    }

    public function getMeta($key, $single = true)
    {
        return get_post_meta($this->ID, $key, $single);
    }

    public function getReadLength()
    {
        $words = Str::of($this->base->post_content)
            ->replaceMatches('/\<\!\-\-.*\-\-\>/', '')
            ->wordCount();

        
        return max(1, floor($words / 200));
    }

    public function getRelatedPosts()
    {
        $tags = wp_get_post_terms($this->base->ID, 'post_tags', ['fields' => 'ids']);
        $categories = wp_get_post_terms($this->base->ID, 'category', ['fields' => 'ids']);

        $args = [
            'post__not_in' => [$this->base->ID],
            'posts_per_page' => 3,
            'ignore_sticky_posts' => 1,
            'orderby' => 'rand',
            'tax_query' => [
                'relation' => 'OR',
                [
                    'taxonomy' => 'category',
                    'terms' => $categories
                ],
                [
                    'taxonomy' => 'post_tag',
                    'terms' => $tags
                ]
            ]
        ];

        return array_map(
            fn ($post) => new Post($post),
            get_posts($args)
        ); 
    }
}