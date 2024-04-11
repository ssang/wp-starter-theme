<?php

namespace App\View\Components;

use Closure;
use Illuminate\Support\Arr;
use Illuminate\View\Component;
use Illuminate\Contracts\View\View;

class Image extends Component
{
    public array $style = [];

    /**
     * Create a new component instance.
     */
    public function __construct(
        public array $image,
        public string $size = 'full'
    ){
        if (Arr::has($image, 'imageSize')) {
            $this->style[] = 'object-fit: ' . $image['imageSize'];
        }

        if (Arr::has($image, 'imagePosition')) {
            $this->style[] = 'object-position: ' . $image['imagePosition'];
        }
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return 'components.image';
    }
}
