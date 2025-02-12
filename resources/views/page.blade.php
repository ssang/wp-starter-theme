@extends('layouts.app')

@section('content')
    <div class="flex-1" id="main">
        <h1 class="sr-only">@yield('title', get_bloginfo('name'))</h1>
        <main class="@yield('mainClass') relative z-10 container">
            @blocks
                {!! get_the_content(null, false, get_queried_object_id()) !!}
            @endblocks
        </main>
    </div>
@endsection
