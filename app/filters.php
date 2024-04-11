<?php

/**
 * Theme filters.
 */

namespace App;

/**
 * Find and import all filter files
 */

 if (! file_exists($path = __DIR__ . '/filters')) {
    return;
}

$filters = new \FilesystemIterator($path);

foreach ($filters as $filter) {
    if ($filter->isFile()) {
        require_once($filter->getRealPath());
    }
}

add_filter('run_wptexturize', '__return_false', 9999);

add_filter('gform_disable_css', '__return_true');
