<?php

namespace App\View\Composers;

use Roots\Acorn\View\Composer;

class App extends Composer
{
    /**
     * List of views served by this composer.
     *
     * @var array
     */
    protected static $views = [
        '*',
    ];

    /**
     * Data to be passed to view before rendering.
     *
     * @return array
     */
    public function with()
    {
        return [
            'siteName' => $this->siteName(),
            'siteLogo' => $this->getSiteLogo()
        ];
    }
    
    public function getSiteLogo()
    {
        $siteLogo = get_theme_mod('custom_logo');
        
        if (empty($siteLogo)) {
            return null;
        }

        return [
            'id' => $siteLogo,
            'url' => wp_get_attachment_image_src($siteLogo, 'full')[0]
        ];
    }

    /**
     * Returns the site name.
     *
     * @return string
     */
    public function siteName()
    {
        return get_bloginfo('name', 'display');
    }
}
