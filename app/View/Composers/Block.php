<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class Block extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var string[]
     */
    protected static $views = [
        'blocks/*',
        'sections/*'
    ];

    /**
     * Data to be passed to view before rendering.
     *
     * @return array
     */
    public function with()
    {
        $data = $this->data->attributes ?? [];

        $data['parent'] = $this->data->block->context ?? [];

        return $data;
    }
}
