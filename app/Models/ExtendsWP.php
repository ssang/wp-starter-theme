<?php

namespace App\Models;

use Illuminate\Support\Str;

trait ExtendsWP
{
    public $exists = true;

    protected $base;

    public function __get($property)
    {
        if (! $this->exists) {
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
}