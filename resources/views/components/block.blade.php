<section
    {{ 
        $attributes->class([])
            ->merge([
                'style' => isset($block) ? $block->style : ''
            ]) 
    }}
>
    {!! $slot !!}
</section>