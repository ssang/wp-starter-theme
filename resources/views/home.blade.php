@extends('layouts.app')

@section('content')
    <main class="container relative z-10 is-home">
        @blocks
            {!! get_the_content(null, false, get_queried_object()) !!}
        @endblocks
    </main>
@endsection