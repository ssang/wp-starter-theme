const { createHigherOrderComponent } = wp.compose
const { MediaUpload, InspectorControls } = wp.blockEditor
const {
  Button,
  PanelBody,
  BaseControl,
  ButtonGroup,
	FocalPointPicker,
  __experimentalVStack: VStack,
	__experimentalToolsPanel: ToolsPanel,
	__experimentalToolsPanelItem: ToolsPanelItem,
  __experimentalToggleGroupControl: ToggleGroupControl,
	__experimentalToggleGroupControlOption: ToggleGroupControlOption
} = wp.components
const { getBlockSupport } = wp.blocks
const { memo } = wp.element

const imagePositionToCoords = value => {
	if (! value) {
		return { x: 0.5, y: 0.5 }
	}

	let [x, y] = value.split(' ').map(v => parseFloat(v) / 100)
	x = isNaN(x) ? undefined : x
	y = isNaN(y) ? x : y

	return { x, y }
}

function ImageSelectionPreviewSelection ({
  image,
  panelId,
  onChange,
  resetAll
}) {

  return (
    <ToolsPanelItem
      hasValue={ () => !! image.url }
      label="Image Selection"
      panelId={ panelId }
      isShownByDefault={ true }
    >
      <MediaUpload
        onSelect={ onChange }
        allowedTypes={ ['image'] }
        value={ image.id  }
        render={({ open }) => (
          <div className="flex gap-2">
            <Button variant="primary" onClick={ open }>{ !! image.url ? 'Replace Image' : 'Set Image'}</Button>
            { !! image.url && (
              <Button variant="secondary" onClick={ resetAll }>Reset Image</Button>
            ) }
          </div>
        )}
      />
    </ToolsPanelItem>
  )
}

function ImageSizingSettings ({
  attributes,
  setAttributes
}) {
  const { image } = attributes
  
  const updateImageSize = value => {
    setAttributes({
      image: {
        ...image,
        imageSize: value
      }
    })
  }

  return (
    <ToolsPanelItem
			hasValue={ () => !! image.url }
      label="Image Sizing"
      panelId="ImageSettings"
      onSelect={ () => { updateImageSize('cover') } }
		>
      <ToggleGroupControl
        size={ '__unstable-large' }
        label={ 'Size' }
        value={ image.imageSize }
        onChange={ value => { updateImageSize(value) } }
      >
        <ToggleGroupControlOption
          key={ 'cover' }
          value={ 'cover' }
          label={ 'Cover' }
        />
        <ToggleGroupControlOption
          key={ 'contain' }
          value={ 'contain' }
          label={ 'Contain' }
        />
        <ToggleGroupControlOption
          key={ 'fit' }
          value={ 'fit' }
          label={ 'Fit' }
        />
      </ToggleGroupControl>
    </ToolsPanelItem>
  )
}

function ImagePositionSettings ({
  attributes,
  setAttributes
}) {
  const { image } = attributes

  return (
    <ToolsPanelItem
			hasValue={ () => !! image.url }
      label="Image Positioning"
      panelId="ImageSettings"
      onSelect={ () => { updateImageSize('cover') } }
		>
      <FocalPointPicker
        __next40pxDefaultSize
        label={ 'Position' }
        url={ image.url }
        value={ imagePositionToCoords(image.imagePosition) }
        onChange={ value => {
          setAttributes({
            image: {
              ...image,
              'imagePosition': `${ value.x * 100}% ${value.y * 100}%`
            }
          })
        } }
      />
    </ToolsPanelItem>
  )
}

function ImageSettingsPanel (props) {
  if (! getBlockSupport(props.name, ['image'])) {
    return null
  }
  
  const { attributes, setAttributes } = props
  const { image } = attributes

  const resetAll = () => {
    const _image = {
      url: null,
      id: null
    }

    if ('imageSize' in image) {
      _image['imageSize'] = 'cover'
      _image['imagePosition'] = '50% 50%'
    }

    if (getBlockSupport(props.name, ['image', 'mobile'])) {
      _image['mobile'] = {
        url: null,
        id: null
      }
    }

    setAttributes({
      image: _image
    })
  }
  
  return (
    <InspectorControls>
      <VStack
        as={ ToolsPanel }
        spacing={ 4 }
        label="Image Settings"
        panelId="ImageSettings"
        resetAll={ resetAll }
      >
        <ImageSelectionPreviewSelection
          image={ image }
          onChange={ media => {
            const _image = {
              ...image,
              id: media.id,
              url: media.url
            }

            if (getBlockSupport(props.name, ['image', 'imageSize'])) {
              _image['imageSize'] = 'cover'
              _image['imagePosition'] = '50% 50%'
            }

            setAttributes({
              image: _image
            })
          }}
          panelId="ImageSettings"
        />
        { getBlockSupport(props.name, ['image', 'imagePosition']) && (
          <ImagePositionSettings { ...props } />
        ) }
        { getBlockSupport(props.name, ['image', 'imageSize']) && (
          <ImageSizingSettings { ...props } />
        ) }
        { getBlockSupport(props.name, ['image', 'mobile']) && (
          <ToolsPanelItem
            hasValue={ () => !! image.mobile?.url }
            label="Mobile Image"
            panelId="ImageSettings"
            isShownByDefault={ false }
          >
            <BaseControl
              label="Mobile Image"
            >
              <MediaUpload
                onSelect={ media => {
                  const _image = { ...image }

                  _image['mobile'] = {
                    url: media.url,
                    id: media.id
                  }

                  setAttributes({
                    image: _image
                  })
                } }
                allowedTypes={ ['image'] }
                value={ image.mobile?.id  }
                render={({ open }) => (
                  <VStack>
                    { !! image.mobile?.url && <img className="block" src={ image.mobile?.url } /> }
                    <div className="flex gap-2">
                      <Button variant="primary" onClick={ open }>{ !! image.mobile?.url ? 'Replace Image' : 'Set Image'}</Button>
                      { !! image.mobile?.url && (
                        <Button 
                          variant="secondary"
                          onClick={ () => {
                            const _image = { ...image }
            
                            _image['mobile'] = {
                              url: null,
                              id: null
                            }
            
                            setAttributes({
                              image: _image
                            })
                          } }
                        >Reset Image</Button>
                      ) }
                    </div>
                  </VStack>
                )}
              />
            </BaseControl>
          </ToolsPanelItem>
        ) }
      </VStack>
    </InspectorControls>
  )
}

wp.hooks.addFilter(
	'editor.BlockEdit',
	'crew/add-image-controls',
	createHigherOrderComponent(BlockEdit => {
    return props => {

      const Edit = memo(ImageSettingsPanel)

      return [
        <Edit { ...props } />,
        <BlockEdit key="edit" { ...props } />
      ]
    }
  }, 'ImageControls'),
  10
)