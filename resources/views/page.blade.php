@extends('layouts.app')

@section('content')
    @blockpart('header')

    <div class="flex-1" id="main">
        <h1 class="sr-only">@yield('title', 'Site Title')</h1>
        <main class="container @yield('mainClass') relative z-10">
            @blocks
                {!! get_the_content(null, false, get_queried_object_id()) !!}
            @endblocks
        </main>
    </div>

    @blockpart('footer')
@endsection
