@props([
    'block',
])

<section
    {{
        $attributes->class(['group/block group-[]/block:py-0'])->merge([
            'style' => $block->style ?? '',
            'id' => $block->anchor ?? '',
        ])
    }}
>
    {!! $slot !!}
</section>
