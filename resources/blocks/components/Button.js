import { __ } from '@wordpress/i18n'

import { 
  RichText,
  __experimentalLinkControl as LinkControl
} from '@wordpress/block-editor'
import {
	Popover
} from '@wordpress/components'
import {
	store
} from '@wordpress/core-data'
import { useDispatch } from '@wordpress/data'
import { useRef } from '@wordpress/element'
import { decodeEntities } from '@wordpress/html-entities'

export default function Button({ 
  children = '',
  link = {
    title: '',
    url: '',
    opensInNewTab: false,
  },
  className,
  onChange,
  onClick = () => {},
  onLinkChange = false,
  onLinkRemove = () => {},
  showLinkBox = false,
  placeholder = 'Button Label',
}) {

  const buttonRef = useRef(null)

  return (
    <div
      ref={ buttonRef }
      onClick={ onClick }
      className={`relative inline-flex items-center px-12 py-[0.8rem] min-h-[3.125rem] font-baufra text-2xs font-bold uppercase ${className}`}
    >
      { children.length > 0 ? 
        children : (
          <RichText
            tagName={ 'span' }
            className={``}
            placeholder={ __(placeholder, 'crew') }
            value={ link.title }
            allowedFormats={ [] }
            onChange={ onChange }
            keepPlaceholderOnFocus
            disableLineBreaks={ true }
          />
        )
      }
      { (onLinkChange !== false && showLinkBox) && (
        <LinkUI
          link={{
            title: link.title,
            url: link.url,
            opensInNewTab: link.opensInNewTab ?? false
          }}
          onChange={ onLinkChange }
          onRemove={ onLinkRemove }
          anchor={ buttonRef }
        />
      )}
    </div>
  )
}

const LinkUI = ( props ) => {
  const { saveEntityRecord } = useDispatch(store)

  async function handleCreate(pageTitle) {
		const page = await saveEntityRecord('postType', 'page', {
			title: pageTitle,
			status: 'draft',
		})

		return {
			id: page.id,
			type: 'page',
			title: decodeEntities( page.title.rendered ),
			url: page.link,
			kind: 'post-type',
		}
	}

  return (
    <Popover
      offset={ 24 }
      placement="bottom"
      onClose={ props.onClose }
      anchor={ props.anchor.current }
      shift
    >
      <div role="dialog">
        <LinkControl
          hasTextControl
          value={ props.link }
          showInitialSuggestions
          withCreateSuggestion={ true }
          createSuggestion={ handleCreate }
          suggestionsQuery={ {
            type: 'post',
            subtype: 'page' 
          } }
          onChange={ props.onChange }
          onRemove={ props.onRemove }
        />
      </div>
    </Popover>
  )
}