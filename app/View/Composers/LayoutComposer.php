<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class LayoutComposer extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var string[]
     */
    protected static $views = [
        'layouts.app'
    ];

    public function with()
    {
        return [
            'header' => $this->getBlockPart('header'),
            'footer' => $this->getBlockPart('footer'),
        ];
    }

    public function getBlockPart($part)
    {
        $template_part = get_block_template(get_stylesheet() . '//' . $part, 'wp_template_part');

        return \do_blocks($template_part->content);
    }
}
