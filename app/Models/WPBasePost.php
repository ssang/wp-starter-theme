<?php

namespace App\Models;

use \WP_Post;
use Carbon\Carbon;
use App\Models\ExtendsWP;
use Illuminate\Support\Str;

class WPBasePost
{
    use ExtendsWP;

    protected $postType = null;

    public function __construct(WP_Post|int $post)
    {
        $this->base =
            $post instanceof WP_Post ? $post : WP_Post::get_instance($post);

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

    protected function getExcerpt()
    {
        return get_the_excerpt($this->base);
    }

    protected function getPermalink()
    {
        return get_permalink($this->base);
    }

    protected function getFeaturedImage()
    {
        return [
            'url' => get_the_post_thumbnail_url($this->base->ID, 'full'),
            'id' => get_post_thumbnail_id($this->base->ID),
        ];
    }

    public function getMeta($key, $single = true)
    {
        return get_post_meta($this->ID, $key, $single);
    }

    public static function getPostType()
    {
        return self::$postType ??
            Str::of(static::class)
                ->classBasename()
                ->snake()
                ->value();
    }

    public static function all()
    {
        $query = new \WP_Query([
            'post_type' => self::getPostType(),
            'posts_per_page' => -1,
            'ignore_sticky_posts' => 1,
        ]);

        return collect($query->posts)->map(function ($post) {
            return new static($post);
        });
    }

    public static function find($id)
    {
        $query = new \WP_Query([
            'post_type' => self::getPostType(),
            'p' => [$id],
        ]);

        return collect($query->posts)
            ->map(function ($post) {
                return new static($post);
            })
            ->first();
    }
}
