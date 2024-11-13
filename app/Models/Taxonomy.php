<?php

namespace App\Models;

use WP_Term;
use App\Models\ExtendsWP;
use Illuminate\Support\Arr;

class Taxonomy
{
    use ExtendsWP;

    public function __construct(WP_Term|int $category)
    {
        $this->base =
            $category instanceof WP_Term
            ? $category
            : WP_Term::get_instance($category);

        if (is_bool($this->base)) {
            return $this->exists = false;
        }
    }

    public function getName()
    {
        return $this->base->name;
    }

    protected function getPermalink()
    {
        return get_term_link($this->base);
    }
}
