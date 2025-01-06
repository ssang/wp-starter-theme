@props([
    'block',
])

<section
    {!!
        get_block_wrapper_attributes([
            'class' => Arr::toCssClasses([
                'group/block group-[]/block:py-0',
                $attributes->get('class'),
            ]),
            'style' => Arr::toCssStyles([
                $block->style ?? '',
                $attributes->get('style'),
            ]),
        ])
    !!}
>
    {!! $slot !!}
</section>
