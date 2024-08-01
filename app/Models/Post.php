<?php

namespace App\Models;

use App\Models\WPBasePost;
use App\Models\Taxonomy;
use Illuminate\Support\Str;

class Post extends WPBasePost
{
    protected function getCategory($single = true)
    {
        if (!has_category('', $this->base)) {
            return false;
        }

        return new Taxonomy(get_the_category($this->base)[0]);
    }

    protected function getCategories()
    {
        if (!has_category('', $this->base)) {
            return false;
        }

        return array_map(
            fn($category) => new Taxonomy($category),
            get_the_category($this->base)
        );
    }

    protected function getTag($single = true)
    {
        if (!has_tag('', $this->base)) {
            return false;
        }

        return new Taxonomy(get_the_tags($this->base)[0]);
    }

    public function getTags()
    {
        if (!has_tag('', $this->base)) {
            return false;
        }

        return array_map(
            fn($tag) => new Taxonomy($tag),
            get_the_tags($this->base)
        );
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
        $tags = wp_get_post_terms($this->base->ID, 'post_tags', [
            'fields' => 'ids',
        ]);
        $categories = wp_get_post_terms($this->base->ID, 'category', [
            'fields' => 'ids',
        ]);

        $args = [
            'post__not_in' => [$this->base->ID],
            'posts_per_page' => 3,
            'ignore_sticky_posts' => 1,
            'orderby' => 'rand',
            'tax_query' => [
                'relation' => 'OR',
                [
                    'taxonomy' => 'category',
                    'terms' => $categories,
                ],
                [
                    'taxonomy' => 'post_tag',
                    'terms' => $tags,
                ],
            ],
        ];

        return array_map(fn($post) => new Post($post), get_posts($args));
    }
}
