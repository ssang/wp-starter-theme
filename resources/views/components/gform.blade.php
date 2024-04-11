@props([
    'form' => 0
])

{!! do_shortcode('[gravityform id="' . $form . '" title="false" description="false" ajax="true"]') !!}