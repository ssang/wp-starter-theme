@props([
    'bg' => '#fffdec'
])
<section
    {{ $attributes->class([
        'container bg-[--bg] py-24 group/block group-[]/block:py-0'
    ]) }}
    style="--bg: {{ $bg }}"
>
    {!! $slot !!}
</section>