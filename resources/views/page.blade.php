@extends('layouts.app')

@section('content')
    <div class="flex-1" id="main">
        <h1 class="sr-only">@yield('title', 'Dowel Lam Timber')</h1>
        <main
            class="@yield('mainClass') divide-light-gold relative z-10 divide-y-2"
        >
            @blocks
                {!! get_the_content(null, false, get_queried_object_id()) !!}
            @endblocks
        </main>
    </div>
@endsection
