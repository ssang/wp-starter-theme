<{{ $tag }}
    {{ $attributes->class([
        'inline-block px-[2em] pt-[1.1em] pb-[0.8em] uppercase bg-[--bg] font-venice text-[--text] tracking-[0.16rem] leading-none border border-yellow-light rounded-full transition-colors',
        'hover:bg-yellow-light hover:text-blue hover:border-[--bg]'
    ]) }}
    style="{{ $styles }}"
>
    {{ $slot }}
</{{ $tag }}>