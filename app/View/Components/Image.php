<?php

namespace App\View\Components;

use Closure;
use Illuminate\Support\Arr;
use Illuminate\View\Component;
use Illuminate\Contracts\View\View;

class Image extends Component
{
    public array $style = [];

    public string $src = '';

    public string $srcset = '';

    /**
     * Create a new component instance.
     */
    public function __construct(
        public array $image = [],
        public string $size = 'full',
        protected int $id = 0,
        $src = ''
    ) {
        if (Arr::has($image, 'imageSize')) {
            $this->style[] = 'object-fit: ' . $image['imageSize'];
        }

        if (Arr::has($image, 'imagePosition')) {
            $this->style[] = 'object-position: ' . $image['imagePosition'];
        }

        $this->src = $src;

        if (
            !empty(
                ($attachment = wp_get_attachment_image_src(
                    $image['id'] ?? 0,
                    $size
                )))
        ) {
            $this->src = $attachment[0];
        }

        $this->srcset = wp_get_attachment_image_srcset($image['id'] ?? 0, 'md');
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return 'components.image';
    }
}
