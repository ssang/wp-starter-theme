<!doctype html>
<html <?php language_attributes(); ?>>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php $app = view(app('sage.view'), app('sage.data'))->render(); ?>
        <?php wp_head(); ?>
    </head>

    <body <?php body_class(); ?>>
        <?php wp_body_open(); ?>
        <?php do_action('get_header'); ?>

        <div class="subpixel-antialiased font-body text-blue" id="app">
            <?php echo $app; ?>
        </div>

        <?php do_action('get_footer'); ?>
        <?php wp_footer(); ?>
    </body>
</html>