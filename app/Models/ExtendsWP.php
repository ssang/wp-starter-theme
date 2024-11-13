<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Support\Str;

trait ExtendsWP
{
    public $exists = true;

    protected $base;

    public function __get($property)
    {
        if (!$this->exists) {
            return false;
        }

        if (property_exists($this->base, $property)) {
            return $this->base->{$property};
        }

        if (method_exists($this, 'get' . Str::camel($property))) {
            $method = 'get' . Str::camel($property);

            return $this->{$method}();
        }

        return null;
    }

    public function __call($method, $arguments)
    {
        if (method_exists($this->base, $method)) {
            return $this->base->{$method}(...$arguments);
        }
    }

    public function getMeta($key, $single = true)
    {
        return get_post_meta($this->ID, $key, $single);
    }

    protected function getPublishedAt()
    {
        return Carbon::parse($this->base->post_date);
    }

    protected function getTitle()
    {
        return $this->base->post_title;
    }

    protected function getPermalink()
    {
        return get_permalink($this->base);
    }

    protected function getFeaturedImage()
    {
        return [
            'src' => get_the_post_thumbnail_url($this->base->ID, 'full'),
            'id' => get_post_thumbnail_id($this->base->ID),
        ];
    }
}
