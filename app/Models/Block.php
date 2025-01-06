<?php

namespace App\Models;

use WP_Block;
use App\Models\ExtendsWP;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Livewire\Wireable;

class Block implements Wireable
{
    use ExtendsWP;

    public function __construct(WP_Block $block)
    {
        $this->base = $block;
    }

    public function toLivewire()
    {
        return [
            'content' => serialize_block($this->base->parsed_block),
        ];
    }

    public static function fromLivewire($value)
    {
        return new Block(new WP_Block(parse_blocks($value['content'])[0]));
    }

    public function getClassName()
    {
        return Arr::get($this->attributes, 'className', '');
    }

    public function isStyle($style)
    {
        return Str::contains($this->class_name, 'is-style-' . $style);
    }

    public function getStyle()
    {
        $styles = [];

        if (Arr::has($this->attributes, 'textColor')) {
            $styles[] =
                '--text-color: ' . $this->getColorVariable('textColor', true);
        }

        if (Arr::has($this->attributes, 'backgroundColor')) {
            $styles[] =
                '--bg-color: ' .
                $this->getColorVariable('backgroundColor', true);
        }

        return Arr::toCssStyles($styles);
    }

    public function getStyleAttribute($attribute, $css = false)
    {
        if (!Arr::hasAny($this->attributes, ['style'])) {
            return '';
        }

        $value = Arr::get($this->attributes['style'], $attribute, '');

        if ($css) {
            return toCssVariable($value);
        }

        return $value;
    }

    public function getColorVariable($key)
    {
        $attribute = Str::of(Arr::get($this->attributes, $key, ''));

        if (!$attribute->startsWith('var:preset|color|')) {
            $attribute = $attribute->start('var:preset|color|');
        }

        return toCssVariable($attribute->toString());
    }

    public function getAnchor()
    {
        return Arr::get($this->base->attributes, 'anchor', '');
    }

    public function getAttribute($key)
    {
        return Arr::get($this->base->attributes ?? [], $key, false);
    }
}
