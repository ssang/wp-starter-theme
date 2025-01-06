import { __ } from '@wordpress/i18n'

import {
  useBlockProps,
  useInnerBlocksProps
} from '@wordpress/block-editor'
import {
  useSelect
} from '@wordpress/data'
import { PlaceholderImage } from '../components'

export default function Header({ attributes, setAttributes, clientId }) {
  const {
    logo
  } = attributes

  const blocks = useSelect(select => select('core/block-editor').getBlock(clientId).innerBlocks)

  const { 
    children,
    ...innerBlocksProps 
  } = useInnerBlocksProps(
    {
      className: [
        'menu:flex menu:gap-8 menu:items-center menu:justify-center menu:!flex-nowrap menu:font-venice menu:font-normal menu:text-sm menu:tracking-widest menu:uppercase menu-link:!text-nowrap'
      ].join(' ')
    }, 
    {
      allowedBlocks: ['core/navigation'],
      template: [['core/navigation', { orientation: 'horizontal', lock: false }]],
      renderAppender: false
    }
  )

  return (
    <>
      <div
        {...useBlockProps({
          className: 'container bg-white text-orange border-b-2 border-orange'
        })}
      >
        <div class="content-wide grid lg:grid-cols-header h-20 py-5 items-center">
          <div>
            <PlaceholderImage
              image={ logo }
              placeholderClass="w-96 aspect-[4/1]"
              imageClass="max-h-12"
              onSelect={ media => {
                setAttributes( {
                  logo: {
                    id: media.id,
                    url: media.url
                  }
                } )
              } }
              onDelete={ () => {
                setAttributes({
                  logo: {
                    id: null,
                    url: null
                  }
                })
              } }
            />
          </div>
          <div { ...innerBlocksProps }>
            { children }
          </div>
        </div>
      </div>
    </>
  )
}