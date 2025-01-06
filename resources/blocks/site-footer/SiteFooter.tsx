import { __ } from '@wordpress/i18n'

import { 
  MediaUpload,
  useBlockProps,
} from '@wordpress/block-editor'
import { Button } from '@wordpress/components'

export default function Header({ attributes, setAttributes }) {
  const {
    logo
  } = attributes

  return (
    <>
      <div 
        {...useBlockProps({})}
      >
        <div className="flex justify-between text-center text-3xl uppercase text-blue-green font-bold px-24 py-24">
          <div className="relative">
            { !! logo.url && (
              <>
                <img 
                  src={ logo.url }
                  className='w-52 h-auto object-contain'
                />
              </>
            )}
            <MediaUpload
              onSelect={ (media) => {
                setAttributes({
                  logo: {
                    url: media.url,
                    id: media.id
                  }
                })
              }}
              allowedTypes={ ['image'] }
              value={ logo.id }
              render={({ open }) => (
                <div className={`${!! logo.url ? 'absolute top-1/2 -translate-y-1/2 inset-x-0 w-full h-full bg-transparent' : 'w-14 h-14 bg-blue-ice/60'} hover:bg-blue-ice/80 text-white transition-colors`}>
                  <Button
                    className="w-full h-full !p-0 [&>span]:h-full"
                    icon="edit"
                    label={ !! logo.url ? 'Replace Icon' : 'Add Icon'}
                    onClick={ open }
                  />
                </div>
              )}
            />
          </div>
          <h2>Primary Navigation</h2>
        </div>
      </div>
    </>
  )
}