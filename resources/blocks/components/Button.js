import { __ } from '@wordpress/i18n';

import { 
  RichText
} from '@wordpress/block-editor';

export default function Button({ children = '', label, className, onChange, placeholder = 'Button Label' }) {
  return (
    <div className={`inline-block px-[2em] pt-[1.1em] pb-[0.8em] uppercase bg-[--bg] font-venice text-[--text] tracking-[0.16rem] leading-none border border-yellow-light rounded-full transition-colors hover:bg-yellow-light hover:text-blue hover:border-[--bg] ${className}`}>
      { children.length > 0 ? 
        children : (
          <RichText
            tagName={ 'span' }
            className={``}
            placeholder={ __(placeholder, 'crew') }
            value={ label }
            allowedFormats={ [] }
            onChange={ onChange }
            keepPlaceholderOnFocus
            disableLineBreaks={ true }
          />
        )
      }
    </div>
  )
}