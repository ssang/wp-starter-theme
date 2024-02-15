import { InspectorControls } from '@wordpress/block-editor'
import { PanelBody, ButtonGroup, Button } from '@wordpress/components'

export default function Prose({ 
  children,
  maxWidth,
  className,
  textAlign,
  setAttributes
}) {
  return (
    <>
      { (typeof textAlign !== 'undefined') && 
        <InspectorControls group="styles">
          <PanelBody title="Text Align">
            <ButtonGroup>
              <Button 
                onClick={() => setAttributes({ textAlign: 'left' })}
                variant={(textAlign === 'left' && 'primary')}
              >
                Left
              </Button>
              <Button 
                onClick={() => setAttributes({ textAlign: 'center' })}
                variant={(textAlign === 'center' && 'primary')}
              >
                Center
              </Button>
              <Button 
                onClick={() => setAttributes({ textAlign: 'right' })}
                variant={(textAlign === 'right' && 'primary')}
              >
                Right
              </Button>
            </ButtonGroup>
          </PanelBody>
        </InspectorControls>
      }
      <div 
        className={[
          'prose group/prose',
          `${maxWidth ?? 'max-w-none'}`,
          `${textAlign == 'center' && 'is-center text-center'}`,
          `${textAlign == 'right' && 'is-right text-right'}`,
          className
        ].join(' ')}
      >
        { children }
      </div>
    </>
  )
}