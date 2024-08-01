<div
    class="max-w-screen flex min-h-screen flex-col items-stretch overflow-x-clip subpixel-antialiased"
    id="app"
    x-data
>
    @blockpart('header')

    <main class="font-body relative z-10 flex-1 [.single-post_&]:bg-white">
        {!! $content !!}
    </main>

    @blockpart('footer')
</div>
