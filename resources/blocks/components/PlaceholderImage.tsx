import { __ } from '@wordpress/i18n'

import {
  MediaUpload,
  MediaPlaceholder
} from '@wordpress/block-editor'
import { Button } from '@wordpress/components'

export default function PlaceholderImage({
  className = '',
  placeholderClass = '',
  imageClass = '',
  image = {
    url: null,
    id: null
  },
  onSelect,
  onDelete
}) {
  return (
    <div className={`relative group/image flex items-center justify-center ${ className } ${ ! image.id && 'p-4 bg-black/30' }`}>
      <MediaUpload
        onSelect={ onSelect }
        allowedTypes={ ['image'] }
        value={ image.id }
        render={({ open }) => (
          <>
            <Button
              iconSize={ 28 }
              className={[
                `absolute inset-0 z-20 opacity-0 w-full !h-full !m-0 grid place-items-center bg-blue-light/50 border-solid border-2 border-red-500 text-blue transition-opacity`,
                image.id && 'hover:opacity-100'
              ].join(' ')}
              icon={ image.id ? 'edit' : 'format-image' }
              label={ image.id ? 'Replace Image' : 'Add Image' }
              onClick={open}
            />
            { (image.url && onDelete !== null) && (
              <Button
                iconSize={ 14 }
                className={[
                  `absolute top-2 right-2 z-50 p-1 !m-0 aspect-square rounded-full grid place-items-center bg-red-500 border-solid border-2 border-red-500 opacity-0 group-hover/image:opacity-100 transition text-white hover:text-blue`,
                ].join(' ')}
                icon="trash"
                label="Remove Image"
                onClick={ onDelete }
              />
            ) }
          </>
        )}
      />
      { image.url
        ? <img className={ imageClass } src={ image.url } />
        : (
          <div className={ `flex items-center justify-center ${placeholderClass}` }>
            <svg 
              className={`relative w-full max-w-xs z-10 text-[#DADADA] group-hover/image:text-blue transition-colors`} 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 31 27" 
              fill="none"
              width={ 200 }
            >
                <path d="M28.3988 0.66333H2.602C1.98002 0.66333 1.38352 0.909227 0.943718 1.34693C0.503915 1.78462 0.256836 2.37827 0.256836 2.99727V24.0027C0.256836 24.6217 0.503915 25.2154 0.943718 25.6531C1.38352 26.0908 1.98002 26.3367 2.602 26.3367H28.3988C29.0208 26.3367 29.6173 26.0908 30.0571 25.6531C30.4969 25.2154 30.7439 24.6217 30.7439 24.0027V2.99727C30.7439 2.37827 30.4969 1.78462 30.0571 1.34693C29.6173 0.909227 29.0208 0.66333 28.3988 0.66333ZM28.3988 2.99727V17.9856L24.5776 14.1841C24.3599 13.9674 24.1013 13.7954 23.8167 13.6781C23.5322 13.5607 23.2272 13.5004 22.9192 13.5004C22.6111 13.5004 22.3061 13.5607 22.0216 13.6781C21.737 13.7954 21.4785 13.9674 21.2607 14.1841L18.3292 17.1016L11.88 10.6832C11.4403 10.2459 10.844 10.0002 10.2223 10.0002C9.6006 10.0002 9.00433 10.2459 8.56457 10.6832L2.602 16.6173V2.99727H28.3988ZM2.602 19.9183L10.2238 12.333L21.9496 24.0027H2.602V19.9183ZM28.3988 24.0027H25.2665L19.9899 18.7514L22.9214 15.8339L28.3988 21.2866V24.0027ZM17.8456 9.41561C17.8456 9.0694 17.9487 8.73097 18.142 8.44311C18.3352 8.15525 18.6099 7.93089 18.9313 7.7984C19.2527 7.66591 19.6064 7.63125 19.9476 7.69879C20.2887 7.76633 20.6021 7.93304 20.8481 8.17785C21.0941 8.42266 21.2616 8.73456 21.3295 9.07411C21.3974 9.41367 21.3625 9.76563 21.2294 10.0855C21.0963 10.4053 20.8708 10.6787 20.5816 10.8711C20.2924 11.0634 19.9523 11.1661 19.6044 11.1661C19.1379 11.1661 18.6906 10.9816 18.3607 10.6534C18.0309 10.3251 17.8456 9.87986 17.8456 9.41561Z" fill="currentColor"/>
            </svg>
          </div>
        )
      }
    </div>
  )
}