<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Arr;
use Illuminate\View\Component;

class Button extends Component
{
    public string $tag = 'a';

    public string $styles = '';

    /**
     * Create a new component instance.
     */
    public function __construct($bg = '#F15F2D', $text = '#FFFFFF'){
        $this->styles = Arr::toCssStyles([
            '--bg: ' . $bg,
            '--text: ' . $text
        ]);
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return function (array $data) {
            if (! Arr::hasAny($data['attributes'], ['href', ':href'])) {
                $this->tag = 'button';
            }
            
            return 'components.button';
        };
    }


}
