@php($content = app()->view->getSections()['content'])

<!DOCTYPE html>
<html @php(language_attributes())>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        @php(do_action('get_header'))
        @php(wp_head())
    </head>

    <body @php(body_class())>
        <a class="sr-only focus:not-sr-only" href="#app">
            {{ __('Skip to content', 'sage') }}
        </a>
        @php(wp_body_open())

        <div
            class="max-w-screen flex min-h-screen flex-col overflow-clip subpixel-antialiased"
            id="app"
        >
            <div
                x-data
                aria-hidden="true"
                x-intersect:enter.threshold.100="$store.header.stuck = false"
                x-intersect:leave.threshold.100="$store.header.stuck = true"
                class="invisible absolute inset-0 -z-50 h-10 opacity-0"
            ></div>
            {!! $content !!}
        </div>

        @php(do_action('get_footer'))
        @php(wp_footer())
        @stack('scripts')
    </body>
</html>
