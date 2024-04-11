<?php

namespace App\Models;

use WP_Block;
use App\Models\ExtendsWP;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

class Block
{
    use ExtendsWP;

    public function __construct(WP_Block $block)
    {
        $this->base = $block;
    }

    public function getStyle()
    {
        $styles = [];

        if (Arr::has($this->attributes, 'style.spacing.padding')) {
            $styles[] = 'padding-top: ' . $this->getStyleAttribute('spacing.padding.top', true);
            $styles[] = 'padding-bottom: ' . $this->getStyleAttribute('spacing.padding.bottom', true);
        }

        if (Arr::has($this->attributes, 'textColor')) {
            $styles[] = '--text-color: ' . $this->getColorVariable('textColor', true);
        }

        if (Arr::has($this->attributes, 'backgroundColor')) {
            $styles[] = '--bg-color: ' . $this->getColorVariable('backgroundColor', true);
        }

        return Arr::toCssStyles($styles);
    }

    public function getStyleAttribute($attribute, $css = false)
    {
        if (! Arr::hasAny($this->attributes, ['style'])) {
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
        
        if (! $attribute->startsWith('var:preset|color|')) {
            $attribute = $attribute->start('var:preset|color|');
        }
        
        return toCssVariable($attribute->toString());
    }
}