module.exports = ({ matchVariant }) => {
  matchVariant(
    'gf',
    (value) => {
      return `&>.gform_wrapper ${value}`;
    },
    {
      values: {
        header: '.gform_heading',
        footer: '.gform_footer',
        title: '.gform_title',
        description: '.gform_description',
        form: 'form',
        fields: '.gform_fields',
        field: '.gfield',
        'half-field': '.gfield.gfield--width-half',
        'field-container': '.gfield .ginput_container',
        'file-container': '.gfield .ginput_container_fileupload',
        'file': '.gfield input[type="file"]',
        fieldset: 'fieldset.gfield',
        legend: 'fieldset.gfield > legend',
        inputs: '.ginput_container :is(input:not([type="submit"]), textarea, select)',
        select: '.ginput_container :is(select)',
        placeholder: '.ginput_container :is(input, textarea, select)::placeholder',
        input: '.ginput_container input:not([type="submit"])',
        textarea: '.ginput_container textarea',
        text: '.ginput_container input[type="text"]',
        radio: '.ginput_container .gfield_radio',
        check: '.ginput_container .gfield_checkbox',
        choice: '.ginput_container .gchoice',
        'choice-input': '.gchoice > input',
        'choice-label': '.gchoice > label',
        'checked-label': '.gfield-choice-input:checked + label',
        label: '.gfield_label',
        'hidden-label': '.hidden_label .gfield_label',
        submit: 'input[type="submit"]:is(.gform_button, .gform-button)',
        required: '.gfield_required',
        error: '.validation_message',
        errors: '.gform_submission_error'
      }
    }
  )
}