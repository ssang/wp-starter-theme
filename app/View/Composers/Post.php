<?php

namespace App\View\Composers;

use App\Models\Post as PostModel;
use Roots\Acorn\View\Composer;

class Post extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        'content.post',
    ];

    /**
     * Data to be passed to view before rendering, but after merging.
     *
     * @return array
     */
    public function override()
    {
        $post = new PostModel(get_the_ID());

        return [
            'post' => $post
        ];
    }
}
