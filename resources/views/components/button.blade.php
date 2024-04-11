<{{ $attributes->hasAny(['href', ':href']) ? 'a' : 'button' }}
    {{ $attributes->class([
        'inline-flex items-center justify-center transition-colors no-underline whitespace-nowrap uppercase',
    ])->merge([
        'style' => Arr::toCssStyles([
            '--bg-color: ' . $bg,
            '--text-color: ' . $text,
        ])
    ]) }}
>
    {{ $slot }}
</{{ $attributes->hasAny(['href', ':href']) ? 'a' : 'button' }}>